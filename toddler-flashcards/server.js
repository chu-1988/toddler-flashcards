'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PORT = Number(process.env.PORT) || 3000;
const API_KEY = (process.env.ELEVENLABS_API_KEY || '').trim();
const DEFAULT_VOICE_ID = (process.env.ELEVENLABS_VOICE_ID || '').trim();
const CACHE_DIR = path.join(__dirname, 'cache');
const MODEL_ID = 'eleven_multilingual_v2';

// Clear, slightly slow & stable for toddlers
const VOICE_SETTINGS = {
  stability: 0.75,
  similarity_boost: 0.8,
  style: 0,
  speed: 0.85,
  use_speaker_boost: true,
};

const ALLOWED_WORDS = new Set([
  'dog', 'cat', 'bird', 'fish', 'apple', 'banana',
  'milk', 'ball', 'car', 'book', 'sun', 'flower',
]);

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const app = express();
app.use(express.json({ limit: '16kb' }));
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  maxAge: '1h',
}));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    ttsConfigured: Boolean(API_KEY && DEFAULT_VOICE_ID),
    hasApiKey: Boolean(API_KEY),
    hasDefaultVoice: Boolean(DEFAULT_VOICE_ID),
  });
});

function sanitizeWord(raw) {
  if (typeof raw !== 'string') return null;
  const word = raw.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (!word || word.length > 32) return null;
  return word;
}

function sanitizeVoiceId(raw) {
  if (typeof raw !== 'string') return null;
  const id = raw.trim();
  // ElevenLabs voice IDs are alphanumeric (often 20 chars)
  if (!/^[a-zA-Z0-9]{10,64}$/.test(id)) return null;
  return id;
}

function cachePath(word, voiceId) {
  const safe = `${word}__${voiceId}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  return path.join(CACHE_DIR, `${safe}.mp3`);
}

app.post('/api/speak', async (req, res) => {
  const word = sanitizeWord(req.body && req.body.word);
  if (!word) {
    return res.status(400).json({ error: 'Please send a simple word, like "dog".' });
  }
  if (!ALLOWED_WORDS.has(word)) {
    return res.status(400).json({ error: 'That word is not on the flashcard list.' });
  }

  const voiceOverride = sanitizeVoiceId(req.body && req.body.voiceId);
  const voiceId = voiceOverride || DEFAULT_VOICE_ID;

  if (!API_KEY) {
    return res.status(503).json({
      error: 'Speech is not set up yet. Ask a grown-up to add an ElevenLabs API key in the .env file.',
      code: 'MISSING_API_KEY',
    });
  }
  if (!voiceId) {
    return res.status(503).json({
      error: 'No voice selected. Ask a grown-up to set ELEVENLABS_VOICE_ID in .env, or pick a Voice ID in Settings.',
      code: 'MISSING_VOICE_ID',
    });
  }

  const file = cachePath(word, voiceId);
  if (fs.existsSync(file)) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('X-Cache', 'HIT');
    return fs.createReadStream(file).pipe(res);
  }

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`;
    const ttsRes = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: word,
        model_id: MODEL_ID,
        voice_settings: VOICE_SETTINGS,
      }),
    });

    if (!ttsRes.ok) {
      let detail = '';
      try {
        const errBody = await ttsRes.json();
        detail = (errBody && (errBody.detail && errBody.detail.message)) ||
          (typeof errBody.detail === 'string' ? errBody.detail : '') ||
          JSON.stringify(errBody).slice(0, 200);
      } catch (_) {
        detail = await ttsRes.text().catch(() => '');
      }
      console.error('ElevenLabs error', ttsRes.status, detail);
      const friendly =
        ttsRes.status === 401
          ? 'The API key looks wrong. Ask a grown-up to check ELEVENLABS_API_KEY.'
          : ttsRes.status === 404
            ? 'That voice ID was not found. Check ELEVENLABS_VOICE_ID or Settings.'
            : 'Could not make speech right now. Try again in a moment.';
      return res.status(502).json({ error: friendly, code: 'TTS_FAILED' });
    }

    const buffer = Buffer.from(await ttsRes.arrayBuffer());
    fs.writeFileSync(file, buffer);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch (err) {
    console.error('TTS request failed', err);
    return res.status(502).json({
      error: 'Could not reach ElevenLabs. Check the internet connection and try again.',
      code: 'TTS_NETWORK',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Toddler flashcards at http://localhost:${PORT}`);
  if (!API_KEY) {
    console.warn('Warning: ELEVENLABS_API_KEY is missing — TTS will show a friendly error.');
  }
  if (!DEFAULT_VOICE_ID) {
    console.warn('Warning: ELEVENLABS_VOICE_ID is missing — set it in .env or via the Settings panel.');
  }
});
