const THEME_KEY = 'cowboysstuff_theme';

window.THEMES = {
  'cowboy':   { name: 'Cowboy Gold',   icon: '🤠', gold: '#d4a017', goldDim: '#9a7412', goldGlow: 'rgba(212,160,23,0.18)',  bg: '#080808', surface: '#121212', surface2: '#1a1a1a', border: '#2a2a2a', white: '#f5f5f0', muted: '#666' },
  'neon':     { name: 'Neon Purple',   icon: '💜', gold: '#c084fc', goldDim: '#9333ea', goldGlow: 'rgba(192,132,252,0.18)', bg: '#0a0510', surface: '#130b1f', surface2: '#1c1030', border: '#3b1d6e', white: '#f0e8ff', muted: '#7c5cbf' },
  'ocean':    { name: 'Ocean Blue',    icon: '🌊', gold: '#38bdf8', goldDim: '#0ea5e9', goldGlow: 'rgba(56,189,248,0.18)',  bg: '#050d14', surface: '#0a1929', surface2: '#102235', border: '#1e4060', white: '#e0f0ff', muted: '#4a7fa0' },
  'crimson':  { name: 'Crimson',       icon: '❤️', gold: '#f87171', goldDim: '#ef4444', goldGlow: 'rgba(248,113,113,0.18)', bg: '#0d0505', surface: '#1a0a0a', surface2: '#241010', border: '#4a1818', white: '#fff0f0', muted: '#9a5555' },
  'matrix':   { name: 'Matrix Green',  icon: '💚', gold: '#4ade80', goldDim: '#16a34a', goldGlow: 'rgba(74,222,128,0.18)',  bg: '#020d05', surface: '#061510', surface2: '#0c2018', border: '#14502a', white: '#e0ffe8', muted: '#3a7a50' },
  'midnight':  { name: 'Midnight',       icon: '🌑', gold: '#94a3b8', goldDim: '#64748b', goldGlow: 'rgba(148,163,184,0.14)', bg: '#020204', surface: '#0a0a12', surface2: '#11111c', border: '#1e1e2e', white: '#e2e8f0', muted: '#4a4a6a' },
  'synthwave': { name: 'Synthwave',      icon: '🎹', gold: '#ff6ec7', goldDim: '#cc3399', goldGlow: 'rgba(255,110,199,0.18)', bg: '#0a0015', surface: '#160025', surface2: '#200035', border: '#3d0066', white: '#f0e6ff', muted: '#9966bb' },
  'lava':      { name: 'Lava',           icon: '🌋', gold: '#ff4500', goldDim: '#cc2200', goldGlow: 'rgba(255,69,0,0.20)',    bg: '#0d0000', surface: '#200000', surface2: '#2e0000', border: '#3d0000', white: '#ffe0d0', muted: '#994422' },
  'mint':      { name: 'Mint',           icon: '🌿', gold: '#00e676', goldDim: '#00b050', goldGlow: 'rgba(0,230,118,0.18)',   bg: '#010f08', surface: '#051a0f', surface2: '#082a18', border: '#0a3020', white: '#e0fff2', muted: '#4a9b6f' },
  'sakura':    { name: 'Sakura',         icon: '🌸', gold: '#ff80ab', goldDim: '#d44080', goldGlow: 'rgba(255,128,171,0.18)', bg: '#0f0108', surface: '#1f0518', surface2: '#2d0825', border: '#3d0a30', white: '#ffe4f0', muted: '#996688' },
  'vaporwave': { name: 'Vaporwave',      icon: '📼', gold: '#00d4ff', goldDim: '#0099cc', goldGlow: 'rgba(0,212,255,0.18)',   bg: '#050010', surface: '#0d0020', surface2: '#150030', border: '#2a0055', white: '#e0f8ff', muted: '#6677bb' },
};

/* Seasonal theme (auto mode) */
function getSeasonalTheme() {
  const m = new Date().getMonth(); // 0-11
  if (m === 0  || m === 1)  return 'midnight';  // Jan–Feb: cold midnight
  if (m === 2  || m === 3)  return 'matrix';    // Mar–Apr: spring green
  if (m === 4  || m === 5)  return 'ocean';     // May–Jun: ocean
  if (m === 6  || m === 7)  return 'ocean';     // Jul–Aug: ocean blue
  if (m === 8  || m === 9)  return 'cowboy';    // Sep–Oct: harvest gold
  return 'crimson';                              // Nov–Dec: crimson
}

function applyTheme(themeId) {
  const id = themeId === 'seasonal' ? getSeasonalTheme() : themeId;
  const t  = window.THEMES[id] || window.THEMES['cowboy'];
  const r  = document.documentElement;

  r.style.setProperty('--gold',       t.gold);
  r.style.setProperty('--gold-dim',   t.goldDim);
  r.style.setProperty('--gold-glow',  t.goldGlow);
  r.style.setProperty('--bg',         t.bg);
  r.style.setProperty('--surface',    t.surface);
  r.style.setProperty('--surface-2',  t.surface2);
  r.style.setProperty('--border',     t.border);
  r.style.setProperty('--white',      t.white);
  r.style.setProperty('--muted',      t.muted);

  // Store the active id for display purposes
  r.dataset.theme = themeId;
  localStorage.setItem(THEME_KEY, themeId);

  // Fire achievement hook
  window.achOnThemeChange?.();
}

function getCurrentTheme() {
  return localStorage.getItem(THEME_KEY) || 'cowboy';
}

/* Apply on load immediately */
applyTheme(getCurrentTheme());

/* Build theme picker UI into a container element */
window.renderThemePicker = function(container) {
  container.innerHTML = '';
  const current = getCurrentTheme();

  // Add seasonal option
  const allOptions = [
    { id: 'seasonal', name: 'Seasonal Auto', icon: '🌈' },
    ...Object.entries(window.THEMES).map(([id, t]) => ({ id, name: t.name, icon: t.icon })),
  ];

  allOptions.forEach(({ id, name, icon }) => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn' + (current === id ? ' active' : '');
    btn.dataset.theme = id;
    btn.innerHTML = `<span class="theme-btn-icon">${icon}</span><span class="theme-btn-name">${name}</span>`;
    btn.addEventListener('click', () => {
      applyTheme(id);
      container.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === id));
    });
    container.appendChild(btn);
  });
};

window.applyTheme       = applyTheme;
window.getCurrentTheme  = getCurrentTheme;

console.log('[themes] engine loaded —', Object.keys(window.THEMES).length, 'themes');
