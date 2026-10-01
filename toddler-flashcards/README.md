# Toddler Flashcards (ElevenLabs TTS)

Phone-friendly flashcards for toddlers. Tap a big emoji card to hear the word spoken aloud with ElevenLabs text-to-speech. Audio is cached on disk so repeat taps do not re-call the API.

## Features

- 12 starter words (animals, food, objects) with cute emoji — works offline for pictures
- Large tap targets, mobile Safari/Chrome friendly
- `POST /api/speak` → ElevenLabs → `audio/mpeg`, cached by `word + voiceId`
- Clear loading / error messages; graceful message if the API key is missing
- Optional parent Settings panel: override Voice ID in `localStorage` (great for a cloned parent voice)

## Quick start

```bash
cd /workspace/toddler-flashcards
cp .env.example .env
# edit .env — add your key and a voice id (see below)
npm install
npm start
```

Open **http://localhost:3000** on your phone or laptop.

## Get an ElevenLabs API key

1. Create an account at [https://elevenlabs.io](https://elevenlabs.io)
2. Open **Profile / Developers → API Key** (or [https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys))
3. Create a key and paste it into `.env`:

```env
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here
```

Never commit `.env`. Only `.env.example` (empty placeholders) is in the repo.

## Choose a voice (including a cloned parent voice)

### Stock voice

1. In ElevenLabs, open **Voices**
2. Pick a clear, friendly voice
3. Copy the **Voice ID** into `ELEVENLABS_VOICE_ID`

### Cloned parent voice (recommended for toddlers)

1. In ElevenLabs, go to **Voices → Add / Clone**
2. Use **Instant Voice Clone** (or Professional Clone if you have it)
3. Record or upload a short, clean sample of the parent speaking naturally (quiet room, no music)
4. Save the voice, then copy its **Voice ID**
5. Put that ID in `.env` as `ELEVENLABS_VOICE_ID`, **or** open the app’s ⚙️ Settings and paste it there (device-only override; does not change the server `.env`)

After changing `.env`, restart the server (`Ctrl+C`, then `npm start`).

## TTS settings used by this app

- Model: `eleven_multilingual_v2` (high-quality, clear speech)
- One word at a time (the flashcard label)
- Slightly slow & stable: `speed: 0.85`, `stability: 0.75`, `similarity_boost: 0.8`, `style: 0`, `use_speaker_boost: true`

## API

| Method | Path | Body | Response |
|--------|------|------|----------|
| `GET` | `/api/health` | — | `{ ok, ttsConfigured, hasApiKey, hasDefaultVoice }` |
| `POST` | `/api/speak` | `{ "word": "dog", "voiceId?": "..." }` | `audio/mpeg` or JSON error |

Allowed words: `dog`, `cat`, `bird`, `fish`, `apple`, `banana`, `milk`, `ball`, `car`, `book`, `sun`, `flower`.

Cached files live in `./cache/` as `{word}__{voiceId}.mp3`.

## Requirements

- Node.js 18+ (uses built-in `fetch`)
- Dependencies: `express`, `dotenv` only

## Troubleshooting

| Symptom | What to try |
|---------|-------------|
| “Speech needs an API key…” | Add `ELEVENLABS_API_KEY` to `.env` and restart |
| “No voice selected…” | Set `ELEVENLABS_VOICE_ID` or paste a Voice ID in Settings |
| “That voice ID was not found” | Copy the ID again from ElevenLabs Voices |
| “API key looks wrong” | Regenerate the key; ensure no extra spaces/quotes in `.env` |
| First tap is slow | Expected — audio is generated then cached; later taps are fast |

## License

Illustrations are emoji (platform fonts). App code is yours to use freely for personal / family projects.
