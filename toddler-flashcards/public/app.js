(() => {
  const CARDS = [
    { word: 'dog', emoji: '🐶' },
    { word: 'cat', emoji: '🐱' },
    { word: 'bird', emoji: '🐦' },
    { word: 'fish', emoji: '🐟' },
    { word: 'apple', emoji: '🍎' },
    { word: 'banana', emoji: '🍌' },
    { word: 'milk', emoji: '🥛' },
    { word: 'ball', emoji: '⚽' },
    { word: 'car', emoji: '🚗' },
    { word: 'book', emoji: '📘' },
    { word: 'sun', emoji: '☀️' },
    { word: 'flower', emoji: '🌸' },
  ];

  const VOICE_KEY = 'toddlerFlashcards.voiceId';
  const grid = document.getElementById('grid');
  const statusEl = document.getElementById('status');
  const settingsBtn = document.getElementById('settingsBtn');
  const dialog = document.getElementById('settingsDialog');
  const form = document.getElementById('settingsForm');
  const voiceInput = document.getElementById('voiceIdInput');
  const clearVoiceBtn = document.getElementById('clearVoiceBtn');
  const healthNote = document.getElementById('healthNote');

  let currentAudio = null;
  let activeCard = null;
  let speaking = false;

  function getVoiceOverride() {
    return (localStorage.getItem(VOICE_KEY) || '').trim();
  }

  function setStatus(msg, kind) {
    if (!msg) {
      statusEl.hidden = true;
      statusEl.textContent = '';
      statusEl.className = 'status';
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = msg;
    statusEl.className = `status ${kind || ''}`.trim();
  }

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.removeAttribute('src');
      currentAudio.load();
      currentAudio = null;
    }
    if (activeCard) {
      activeCard.classList.remove('playing', 'busy');
      activeCard = null;
    }
    speaking = false;
  }

  async function speak(word, cardEl) {
    if (speaking && activeCard === cardEl) {
      stopAudio();
      setStatus('');
      return;
    }
    stopAudio();
    speaking = true;
    activeCard = cardEl;
    cardEl.classList.add('busy', 'playing');
    setStatus('Getting ready…', 'loading');

    const body = { word };
    const override = getVoiceOverride();
    if (override) body.voiceId = override;

    try {
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) {
        let message = 'Could not play that word.';
        if (contentType.includes('application/json')) {
          const data = await res.json().catch(() => null);
          if (data && data.error) message = data.error;
        }
        throw new Error(message);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudio = audio;

      audio.onended = () => {
        URL.revokeObjectURL(url);
        stopAudio();
        setStatus('');
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        stopAudio();
        setStatus('Audio playback failed on this device.', 'error');
      };

      setStatus('Playing…', 'ok');
      await audio.play();
      cardEl.classList.remove('busy');
    } catch (err) {
      stopAudio();
      setStatus(err.message || 'Something went wrong.', 'error');
    }
  }

  function renderCards() {
    const frag = document.createDocumentFragment();
    CARDS.forEach(({ word, emoji }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card';
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-label', `Say ${word}`);
      btn.innerHTML = `<span class="emoji" aria-hidden="true">${emoji}</span><p class="word">${word}</p>`;
      btn.addEventListener('click', () => speak(word, btn));
      frag.appendChild(btn);
    });
    grid.appendChild(frag);
  }

  async function refreshHealth() {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (!data.hasApiKey) {
        healthNote.textContent = 'Server has no ELEVENLABS_API_KEY yet — speech will not work until a grown-up adds one.';
        setStatus('Speech needs an API key in .env (ask a grown-up).', 'error');
      } else if (!data.hasDefaultVoice && !getVoiceOverride()) {
        healthNote.textContent = 'No default voice in .env. Paste a Voice ID below, or set ELEVENLABS_VOICE_ID.';
        setStatus('Pick a voice in Settings (⚙️) to hear words.', 'error');
      } else {
        healthNote.textContent = data.ttsConfigured
          ? 'TTS is configured on the server.'
          : 'Using the Voice ID from Settings for speech.';
        if (statusEl.classList.contains('error') && statusEl.textContent.includes('API key')) {
          setStatus('');
        }
      }
    } catch (_) {
      healthNote.textContent = 'Could not reach the server health check.';
    }
  }

  settingsBtn.addEventListener('click', () => {
    voiceInput.value = getVoiceOverride();
    refreshHealth();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  });

  clearVoiceBtn.addEventListener('click', () => {
    localStorage.removeItem(VOICE_KEY);
    voiceInput.value = '';
    setStatus('Voice override cleared.', 'ok');
    refreshHealth();
  });

  form.addEventListener('submit', (e) => {
    const submitter = e.submitter;
    const value = submitter && submitter.value;
    if (value === 'save') {
      const next = voiceInput.value.trim();
      if (next) {
        localStorage.setItem(VOICE_KEY, next);
        setStatus('Saved voice override on this device.', 'ok');
      } else {
        localStorage.removeItem(VOICE_KEY);
      }
      refreshHealth();
    }
  });

  renderCards();
  refreshHealth();
})();
