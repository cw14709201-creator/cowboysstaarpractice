'use strict';

const CURRENT_VERSION  = 'v1.0';
const STORAGE_KEY      = 'cowboysstuff_last_seen_version';
const COUNTER_PREFIX   = 'cowboysstuff_plays_';
const RECENT_KEY       = 'cowboysstuff_recent';
const CLOAK_TITLE_KEY  = 'cowboysstuff_cloak_title';
const CLOAK_URL_KEY    = 'cowboysstuff_cloak_url';
const RECENT_MAX       = 8;

const GNMATH_JS    = 'https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/gnmath.js';
const HTML_CDN     = 'https://cdn.jsdelivr.net/gh/gn-math/html@main/';
const COVERS_CDN   = 'https://cdn.jsdelivr.net/gh/gn-math/covers@main/';
const TRUFFLED_API = 'https://data.jsdelivr.com/v1/packages/gh/molkify/truffled-games@main/flat';
const TRUFFLED_CDN = 'https://cdn.jsdelivr.net/gh/molkify/truffled-games@main';

const LOADING_MSGS_COMMON = [
  "don't you dare skid this",
  "join cowboysstuff discord",
  "we're slow give us a minute",
  "loading...",
  "fetching games...",
  "almost there...",
];
const LOADING_MSG_RARE = "duckinator is a femboy";

let _toastTimer = null;
function toast(msg, ms = 1800) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

(function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const msgEl  = document.getElementById('ls-msg');
  const appEl  = document.getElementById('app');
  let   idx    = 0;
  let   timer  = null;

  function pick() {
    return Math.random() < 0.01
      ? LOADING_MSG_RARE
      : LOADING_MSGS_COMMON[idx++ % LOADING_MSGS_COMMON.length];
  }

  msgEl.textContent = pick();
  timer = setInterval(() => {
    msgEl.style.animation = 'none';
    msgEl.offsetHeight;
    msgEl.style.animation = '';
    msgEl.textContent = pick();
  }, 2200);

  function dismiss() {
    clearInterval(timer);
    screen.classList.add('fade-out');
    appEl.classList.add('visible');
    const DURATION = 550;
    const fb = setTimeout(() => screen.remove(), DURATION);
    screen.addEventListener('transitionend', () => { clearTimeout(fb); screen.remove(); }, { once: true });
  }

  if (document.readyState === 'complete') setTimeout(dismiss, 600);
  else window.addEventListener('load', () => setTimeout(dismiss, 600));
})();

(function initTabCloak() {
  // Apply saved cloak on load
  const savedTitle = localStorage.getItem(CLOAK_TITLE_KEY);
  if (savedTitle) document.title = savedTitle;

  // Panic: Shift+Esc navigates away
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && e.shiftKey) {
      const url = localStorage.getItem(CLOAK_URL_KEY) || 'https://docs.google.com';
      window.location.href = url;
    }
  });
})();

(function initModal() {
  const overlay  = document.getElementById('update-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay || !closeBtn) return;

  if (localStorage.getItem(STORAGE_KEY) !== CURRENT_VERSION) {
    overlay.classList.remove('hidden');
  }

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    overlay.classList.add('hidden');
  };

  closeBtn.addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });
})();

(function initSettings() {
  const overlay   = document.getElementById('settings-overlay');
  const closeBtn  = document.getElementById('settings-close');
  const titleInp  = document.getElementById('cloak-title');
  const urlInp    = document.getElementById('cloak-url');
  const clearHist = document.getElementById('clear-history-btn');
  const resetCnts = document.getElementById('reset-counters-btn');

  if (!overlay) return;

  // Populate saved values
  titleInp.value = localStorage.getItem(CLOAK_TITLE_KEY) || '';
  urlInp.value   = localStorage.getItem(CLOAK_URL_KEY)   || '';

  function openSettings() { overlay.classList.remove('hidden'); }
  function closeSettings() { overlay.classList.add('hidden'); }

  // Open from both buttons
  ['settings-btn', 'footer-settings'].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openSettings);
  });

  closeBtn.addEventListener('click', closeSettings);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSettings(); });

  // Live-save cloak settings
  titleInp.addEventListener('input', () => {
    const v = titleInp.value.trim();
    if (v) { localStorage.setItem(CLOAK_TITLE_KEY, v); document.title = v; }
    else   { localStorage.removeItem(CLOAK_TITLE_KEY); document.title = 'cowboysstuff'; }
  });

  urlInp.addEventListener('input', () => {
    const v = urlInp.value.trim();
    if (v) localStorage.setItem(CLOAK_URL_KEY, v);
    else   localStorage.removeItem(CLOAK_URL_KEY);
  });

  clearHist.addEventListener('click', () => {
    localStorage.removeItem(RECENT_KEY);
    renderRecent();
    toast('history cleared');
  });

  resetCnts.addEventListener('click', () => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(COUNTER_PREFIX)) localStorage.removeItem(k);
    }
    refreshCounterUI();
    toast('play counts reset');
  });

  // Expose for keyboard shortcut
  window._openSettings = openSettings;
})();

(function initShortcutsModal() {
  const overlay  = document.getElementById('shortcuts-overlay');
  const closeBtn = document.getElementById('shortcuts-close');
  if (!overlay) return;

  function open()  { overlay.classList.remove('hidden'); }
  function close() { overlay.classList.add('hidden'); }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  window._openShortcuts = open;
  window._closeShortcuts = close;
})();

function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); }
  catch { return []; }
}

function addRecent(url, label) {
  let list = getRecent().filter((r) => r.url !== url);
  list.unshift({ url, label: label || url });
  list = list.slice(0, RECENT_MAX);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  renderRecent();
}

function removeRecent(url) {
  const list = getRecent().filter((r) => r.url !== url);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  renderRecent();
}

function renderRecent() {
  const wrap = document.getElementById('recent-wrap');
  const list = document.getElementById('recent-list');
  if (!wrap || !list) return;
  const items = getRecent();
  wrap.hidden = items.length === 0;
  list.innerHTML = '';
  items.forEach(({ url, label }) => {
    const chip = document.createElement('a');
    chip.className = 'recent-chip';
    chip.href       = window.PROXY_BASE + url;
    chip.target     = getLinkTarget ? getLinkTarget() : '_self';
    chip.title      = url;

    const labelEl   = document.createElement('span');
    labelEl.textContent = label;
    labelEl.style.overflow = 'hidden';
    labelEl.style.textOverflow = 'ellipsis';

    const del = document.createElement('span');
    del.className   = 'recent-chip-del';
    del.textContent = '✕';
    del.title       = 'remove';
    del.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeRecent(url);
    });

    chip.appendChild(labelEl);
    chip.appendChild(del);
    list.appendChild(chip);
  });

  // Keep autocomplete datalist in sync
  const dl = document.getElementById('search-suggestions');
  if (dl) {
    dl.innerHTML = '';
    items.forEach(({ label, url }) => {
      const opt = document.createElement('option');
      opt.value = label || url;
      dl.appendChild(opt);
    });
  }
}

renderRecent();

const getCount = (id) => parseInt(localStorage.getItem(COUNTER_PREFIX + id) || '0', 10);

function getTotal() {
  let t = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(COUNTER_PREFIX)) t += parseInt(localStorage.getItem(k) || '0', 10);
  }
  return t;
}

function refreshCounterUI() {
  document.querySelectorAll('.game-link[data-game]').forEach((link) => {
    const el = document.getElementById('plays-' + link.dataset.game);
    if (el) el.textContent = getCount(link.dataset.game);
  });
  const totalEl = document.getElementById('total-play-count');
  if (totalEl) { const n = getTotal(); totalEl.textContent = n === 1 ? '1 play' : n + ' plays'; }
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('.game-link[data-game]');
  if (!link) return;
  const id   = link.dataset.game;
  const name = link.querySelector('.game-name')?.textContent || id;
  localStorage.setItem(COUNTER_PREFIX + id, getCount(id) + 1);
  refreshCounterUI();
  // Use rawUrl (the actual game CDN URL) not the /game?url=... wrapper href
  const rawHref  = link.dataset.rawUrl || link.getAttribute('href') || '';
  const targetUrl = rawHref.startsWith(window.PROXY_BASE) ? rawHref.slice(window.PROXY_BASE.length) : rawHref;
  addRecent(targetUrl, name);
});

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function loadGnMathZones() {
  return new Promise((resolve) => {
    if (Array.isArray(window.zones) && window.zones.length) return resolve(window.zones);
    const s   = document.createElement('script');
    s.src     = GNMATH_JS;
    s.onload  = () => resolve(Array.isArray(window.zones) ? window.zones : []);
    s.onerror = () => resolve([]);
    document.head.appendChild(s);
  });
}

async function loadTruffledGames() {
  try {
    const res  = await fetch(TRUFFLED_API);
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data.files) ? data.files : [])
      .filter((f) => typeof f.name === 'string' && f.name.endsWith('.html'))
      .map((f) => {
        const filename = f.name.replace(/^\//, '');
        return {
          name:   filename.replace(/\.html$/i, '').replace(/[-_]/g, ' ').trim(),
          url:    TRUFFLED_CDN + f.name,
          gameId: 'truffled-' + filename.replace(/\.html$/i, '').replace(/[^a-z0-9]/gi, '-'),
        };
      });
  } catch { return []; }
}

let gamesLoaded  = false;
let gamesLoading = false;

async function loadAndRenderGames() {
  if (gamesLoaded || gamesLoading) return;
  gamesLoading = true;

  const list    = document.getElementById('games-list');
  const countEl = document.getElementById('panel-game-count');
  list.innerHTML = '<span class="loading-text">loading games...</span>';

  const [zones, truffled] = await Promise.all([loadGnMathZones(), loadTruffledGames()]);
  const gnNames = new Set(zones.map((z) => norm(z.name || z.title || '')).filter(Boolean));
  const unique  = truffled.filter((g) => !gnNames.has(norm(g.name)));

  if (zones.length + unique.length === 0) {
    list.innerHTML = '<span class="loading-text">could not load games</span>';
    gamesLoading = false;
    return;
  }

  list.innerHTML = '';
  if (countEl) countEl.textContent = (zones.length + unique.length) + ' games';

  const frag = document.createDocumentFragment();
  zones.forEach((zone) => {
    const raw = (zone.url || '').replace('{HTML_URL}', HTML_CDN).replace('{COVER_URL}', COVERS_CDN);
    if (!raw.startsWith('http')) return;
    frag.appendChild(_makeGameLink(window.PROXY_BASE + raw, zone.name || zone.title || ('Game ' + zone.id), 'gnmath-' + zone.id, 'gn-math'));
  });
  unique.forEach((g) => frag.appendChild(_makeGameLink(window.PROXY_BASE + g.url, g.name, g.gameId, 'truffled')));
  list.appendChild(frag);

  // Wire filter input + source tabs
  const searchInput = document.getElementById('game-search');
  if (searchInput) {
    searchInput.value = '';
    searchInput.addEventListener('input', applyGameFilter);
  }
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      applyGameFilter();
    });
  });

  refreshCounterUI();
    applyGameFilter();
  gamesLoaded  = true;
  gamesLoading = false;
}

function _makeGameLink(href, name, gameId, source) {
  const a = document.createElement('a');
  // Route through /game viewer so user can control resolution
  // href is already /p/... — pass the raw URL as a param
  const rawUrl  = href.startsWith(window.PROXY_BASE) ? href.slice(window.PROXY_BASE.length) : href;
  const gameHref = (window.GAME_BASE || '/game') + '?url=' + encodeURIComponent(rawUrl) + '&name=' + encodeURIComponent(name);
  a.className      = 'panel-link game-link';
  a.href           = gameHref;
  a.dataset.game   = gameId;
  a.dataset.source = source;
  a.dataset.rawUrl = rawUrl; // keep for recent sites
  a.target         = '_self';
  const ns = document.createElement('span'); ns.className = 'game-name'; ns.textContent = name;
  const b  = document.createElement('span'); b.className  = 'game-badge'; b.id = 'plays-' + gameId; b.textContent = getCount(gameId);
  a.appendChild(ns); a.appendChild(b);
  return a;
}

function applyGameFilter() {
  const q      = (document.getElementById('game-search')?.value || '').toLowerCase().trim();
  const src    = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
  let visible  = 0;
  let total    = 0;
  document.querySelectorAll('#games-list .game-link').forEach((link) => {
    total++;
    const nameEl = link.querySelector('.game-name');
    const matchQ = !q || (nameEl && nameEl.textContent.toLowerCase().includes(q));
    const matchS = src === 'all' || link.dataset.source === src;
    link.style.display = (matchQ && matchS) ? '' : 'none';
    if (matchQ && matchS) visible++;
  });

  // Update count — show "X of Y" only when filtering
  const countEl = document.getElementById('panel-game-count');
  if (countEl) {
    if (q || src !== 'all') countEl.textContent = visible + ' of ' + total;
    else countEl.textContent = total + ' games';
  }

  const noRes = document.getElementById('games-no-results');
  if (noRes) noRes.hidden = (visible > 0 || (!q && src === 'all'));
}

// Single authoritative search init — no cloneNode tricks.
// Merges engine selection, link target, recent autocomplete, and shortcuts.
(function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const isUrl = (s) => /^[^\s]+\.[^\s]+$/.test(s) && !/\s/.test(s);

  function navigate(q) {
    q = q.trim();
    if (!q) return;
    const target = isUrl(q)
      ? (/^https?:\/\//i.test(q) ? q : 'https://' + q)
      : getSearchUrl(q); // uses selected engine; falls back to Google if fn not yet defined
    addRecent(target, q);
    const openIn = getLinkTarget();
    if (openIn === '_blank') window.open(window.PROXY_BASE + target, '_blank');
    else window.location.href = window.PROXY_BASE + target;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { input.value = ''; input.blur(); return; }
    if (e.key !== 'Enter') return;
    e.preventDefault();
    navigate(input.value);
  });

  // Press / to focus (when not already in a text field)
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  // Expose for external callers
  window._searchNavigate = navigate;
})();

(function initNav() {
  const panels  = { games: document.getElementById('panel-games'), apps: document.getElementById('panel-apps'), extra: document.getElementById('panel-extra') };
  const navBtns = { games: document.getElementById('nav-games'),   apps: document.getElementById('nav-apps'),   extra: document.getElementById('nav-extra') };
  const hero    = document.getElementById('main-hero');
  let active    = null;

  Object.entries(navBtns).forEach(([k, btn]) => { if (btn) btn.addEventListener('click', () => toggle(k)); });
  document.querySelectorAll('.icon-card[data-section]').forEach((c) => c.addEventListener('click', () => toggle(c.dataset.section)));
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) homeBtn.addEventListener('click', closeAll);

  function toggle(key) {
    if (active === key) { closeAll(); return; }
    hero.style.display = 'none';
    Object.values(panels).forEach((p) => { if (p) p.hidden = true; });
    Object.values(navBtns).forEach((b) => { if (b) b.classList.remove('active'); });
    if (panels[key]) panels[key].hidden = false;
    if (navBtns[key]) navBtns[key].classList.add('active');
    active = key;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (key === 'games') loadAndRenderGames();
  }

  function closeAll() {
    hero.style.display = '';
    Object.values(panels).forEach((p) => { if (p) p.hidden = true; });
    Object.values(navBtns).forEach((b) => { if (b) b.classList.remove('active'); });
    active = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    // Don't fire if a modal is open
    const anyModal = ['update-overlay','settings-overlay','shortcuts-overlay']
      .some((id) => !document.getElementById(id)?.classList.contains('hidden'));
    if (anyModal) return;

    const k = e.key.toUpperCase();
    if (k === 'G') toggle('games');
    else if (k === 'A') toggle('apps');
    else if (k === 'E') toggle('extra');
    else if (k === 'H') closeAll();
    else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      window._openShortcuts?.();
    }
    else if (e.key === 'Escape' && active) closeAll();
    else if (e.key === 'Escape') {
      // Close topmost open modal
      const anyPanelOpen = Object.values(panels).some((p) => p && !p.hidden);
      if (!anyPanelOpen) {
        ['shortcuts-overlay', 'settings-overlay', 'update-overlay'].forEach((id) => {
          const el = document.getElementById(id);
          if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
        });
      }
    }
  });

  window._toggleNav = toggle;
  window._closeNav  = closeAll;
})();

(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 300), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

const ANIM_KEY = 'cowboysstuff_anim';

let animEnabled = localStorage.getItem(ANIM_KEY) !== 'off';

function setAnimations(on, isAuto = false) {
  animEnabled = on;
  localStorage.setItem(ANIM_KEY, on ? 'on' : 'off');
  document.documentElement.classList.toggle('no-anim', !on);

  // Update the toggle button in settings
  const toggle = document.getElementById('anim-toggle');
  const note   = document.getElementById('anim-note');
  if (toggle) toggle.classList.toggle('on', on);
  if (note)   note.textContent = on ? 'on' : (isAuto ? 'auto-disabled (low fps)' : 'off');

  if (on) {
    particles.start();
    startFPSMonitor();
  } else {
    particles.stop();
    // Don't restart FPS monitor if off
  }
}

const particles = (() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return { start() {}, stop() {} };

  const ctx = canvas.getContext('2d');
  let   raf  = null;

  // Particle pool
  const COUNT = 55;
  const pool  = [];

  function randomParticle(forceFullReset) {
    const w = canvas.width;
    const h = canvas.height;
    return {
      x:     Math.random() * w,
      y:     forceFullReset ? Math.random() * h : h + 5,
      r:     Math.random() * 1.4 + 0.3,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -(Math.random() * 0.35 + 0.08),
      alpha: Math.random() * 0.45 + 0.08,
      twinkle: Math.random() * Math.PI * 2, // phase offset
    };
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    pool.length = 0;
    for (let i = 0; i < COUNT; i++) pool.push(randomParticle(true));
  }

  let t = 0;

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.018;

    for (const p of pool) {
      p.x += p.vx;
      p.y += p.vy;

      // Twinkle: vary alpha slightly over time
      const a = p.alpha * (0.7 + 0.3 * Math.sin(t + p.twinkle));

      // Reset when particle floats off top
      if (p.y < -6) {
        const np = randomParticle(false);
        p.x = np.x; p.y = np.y; p.r = np.r;
        p.vx = np.vx; p.vy = np.vy; p.alpha = np.alpha;
        p.twinkle = np.twinkle;
        continue;
      }
      // Wrap horizontally
      if (p.x < -4) p.x = canvas.width + 4;
      if (p.x > canvas.width + 4) p.x = -4;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.fill();
    }

    raf = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    if (raf) resize(); // only resize if running
  }, { passive: true });

  return {
    start() {
      if (raf) return;
      if (pool.length === 0) init();
      else resize();
      tick();
    },
    stop() {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    },
  };
})();

// Counts actual rAF callbacks per second.
// If FPS < 30 for 3 consecutive seconds → auto-disable animations.
let _fpsFrames   = 0;
let _fpsLast     = performance.now();
let _fpsLow      = 0; // consecutive low-FPS seconds
let _fpsRunning  = false;

function startFPSMonitor() {
  if (_fpsRunning) return;
  _fpsRunning  = true;
  _fpsFrames   = 0;
  _fpsLast     = performance.now();
  _fpsLow      = 0;
  _fpsStep();
}

function _fpsStep() {
  if (!animEnabled) { _fpsRunning = false; return; } // stop when anims off
  _fpsFrames++;
  const now = performance.now();
  if (now - _fpsLast >= 1000) {
    const fps = _fpsFrames;
    _fpsFrames = 0;
    _fpsLast   = now;
    if (fps < 30) {
      _fpsLow++;
      if (_fpsLow >= 3) {
        // 3 consecutive seconds under 30fps → auto-disable
        _fpsRunning = false;
        setAnimations(false, true);
        toast('animations auto-disabled — low frame rate', 3000);
        return;
      }
    } else {
      _fpsLow = 0; // reset streak on good frame
    }
  }
  requestAnimationFrame(_fpsStep);
}

(function initAnimToggle() {
  const toggle = document.getElementById('anim-toggle');
  const note   = document.getElementById('anim-note');
  if (!toggle) return;

  // Sync initial state
  toggle.classList.toggle('on', animEnabled);
  if (note) note.textContent = animEnabled ? 'on' : 'off';

  toggle.addEventListener('click', () => {
    setAnimations(!animEnabled);
    toast(animEnabled ? 'animations on' : 'animations off');
  });
})();

// Hook into the MutationObserver on games-list to add --gi index
(function initGameStagger() {
  const list = document.getElementById('games-list');
  if (!list) return;
  const obs = new MutationObserver(() => {
    list.querySelectorAll('.game-link').forEach((el, i) => {
      if (!el.style.getPropertyValue('--gi')) {
        el.style.setProperty('--gi', Math.min(i, 25));
      }
    });
  });
  obs.observe(list, { childList: true });
})();

if (animEnabled) {
  // Wait for DOM to be ready before starting canvas
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      particles.start();
      startFPSMonitor();
    });
  } else {
    particles.start();
    startFPSMonitor();
  }
}

const SEARCH_ENGINE_KEY = 'cowboysstuff_search_engine';
const LINK_TARGET_KEY   = 'cowboysstuff_link_target';

const SEARCH_ENGINES = {
  google: (q) => 'https://www.google.com/search?q=' + encodeURIComponent(q),
  ddg:    (q) => 'https://duckduckgo.com/?q=' + encodeURIComponent(q),
  bing:   (q) => 'https://www.bing.com/search?q=' + encodeURIComponent(q),
  brave:  (q) => 'https://search.brave.com/search?q=' + encodeURIComponent(q),
};

function getSearchUrl(query) {
  const engine = localStorage.getItem(SEARCH_ENGINE_KEY) || 'google';
  return (SEARCH_ENGINES[engine] || SEARCH_ENGINES.google)(query);
}

function getLinkTarget() {
  return localStorage.getItem(LINK_TARGET_KEY) || '_self';
}

(function initQolSettings() {
  // Search engine selector
  const engSel = document.getElementById('search-engine-select');
  if (engSel) {
    engSel.value = localStorage.getItem(SEARCH_ENGINE_KEY) || 'google';
    engSel.addEventListener('change', () => {
      localStorage.setItem(SEARCH_ENGINE_KEY, engSel.value);
      toast('search engine: ' + engSel.options[engSel.selectedIndex].text.toLowerCase());
    });
  }

  // Link target selector
  const tgtSel = document.getElementById('link-target-select');
  if (tgtSel) {
    tgtSel.value = getLinkTarget();
    tgtSel.addEventListener('change', () => {
      localStorage.setItem(LINK_TARGET_KEY, tgtSel.value);
      toast('links open in ' + tgtSel.options[tgtSel.selectedIndex].text.toLowerCase());
    });
  }

  // Cache clear + stats
  const clearCacheBtn = document.getElementById('clear-cache-btn');
  const cacheStatsEl  = document.getElementById('cache-stats');

  async function fetchCacheStats() {
    try {
      const r = await fetch('/admin/cache');
      if (!r.ok) return;
      const d = await r.json();
      if (cacheStatsEl) {
        const kb = (d.bytes / 1024).toFixed(0);
        cacheStatsEl.textContent = d.items + ' items · ' + kb + ' KB';
      }
    } catch {}
  }

  if (clearCacheBtn) {
    clearCacheBtn.addEventListener('click', async () => {
      try {
        const r = await fetch('/admin/cache', { method: 'DELETE' });
        if (!r.ok) { toast('cache clear failed'); return; }
        const d = await r.json();
        toast('cleared ' + d.cleared + ' cached item' + (d.cleared === 1 ? '' : 's'));
        fetchCacheStats();
      } catch { toast('cache clear failed'); }
    });
  }

  // Load stats whenever settings opens
  const settingsOverlay = document.getElementById('settings-overlay');
  if (settingsOverlay) {
    new MutationObserver(() => {
      if (!settingsOverlay.classList.contains('hidden')) fetchCacheStats();
    }).observe(settingsOverlay, { attributes: true, attributeFilter: ['class'] });
  }
})();

(function applyLinkTarget() {
  function setTargets() {
    const t = getLinkTarget();
    document.querySelectorAll('.panel-link:not(.game-link), .recent-chip').forEach((a) => {
      a.target = t;
    });
  }

  setTargets();

  // Also apply to dynamically-rendered game links when panels open
  document.querySelectorAll('.section-panel').forEach((panel) => {
    new MutationObserver(setTargets).observe(panel, { childList: true, subtree: true, attributes: false });
  });

  // Re-apply when setting changes
  const sel = document.getElementById('link-target-select');
  if (sel) sel.addEventListener('change', setTargets);
})();

(function initCardTilt() {
  function applyTilt(card) {
    card.addEventListener('mousemove', (e) => {
      if (document.documentElement.classList.contains('no-anim')) return;
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2); // -1 to 1
      const dy  = (e.clientY - cy) / (r.height / 2);
      const tiltX = -(dy * 12); // degrees
      const tiltY =  (dx * 12);
      card.style.transform = `perspective(400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg)';
    });
  }

  document.querySelectorAll('.icon-card, a.app-card').forEach(applyTilt);
})();

(function initRipple() {
  function addRipple(e) {
    if (document.documentElement.classList.contains('no-anim')) return;
    const el  = e.currentTarget;
    const r   = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const dot  = document.createElement('span');
    dot.className  = 'ripple-dot';
    dot.style.cssText = `
      width: ${size}px; height: ${size}px;
      left:  ${e.clientX - r.left  - size / 2}px;
      top:   ${e.clientY - r.top   - size / 2}px;
    `;
    el.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  }

  // Apply to icon cards, app card faces, and nav icon buttons
  document.querySelectorAll('.icon-card, .nav-icon-btn, .filter-tab').forEach((el) => {
    el.classList.add('ripple-host');
    el.addEventListener('click', addRipple);
  });
  // For app cards, ripple goes on the icon face (not the anchor itself)
  document.querySelectorAll('a.app-card .icon-face').forEach((el) => {
    el.classList.add('ripple-host');
    el.addEventListener('click', addRipple);
  });
})();

(function initBadgeFlash() {
  document.addEventListener('click', (e) => {
    if (document.documentElement.classList.contains('no-anim')) return;
    const link = e.target.closest('.game-link[data-game]');
    if (!link) return;
    const badge = document.getElementById('plays-' + link.dataset.game);
    if (!badge) return;
    badge.classList.remove('bumped');
    // Force reflow to restart animation
    void badge.offsetWidth;
    badge.classList.add('bumped');
    badge.addEventListener('animationend', () => badge.classList.remove('bumped'), { once: true });
  });
})();

(function initNavAnimToggle() {
  const btn  = document.getElementById('nav-anim-toggle');
  const icon = document.getElementById('nav-anim-icon');
  if (!btn) return;

  function syncIcon() {
    if (animEnabled) {
      btn.classList.add('nav-anim-on');
      btn.classList.remove('nav-anim-off');
      btn.title = 'Animations on — click to disable';
      if (icon) {
        // Play icon (animations on)
        icon.innerHTML = '<path d="M5 3l14 9-14 9V3z"/>';
      }
    } else {
      btn.classList.remove('nav-anim-on');
      btn.classList.add('nav-anim-off');
      btn.title = 'Animations off — click to enable';
      if (icon) {
        // Pause icon (animations off)
        icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
      }
    }
  }

  syncIcon();

  btn.addEventListener('click', () => {
    setAnimations(!animEnabled);
    syncIcon();
    toast(animEnabled ? 'animations on' : 'animations off');
  });

  // Also sync when setAnimations is called from elsewhere (settings toggle, auto-disable)
  const _orig = setAnimations;
  window._syncNavAnimIcon = syncIcon;
})();

(function initPanelLinkStagger() {
  function staggerPanel(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const observer = new MutationObserver(() => {
      if (!panel.hidden) {
        panel.querySelectorAll('.panel-link').forEach((link, i) => {
          link.style.setProperty('--li', i);
        });
      }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['hidden'] });
  }
  ['panel-apps', 'panel-extra', 'panel-games'].forEach(staggerPanel);
})();

(function initPageLeave() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    // Only trigger for proxy links (not internal navigation)
    if ((href.startsWith(window.PROXY_BASE) || href.startsWith('/watch') || href.startsWith('/game')) &&
        !e.ctrlKey && !e.metaKey && !e.shiftKey && link.target !== '_blank') {
      if (animEnabled) document.body.classList.add('leaving');
    }
  });
})();

(function patchSetAnimations() {
  const origSet = setAnimations;
  // Wrap to also sync nav icon
  window.setAnimations = function(on, isAuto) {
    origSet(on, isAuto);
    window._syncNavAnimIcon?.();
  };
})();

(function initGoldBurst() {
  document.addEventListener('click', (e) => {
    if (!animEnabled) return;
    const link = e.target.closest('.game-link[data-game], a.app-card');
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      const angle  = (i / 8) * Math.PI * 2;
      const dist   = 28 + Math.random() * 20;
      const size   = 3 + Math.random() * 3;
      dot.style.cssText = `
        position:fixed;left:${cx}px;top:${cy}px;
        width:${size}px;height:${size}px;
        border-radius:50%;background:#d4a017;
        pointer-events:none;z-index:9000;
        transition:transform 0.45s ease-out,opacity 0.45s ease-out;
        transform:translate(-50%,-50%);opacity:0.9;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px))`;
        dot.style.opacity   = '0';
      });
      setTimeout(() => dot.remove(), 500);
    }
  });
})();

const FAV_KEY         = 'cowboysstuff_game_favs';
const PTIME_PREFIX    = 'cowboysstuff_ptime_';
const SNAP_KEY        = 'cowboysstuff_game_snap';
const FS_DEFAULT_KEY  = 'cowboysstuff_fs_default';
const MULTIPLAYER_IDS = new Set([
  /* gn-math known multiplayer game IDs — extend as needed */
  'gnmath-66','gnmath-67','gnmath-68',
]);

function getFavs()   { try{return new Set(JSON.parse(localStorage.getItem(FAV_KEY)||'[]'));}catch{return new Set();} }
function saveFavs(s) { localStorage.setItem(FAV_KEY, JSON.stringify([...s])); }
function isFav(id)   { return getFavs().has(id); }
function toggleFav(id) {
  const f = getFavs();
  if (f.has(id)) f.delete(id); else f.add(id);
  saveFavs(f);
  return f.has(id);
}

function getPtime(id) { return parseInt(localStorage.getItem(PTIME_PREFIX + id) || '0', 10); }
function addPtime(id, secs) { localStorage.setItem(PTIME_PREFIX + id, getPtime(id) + Math.round(secs)); }

let _ptimeGameId = null;
let _ptimeStart  = null;
function startPlaytimeTracking(id) {
  if (_ptimeStart && _ptimeGameId) addPtime(_ptimeGameId, (Date.now()-_ptimeStart)/1000);
  _ptimeGameId = id;
  _ptimeStart  = Date.now();
}
window.addEventListener('beforeunload', () => {
  if (_ptimeStart && _ptimeGameId) addPtime(_ptimeGameId, (Date.now()-_ptimeStart)/1000);
});

function checkNewGames(allIds) {
  const badge = document.getElementById('new-games-badge');
  if (!badge) return;
  const prev = new Set(JSON.parse(localStorage.getItem(SNAP_KEY) || '[]'));
  const newCount = allIds.filter(id => !prev.has(id)).length;
  if (prev.size === 0) {
    // First load — snapshot and hide badge (no "everything is new" spam)
    localStorage.setItem(SNAP_KEY, JSON.stringify(allIds));
    badge.hidden = true;
    return;
  }
  if (newCount > 0) {
    badge.hidden = false;
    badge.textContent = '+' + newCount + ' new';
    badge.title = newCount + ' new games since your last visit';
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', () => {
      localStorage.setItem(SNAP_KEY, JSON.stringify(allIds));
      badge.hidden = true;
    }, { once: true });
  } else {
    badge.hidden = true;
  }
}

function showFeaturedGame(allGames) {
  if (!allGames.length) return;
  const wrap = document.getElementById('featured-wrap');
  const nameEl = document.getElementById('featured-name');
  const playBtn = document.getElementById('featured-play');
  if (!wrap || !nameEl) return;

  // Seed with today's date so it changes daily but is deterministic
  const today = new Date();
  const seed  = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
  // Simple LCG
  let s = seed;
  for (let i = 0; i < 7; i++) s = (s * 1664525 + 1013904223) & 0xffffffff;
  const idx  = Math.abs(s) % allGames.length;
  const game = allGames[idx];

  nameEl.textContent = game.name;
  wrap.hidden = false;

  playBtn.addEventListener('click', () => openGameInfo(game));
}

function fuzzyMatch(query, str) {
  if (!query) return true;
  const q = query.toLowerCase();
  const s = str.toLowerCase();
  // Exact substring first
  if (s.includes(q)) return true;
  // Fuzzy: all query chars appear in order in str
  let si = 0;
  for (let qi = 0; qi < q.length; qi++) {
    si = s.indexOf(q[qi], si);
    if (si === -1) return false;
    si++;
  }
  return true;
}

function sortGameLinks(links, mode) {
  const arr = Array.from(links);
  if (mode === 'plays') {
    arr.sort((a, b) => getCount(b.dataset.game) - getCount(a.dataset.game));
  } else if (mode === 'az') {
    arr.sort((a, b) => (a.querySelector('.game-name')?.textContent||'').localeCompare(b.querySelector('.game-name')?.textContent||''));
  } else if (mode === 'za') {
    arr.sort((a, b) => (b.querySelector('.game-name')?.textContent||'').localeCompare(a.querySelector('.game-name')?.textContent||''));
  } else {
    return; // default order
  }
  const list = document.getElementById('games-list');
  if (!list) return;
  arr.forEach(el => list.appendChild(el));
}

let _pendingGame = null;

function openGameInfo(game) {
  _pendingGame = game;
  const overlay = document.getElementById('game-info-overlay');
  if (!overlay) { playGame(game); return; }

  const id = game.gameId || game.id || '';
  document.getElementById('gi-title').textContent = game.name;
  document.getElementById('gi-source').textContent = game.source || game.cat || 'game';
  document.getElementById('gi-plays').textContent  = (getCount(id) || 0) + ' plays';
  document.getElementById('gi-ptime').textContent  = Math.round(getPtime(id) / 60) + 'm played';

  const mpEl = document.getElementById('gi-mp');
  if (mpEl) mpEl.hidden = !MULTIPLAYER_IDS.has(id);

  const favBtn = document.getElementById('gi-fav');
  if (favBtn) {
    favBtn.textContent = isFav(id) ? '♥' : '♡';
    favBtn.className   = 'gi-fav' + (isFav(id) ? ' on' : '');
    favBtn.onclick = () => {
      const nowFav = toggleFav(id);
      favBtn.textContent = nowFav ? '♥' : '♡';
      favBtn.className   = 'gi-fav' + (nowFav ? ' on' : '');
      refreshGameFavBtns();
    };
  }

  overlay.classList.remove('hidden');
}

function playGame(game) {
  const id   = game.gameId || game.id || '';
  const href = game.href || `/game?url=${encodeURIComponent(game.rawUrl||game.url||'')}&name=${encodeURIComponent(game.name)}`;

  startPlaytimeTracking(id);

  const fsDefault = localStorage.getItem(FS_DEFAULT_KEY) === 'on';
  const finalHref = fsDefault ? href + '&fs=1' : href;

  const linkTarget = getLinkTarget ? getLinkTarget() : '_self';
  if (linkTarget === '_blank') window.open(finalHref, '_blank');
  else window.location.href = finalHref;
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('game-info-overlay');
  if (!overlay) return;

  document.getElementById('gi-play-btn')?.addEventListener('click', () => {
    overlay.classList.add('hidden');
    if (_pendingGame) playGame(_pendingGame);
  });

  document.getElementById('gi-close')?.addEventListener('click', () => {
    overlay.classList.add('hidden');
    _pendingGame = null;
  });

  document.getElementById('gi-share-btn')?.addEventListener('click', () => {
    if (!_pendingGame) return;
    const id   = _pendingGame.gameId || _pendingGame.id || '';
    const href = `/game?url=${encodeURIComponent(_pendingGame.rawUrl||_pendingGame.url||'')}&name=${encodeURIComponent(_pendingGame.name)}`;
    const url  = location.origin + href;
    navigator.clipboard?.writeText(url).then(() => toast('link copied!'));
  });

  document.getElementById('gi-pip-btn')?.addEventListener('click', () => {
    if (!_pendingGame) return;
    overlay.classList.add('hidden');
    openPip(_pendingGame);
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) { overlay.classList.add('hidden'); _pendingGame = null; }
  });
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('.game-link[data-game]');
  if (!link || e.target.closest('.game-fav-btn')) return;
  e.preventDefault(); // stop navigation
  const id   = link.dataset.game;
  const name = link.querySelector('.game-name')?.textContent || id;
  openGameInfo({
    gameId:  id,
    name,
    source:  link.dataset.source,
    rawUrl:  link.dataset.rawUrl,
    href:    link.getAttribute('href'),
  });
}, true); // capture phase

function refreshGameFavBtns() {
  const favs = getFavs();
  document.querySelectorAll('.game-fav-btn[data-id]').forEach(btn => {
    const on = favs.has(btn.dataset.id);
    btn.textContent  = on ? '♥' : '♡';
    btn.className    = 'game-fav-btn' + (on ? ' on' : '');
  });
}

// Patch _makeGameLink to add fav button + open info modal
const _origMakeGameLink = _makeGameLink;
window._makeGameLink = function(href, name, gameId, source) {
  const a = _origMakeGameLink(href, name, gameId, source);

  const favBtn     = document.createElement('button');
  favBtn.className = 'game-fav-btn' + (isFav(gameId) ? ' on' : '');
  favBtn.textContent = isFav(gameId) ? '♥' : '♡';
  favBtn.dataset.id  = gameId;
  favBtn.title       = 'Favourite';
  favBtn.addEventListener('click', ev => {
    ev.preventDefault(); ev.stopPropagation();
    const nowFav = toggleFav(gameId);
    favBtn.textContent = nowFav ? '♥' : '♡';
    favBtn.className   = 'game-fav-btn' + (nowFav ? ' on' : '');
    // Refresh favs tab if active
    const ft = document.querySelector('.filter-tab.active');
    if (ft?.dataset.filter === 'favs') applyGameFilter();
  });
  a.appendChild(favBtn);
  return a;
};

// Re-define to extend existing function
const _origApplyFilter = applyGameFilter;
window.applyGameFilter = function() {
  const q      = (document.getElementById('game-search')?.value || '').toLowerCase().trim();
  const src    = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
  const sort   = document.getElementById('sort-select')?.value || 'default';
  const favs   = getFavs();
  let visible  = 0;
  let total    = 0;

  document.querySelectorAll('#games-list .game-link').forEach((link) => {
    total++;
    const nameEl = link.querySelector('.game-name');
    const name   = nameEl?.textContent || '';
    const matchQ = !q || fuzzyMatch(q, name);
    const matchS = src === 'all'
      ? true
      : src === 'favs'
      ? favs.has(link.dataset.game)
      : link.dataset.source === src;
    link.style.display = (matchQ && matchS) ? '' : 'none';
    if (matchQ && matchS) visible++;
  });

  const countEl = document.getElementById('panel-game-count');
  if (countEl) {
    if (q || src !== 'all') countEl.textContent = visible + ' of ' + total;
    else countEl.textContent = total + ' games';
  }

  const noRes = document.getElementById('games-no-results');
  if (noRes) noRes.hidden = (visible > 0 || (!q && src === 'all'));

  // Apply sort
  const links = document.querySelectorAll('#games-list .game-link:not([style*="none"])');
  sortGameLinks(links, sort);
};

document.getElementById('sort-select')?.addEventListener('change', applyGameFilter);

document.getElementById('surprise-btn')?.addEventListener('click', () => {
  const visible = Array.from(document.querySelectorAll('#games-list .game-link'))
    .filter(el => el.style.display !== 'none');
  if (!visible.length) { toast('load the games list first'); return; }
  const pick = visible[Math.floor(Math.random() * visible.length)];
  const id   = pick.dataset.game;
  const name = pick.querySelector('.game-name')?.textContent || id;
  openGameInfo({ gameId: id, name, source: pick.dataset.source, rawUrl: pick.dataset.rawUrl, href: pick.getAttribute('href') });
});

const _origLoad = loadAndRenderGames;
window.loadAndRenderGames = async function() {
  await _origLoad();
  // After games are rendered, run extras
  const allLinks = Array.from(document.querySelectorAll('#games-list .game-link'));
  const allIds   = allLinks.map(l => l.dataset.game);
  const allGames = allLinks.map(l => ({
    gameId: l.dataset.game,
    name:   l.querySelector('.game-name')?.textContent || '',
    source: l.dataset.source,
    rawUrl: l.dataset.rawUrl,
    href:   l.getAttribute('href'),
  }));

  checkNewGames(allIds);
  showFeaturedGame(allGames);
  refreshGameFavBtns();
};

function openPip(game) {
  const win   = document.getElementById('pip-window');
  const frame = document.getElementById('pip-frame');
  const title = document.getElementById('pip-title');
  if (!win || !frame) return;

  const rawUrl = game.rawUrl || game.url || '';
  const href   = rawUrl
    ? `/game?url=${encodeURIComponent(rawUrl)}&name=${encodeURIComponent(game.name)}`
    : (game.href || '/');

  frame.src         = href;
  title.textContent = game.name;
  win.hidden        = false;

  toast('opened in mini window');
}

document.getElementById('pip-close')?.addEventListener('click', () => {
  const win = document.getElementById('pip-window');
  if (win) { win.hidden = true; document.getElementById('pip-frame').src = ''; }
});

document.getElementById('pip-expand')?.addEventListener('click', () => {
  const frame = document.getElementById('pip-frame');
  if (frame) window.open(frame.src, '_blank');
});

(function initPipDrag() {
  const win = document.getElementById('pip-window');
  const bar = document.getElementById('pip-bar');
  if (!win || !bar) return;
  let dx = 0, dy = 0, startX = 0, startY = 0;
  bar.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON') return;
    startX = e.clientX - win.offsetLeft;
    startY = e.clientY - win.offsetTop;
    const onMove = e2 => {
      win.style.left   = Math.max(0, Math.min(window.innerWidth  - win.offsetWidth,  e2.clientX - startX)) + 'px';
      win.style.top    = Math.max(0, Math.min(window.innerHeight - win.offsetHeight, e2.clientY - startY)) + 'px';
      win.style.bottom = 'auto';
      win.style.right  = 'auto';
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
})();

(function initFsDefault() {
  const toggle = document.getElementById('fs-default-toggle');
  if (!toggle) return;
  const on = localStorage.getItem(FS_DEFAULT_KEY) === 'on';
  toggle.classList.toggle('on', on);
  toggle.addEventListener('click', () => {
    const nowOn = !toggle.classList.contains('on');
    toggle.classList.toggle('on', nowOn);
    localStorage.setItem(FS_DEFAULT_KEY, nowOn ? 'on' : 'off');
    toast(nowOn ? 'games open fullscreen' : 'games open in window');
  });
})();

const COL_KEY = 'cowboysstuff_collections';

function getCollections() {
  try { return JSON.parse(localStorage.getItem(COL_KEY) || '[]'); } catch { return []; }
}
function saveCollections(cols) { localStorage.setItem(COL_KEY, JSON.stringify(cols)); }

function createCollection(name) {
  const cols = getCollections();
  const col  = { id: Date.now().toString(36), name: name.trim(), games: [] };
  cols.push(col);
  saveCollections(cols);
  window.achOnPlaylistCreate?.();
  return col;
}

function deleteCollection(id) {
  const cols = getCollections().filter(c => c.id !== id);
  saveCollections(cols);
}

function addGameToCollection(colId, game) {
  const cols = getCollections();
  const col  = cols.find(c => c.id === colId);
  if (!col) return;
  if (col.games.find(g => g.id === (game.gameId||game.id))) return; // already in
  col.games.push({ id: game.gameId || game.id, name: game.name, rawUrl: game.rawUrl || '', source: game.source || '' });
  saveCollections(cols);

  const totalGames = cols.reduce((sum, c) => sum + c.games.length, 0);
  window.achOnPlaylistTotal?.(totalGames);
}

function removeGameFromCollection(colId, gameId) {
  const cols = getCollections();
  const col  = cols.find(c => c.id === colId);
  if (col) col.games = col.games.filter(g => g.id !== gameId);
  saveCollections(cols);
}

function renderCollectionsPanel() {
  const container = document.getElementById('collections-list');
  const empty     = document.getElementById('collections-empty');
  if (!container) return;

  const cols = getCollections();
  empty.hidden = cols.length > 0;
  container.innerHTML = '';

  cols.forEach(col => {
    const card = document.createElement('div');
    card.className = 'collection-card';

    const header = document.createElement('div');
    header.className = 'collection-header';
    header.innerHTML = `
      <span class="collection-name">${col.name}</span>
      <span class="collection-count">${col.games.length} game${col.games.length !== 1 ? 's' : ''}</span>
      <button class="collection-del" data-id="${col.id}" title="Delete collection">🗑</button>`;

    header.querySelector('.collection-del').addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm('Delete "' + col.name + '"?')) return;
      deleteCollection(col.id);
      renderCollectionsPanel();
    });

    const gameList = document.createElement('div');
    gameList.className = 'collection-games';
    col.games.forEach(g => {
      const chip = document.createElement('div');
      chip.className = 'collection-game-chip';
      chip.innerHTML = `<span>${g.name}</span><button class="collection-rm-btn" title="Remove">✕</button>`;
      chip.querySelector('.collection-rm-btn').addEventListener('click', e => {
        e.stopPropagation();
        removeGameFromCollection(col.id, g.id);
        renderCollectionsPanel();
      });
      chip.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') return;
        openGameInfo({ gameId: g.id, name: g.name, rawUrl: g.rawUrl, source: g.source });
      });
      gameList.appendChild(chip);
    });

    card.appendChild(header);
    card.appendChild(gameList);
    container.appendChild(card);
  });
}

(function initCollections() {
  const overlay = document.getElementById('new-collection-overlay');
  const input   = document.getElementById('new-collection-input');
  const saveBtn = document.getElementById('new-collection-save');
  const cancel  = document.getElementById('new-collection-cancel');
  const newBtn  = document.getElementById('new-collection-btn');
  if (!overlay) return;

  newBtn?.addEventListener('click', () => {
    input.value = '';
    overlay.classList.remove('hidden');
    setTimeout(() => input.focus(), 50);
  });

  saveBtn?.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    createCollection(name);
    overlay.classList.add('hidden');
    renderCollectionsPanel();
    toast('collection created');
  });

  cancel?.addEventListener('click', () => overlay.classList.add('hidden'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('hidden'); });
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') saveBtn?.click(); if (e.key === 'Escape') cancel?.click(); });
})();

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;

  window.achOnLeaderboard?.();

  // Gather all game play data
  const entries = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k?.startsWith(COUNTER_PREFIX)) continue;
    const gameId = k.slice(COUNTER_PREFIX.length);
    const plays  = parseInt(localStorage.getItem(k) || '0', 10);
    const ptime  = getPtime(gameId);
    if (plays === 0) continue;

    // Try to find name from DOM
    const badge = document.getElementById('plays-' + gameId);
    const name  = badge?.closest('.game-link')?.querySelector('.game-name')?.textContent || gameId;

    entries.push({ gameId, name, plays, ptime });
  }

  entries.sort((a, b) => b.plays - a.plays || b.ptime - a.ptime);
  const top10 = entries.slice(0, 10);

  if (top10.length === 0) {
    container.innerHTML = '<div class="lb-empty">nothing yet</div>';
    return;
  }

  const totalPlays  = entries.reduce((s, e) => s + e.plays, 0);
  const totalPtime  = window.getTotalPlaytime ? window.getTotalPlaytime() : 0;
  const fmt = s => s < 60 ? s + 's' : s < 3600 ? Math.floor(s/60) + 'm' : (s/3600).toFixed(1) + 'h';

  container.innerHTML = `
    <div class="ach-header" style="margin-bottom:14px">
      <span class="ach-count">${totalPlays} total plays</span>
      <span class="ach-pct">${fmt(totalPtime)} played</span>
    </div>`;

  top10.forEach((e, i) => {
    const row = document.createElement('div');
    row.className = 'lb-entry';
    row.innerHTML = `
      <span class="lb-rank">${['🥇','🥈','🥉'][i] || (i+1)}</span>
      <span class="lb-name">${e.name}</span>
      <span class="lb-plays">${e.plays}×</span>
      <span class="lb-time">${fmt(e.ptime)}</span>`;
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const link = document.querySelector(`.game-link[data-game="${e.gameId}"]`);
      if (link) openGameInfo({ gameId: e.gameId, name: e.name, rawUrl: link.dataset.rawUrl, source: link.dataset.source });
    });
    container.appendChild(row);
  });
}

let _npInterval = null;
let _npGame     = null;
let _npStart    = null;

function showNowPlaying(game) {
  const bar     = document.getElementById('now-playing');
  const title   = document.getElementById('np-title');
  const timeEl  = document.getElementById('np-time');
  if (!bar) return;

  _npGame  = game;
  _npStart = Date.now();

  title.textContent = game.name;
  bar.hidden = false;

  clearInterval(_npInterval);
  _npInterval = setInterval(() => {
    const s = Math.floor((Date.now() - _npStart) / 1000);
    const m = Math.floor(s / 60), sec = s % 60;
    timeEl.textContent = m + ':' + String(sec).padStart(2, '0');
    // Check playtime achievements
    if (window.achOnPlaytime && window.getTotalPlaytime) {
      window.achOnPlaytime(window.getTotalPlaytime());
    }
  }, 1000);
}

function hideNowPlaying() {
  clearInterval(_npInterval);
  const bar = document.getElementById('now-playing');
  if (bar) bar.hidden = true;
  _npGame = null;
}

document.getElementById('np-resume')?.addEventListener('click', () => {
  if (_npGame) openPip(_npGame);
});
document.getElementById('np-close-btn')?.addEventListener('click', hideNowPlaying);

// Hook into openPip to show now-playing bar
const _origOpenPip = openPip;
window.openPip = function(game) {
  _origOpenPip(game);
  showNowPlaying(game);
};

document.getElementById('pip-close')?.addEventListener('click', hideNowPlaying);

const SEARCH_HIST_KEY  = 'cowboysstuff_search_hist';
const SEARCH_HIST_MAX  = 8;

function getSearchHist() {
  try { return JSON.parse(localStorage.getItem(SEARCH_HIST_KEY) || '[]'); } catch { return []; }
}

function addSearchHist(q) {
  let hist = getSearchHist().filter(s => s !== q);
  hist.unshift(q);
  hist = hist.slice(0, SEARCH_HIST_MAX);
  localStorage.setItem(SEARCH_HIST_KEY, JSON.stringify(hist));
  renderSearchHist();
}

function renderSearchHist() {
  const wrap = document.getElementById('search-history-wrap');
  const list = document.getElementById('search-history-list');
  if (!wrap || !list) return;
  const hist = getSearchHist();
  wrap.hidden = hist.length === 0;
  list.innerHTML = '';
  hist.slice(0, 5).forEach(q => {
    const chip = document.createElement('button');
    chip.className   = 'search-hist-chip';
    chip.textContent = q;
    chip.addEventListener('click', () => {
      const input = document.getElementById('search-input');
      if (input) { input.value = q; input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }
    });
    list.appendChild(chip);
  });
}

document.getElementById('search-history-clear')?.addEventListener('click', () => {
  localStorage.removeItem(SEARCH_HIST_KEY);
  renderSearchHist();
  toast('search history cleared');
});

const _origSearchNav = window._searchNavigate;
window._searchNavigate = function(q) {
  if (q && q.trim()) addSearchHist(q.trim());
  _origSearchNav?.(q);
};

renderSearchHist();

(function initKbNav() {
  document.addEventListener('keydown', (e) => {
    const panel = document.getElementById('panel-games');
    if (!panel || panel.hidden) return;
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;

    // 1-9: open nth visible game
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) {
      const visible = Array.from(document.querySelectorAll('#games-list .game-link'))
        .filter(el => el.style.display !== 'none');
      if (visible[n - 1]) {
        visible[n - 1].focus();
        visible[n - 1].click();
        window.achOnKbNav?.();
      }
    }
  });

  // Tab navigation within games list — make cards focusable
  document.addEventListener('focusin', e => {
    if (e.target.classList.contains('game-link')) {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();

function renderPlayNextSuggestions(currentGame) {
  const wrap = document.getElementById('gi-playnext');
  const list = document.getElementById('gi-playnext-list');
  if (!wrap || !list) return;

  // Find games with same source
  const allLinks = Array.from(document.querySelectorAll('#games-list .game-link'));
  if (allLinks.length < 3) { wrap.hidden = true; return; }

  const sameSource = allLinks.filter(l =>
    l.dataset.source === currentGame.source &&
    l.dataset.game   !== (currentGame.gameId || currentGame.id)
  );

  // Pick 3 random from same source, fall back to random overall
  const pool = sameSource.length >= 3 ? sameSource : allLinks.filter(l => l.dataset.game !== (currentGame.gameId || currentGame.id));
  const picks = pool.sort(() => Math.random() - 0.5).slice(0, 3);

  list.innerHTML = '';
  picks.forEach(link => {
    const name  = link.querySelector('.game-name')?.textContent || '';
    const chip  = document.createElement('button');
    chip.className   = 'gi-suggest-chip';
    chip.textContent = name;
    chip.title       = name;
    chip.addEventListener('click', () => {
      openGameInfo({
        gameId:  link.dataset.game,
        name,
        source:  link.dataset.source,
        rawUrl:  link.dataset.rawUrl,
        href:    link.getAttribute('href'),
      });
    });
    list.appendChild(chip);
  });

  wrap.hidden = picks.length === 0;
}

const _origOpenGameInfo = openGameInfo;
window.openGameInfo = function(game) {
  _origOpenGameInfo(game);
  // Show suggestions after a tick so modal is rendered
  setTimeout(() => renderPlayNextSuggestions(game), 50);
};

(function wireNewPanels() {
  // Extend the nav toggle system to include new panels
  const extraPanels = {
    achievements: document.getElementById('panel-achievements'),
    collections:  document.getElementById('panel-collections'),
    leaderboard:  document.getElementById('panel-leaderboard'),
  };
  const extraBtns = {
    achievements: document.getElementById('nav-achievements'),
    collections:  document.getElementById('nav-collections'),
  };
  const hero = document.getElementById('main-hero');
  let activeExtra = null;

  function openExtra(key) {
    // Close all existing panels (nav + these)
    document.querySelectorAll('.section-panel').forEach(p => { p.hidden = true; });
    document.querySelectorAll('.nav-icon-btn').forEach(b => b.classList.remove('active'));
    hero.style.display = 'none';

    const panel = extraPanels[key];
    if (panel) {
      panel.hidden = false;
      activeExtra = key;

      Object.entries(extraBtns).forEach(([k, btn]) => btn?.classList.toggle('active', k === key));

      if (key === 'achievements') {
        const container = document.getElementById('achievements-container');
        if (container) window.renderAchievementsPanel?.(container);
        const count = document.getElementById('ach-count-label');
        if (count && window.ACHIEVEMENTS) {
          const u = getUnlocked?.() || new Set();
          count.textContent = u.size + ' / ' + window.ACHIEVEMENTS.length;
        }
      }
      if (key === 'collections')  renderCollectionsPanel();
      if (key === 'leaderboard')  renderLeaderboard();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  extraBtns.achievements?.addEventListener('click', () => {
    activeExtra === 'achievements' ? (hero.style.display = '', extraPanels.achievements.hidden = true, extraBtns.achievements.classList.remove('active'), activeExtra = null) : openExtra('achievements');
  });
  extraBtns.collections?.addEventListener('click', () => {
    activeExtra === 'collections' ? (hero.style.display = '', extraPanels.collections.hidden = true, extraBtns.collections.classList.remove('active'), activeExtra = null) : openExtra('collections');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    const anyModal = ['update-overlay','settings-overlay','shortcuts-overlay','game-info-overlay','new-collection-overlay']
      .some(id => !document.getElementById(id)?.classList.contains('hidden'));
    if (anyModal) return;
    if (e.key === 'K' || e.key === 'k') openExtra('achievements');
    if (e.key === 'C' || e.key === 'c') openExtra('collections');
    if (e.key === 'L' || e.key === 'l') openExtra('leaderboard');
  });
})();

(function wireAchievements() {
  // Patch playGame to fire achievement hooks
  const _origPlayGame = playGame;
  window.playGame = function(game) {
    const id     = game.gameId || game.id || '';
    const source = game.source || '';
    window.achOnGamePlay?.(id, source);
    if (window.achOnPlaytime && window.getTotalPlaytime) {
      window.achOnPlaytime(window.getTotalPlaytime());
    }
    _origPlayGame(game);
  };

  // Patch surprise btn
  const _origSurprise = document.getElementById('surprise-btn');
  _origSurprise?.addEventListener('click', () => window.achOnSurprise?.(), true);

  // Patch sort
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    if (e.target.value !== 'default') window.achOnSort?.();
  });

  // Patch share link button
  document.getElementById('gi-share-btn')?.addEventListener('click', () => window.achOnShareLink?.(), true);

  // Patch pip
  const _pipBtn = document.getElementById('gi-pip-btn');
  _pipBtn?.addEventListener('click', () => window.achOnPip?.(), true);

  // Patch fav toggle
  const _origToggleFav = toggleFav;
  window.toggleFav = function(id) {
    const result = _origToggleFav(id);
    window.achOnFav?.();
    return result;
  };

  // Patch daily game play button
  document.getElementById('featured-play')?.addEventListener('click', () => window.achOnDailyGame?.(), true);

  // Patch fuzzy search detection
  const _origFuzzy = fuzzyMatch;
  let _fuzzyFired = false;
  window.fuzzyMatch = function(q, str) {
    const r = _origFuzzy(q, str);
    // Fire achievement if matched fuzzily (not exact substring)
    if (r && q && !str.toLowerCase().includes(q.toLowerCase()) && !_fuzzyFired) {
      _fuzzyFired = true;
      window.achOnFuzzySearch?.();
    }
    return r;
  };

  // Patch multiplayer
  const _origOpenGI = window.openGameInfo;
  window.openGameInfo = function(game) {
    _origOpenGI(game);
    if (game.gameId && MULTIPLAYER_IDS?.has(game.gameId)) window.achOnMultiplayer?.();
  };
})();

(function initThemePicker() {
  const container = document.getElementById('theme-picker-container');
  if (!container || !window.renderThemePicker) return;
  window.renderThemePicker(container);
})();

// Re-render theme picker when settings opens
(function patchSettingsForTheme() {
  const overlay = document.getElementById('settings-overlay');
  if (!overlay) return;
  new MutationObserver(() => {
    if (!overlay.classList.contains('hidden')) {
      const c = document.getElementById('theme-picker-container');
      if (c && window.renderThemePicker) window.renderThemePicker(c);
    }
  }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
})();

(function initColPicker() {
  const overlay   = document.getElementById('add-col-overlay');
  const listEl    = document.getElementById('col-picker-list');
  const gameNameEl= document.getElementById('col-picker-game-name');
  const newBtn    = document.getElementById('col-picker-new');
  const cancelBtn = document.getElementById('col-picker-cancel');
  if (!overlay) return;

  let _pickerGame = null;

  window.openCollectionPicker = function(game) {
    _pickerGame = game;
    gameNameEl.textContent = game.name || '';
    renderPickerList();
    overlay.classList.remove('hidden');
  };

  function renderPickerList() {
    const cols = getCollections();
    listEl.innerHTML = '';

    if (cols.length === 0) {
      listEl.innerHTML = '<div class="col-picker-empty">no collections</div>';
      return;
    }

    const gameId = _pickerGame?.gameId || _pickerGame?.id || '';
    cols.forEach(col => {
      const alreadyIn = col.games.some(g => g.id === gameId);
      const item = document.createElement('div');
      item.className = 'col-picker-item' + (alreadyIn ? ' added' : '');

      item.innerHTML = `
        <div class="col-picker-item-check">${alreadyIn ? '✓' : ''}</div>
        <span class="col-picker-item-name">${col.name}</span>
        <span class="col-picker-item-count">${col.games.length} game${col.games.length !== 1 ? 's' : ''}</span>`;

      item.addEventListener('click', () => {
        if (!_pickerGame) return;
        if (alreadyIn) {
          removeGameFromCollection(col.id, gameId);
          toast('removed from ' + col.name);
        } else {
          addGameToCollection(col.id, _pickerGame);
          toast('added to ' + col.name);
        }
        renderPickerList(); // refresh state
      });
      listEl.appendChild(item);
    });
  }

  cancelBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    _pickerGame = null;
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) { overlay.classList.add('hidden'); _pickerGame = null; }
  });

  newBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    const newOverlay = document.getElementById('new-collection-overlay');
    if (newOverlay) {
      newOverlay.classList.remove('hidden');
      document.getElementById('new-collection-input')?.focus();
      // After creating, re-open picker
      const saveBtn = document.getElementById('new-collection-save');
      const once = () => {
        saveBtn.removeEventListener('click', once);
        setTimeout(() => {
          if (_pickerGame) window.openCollectionPicker(_pickerGame);
        }, 50);
      };
      saveBtn.addEventListener('click', once);
    }
  });
})();

// Replace the old prompt()-based add-to-collection button
(function replaceColButton() {
  // Find the existing button and replace its click handler
  const btn = document.getElementById('gi-add-col');
  if (!btn) return;

  // Remove old listener by cloning
  const fresh = btn.cloneNode(true);
  btn.parentNode?.replaceChild(fresh, btn);

  fresh.addEventListener('click', () => {
    if (!_pendingGame) return;
    window.openCollectionPicker(_pendingGame);
  });
})();

(function initCustomGameUrl() {
  const input = document.getElementById('custom-game-url');
  if (!input) return;

  const isUrl = s => /^https?:\/\//i.test(s) || s.includes('.') && !s.includes(' ');

  function playCustomUrl(rawUrl) {
    rawUrl = rawUrl.trim();
    if (!rawUrl) return;

    // Normalise to full URL
    const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl;

    // Validate it looks like a real URL
    try { new URL(url); } catch {
      toast('invalid URL');
      return;
    }

    const name = (() => {
      try {
        const u   = new URL(url);
        const seg = u.pathname.split('/').filter(Boolean);
        const last = seg[seg.length - 1] || '';
        return (last.replace(/\.(html?|swf|php|aspx?)$/i, '').replace(/[-_]/g, ' ').trim() || u.hostname) || 'custom game';
      } catch { return 'custom game'; }
    })();

    // Open via game viewer
    openGameInfo({
      gameId:  'custom-' + btoa(url).slice(0, 12).replace(/[+/=]/g, ''),
      name,
      source:  'custom',
      rawUrl:  url,
      href:    (window.GAME_BASE||'/game') + '?url=' + encodeURIComponent(url) + '&name=' + encodeURIComponent(name),
    });

    input.value = '';
    
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      playCustomUrl(input.value);
    }
    if (e.key === 'Escape') { input.value = ''; input.blur(); }
  });

  // Also show a play button on the right when URL is typed
  input.addEventListener('input', () => {
    input.style.borderBottomColor = input.value.trim() ? 'var(--gold)' : 'rgba(212,160,23,0.2)';
  });
})();

document.getElementById('lb-panel-btn')?.addEventListener('click', () => {
  window._toggleNav?.('leaderboard') ?? (() => {
    // Fallback: use wireNewPanels' openExtra if available
    const extraPanels = { leaderboard: document.getElementById('panel-leaderboard') };
    const hero = document.getElementById('main-hero');
    if (!extraPanels.leaderboard) return;
    document.querySelectorAll('.section-panel').forEach(p => { p.hidden = true; });
    hero.style.display = 'none';
    extraPanels.leaderboard.hidden = false;
    renderLeaderboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })();
  window.achOnLeaderboard?.();
});

const LAST_PLAYED_KEY = 'cowboysstuff_last_played';

function getLastPlayed() {
  try { return JSON.parse(localStorage.getItem(LAST_PLAYED_KEY) || '{}'); }
  catch { return {}; }
}

function setLastPlayed(gameId) {
  const lp = getLastPlayed();
  lp[gameId] = Date.now();
  localStorage.setItem(LAST_PLAYED_KEY, JSON.stringify(lp));
}

// Patch playGame to record last-played timestamp
(function patchPlayGameForLastPlayed() {
  const orig = window.playGame;
  window.playGame = function(game) {
    const id = game.gameId || game.id || '';
    if (id) setLastPlayed(id);
    return orig(game);
  };
})();

// Extend sortGameLinks to handle 'lastplayed'
(function patchSortForLastPlayed() {
  const orig = window.sortGameLinks || sortGameLinks;
  window.sortGameLinks = function(links, mode) {
    if (mode !== 'lastplayed') { return orig(links, mode); }
    const lp   = getLastPlayed();
    const arr  = Array.from(links);
    arr.sort((a, b) => {
      const ta = lp[a.dataset.game] || 0;
      const tb = lp[b.dataset.game] || 0;
      return tb - ta; // most recently played first
    });
    const list = document.getElementById('games-list');
    if (!list) return;
    arr.forEach(el => list.appendChild(el));
  };
})();

const EXPORT_KEYS = [
  'cowboysstuff_last_seen_version',
  'cowboysstuff_anim',
  'cowboysstuff_theme',
  'cowboysstuff_search_engine',
  'cowboysstuff_link_target',
  'cowboysstuff_fs_default',
  'cowboysstuff_game_favs',
  'cowboysstuff_flash_favs',
  'cowboysstuff_retro_favs',
  'cowboysstuff_collections',
  'cowboysstuff_achievements',
  'cowboysstuff_consoles_tried',
  'cowboysstuff_played_ids',
  'cowboysstuff_game_snap',
  'cowboysstuff_recent',
  'cowboysstuff_search_hist',
  'cowboysstuff_daily_streak',
  'cowboysstuff_last_played',
  'cowboysstuff_game_res',
  'cowboysstuff_cloak_title',
  'cowboysstuff_cloak_url',
];

function exportData() {
  const data = { version: 1, exported: new Date().toISOString(), data: {} };

  // Export named keys
  EXPORT_KEYS.forEach(k => {
    const v = localStorage.getItem(k);
    if (v !== null) data.data[k] = v;
  });

  // Export all play counts and playtimes (dynamic keys)
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (k.startsWith('cowboysstuff_plays_') || k.startsWith('cowboysstuff_ptime_'))) {
      data.data[k] = localStorage.getItem(k);
    }
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'cowboysstuff-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('data exported');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.data || typeof parsed.data !== 'object') {
        toast('invalid backup file'); return;
      }
      let count = 0;
      Object.entries(parsed.data).forEach(([k, v]) => {
        if (k.startsWith('cowboysstuff_')) {
          localStorage.setItem(k, v);
          count++;
        }
      });
      toast('imported ' + count + ' settings — reload to apply');
    } catch { toast('bad file'); }
  };
  reader.readAsText(file);
}

(function initDataBackup() {
  const exportBtn  = document.getElementById('export-data-btn');
  const importBtn  = document.getElementById('import-data-btn');
  const importFile = document.getElementById('import-data-file');

  exportBtn?.addEventListener('click', exportData);

  importBtn?.addEventListener('click', () => importFile?.click());

  importFile?.addEventListener('change', () => {
    const file = importFile.files?.[0];
    if (file) { importData(file); importFile.value = ''; }
  });
})();

(function initBeforeUnload() {
  // Only activate when a game panel or proxied page is active
  let armed = false;

  function arm()   { if (!armed) { armed = true;  } }
  function disarm(){ armed = false; }

  // Arm when user opens a game or navigates to a panel
  document.addEventListener('click', e => {
    const link = e.target.closest('.game-link, a.app-card, .panel-link');
    if (link) arm();
  });

  // Arm when games panel opens
  const gamesNav = document.getElementById('nav-games');
  gamesNav?.addEventListener('click', arm);

  // Also arm after any game info modal play
  const origPlayGame = window.playGame;
  window.playGame = function(g) {
    arm();
    return origPlayGame?.(g);
  };

  window.addEventListener('beforeunload', e => {
    if (!armed) return;
    // This triggers the native "Leave site? Changes you made may not be saved." dialog
    e.preventDefault();
    e.returnValue = '';   // Chrome/Edge require setting returnValue
    return '';            // Firefox
  });

  // Disarm when user intentionally clicks home or back
  document.getElementById('nav-logo-btn')?.addEventListener('click', disarm);
  window.addEventListener('popstate', disarm);

  // Expose so PiP close / game close can disarm
  window._disarmBeforeUnload = disarm;
  window._armBeforeUnload    = arm;
})();

const ACH_EXPORT_KEYS = [
  'cowboysstuff_achievements',
  'cowboysstuff_consoles_tried',
  'cowboysstuff_played_ids',
  'cowboysstuff_daily_streak',
];

function exportAchievements() {
  const data = { version: 1, type: 'achievements', exported: new Date().toISOString(), data: {} };
  ACH_EXPORT_KEYS.forEach(k => {
    const v = localStorage.getItem(k);
    if (v !== null) data.data[k] = v;
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'cowboysstuff-achievements-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('achievements exported');
}

function importAchievements(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.data) { toast('invalid file'); return; }
      let count = 0;
      ACH_EXPORT_KEYS.forEach(k => {
        if (parsed.data[k] !== undefined) {
          localStorage.setItem(k, parsed.data[k]);
          count++;
        }
      });
      toast('achievements loaded — reload to apply');
    } catch { toast('bad file'); }
  };
  reader.readAsText(file);
}

(function wireAchExportImport() {
  // Inject export/import buttons into the achievements panel header
  // (runs after DOMContentLoaded so panel exists)
  function inject() {
    const panel = document.getElementById('panel-achievements');
    if (!panel) return;
    const header = panel.querySelector('.panel-header');
    if (!header || header.querySelector('#ach-export-btn')) return;

    const expBtn = document.createElement('button');
    expBtn.id        = 'ach-export-btn';
    expBtn.className = 'panel-action-btn';
    expBtn.title     = 'Export achievements';
    expBtn.textContent = '↓';
    expBtn.addEventListener('click', exportAchievements);

    const impBtn   = document.createElement('button');
    impBtn.id      = 'ach-import-btn';
    impBtn.className = 'panel-action-btn';
    impBtn.title   = 'Import achievements';
    impBtn.textContent = '↑';

    const impFile = document.createElement('input');
    impFile.type   = 'file';
    impFile.accept = '.json';
    impFile.style.cssText = 'display:none';
    impBtn.addEventListener('click', () => impFile.click());
    impFile.addEventListener('change', () => {
      const f = impFile.files?.[0];
      if (f) { importAchievements(f); impFile.value = ''; }
    });

    header.appendChild(expBtn);
    header.appendChild(impBtn);
    header.appendChild(impFile);
  }

  // Try immediately and also when achievements panel is opened
  document.addEventListener('DOMContentLoaded', inject);
  document.getElementById('nav-achievements')?.addEventListener('click', () => setTimeout(inject, 50));
})();

(function initDynamicTitle() {
  const base = document.title || 'cowboysstuff';

  const PANEL_TITLES = {
    'panel-games':        'games',
    'panel-apps':         'apps',
    'panel-extra':        'extra',
    'panel-achievements': 'achievements',
    'panel-collections':  'collections',
    'panel-leaderboard':  'leaderboard',
  };

  function updateTitle() {
    for (const [id, label] of Object.entries(PANEL_TITLES)) {
      const panel = document.getElementById(id);
      if (panel && !panel.hidden) {
        document.title = label + ' · ' + base;
        return;
      }
    }
    document.title = base;
  }

  // Observe all section panels for hidden attribute changes
  Object.keys(PANEL_TITLES).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    new MutationObserver(updateTitle).observe(el, { attributes: true, attributeFilter: ['hidden'] });
  });

  updateTitle();
})();

(function initBossKey() {
  const overlay = document.getElementById('boss-overlay');
  if (!overlay) return;

  let visible = false;

  function show() {
    visible = true;
    overlay.hidden = false;
    // Focus the editable area so it looks used
    setTimeout(() => document.getElementById('boss-cursor-area')?.focus(), 50);
    // Apply cloak title to browser tab
    const cloak = localStorage.getItem('cowboysstuff_cloak_title');
    document.title = cloak || 'Untitled document - Google Docs';
  }

  function hide() {
    visible = false;
    overlay.hidden = true;
    // Restore real tab title
    const base = 'cowboysstuff';
    document.title = base;
    window._syncNavAnimIcon?.();
  }

  document.addEventListener('keydown', e => {
    // Backtick key — ` — toggle boss overlay
    if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Don't trigger while typing in a real input
      if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !visible) return;
      e.preventDefault();
      visible ? hide() : show();
    }
    // Escape also hides if visible
    if (e.key === 'Escape' && visible) { hide(); }
  });

  // Clicking the hint also hides
  document.getElementById('boss-hint')?.addEventListener('click', hide);
})();

const GAME_TABS_KEY = 'cowboysstuff_open_tabs';
let _openTabs = []; // [{ id, name, href, rawUrl, source }]
let _activeTabId = null;

function loadTabs() {
  try { _openTabs = JSON.parse(localStorage.getItem(GAME_TABS_KEY) || '[]'); }
  catch { _openTabs = []; }
}

function saveTabs() {
  localStorage.setItem(GAME_TABS_KEY, JSON.stringify(_openTabs));
}

function addGameTab(game) {
  loadTabs();
  const id = game.gameId || game.id || Date.now().toString(36);
  // Don't duplicate
  if (_openTabs.find(t => t.id === id)) {
    setActiveTab(id);
    return;
  }
  if (_openTabs.length >= 8) _openTabs.shift(); // max 8 tabs
  _openTabs.push({
    id,
    name:    game.name,
    href:    game.href || `/game?url=${encodeURIComponent(game.rawUrl || '')}&name=${encodeURIComponent(game.name)}`,
    rawUrl:  game.rawUrl || '',
    source:  game.source || '',
  });
  _activeTabId = id;
  saveTabs();
  renderGameTabs();
}

function removeGameTab(id) {
  loadTabs();
  _openTabs = _openTabs.filter(t => t.id !== id);
  if (_activeTabId === id) _activeTabId = _openTabs[_openTabs.length - 1]?.id || null;
  saveTabs();
  renderGameTabs();
}

function setActiveTab(id) {
  _activeTabId = id;
  renderGameTabs();
}

function renderGameTabs() {
  const bar  = document.getElementById('game-tabs-bar');
  const list = document.getElementById('game-tabs-list');
  if (!bar || !list) return;

  loadTabs();
  bar.hidden = _openTabs.length === 0;
  list.innerHTML = '';

  _openTabs.forEach(tab => {
    const el = document.createElement('div');
    el.className = 'game-tab' + (tab.id === _activeTabId ? ' active' : '');
    el.title = tab.name;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'game-tab-name';
    nameSpan.textContent = tab.name;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'game-tab-close';
    closeBtn.textContent = '✕';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      removeGameTab(tab.id);
    });

    el.appendChild(nameSpan);
    el.appendChild(closeBtn);
    el.addEventListener('click', () => {
      setActiveTab(tab.id);
      // Open the game
      const linkTarget = typeof getLinkTarget === 'function' ? getLinkTarget() : '_self';
      if (linkTarget === '_blank') window.open(tab.href, '_blank');
      else window.location.href = tab.href;
    });

    list.appendChild(el);
  });
}

document.getElementById('game-tabs-clear')?.addEventListener('click', () => {
  _openTabs = [];
  _activeTabId = null;
  saveTabs();
  renderGameTabs();
});

(function patchPlayGameForTabs() {
  const orig = window.playGame;
  window.playGame = function(game) {
    addGameTab(game);
    return orig?.(game);
  };
})();

loadTabs();
renderGameTabs();

(function initResumeChip() {
  const chip    = document.getElementById('resume-chip');
  const label   = document.getElementById('resume-label');
  const btn     = document.getElementById('resume-btn');
  const dismiss = document.getElementById('resume-dismiss');
  if (!chip || !label || !btn) return;

  const lp    = getLastPlayed ? getLastPlayed() : {};
  const ids   = Object.keys(lp).sort((a, b) => lp[b] - lp[a]);
  if (!ids.length) return;

  const lastId   = ids[0];
  const lastTime = lp[lastId];
  const elapsed  = Date.now() - lastTime;
  // Only show if played within last 7 days
  if (elapsed > 7 * 24 * 60 * 60 * 1000) return;

  // Wait for games to load to get name
  function tryShow() {
    const link = document.querySelector(`.game-link[data-game="${lastId}"]`);
    if (!link) return;
    const name = link.querySelector('.game-name')?.textContent || lastId;
    label.textContent = 'last: ' + name;
    chip.hidden = false;

    btn.addEventListener('click', () => {
      chip.hidden = true;
      openGameInfo({
        gameId:  lastId,
        name,
        source:  link.dataset.source,
        rawUrl:  link.dataset.rawUrl,
        href:    link.getAttribute('href'),
      });
    });
  }

  // Retry after games load
  setTimeout(tryShow, 1200);
  setTimeout(tryShow, 3000);

  dismiss?.addEventListener('click', () => { chip.hidden = true; });
})();

(function initSessionTimer() {
  const el   = document.getElementById('session-timer');
  const time = document.getElementById('session-time');
  if (!el || !time) return;

  el.hidden = false;
  const start = Date.now();

  function fmt(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return h + ':' + String(m % 60).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    return m + ':' + String(s % 60).padStart(2, '0');
  }

  setInterval(() => {
    time.textContent = fmt(Date.now() - start);
    // Fire playtime achievement check every minute
    if ((Date.now() - start) % 60000 < 1000 && window.achOnPlaytime && window.getTotalPlaytime) {
      window.achOnPlaytime(window.getTotalPlaytime());
    }
  }, 1000);
})();

document.addEventListener('keydown', e => {
  if (e.key !== 'm' && e.key !== 'M') return;
  if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
  const anyModal = ['update-overlay','settings-overlay','shortcuts-overlay',
    'game-info-overlay','new-collection-overlay','add-col-overlay']
    .some(id => !document.getElementById(id)?.classList.contains('hidden'));
  if (anyModal) return;

  // Find most-played game from DOM
  const links = Array.from(document.querySelectorAll('#games-list .game-link[data-game]'));
  if (!links.length) { toast('load the games panel first'); return; }

  const best = links.reduce((a, b) => {
    const ca = parseInt(localStorage.getItem('cowboysstuff_plays_' + a.dataset.game) || '0', 10);
    const cb = parseInt(localStorage.getItem('cowboysstuff_plays_' + b.dataset.game) || '0', 10);
    return cb > ca ? b : a;
  });

  const id   = best.dataset.game;
  const name = best.querySelector('.game-name')?.textContent || id;
  if (!id) return;

  openGameInfo({
    gameId:  id,
    name,
    source:  best.dataset.source,
    rawUrl:  best.dataset.rawUrl,
    href:    best.getAttribute('href'),
  });
});

const FONT_SIZE_KEY = 'cowboysstuff_font_size';

(function initFontSize() {
  const slider = document.getElementById('font-size-range');
  const label  = document.getElementById('font-size-val');
  if (!slider) return;

  function applyFontSize(px) {
    document.documentElement.style.setProperty('--base-font-size', px + 'px');
    // Also scale the mono font used everywhere
    document.documentElement.style.fontSize = px + 'px';
    if (label) label.textContent = px + 'px';
    if (slider) slider.value = px;
  }

  // Load saved
  const saved = parseInt(localStorage.getItem(FONT_SIZE_KEY) || '14', 10);
  applyFontSize(saved);

  slider.addEventListener('input', () => {
    const val = parseInt(slider.value, 10);
    applyFontSize(val);
    localStorage.setItem(FONT_SIZE_KEY, String(val));
  });
})();
