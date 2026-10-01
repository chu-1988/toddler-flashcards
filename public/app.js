(() => {
  const CARDS = [
    // Page 1 — pets & farm
    { word: 'dog', emoji: '🐶' },
    { word: 'cat', emoji: '🐱' },
    { word: 'bird', emoji: '🐦' },
    { word: 'fish', emoji: '🐟' },
    { word: 'cow', emoji: '🐄' },
    { word: 'pig', emoji: '🐷' },
    { word: 'duck', emoji: '🦆' },
    { word: 'horse', emoji: '🐴' },
    { word: 'frog', emoji: '🐸' },
    { word: 'bee', emoji: '🐝' },
    { word: 'mouse', emoji: '🐭' },
    { word: 'bunny', emoji: '🐰' },
    // Page 2 — wild animals
    { word: 'bear', emoji: '🐻' },
    { word: 'lion', emoji: '🦁' },
    { word: 'tiger', emoji: '🐯' },
    { word: 'monkey', emoji: '🐵' },
    { word: 'elephant', emoji: '🐘' },
    { word: 'giraffe', emoji: '🦒' },
    { word: 'zebra', emoji: '🦓' },
    { word: 'penguin', emoji: '🐧' },
    { word: 'owl', emoji: '🦉' },
    { word: 'butterfly', emoji: '🦋' },
    { word: 'snail', emoji: '🐌' },
    { word: 'turtle', emoji: '🐢' },
    // Page 3 — food
    { word: 'apple', emoji: '🍎' },
    { word: 'banana', emoji: '🍌' },
    { word: 'milk', emoji: '🥛' },
    { word: 'bread', emoji: '🍞' },
    { word: 'cheese', emoji: '🧀' },
    { word: 'egg', emoji: '🥚' },
    { word: 'cookie', emoji: '🍪' },
    { word: 'pizza', emoji: '🍕' },
    { word: 'cake', emoji: '🎂' },
    { word: 'juice', emoji: '🧃' },
    { word: 'carrot', emoji: '🥕' },
    { word: 'grape', emoji: '🍇' },
    // Page 4 — more food
    { word: 'orange', emoji: '🍊' },
    { word: 'pear', emoji: '🍐' },
    { word: 'peach', emoji: '🍑' },
    { word: 'corn', emoji: '🌽' },
    { word: 'rice', emoji: '🍚' },
    { word: 'soup', emoji: '🍲' },
    { word: 'yogurt', emoji: '🥣' },
    { word: 'waffle', emoji: '🧇' },
    { word: 'muffin', emoji: '🧁' },
    { word: 'berry', emoji: '🫐' },
    { word: 'melon', emoji: '🍈' },
    { word: 'lemon', emoji: '🍋' },
    // Page 5 — body
    { word: 'eyes', emoji: '👀' },
    { word: 'ear', emoji: '👂' },
    { word: 'nose', emoji: '👃' },
    { word: 'mouth', emoji: '👄' },
    { word: 'hand', emoji: '✋' },
    { word: 'foot', emoji: '🦶' },
    { word: 'hair', emoji: '💇' },
    { word: 'tummy', emoji: '🧡' },
    { word: 'teeth', emoji: '🦷' },
    { word: 'knee', emoji: '🦵' },
    { word: 'arm', emoji: '💪' },
    { word: 'toe', emoji: '👣' },
    // Page 6 — home
    { word: 'bed', emoji: '🛏️' },
    { word: 'door', emoji: '🚪' },
    { word: 'window', emoji: '🪟' },
    { word: 'chair', emoji: '🪑' },
    { word: 'sofa', emoji: '🛋️' },
    { word: 'lamp', emoji: '💡' },
    { word: 'cup', emoji: '🥤' },
    { word: 'spoon', emoji: '🥄' },
    { word: 'plate', emoji: '🍽️' },
    { word: 'soap', emoji: '🧼' },
    { word: 'towel', emoji: '🧺' },
    { word: 'clock', emoji: '⏰' },
    // Page 7 — clothes
    { word: 'shirt', emoji: '👕' },
    { word: 'pants', emoji: '👖' },
    { word: 'sock', emoji: '🧦' },
    { word: 'shoe', emoji: '👟' },
    { word: 'hat', emoji: '🧢' },
    { word: 'coat', emoji: '🧥' },
    { word: 'dress', emoji: '👗' },
    { word: 'scarf', emoji: '🧣' },
    { word: 'glove', emoji: '🧤' },
    { word: 'boot', emoji: '🥾' },
    { word: 'diaper', emoji: '🧷' },
    { word: 'bib', emoji: '👶' },
    // Page 8 — vehicles
    { word: 'car', emoji: '🚗' },
    { word: 'bus', emoji: '🚌' },
    { word: 'train', emoji: '🚂' },
    { word: 'plane', emoji: '✈️' },
    { word: 'boat', emoji: '⛵' },
    { word: 'bike', emoji: '🚲' },
    { word: 'truck', emoji: '🚚' },
    { word: 'taxi', emoji: '🚕' },
    { word: 'rocket', emoji: '🚀' },
    { word: 'tractor', emoji: '🚜' },
    { word: 'scooter', emoji: '🛴' },
    { word: 'ship', emoji: '🚢' },
    // Page 9 — nature
    { word: 'sun', emoji: '☀️' },
    { word: 'moon', emoji: '🌙' },
    { word: 'star', emoji: '⭐' },
    { word: 'cloud', emoji: '☁️' },
    { word: 'rain', emoji: '🌧️' },
    { word: 'tree', emoji: '🌳' },
    { word: 'flower', emoji: '🌸' },
    { word: 'grass', emoji: '🌱' },
    { word: 'leaf', emoji: '🍃' },
    { word: 'rock', emoji: '🪨' },
    { word: 'sand', emoji: '🏖️' },
    { word: 'water', emoji: '💧' },
    // Page 10 — colors & play
    { word: 'red', emoji: '🔴' },
    { word: 'blue', emoji: '🔵' },
    { word: 'green', emoji: '🟢' },
    { word: 'yellow', emoji: '🟡' },
    { word: 'purple', emoji: '🟣' },
    { word: 'pink', emoji: '🩷' },
    { word: 'black', emoji: '⚫' },
    { word: 'white', emoji: '⚪' },
    { word: 'brown', emoji: '🟤' },
    { word: 'ball', emoji: '⚽' },
    { word: 'book', emoji: '📘' },
    { word: 'toy', emoji: '🧸' },
  ];

  const PAGE_SIZE = 12;
  const TOTAL_PAGES = Math.ceil(CARDS.length / PAGE_SIZE);

  const VOICE_KEY = 'toddlerFlashcards.voiceId';
  const PAGE_KEY = 'toddlerFlashcards.page';
  const grid = document.getElementById('grid');
  const statusEl = document.getElementById('status');
  const settingsBtn = document.getElementById('settingsBtn');
  const dialog = document.getElementById('settingsDialog');
  const form = document.getElementById('settingsForm');
  const voiceInput = document.getElementById('voiceIdInput');
  const clearVoiceBtn = document.getElementById('clearVoiceBtn');
  const healthNote = document.getElementById('healthNote');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageIndicator = document.getElementById('pageIndicator');
  const pageDots = document.getElementById('pageDots');

  let currentPage = 0;
  let currentAudio = null;
  let activeCard = null;
  let speaking = false;

  function loadSavedPage() {
    const raw = parseInt(localStorage.getItem(PAGE_KEY) || '0', 10);
    if (Number.isFinite(raw) && raw >= 0 && raw < TOTAL_PAGES) {
      currentPage = raw;
    } else {
      currentPage = 0;
    }
  }

  function savePage() {
    localStorage.setItem(PAGE_KEY, String(currentPage));
  }

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

  function pageCards() {
    const start = currentPage * PAGE_SIZE;
    return CARDS.slice(start, start + PAGE_SIZE);
  }

  function updatePager() {
    pageIndicator.textContent = `${currentPage + 1} / ${TOTAL_PAGES}`;
    prevBtn.disabled = currentPage <= 0;
    nextBtn.disabled = currentPage >= TOTAL_PAGES - 1;
    prevBtn.setAttribute('aria-disabled', String(prevBtn.disabled));
    nextBtn.setAttribute('aria-disabled', String(nextBtn.disabled));

    if (pageDots) {
      const dots = pageDots.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        const active = i === currentPage;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-current', active ? 'page' : 'false');
      });
    }
  }

  function renderDots() {
    if (!pageDots) return;
    pageDots.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < TOTAL_PAGES; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dot';
      btn.setAttribute('aria-label', `Page ${i + 1}`);
      btn.addEventListener('click', () => goToPage(i));
      frag.appendChild(btn);
    }
    pageDots.appendChild(frag);
  }

  function renderCards() {
    stopAudio();
    setStatus('');
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    pageCards().forEach(({ word, emoji }) => {
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
    updatePager();
    savePage();
  }

  function goToPage(page) {
    const next = Math.max(0, Math.min(TOTAL_PAGES - 1, page));
    if (next === currentPage) return;
    currentPage = next;
    renderCards();
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

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

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

  loadSavedPage();
  renderDots();
  renderCards();
  refreshHealth();
})();
