(function(){
  var html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>cowboysstuff</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Rye&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
  <style>
/* ═══════════════════════════════════════════════════════════════════════
   cowboysstuff — stylesheet
   Aesthetic: western pixel + mono + warm gold on deep black
   ═══════════════════════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Rye&family=Share+Tech+Mono&display=swap');

/* ─── CSS Variables ─────────────────────────────────────────────────────── */
:root {
  --bg:          #080808;
  --surface:     #121212;
  --surface-2:   #1a1a1a;
  --border:      #2a2a2a;
  --gold:        #d4a017;
  --gold-dim:    #9a7412;
  --gold-glow:   rgba(212, 160, 23, 0.18);
  --white:       #f5f5f0;
  --muted:       #666;
  --font-display: 'Rye', serif;
  --font-mono:    'Share Tech Mono', 'Courier New', monospace;
  --radius-sm:   10px;
  --radius-md:   16px;
  --radius-lg:   28px;
  --radius-pill: 9999px;
  --transition:  0.18s ease;
}

/* ─── Reset ─────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  background: var(--bg);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

button { cursor: pointer; border: none; background: none; color: inherit; font-family: inherit; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
[hidden] { display: none !important; }

/* ─── App Shell ──────────────────────────────────────────────────────────── */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ═══════════════════ MODAL ═══════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.25s ease;
}

.modal-overlay.hidden {
  display: none;
}

.modal-box {
  background: #ffffff;
  color: #111;
  border-radius: var(--radius-md);
  padding: 40px 36px 32px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  border: 2px solid #22c55e;
  box-shadow: 0 0 0 1px rgba(34, 197, 94, 0.2), 0 24px 64px rgba(0,0,0,0.6);
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

/* green glow border like frogie's arcade */
.modal-box::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: calc(var(--radius-md) + 3px);
  border: 2px solid rgba(34, 197, 94, 0.4);
  pointer-events: none;
}

.modal-welcome {
  font-size: 1.35rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
  font-family: var(--font-mono);
}

.modal-update-label {
  font-size: 1rem;
  color: #444;
  margin-bottom: 22px;
  font-family: var(--font-mono);
}

.modal-version-badge {
  display: inline-block;
  background: #111;
  color: #fff;
  border-radius: var(--radius-sm);
  padding: 6px 18px;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}

.modal-changes {
  background: #f4f4f4;
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  text-align: left;
  margin-bottom: 24px;
}

.modal-changes-label {
  font-weight: 700;
  font-size: 0.9rem;
  color: #111;
  margin-bottom: 10px;
  font-family: var(--font-mono);
}

.modal-changes-list li {
  font-size: 0.88rem;
  color: #333;
  padding: 3px 0;
  font-family: var(--font-mono);
  line-height: 1.5;
}

.modal-changes-list li::before {
  content: '→ ';
  color: #111;
  font-weight: 700;
}

.modal-btn {
  background: #111;
  color: #fff;
  border-radius: var(--radius-md);
  padding: 14px 48px;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  transition: background var(--transition), transform var(--transition);
}

.modal-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

.modal-btn:active {
  transform: translateY(0);
}

/* ═══════════════════ NAVBAR ═══════════════════ */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

/* Kromp logo button */
.nav-logo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 36px;
  border-radius: var(--radius-pill);
  background: #080808; /* same as site bg so mix-blend-mode: screen works on the image */
  border: 1px solid var(--border);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.nav-logo-btn:hover {
  border-color: var(--gold);
  box-shadow: 0 0 12px var(--gold-glow);
}

.kromp-icon { width: 28px; height: 28px; }

/* Nav icon group */
.nav-icons {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 6px 10px;
}

.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  color: var(--muted);
  transition: color var(--transition), background var(--transition);
}

.nav-icon-btn svg { width: 20px; height: 20px; }

.nav-icon-btn:hover {
  color: var(--white);
  background: var(--surface-2);
}

.nav-icon-btn.active {
  color: var(--gold);
}

/* ═══════════════════ HERO ═══════════════════ */
.hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 24px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 680px;
}

/* Site title */
.site-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.4rem);
  color: var(--white);
  letter-spacing: 0.01em;
  text-align: center;
  /* subtle gold text shadow */
  text-shadow:
    0 0 40px rgba(212, 160, 23, 0.15),
    0 2px 0 rgba(0,0,0,0.5);
  animation: fadeSlideDown 0.5s ease both;
}

/* ─── Icon Grid ─────────────────────────────────────────────────────────── */
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  animation: fadeSlideDown 0.55s ease 0.05s both;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  color: var(--white);
  transition: transform var(--transition);
}

.icon-card:hover {
  transform: translateY(-3px);
}

.icon-card:active {
  transform: translateY(0) scale(0.96);
}

.icon-face {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 12px;
  transition: box-shadow var(--transition);
}

.icon-card:hover .icon-face {
  box-shadow: 0 6px 24px rgba(0,0,0,0.5);
}

.icon-face svg { width: 100%; height: 100%; }

.games-face { background: #c4700a; }
.apps-face  { background: #0a69c4; }
.extra-face { background: #0a9440; }

.icon-label {
  font-size: 0.82rem;
  color: var(--muted);
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
  transition: color var(--transition);
}

.icon-card:hover .icon-label {
  color: var(--white);
}

/* ─── Search Bar ────────────────────────────────────────────────────────── */
.search-wrap {
  width: 100%;
  max-width: 520px;
  animation: fadeSlideDown 0.6s ease 0.1s both;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 0 20px;
  height: 50px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar:focus-within {
  border-color: var(--gold-dim);
  box-shadow: 0 0 0 3px var(--gold-glow);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: var(--muted);
  flex-shrink: 0;
}

#search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  caret-color: var(--gold);
}

#search-input::placeholder {
  color: var(--muted);
}

/* ═══════════════════ SECTION PANELS ═══════════════════ */
.section-panel {
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px 32px;
  animation: fadeIn 0.25s ease;
}

.panel-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}

.panel-title {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--gold);
  letter-spacing: 0.06em;
  text-transform: lowercase;
  margin: 0;
}

.total-plays {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  letter-spacing: 0.04em;
}

.panel-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.panel-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 16px;
  font-size: 0.88rem;
  font-family: var(--font-mono);
  color: var(--white);
  transition: border-color var(--transition), color var(--transition), transform var(--transition);
}

.panel-link:hover {
  border-color: var(--gold-dim);
  color: var(--gold);
  transform: translateY(-1px);
}

.game-name {
  pointer-events: none;
}

.game-badge {
  min-width: 22px;
  height: 20px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.72rem;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  pointer-events: none;
  transition: background var(--transition), color var(--transition), border-color var(--transition);
}

.game-link:hover .game-badge {
  background: rgba(212, 160, 23, 0.12);
  color: var(--gold);
  border-color: var(--gold-dim);
}

/* Search filter inside games panel */
.game-search {
  display: block;
  width: 100%;
  max-width: 340px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 8px 16px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--white);
  outline: none;
  caret-color: var(--gold);
  margin-bottom: 14px;
  transition: border-color 0.2s;
}

.game-search::placeholder { color: var(--muted); }
.game-search:focus { border-color: var(--gold-dim); }

/* Loading / error text inside game list */
.loading-text {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--muted);
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  margin: 0 12px;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bottom-tagline {
  font-size: 0.82rem;
  color: var(--muted);
  font-family: var(--font-mono);
}

.footer-page-link {
  font-size: 0.78rem;
  color: var(--muted);
  font-family: var(--font-mono);
  text-decoration: none;
  transition: color var(--transition);
}

.footer-page-link:hover { color: var(--gold); }

.bottom-actions { display: flex; gap: 8px; }

.bottom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  color: var(--muted);
  transition: color var(--transition), background var(--transition);
}

.bottom-btn svg { width: 18px; height: 18px; }

.bottom-btn:hover {
  color: var(--white);
  background: var(--surface-2);
}

/* ═══════════════════ ANIMATIONS ═══════════════════ */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
}

/* ═══════════════════ SCROLLBAR ═══════════════════ */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--gold-dim); }

/* ═══════════════════ RESPONSIVE ═══════════════════ */
@media (max-width: 480px) {
  .navbar { padding: 12px 14px; }
  .hero { padding: 32px 16px 16px; }
  .icon-face { width: 60px; height: 60px; }
  .bottom-bar { margin: 0 6px; }
}

/* ═══════════════════ LOADING SCREEN ═══════════════════ */
#loading-screen {
  position: fixed;
  inset: 0;
  background: #080808;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  /* Belt+suspenders: never block clicks once faded */
}

#loading-screen.fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none !important;
}

/* In no-anim mode, skip the transition entirely so removal is instant */
html.no-anim #loading-screen {
  transition: none !important;
}

.ls-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  user-select: none;
}

/* The hand-drawn loading image — pulse + subtle spin on the dots */
.ls-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #2a2a2a;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ls-spin 0.7s linear infinite;
}
@keyframes ls-spin { to { transform: rotate(360deg); } }


  50%       { opacity: 0.7; transform: scale(0.97); }
}

.ls-msg {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.12em;
  text-transform: lowercase;
  min-height: 1.2em;
  text-align: center;
  animation: ls-msg-fade 0.4s ease;
}

@keyframes ls-msg-fade {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ═══════════════════ QOL: Tooltip ═══════════════════ */
[title]:not(input):not(button[id="search-input"]) {
  position: relative;
}

/* ═══════════════════ QOL: Smooth page fade-in ═══════════════════ */
#app {
  opacity: 0;
  transition: opacity 0.35s ease;
}

#app.visible {
  opacity: 1;
}

/* ═══════════════════ QOL: Scroll to top button ═══════════════════ */
#scroll-top {
  position: fixed;
  bottom: 72px;
  right: 20px;
  width: 36px;
  height: 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition), color var(--transition), border-color var(--transition);
  z-index: 50;
}

#scroll-top.show {
  opacity: 1;
  pointer-events: auto;
}

#scroll-top:hover {
  color: var(--gold);
  border-color: var(--gold-dim);
}

#scroll-top svg { width: 16px; height: 16px; }

/* ═══════════════════ QOL: Source tag on game badges ═══════════════════ */
.game-link[data-source="truffled"] .game-badge::after {
  content: ' t';
  opacity: 0.5;
  font-size: 0.65rem;
}

/* ═══════════════════ QOL: Panel title counter ═══════════════════ */
.panel-count {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  margin-left: auto;
}

/* ═══════════════════ KROMP LOGO ═══════════════════ */
.kromp-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
  mix-blend-mode: screen; /* black areas become transparent on dark bg, white drawing shows */
}

.hero-logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -8px;
}

.hero-logo {
  width: 120px;
  max-width: 40vw;
  object-fit: contain;
  image-rendering: pixelated;
  mix-blend-mode: screen; /* same: black transparent, white visible */
  animation: fadeSlideDown 0.45s ease both;
  opacity: 0.9;
}

/* ═══════════════════ SEARCH HINT ═══════════════════ */
.search-hint {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  text-align: center;
  margin-top: 8px;
  opacity: 0.6;
}

.search-hint kbd {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--white);
}

/* ═══════════════════ RECENT SITES ═══════════════════ */
.recent-wrap {
  width: 100%;
  max-width: 520px;
  animation: fadeSlideDown 0.65s ease 0.12s both;
}

.recent-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  text-transform: lowercase;
}

.recent-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.recent-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  cursor: pointer;
  text-decoration: none;
  transition: border-color var(--transition), color var(--transition);
  max-width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.recent-chip:hover {
  border-color: var(--gold-dim);
  color: var(--white);
}

.recent-chip-del {
  opacity: 0;
  font-size: 0.65rem;
  color: var(--muted);
  cursor: pointer;
  padding: 0 2px;
  flex-shrink: 0;
  transition: opacity var(--transition);
}

.recent-chip:hover .recent-chip-del {
  opacity: 1;
}

/* ═══════════════════ GAME FILTER TABS ═══════════════════ */
.filter-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.filter-tab {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 4px 14px;
  cursor: pointer;
  transition: color var(--transition), border-color var(--transition), background var(--transition);
}

.filter-tab:hover {
  color: var(--white);
  border-color: var(--gold-dim);
}

.filter-tab.active {
  background: var(--surface-2);
  border-color: var(--gold-dim);
  color: var(--gold);
}

/* ═══════════════════ TOAST ═══════════════════ */
.toast {
  position: fixed;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%) translateY(16px);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 8px 18px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--white);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  z-index: 200;
  white-space: nowrap;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ═══════════════════ SETTINGS MODAL ═══════════════════ */
.settings-box {
  text-align: left !important;
  max-width: 420px;
}

.settings-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}

.settings-row:last-of-type { border-bottom: none; }

.settings-label {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: #555;
  min-width: 130px;
}

.settings-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 5px 10px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: #111;
  background: #fafafa;
  outline: none;
  min-width: 0;
}

.settings-input:focus { border-color: #111; }

.settings-kbd {
  background: #111;
  color: #fff;
  border-radius: 4px;
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.settings-note {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #999;
}

.settings-note kbd {
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 1px 5px;
  font-size: 0.7rem;
}

.settings-action-btn {
  background: #111;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 5px 14px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  cursor: pointer;
  transition: background 0.15s;
}
.settings-action-btn:hover { background: #333; }

.settings-footer {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  text-align: center;
}

/* ═══════════════════ SHORTCUTS TABLE ═══════════════════ */
.shortcut-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #333;
  margin-top: 16px;
}

.shortcut-table td {
  padding: 6px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.shortcut-table td:first-child {
  width: 110px;
  white-space: nowrap;
}

.shortcut-table kbd {
  background: #111;
  color: #fff;
  border-radius: 4px;
  padding: 2px 7px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

/* ═══════════════════ RESPONSIVE ═══════════════════ */
@media (max-width: 480px) {
  .hero-logo { width: 90px; }
  .filter-tabs { flex-wrap: wrap; }
  .shortcut-table { font-size: 0.78rem; }
  .settings-label { min-width: 100px; font-size: 0.75rem; }
}

/* ════════════════════════════════════════════════════
   ANIMATIONS
   ════════════════════════════════════════════════════ */

/* ── Particle canvas ───────────────────────────────── */
#particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
}

/* app sits above canvas */
#app { position: relative; z-index: 1; }

/* ── Keyframes ─────────────────────────────────────── */

/* Kromp hero float */
@keyframes hero-float {
  0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
  33%       { transform: translateY(-10px) rotate(0.5deg); }
  66%       { transform: translateY(-6px) rotate(-0.3deg); }
}

/* Title gold shimmer sweep */
@keyframes title-shimmer {
  from { background-position: 200% center; }
  to   { background-position: -200% center; }
}

/* Nav icon subtle pulse when active */
@keyframes nav-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212,160,23,0); }
  50%       { box-shadow: 0 0 12px 2px rgba(212,160,23,0.25); }
}

/* Icon card entrance */
@keyframes card-in {
  from { opacity: 0; transform: translateY(14px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Game link entrance (staggered via --i) */
@keyframes game-in {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Panel slide in */
@keyframes panel-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Search bar breathing glow */
@keyframes search-breathe {
  0%, 100% { box-shadow: 0 0 0 3px rgba(212,160,23,0.12); }
  50%       { box-shadow: 0 0 0 4px rgba(212,160,23,0.22); }
}

/* ── Apply animations (only when .no-anim not set) ─── */

html:not(.no-anim) .hero-logo {
  animation:
    fadeSlideDown 0.45s ease both,
    hero-float    3.8s ease-in-out 0.5s infinite;
}

html:not(.no-anim) .site-title {
  background: linear-gradient(
    90deg,
    var(--white) 0%,
    var(--white) 30%,
    var(--gold)  50%,
    var(--white) 70%,
    var(--white) 100%
  );
  background-size: 250% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none; /* remove text-shadow when clipping */
  animation: title-shimmer 6s linear infinite;
}

html:not(.no-anim) .icon-card {
  animation: card-in 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
}
html:not(.no-anim) .icon-card:nth-child(1) { animation-delay: 0.05s; }
html:not(.no-anim) .icon-card:nth-child(2) { animation-delay: 0.12s; }
html:not(.no-anim) .icon-card:nth-child(3) { animation-delay: 0.19s; }

html:not(.no-anim) .icon-card:hover .icon-face {
  transform: translateY(-5px) scale(1.07);
  box-shadow: 0 16px 40px rgba(0,0,0,0.55), 0 0 24px rgba(212,160,23,0.18);
  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
}

html:not(.no-anim) .nav-icon-btn.active {
  animation: nav-pulse 2s ease-in-out infinite;
}

html:not(.no-anim) .section-panel:not([hidden]) {
  animation: panel-in 0.3s ease both;
}

/* Staggered game link entrance */
html:not(.no-anim) .game-link {
  animation: game-in 0.22s ease both;
  animation-delay: calc(var(--gi, 0) * 18ms);
}

html:not(.no-anim) .search-bar:focus-within {
  animation: search-breathe 2.4s ease-in-out infinite;
}

/* ── Settings toggle ───────────────────────────────── */
.settings-toggle {
  position: relative;
  width: 44px;
  height: 24px;
  background: #ccc;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.2s;
}
.settings-toggle.on { background: #111; }

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  pointer-events: none;
}
.settings-toggle.on .toggle-thumb { transform: translateX(20px); }

/* ── Disable ALL animations ────────────────────────── */
html.no-anim *,
html.no-anim *::before,
html.no-anim *::after {
  animation: none !important;
  transition: color 0.15s, border-color 0.15s !important; /* keep subtle color transitions */
}
html.no-anim #particles { display: none !important; }
/* Restore text color when shimmer is off */
html.no-anim .site-title {
  -webkit-text-fill-color: var(--white) !important;
  background: none !important;
  text-shadow: 0 0 40px rgba(212,160,23,0.15), 0 2px 0 rgba(0,0,0,0.5) !important;
}

/* ════════════════════════════════════════════════════
   MORE ANIMATIONS & COOL STUFF
   ════════════════════════════════════════════════════ */

/* ── 3D card tilt (applied via JS mousemove) ──────── */
html:not(.no-anim) .icon-card {
  transform-style: preserve-3d;
  transform: perspective(400px) rotateX(0deg) rotateY(0deg);
  transition: transform 0.15s ease, filter 0.15s ease;
}

html:not(.no-anim) .icon-face {
  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.2s ease;
}

/* ── Ripple effect ────────────────────────────────── */
.ripple-host { position: relative; overflow: hidden; }

@keyframes ripple-spread {
  from { transform: scale(0); opacity: 0.35; }
  to   { transform: scale(3); opacity: 0; }
}

.ripple-dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(212, 160, 23, 0.45);
  pointer-events: none;
  animation: ripple-spread 0.55s ease-out forwards;
  transform-origin: center;
}

/* ── Panel link hover ─────────────────────────────── */
html:not(.no-anim) .panel-link {
  transition: border-color 0.18s, color 0.18s, transform 0.18s,
              box-shadow 0.18s;
}

html:not(.no-anim) .panel-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

html:not(.no-anim) .panel-link:active {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
}

/* ── Search bar glow pulse on focus ───────────────── */
@keyframes search-glow {
  0%,100% { box-shadow: 0 0 0 3px rgba(212,160,23,0.10); }
  50%     { box-shadow: 0 0 0 5px rgba(212,160,23,0.22); }
}

html:not(.no-anim) .search-bar:focus-within {
  animation: search-glow 2.2s ease-in-out infinite;
}

/* ── Cursor blink in search ───────────────────────── */
html:not(.no-anim) #search-input {
  caret-color: var(--gold);
}

/* ── Nav icon hover lift ──────────────────────────── */
html:not(.no-anim) .nav-icon-btn {
  transition: color 0.15s, background 0.15s, transform 0.15s;
}

html:not(.no-anim) .nav-icon-btn:hover {
  transform: translateY(-1px);
}

/* ── Filter tab click spring ──────────────────────── */
html:not(.no-anim) .filter-tab {
  transition: color 0.15s, border-color 0.15s,
              background 0.15s, transform 0.12s;
}

html:not(.no-anim) .filter-tab:active {
  transform: scale(0.93);
}

/* ── Recent chip hover ────────────────────────────── */
html:not(.no-anim) .recent-chip {
  transition: border-color 0.15s, color 0.15s, transform 0.15s;
}

html:not(.no-anim) .recent-chip:hover {
  transform: translateY(-1px);
}

/* ── Bottom bar slide up ──────────────────────────── */
@keyframes bar-up {
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

html:not(.no-anim) .bottom-bar {
  animation: bar-up 0.5s ease 0.3s both;
}

/* ── Scroll-to-top bounce ─────────────────────────── */
html:not(.no-anim) #scroll-top {
  transition: opacity 0.2s, transform 0.2s, color 0.15s, border-color 0.15s;
}

html:not(.no-anim) #scroll-top:hover {
  transform: translateY(-3px);
}

html:not(.no-anim) #scroll-top:active {
  transform: scale(0.9);
}

/* ── Game badge count-up flash ────────────────────── */
@keyframes badge-flash {
  0%   { background: rgba(212,160,23,0.4); color: #fff; transform: scale(1.3); }
  100% { background: var(--surface-2);     color: var(--muted); transform: scale(1); }
}

html:not(.no-anim) .game-badge.bumped {
  animation: badge-flash 0.45s ease forwards;
}

/* ════════════════════════════════════════════════════
   APP ICON CARDS
   ════════════════════════════════════════════════════ */

.app-grid {
  gap: 10px;
  flex-wrap: wrap;
}

/* App card = anchor, not button */
a.app-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  color: var(--white);
  cursor: pointer;
  transition: transform 0.18s;
}

a.app-card:hover { transform: translateY(-4px); }
a.app-card:active { transform: scale(0.95); }

/* The icon face fills the whole square (no padding) */
a.app-card .icon-face {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  padding: 0;           /* SVG fills the entire face */
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  transition: box-shadow 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
}

a.app-card:hover .icon-face {
  box-shadow: 0 8px 28px rgba(0,0,0,0.55);
  transform: scale(1.06);
}

/* Face colours — SVG handles the bg itself */
.movies-face  { background: #5b2b8a; }
.tiktok-face  { background: #010101; }
.twitch-face  { background: #6441a5; }
.youtube-face { background: #FF0000; }
.discord-face { background: #5865F2; }

a.app-card .icon-label {
  font-size: 0.78rem;
  color: var(--muted);
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  transition: color 0.15s;
}

a.app-card:hover .icon-label { color: var(--white); }

/* Ripple host still applies to app-card */
a.app-card { position: relative; overflow: visible; }
a.app-card .icon-face { overflow: hidden; }

/* @media: wrap to 3 per row on small screens */
@media (max-width: 420px) {
  .app-grid { gap: 8px; }
  a.app-card .icon-face { width: 60px; height: 60px; border-radius: 13px; }
}

/* ════════════════════════════════════════════════════
   NEW ANIMATIONS BATCH 2
   ════════════════════════════════════════════════════ */

/* ── App card staggered entrance ─────────────────── */
@keyframes app-card-in {
  from { opacity: 0; transform: translateY(20px) scale(0.88); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}

html:not(.no-anim) .app-grid a.app-card {
  animation: app-card-in 0.42s cubic-bezier(0.34,1.56,0.64,1) both;
}
html:not(.no-anim) .app-grid a.app-card:nth-child(1) { animation-delay: 0.08s; }
html:not(.no-anim) .app-grid a.app-card:nth-child(2) { animation-delay: 0.14s; }
html:not(.no-anim) .app-grid a.app-card:nth-child(3) { animation-delay: 0.20s; }
html:not(.no-anim) .app-grid a.app-card:nth-child(4) { animation-delay: 0.26s; }
html:not(.no-anim) .app-grid a.app-card:nth-child(5) { animation-delay: 0.32s; }

/* ── App card colored glow on hover ─────────────── */
html:not(.no-anim) .movies-face:hover  { box-shadow: 0 8px 32px rgba(91,43,138,0.6);  }
html:not(.no-anim) .tiktok-face:hover  { box-shadow: 0 8px 32px rgba(105,201,208,0.5); }
html:not(.no-anim) .twitch-face:hover  { box-shadow: 0 8px 32px rgba(100,65,165,0.6); }
html:not(.no-anim) .youtube-face:hover { box-shadow: 0 8px 32px rgba(255,0,0,0.5);    }
html:not(.no-anim) .discord-face:hover { box-shadow: 0 8px 32px rgba(88,101,242,0.6); }

/* ── Panel links slide in when panel opens ──────── */
@keyframes link-slide-in {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

html:not(.no-anim) .section-panel:not([hidden]) .panel-link {
  animation: link-slide-in 0.22s ease both;
  animation-delay: calc(var(--li, 0) * 30ms);
}

/* ── Page-leave flash on proxy navigation ───────── */
@keyframes page-leave {
  from { opacity: 1; }
  to   { opacity: 0; }
}

body.leaving {
  animation: page-leave 0.18s ease forwards;
  pointer-events: none;
}

/* ── Search placeholder shimmer ─────────────────── */
@keyframes placeholder-pulse {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.45; }
}

html:not(.no-anim) #search-input::placeholder {
  animation: placeholder-pulse 2.8s ease-in-out infinite;
}

/* ── Kromp logo sparkle on hover ─────────────────── */
@keyframes logo-spin-pulse {
  0%   { transform: scale(1)    rotate(0deg); }
  30%  { transform: scale(1.12) rotate(-4deg); }
  60%  { transform: scale(1.08) rotate(3deg); }
  100% { transform: scale(1)    rotate(0deg); }
}

html:not(.no-anim) .hero-logo:hover {
  animation: logo-spin-pulse 0.55s ease both !important;
  cursor: pointer;
}

/* ── Nav quick-toggle icon ───────────────────────── */
.nav-anim-on  { color: var(--gold) !important; }
.nav-anim-off { color: var(--muted); opacity: 0.45; }

/* ── Section panel link stagger helper ──────────── */
/* Set --li via JS */

/* ── Particles extra: gold particle keyframes ────── */
/* handled in JS; just the canvas styling */

/* ════════════════════════════════════════════════════
   MAJOR FEATURES — CSS
   ════════════════════════════════════════════════════ */

/* ── Daily Featured Game ─────────────────────────── */
.featured-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #1a1407 0%, #110e02 100%);
  border: 1px solid rgba(212,160,23,0.25);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  max-width: 520px;
  width: 100%;
  animation: fadeSlideDown 0.5s ease both;
}
.featured-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--gold-dim);
  letter-spacing: .1em;
  text-transform: uppercase;
  white-space: nowrap;
}
.featured-name {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.92rem;
  color: var(--white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.featured-play {
  background: var(--gold);
  border: none;
  border-radius: 8px;
  color: #080808;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 6px 14px;
  white-space: nowrap;
  transition: background .15s, transform .15s;
}
.featured-play:hover { background: #e8b520; transform: scale(1.04); }

/* ── New Games Badge ─────────────────────────────── */
.new-badge {
  background: #d4a017;
  color: #080808;
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  font-family: var(--font-mono);
  white-space: nowrap;
}

/* ── Sort + Panel Action Buttons ─────────────────── */
.panel-sort {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 3px 8px;
  cursor: pointer;
  outline: none;
  margin-left: auto;
}
.panel-sort:hover { border-color: var(--gold-dim); }

.panel-action-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  cursor: pointer;
  font-size: 0.9rem;
  height: 26px;
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color .15s, border-color .15s, transform .15s;
}
.panel-action-btn:hover { color: var(--gold); border-color: var(--gold-dim); transform: rotate(30deg); }

/* ── Game Info Modal ─────────────────────────────── */
.game-info-box {
  text-align: left !important;
  max-width: 400px;
  position: relative;
}
.gi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.gi-source {
  font-size: 0.72rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 2px 10px;
  color: var(--muted);
  font-family: var(--font-mono);
}
.gi-fav {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--muted);
  transition: color .15s, transform .15s;
  line-height: 1;
}
.gi-fav.on { color: #e05; }
.gi-fav:hover { transform: scale(1.2); }
.gi-title {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: #111;
  margin-bottom: 10px;
  line-height: 1.3;
}
.gi-stats {
  display: flex;
  gap: 12px;
  font-size: 0.78rem;
  color: #888;
  font-family: var(--font-mono);
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.gi-controls {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 16px;
}
.gi-control-row {
  font-size: 0.78rem;
  color: #555;
  font-family: var(--font-mono);
  padding: 3px 0;
  display: flex;
  gap: 10px;
  align-items: center;
}
.gi-control-row kbd {
  background: #111;
  color: #fff;
  border-radius: 4px;
  padding: 1px 7px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  min-width: 80px;
  text-align: center;
}
.gi-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.gi-pip-btn, .gi-share-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #555;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 8px 12px;
  transition: background .15s, color .15s;
}
.gi-pip-btn:hover, .gi-share-btn:hover { background: #e5e5e5; color: #111; }
.gi-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  font-size: 1rem;
  line-height: 1;
  transition: color .15s;
}
.gi-close:hover { color: #111; }

/* ── Game card favorites button ──────────────────── */
.game-link { position: relative; }
.game-fav-btn {
  position: absolute;
  top: -1px;
  right: 26px; /* sits left of the badge */
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  color: var(--muted);
  opacity: 0;
  transition: opacity .15s, color .15s;
  line-height: 1;
  padding: 0 2px;
  pointer-events: none;
}
.game-link:hover .game-fav-btn {
  opacity: 1;
  pointer-events: auto;
}
.game-fav-btn.on { color: #e05; opacity: 1; pointer-events: auto; }

/* ── Picture-in-Picture window ───────────────────── */
#pip-window {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 340px;
  height: 220px;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.7);
  z-index: 10000;
  resize: both;
}
#pip-bar {
  height: 30px;
  background: #111;
  border-bottom: 1px solid #1e1e1e;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
  cursor: move;
  user-select: none;
  font-family: var(--font-mono);
  font-size: 10px;
  color: #666;
}
#pip-title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#pip-frame { width: 100%; height: calc(100% - 30px); border: none; }
.pip-btn {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  color: #888;
  cursor: pointer;
  font-size: 11px;
  height: 20px;
  padding: 0 6px;
  flex-shrink: 0;
  transition: color .12s, border-color .12s;
}
.pip-btn:hover { color: #d4a017; border-color: #9a7412; }

/* ════════════════════════════════════════════════════
   ACHIEVEMENT SYSTEM
   ════════════════════════════════════════════════════ */

/* ── Notification popup ───────────────────────────── */
@keyframes confetti-fall {
  to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}

.ach-notif {
  position: fixed;
  right: 20px;
  bottom: 24px;
  background: var(--surface);
  border: 1px solid var(--gold-dim);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  max-width: 280px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  transform: translateX(320px);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
}

.ach-notif.show { transform: translateX(0); opacity: 1; }

.ach-notif-icon { font-size: 1.6rem; line-height: 1; flex-shrink: 0; }

.ach-notif-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: .08em;
  margin-bottom: 2px;
}

.ach-notif-name {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--white);
  font-weight: 600;
}

/* ── Panel ────────────────────────────────────────── */
.ach-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.ach-count {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--gold);
  white-space: nowrap;
}

.ach-progress-bar {
  flex: 1;
  height: 6px;
  background: var(--surface-2);
  border-radius: 3px;
  overflow: hidden;
}

.ach-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold-dim), var(--gold));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.ach-pct {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  min-width: 36px;
  text-align: right;
}

.ach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
}

.ach-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 12px;
  text-align: center;
  position: relative;
  opacity: 0.45;
  transition: border-color 0.2s, opacity 0.2s, transform 0.2s;
}

.ach-card.unlocked {
  opacity: 1;
  border-color: var(--gold-dim);
  background: linear-gradient(135deg, var(--surface), rgba(212,160,23,0.06));
}

html:not(.no-anim) .ach-card.unlocked:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.ach-card.secret .ach-card-icon { filter: blur(4px); }

.ach-card-icon { font-size: 1.8rem; margin-bottom: 8px; line-height: 1; }
.ach-card-name { font-family: var(--font-mono); font-size: 0.78rem; color: var(--white); margin-bottom: 4px; font-weight: 600; }
.ach-card-desc { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); line-height: 1.4; }

.ach-card-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--gold);
  color: #080808;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* ════════════════════════════════════════════════════
   THEME PICKER
   ════════════════════════════════════════════════════ */
.theme-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  padding: 5px 10px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #555;
  transition: border-color .14s, background .14s;
}
.theme-btn:hover { background: #eee; border-color: #bbb; }
.theme-btn.active { background: #111; color: #fff; border-color: #111; }
.theme-btn-icon { font-size: 1rem; line-height: 1; }
.theme-btn-name { white-space: nowrap; }

/* ════════════════════════════════════════════════════
   COLLECTIONS
   ════════════════════════════════════════════════════ */
.collection-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: 10px;
  overflow: hidden;
}

.collection-header {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  gap: 10px;
  cursor: pointer;
  transition: background .15s;
}
.collection-header:hover { background: var(--surface-2); }

.collection-name {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--white);
}

.collection-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
}

.collection-del {
  background: none; border: none; cursor: pointer;
  color: var(--muted); font-size: 0.9rem;
  opacity: 0; transition: opacity .15s, color .15s;
}
.collection-header:hover .collection-del { opacity: 1; }
.collection-del:hover { color: #f87171; }

.collection-games {
  padding: 0 14px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.collection-game-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 4px 10px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  cursor: pointer;
  transition: border-color .14s, color .14s;
}
.collection-game-chip:hover { border-color: var(--gold-dim); color: var(--white); }

.collection-rm-btn {
  background: none; border: none; cursor: pointer;
  color: var(--muted); font-size: 0.75rem;
  line-height: 1; padding: 0;
  opacity: 0; transition: opacity .14s;
}
.collection-game-chip:hover .collection-rm-btn { opacity: 1; }

/* Add-to-collection button on game info modal */
.gi-add-col-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #555;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 8px 12px;
  transition: background .15s;
}
.gi-add-col-btn:hover { background: #e5e5e5; }

/* ════════════════════════════════════════════════════
   LEADERBOARD
   ════════════════════════════════════════════════════ */
.lb-entry {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 6px;
  transition: border-color .15s;
}
.lb-entry:hover { border-color: var(--gold-dim); }

.lb-rank {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--muted);
  min-width: 28px;
}
.lb-entry:nth-child(1) .lb-rank { color: #ffd700; }
.lb-entry:nth-child(2) .lb-rank { color: #c0c0c0; }
.lb-entry:nth-child(3) .lb-rank { color: #cd7f32; }

.lb-name {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.lb-plays, .lb-time {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  min-width: 60px;
  text-align: right;
}
.lb-time { color: var(--gold-dim); }

.lb-empty {
  text-align: center;
  padding: 40px 20px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--muted);
}

/* ════════════════════════════════════════════════════
   NOW PLAYING BAR
   ════════════════════════════════════════════════════ */
#now-playing {
  position: fixed;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 1px solid var(--gold-dim);
  border-radius: var(--radius-pill);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 300;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  max-width: 380px;
  animation: fadeIn 0.3s ease;
}

.np-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--gold);
  animation: np-pulse 1.4s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes np-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%     { opacity: 0.5; transform: scale(0.8); }
}

.np-title { flex: 1; color: var(--white); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.np-time  { color: var(--muted); white-space: nowrap; flex-shrink: 0; }
.np-btn {
  background: none; border: 1px solid var(--border);
  border-radius: var(--radius-pill); color: var(--muted);
  cursor: pointer; font-family: inherit; font-size: 0.72rem;
  padding: 3px 10px; transition: color .14s, border-color .14s; flex-shrink: 0;
}
.np-btn:hover { color: var(--gold); border-color: var(--gold-dim); }

/* ════════════════════════════════════════════════════
   SEARCH HISTORY
   ════════════════════════════════════════════════════ */
.search-history-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  max-width: 520px;
  width: 100%;
  padding: 0 4px;
}

.search-history-list {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  flex: 1;
}

.search-hist-chip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 3px 10px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  cursor: pointer;
  transition: border-color .14s, color .14s;
}
.search-hist-chip:hover { border-color: var(--gold-dim); color: var(--white); }

.search-history-clear {
  background: none; border: none; cursor: pointer;
  font-family: var(--font-mono); font-size: 0.68rem;
  color: var(--muted); transition: color .14s;
  flex-shrink: 0;
}
.search-history-clear:hover { color: var(--gold); }

/* ════════════════════════════════════════════════════
   PLAY NEXT / SUGGESTIONS
   ════════════════════════════════════════════════════ */
.gi-playnext {
  border-top: 1px solid #eee;
  padding-top: 14px;
  margin-top: 14px;
}

.gi-playnext-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #999;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: .06em;
}

.gi-playnext-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.gi-suggest-chip {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #555;
  padding: 5px 10px;
  transition: background .14s;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gi-suggest-chip:hover { background: #e0e0e0; color: #111; }

/* ════════════════════════════════════════════════════
   COLLECTION PICKER MODAL
   ════════════════════════════════════════════════════ */

.col-picker-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 280px;
  overflow-y: auto;
}

.col-picker-list::-webkit-scrollbar { width: 4px; }
.col-picker-list::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

.col-picker-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
  transition: background .14s, border-color .14s;
  gap: 10px;
}

.col-picker-item:hover {
  background: #f0f0f0;
  border-color: #ccc;
}

.col-picker-item.added {
  background: #f0fdf4;
  border-color: #86efac;
}

.col-picker-item-name {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #222;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-picker-item-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #aaa;
  flex-shrink: 0;
}

.col-picker-item-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.65rem;
  color: transparent;
  transition: background .14s, border-color .14s, color .14s;
}

.col-picker-item.added .col-picker-item-check {
  background: #22c55e;
  border-color: #22c55e;
  color: white;
}

.col-picker-empty {
  text-align: center;
  padding: 24px 0;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: #aaa;
}

/* ════════════════════════════════════════════════════
   CUSTOM GAME URL INPUT
   ════════════════════════════════════════════════════ */

.custom-game-wrap {
  margin-bottom: 10px;
  background: linear-gradient(135deg, #1a1407 0%, #110e02 100%);
  border: 1px solid rgba(212,160,23,0.2);
  border-radius: var(--radius-md);
  padding: 10px 12px;
}

.custom-game-wrap #custom-game-url {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(212,160,23,0.2);
  border-radius: 0;
  color: var(--white);
  font-size: 0.82rem;
  margin-bottom: 4px;
  padding: 4px 2px;
  width: 100%;
}

.custom-game-wrap #custom-game-url:focus {
  outline: none;
  border-bottom-color: var(--gold);
}

.custom-game-wrap #custom-game-url::placeholder {
  color: var(--muted);
  opacity: 0.7;
}

.custom-game-hint {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--muted);
  opacity: 0.6;
}

/* ════════════════════════════════════════════════════
   BOSS KEY OVERLAY
   ════════════════════════════════════════════════════ */

#boss-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #fff;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#boss-topbar {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 24px;
}

#boss-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

#boss-title-text {
  font-size: 18px;
  color: #3c4043;
  font-weight: 400;
}

#boss-menu {
  display: flex;
  gap: 2px;
}

#boss-menu span {
  font-size: 13px;
  color: #3c4043;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: default;
}

#boss-menu span:hover { background: #f1f3f4; }

#boss-toolbar {
  height: 42px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 4px;
}

.boss-btn {
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 13px;
  color: #3c4043;
  cursor: default;
  border: 1px solid transparent;
}
.boss-btn:hover { background: #e8eaed; }
.boss-bold { font-weight: 700; }
.boss-italic { font-style: italic; }
.boss-underline { text-decoration: underline; }
.boss-sep { width: 1px; height: 24px; background: #dadce0; margin: 0 4px; }

#boss-body {
  flex: 1;
  background: #f8f9fa;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

#boss-page {
  width: 816px;
  min-height: 1056px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  padding: 96px 96px;
}

#boss-cursor-area {
  width: 100%;
  min-height: 800px;
  font-size: 11pt;
  line-height: 1.15;
  color: #000;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
}

#boss-hint {
  position: fixed;
  bottom: 12px;
  right: 16px;
  font-size: 11px;
  color: #bbb;
  background: #f8f9fa;
  padding: 3px 10px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}
#boss-hint kbd {
  font-family: monospace;
  background: #e8eaed;
  padding: 1px 5px;
  border-radius: 3px;
}

/* ════════════════════════════════════════════════════
   MULTI-GAME TAB BAR
   ════════════════════════════════════════════════════ */

#game-tabs-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}

#game-tabs-bar::-webkit-scrollbar { height: 2px; }
#game-tabs-bar::-webkit-scrollbar-thumb { background: var(--border); }

#game-tabs-list {
  display: flex;
  gap: 5px;
  flex: 1;
}

.game-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 4px 10px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  cursor: pointer;
  white-space: nowrap;
  max-width: 160px;
  transition: border-color .14s, color .14s;
  flex-shrink: 0;
}

.game-tab:hover { border-color: var(--gold-dim); color: var(--white); }

.game-tab.active {
  border-color: var(--gold-dim);
  color: var(--white);
  background: var(--surface-2);
}

.game-tab-name {
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.game-tab-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 0.7rem;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
  transition: color .12s;
}
.game-tab-close:hover { color: var(--white); }

#game-tabs-clear {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 4px 8px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color .14s, border-color .14s;
}
#game-tabs-clear:hover { color: var(--white); border-color: var(--gold-dim); }

/* ════════════════════════════════════════════════════
   RESUME CHIP + SESSION TIMER
   ════════════════════════════════════════════════════ */

#resume-row {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  min-height: 0;
  flex-wrap: wrap;
}

#resume-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--gold-dim);
  border-radius: var(--radius-pill);
  padding: 5px 12px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  animation: fadeSlideDown 0.3s ease;
}

#resume-label {
  color: var(--white);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#resume-btn {
  background: var(--gold);
  border: none;
  border-radius: var(--radius-pill);
  color: #080808;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  transition: background .14s;
}
#resume-btn:hover { background: #e8b520; }

#resume-dismiss {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0;
  transition: color .12s;
}
#resume-dismiss:hover { color: var(--white); }

#session-timer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
}

#session-time {
  color: var(--gold);
  font-weight: 600;
}

</style>
  <!-- Apply no-anim immediately to avoid flash of animations for users who disabled them -->
  <script>if(localStorage.getItem('cowboysstuff_anim')==='off')document.documentElement.classList.add('no-anim');</script>
</head>
<body>


  <!-- BOSS KEY OVERLAY — instant fake Google Docs cover -->
  <div id="boss-overlay" hidden aria-hidden="true">
    <div id="boss-topbar">
      <div id="boss-logo">
        <svg width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="4" fill="#4285F4"/><text x="20" y="28" text-anchor="middle" fill="white" font-size="22" font-family="Arial">D</text></svg>
        <span id="boss-title-text">Untitled document</span>
      </div>
      <div id="boss-menu">
        <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span>
      </div>
    </div>
    <div id="boss-toolbar">
      <div class="boss-btn">100%</div>
      <div class="boss-sep"></div>
      <div class="boss-btn">Normal text</div>
      <div class="boss-sep"></div>
      <div class="boss-btn boss-bold">B</div>
      <div class="boss-btn boss-italic">I</div>
      <div class="boss-btn boss-underline">U</div>
    </div>
    <div id="boss-body">
      <div id="boss-page">
        <div id="boss-cursor-area" contenteditable="true" spellcheck="false"></div>
      </div>
    </div>
    <div id="boss-hint">press <kbd>\`</kbd> to return</div>
  </div>
  <!-- PARTICLE CANVAS -->
  <canvas id="particles" aria-hidden="true"></canvas>

  <!-- LOADING SCREEN -->
  <div id="loading-screen" aria-hidden="true">
    <div class="ls-inner">
      <div class="ls-spinner"></div>
      <p class="ls-msg" id="ls-msg">loading...</p>
    </div>
  </div>

  <!-- UPDATE MODAL -->
  <div id="update-overlay" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-box">
      <p class="modal-welcome">welcome / welcome back!</p>
      <p class="modal-update-label">a new update was released!</p>
      <div class="modal-version-badge">cowboysstuff v1.0</div>
      <div class="modal-changes">
        <p class="modal-changes-label">added:</p>
        <ul class="modal-changes-list">
          <li>web proxy with browser controls</li>
          <li>gn-math + truffled games</li>
          <li>recent sites history</li>
          <li>panic button</li>
          <li>tab cloaking</li>
        </ul>
      </div>
      <button id="modal-close" class="modal-btn">ok</button>
    </div>
  </div>

  <!-- SETTINGS MODAL -->
  <div id="settings-overlay" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-box settings-box">
      <p class="modal-welcome">settings</p>

      <div class="settings-row">
        <label class="settings-label">tab cloak title</label>
        <input id="cloak-title" class="settings-input" type="text" placeholder="Google Docs" autocomplete="off" />
      </div>
      <div class="settings-row">
        <label class="settings-label">tab cloak url</label>
        <input id="cloak-url" class="settings-input" type="text" placeholder="https://docs.google.com" autocomplete="off" />
      </div>
      <div class="settings-row">
        <label class="settings-label">panic key</label>
        <kbd class="settings-kbd">Shift + Esc</kbd>
        <span class="settings-note">navigates to cloak url</span>
      </div>
      <div class="settings-row">
        <label class="settings-label">animations</label>
        <button class="settings-toggle" id="anim-toggle" aria-label="Toggle animations">
          <span class="toggle-thumb"></span>
        </button>
        <span class="settings-note" id="anim-note"></span>
      </div>
      <div class="settings-row">
        <label class="settings-label">clear history</label>
        <button id="clear-history-btn" class="settings-action-btn">clear recent sites</button>
      </div>
      <div class="settings-row">
        <label class="settings-label">reset counters</label>
        <button id="reset-counters-btn" class="settings-action-btn">reset play counts</button>
      </div>
      <div class="settings-row">
        <label class="settings-label">font size</label>
        <input id="font-size-range" type="range" min="12" max="18" step="1" value="14" style="flex:1;accent-color:var(--gold)" />
        <span id="font-size-val" style="font-family:var(--font-mono);font-size:.78rem;color:var(--muted);min-width:30px;text-align:right">14px</span>
      </div>
      <div class="settings-row">
        <label class="settings-label">fullscreen by default</label>
        <button class="settings-toggle" id="fs-default-toggle" aria-label="Toggle fullscreen default">
          <span class="toggle-thumb"></span>
        </button>
        <span class="settings-note">games open fullscreen</span>
      </div>
      <div class="settings-row">
        <label class="settings-label">proxy cache</label>
        <button id="clear-cache-btn" class="settings-action-btn">clear cache</button>
        <span class="settings-note" id="cache-stats"></span>
      </div>
      <div class="settings-row">
        <label class="settings-label">search engine</label>
        <select id="search-engine-select" class="settings-input" style="flex:none;width:auto">
          <option value="google">Google</option>
          <option value="ddg">DuckDuckGo</option>
          <option value="bing">Bing</option>
          <option value="brave">Brave</option>
        </select>
      </div>
      <div class="settings-row">
        <label class="settings-label">open links in</label>
        <select id="link-target-select" class="settings-input" style="flex:none;width:auto">
          <option value="_self">same tab</option>
          <option value="_blank">new tab</option>
        </select>
      </div>

      <div class="settings-row" style="flex-direction:column;align-items:flex-start;gap:8px">
        <label class="settings-label">theme</label>
        <div id="theme-picker-container" class="theme-picker"></div>
      </div>
      <div class="settings-row">
        <label class="settings-label">backup data</label>
        <button id="export-data-btn" class="settings-action-btn">export</button>
        <button id="import-data-btn" class="settings-action-btn">import</button>
        <input id="import-data-file" type="file" accept=".json" style="display:none" />
      </div>
      <div class="settings-footer">
        <span class="settings-note">press <kbd>?</kbd> anywhere for keyboard shortcuts</span>
      </div>

      <button id="settings-close" class="modal-btn" style="margin-top:20px">done</button>
    </div>
  </div>

  <!-- KEYBOARD SHORTCUTS MODAL -->
  <div id="shortcuts-overlay" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-box">
      <p class="modal-welcome">keyboard shortcuts</p>
      <table class="shortcut-table">
        <tr><td><kbd>/</kbd></td><td>focus search</td></tr>
        <tr><td><kbd>Esc</kbd></td><td>close panel / modal</td></tr>
        <tr><td><kbd>?</kbd></td><td>show shortcuts</td></tr>
        <tr><td><kbd>Shift+Esc</kbd></td><td>panic — go to cloak url</td></tr>
        <tr><td><kbd>G</kbd></td><td>open games</td></tr>
        <tr><td><kbd>A</kbd></td><td>open apps</td></tr>
        <tr><td><kbd>E</kbd></td><td>open extra</td></tr>
        <tr><td><kbd>H</kbd></td><td>go home</td></tr>
        <tr><td><kbd>N</kbd></td><td>open in new tab (panels)</td></tr>
        <tr><td><kbd>K</kbd></td><td>achievements</td></tr>
        <tr><td><kbd>C</kbd></td><td>collections</td></tr>
        <tr><td><kbd>L</kbd></td><td>leaderboard</td></tr>
        <tr><td><kbd>1-9</kbd></td><td>open Nth game in list</td></tr>
        <tr><td><kbd>Tab</kbd></td><td>cycle through game cards</td></tr>
        <tr><td><kbd>M</kbd></td><td>open most-played game</td></tr>
        <tr><td><kbd>\`</kbd></td><td>boss key (fake google docs)</td></tr>
        <tr><td><kbd>kromp</kbd></td><td>???</td></tr>
      </table>
      <button id="shortcuts-close" class="modal-btn" style="margin-top:20px">ok</button>
    </div>
  </div>

  <!-- MAIN APP -->
  <div id="app">

    <!-- NAV BAR -->
    <nav class="navbar" role="navigation">
      

      <div class="nav-icons">
        <a class="nav-icon-btn" href="https://cw14709201-creator.github.io/cowboysstaarpractice/flash.html" title="Flash games (⚡)" aria-label="Flash">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </a>

        <button class="nav-icon-btn" id="nav-games" title="Games (G)" aria-label="Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="2" y="6" width="20" height="13" rx="4"/>
            <path d="M6 12.5h5M8.5 10v5"/>
            <circle cx="17" cy="12.5" r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="14" cy="12.5" r="1.2" fill="currentColor" stroke="none" opacity=".45"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-apps" title="Apps (A)" aria-label="Apps">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1.5"/>
            <rect x="13" y="3" width="8" height="8" rx="1.5"/>
            <rect x="3" y="13" width="8" height="8" rx="1.5"/>
            <rect x="13" y="13" width="8" height="8" rx="1.5"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-extra" title="Extra (E)" aria-label="Extra">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round">
            <path d="M12 4v16M4 12h16"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-achievements" title="Achievements (K)" aria-label="Achievements">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-collections" title="Collections (C)" aria-label="Collections">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M19 11H5M19 6H5M19 16H5M19 21H5"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-anim-toggle" title="Toggle animations" aria-label="Toggle animations">
          <svg id="nav-anim-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M5 3l14 9-14 9V3z"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="settings-btn" title="Settings" aria-label="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- HERO -->
    <main class="hero" id="main-hero">
      <div class="hero-inner">
        <h1 class="site-title">cowboysstuff</h1>

        <!-- Daily Featured Game -->
        <div id="featured-wrap" hidden>
          <div class="featured-card" id="featured-card">
            <div class="featured-label">today's pick</div>
            <div class="featured-name" id="featured-name"></div>
            <button class="featured-play" id="featured-play">▶ play</button>
          </div>
        </div>

        <!-- Resume chip + session timer -->
        <div id="resume-row">
          <div id="resume-chip" hidden>
            <span id="resume-label"></span>
            <button id="resume-btn">resume</button>
            <button id="resume-dismiss">✕</button>
          </div>
          <div id="session-timer" hidden>
            <span id="session-label">session</span>
            <span id="session-time">0:00</span>
          </div>
        </div>

        <!-- App Icon Grid — direct proxy links -->
        <div class="icon-grid app-grid">

          <!-- Movies / SpenFlix — full-screen proxy -->
          <a class="icon-card app-card" href="https://cw14709201-creator.github.io/cowboysstaarpractice/watch.html" aria-label="Movies">
            <div class="icon-face movies-face">
              <!-- Film/play icon -->
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="10" fill="#5b2b8a"/>
                <polygon points="18,14 36,24 18,34" fill="white"/>
              </svg>
            </div>
            <span class="icon-label">movies</span>
          </a>

          <!-- TikTok -->
          <a class="icon-card app-card" href="#" data-pxy="https://www.tiktok.com/" aria-label="TikTok">
            <div class="icon-face tiktok-face">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="10" fill="#010101"/>
                <!-- TikTok note shape -->
                <path d="M30 10c0 5 4 8 8 8v5c-3 0-6-1-8-3v13c0 6-5 11-11 11s-11-5-11-11 5-11 11-11v5c-3 0-6 3-6 6s3 6 6 6 6-3 6-6V10h5z" fill="white"/>
                <path d="M33 10c0 5 4 8 8 8v5c-3 0-6-1-8-3v13c0 6-5 11-11 11s-11-5-11-11 5-11 11-11v5c-3 0-6 3-6 6s3 6 6 6 6-3 6-6V10h5z" fill="#69C9D0" opacity="0.7"/>
              </svg>
            </div>
            <span class="icon-label">tiktok</span>
          </a>

          <!-- Twitch -->
          <a class="icon-card app-card" href="#" data-pxy="https://www.twitch.tv/" aria-label="Twitch">
            <div class="icon-face twitch-face">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="10" fill="#6441a5"/>
                <!-- Twitch logo mark -->
                <path d="M14 10l-4 4v24h8v6l6-6h5l9-9V10H14zm18 17l-5 5h-5l-4 4v-4h-6V13h20v14z" fill="white"/>
                <rect x="25" y="17" width="3" height="8" rx="1.5" fill="white"/>
                <rect x="32" y="17" width="3" height="8" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span class="icon-label">twitch</span>
          </a>

          <!-- YouTube -->
          <a class="icon-card app-card" href="#" data-pxy="https://www.youtube.com/" aria-label="YouTube">
            <div class="icon-face youtube-face">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="10" fill="#FF0000"/>
                <!-- YT play button -->
                <rect x="8" y="14" width="32" height="20" rx="5" fill="white" opacity="0.15"/>
                <polygon points="19,16 35,24 19,32" fill="white"/>
              </svg>
            </div>
            <span class="icon-label">youtube</span>
          </a>

          <!-- Discord -->
          <a class="icon-card app-card" href="#" data-pxy="https://discord.com/app" aria-label="Discord">
            <div class="icon-face discord-face">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="40" height="40" rx="10" fill="#5865F2"/>
                <!-- Discord mark -->
                <path d="M34 13c-3-1-6-2-9-2s-6 1-9 2c-4 6-5 12-4 18 3 2 6 3 9 4l2-3c-2-1-3-2-5-3l1-1c4 2 8 2 12 0l1 1c-2 1-3 2-5 3l2 3c3-1 6-2 9-4 1-6 0-12-4-18z" fill="white"/>
                <circle cx="19" cy="27" r="3" fill="#5865F2"/>
                <circle cx="29" cy="27" r="3" fill="#5865F2"/>
              </svg>
            </div>
            <span class="icon-label">discord</span>
          </a>

        </div>

        <!-- Search Bar -->
        <div class="search-wrap">
          <div class="search-bar">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.4-4.4"/>
            </svg>
            <input id="search-input" type="text" placeholder="search anything..." autocomplete="off" spellcheck="false" aria-label="Search" list="search-suggestions" />
            <datalist id="search-suggestions"></datalist>
          </div>
          <p class="search-hint">press <kbd>/</kbd> to focus · <kbd>?</kbd> for shortcuts</p>
        </div>
        <!-- Search history chips -->
        <div class="search-history-wrap" id="search-history-wrap" hidden>
          <div class="search-history-list" id="search-history-list"></div>
          <button class="search-history-clear" id="search-history-clear" title="Clear search history">clear</button>
        </div>
        <div style="display:none">
        </div>

        <!-- Recent Sites -->
        <div class="recent-wrap" id="recent-wrap" hidden>
          <p class="recent-label">recent</p>
          <div class="recent-list" id="recent-list"></div>
        </div>

      </div>
    </main>

    <!-- SECTION PANELS -->
    <section class="section-panel" id="panel-games" hidden>
      <div class="panel-header">
        <h2 class="panel-title">games</h2>
        <span class="new-badge" id="new-games-badge" hidden></span>
        <span class="total-plays" id="total-play-count">0 plays</span>
        <span class="panel-count" id="panel-game-count"></span>
        <button class="panel-action-btn" id="surprise-btn" title="Random game">🎲</button>
        <button class="panel-action-btn" id="lb-panel-btn" title="Leaderboard (L)">#</button>
        <select id="sort-select" class="panel-sort" title="Sort games">
          <option value="default">default</option>
          <option value="plays">most played</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="lastplayed">last played</option>
        </select>
      </div>
      <!-- Custom game URL input -->
      <div class="custom-game-wrap" id="custom-game-wrap">
        <input type="text" id="custom-game-url" class="game-search" placeholder="▶ play any game URL — paste a .html or direct link..." autocomplete="off" spellcheck="false" style="border-color:var(--gold-dim)" />
        <div class="custom-game-hint">paste a URL and press enter</div>
      </div>
      <!-- Multi-game tab bar -->
      <div id="game-tabs-bar" hidden>
        <div id="game-tabs-list"></div>
        <button id="game-tabs-clear" title="Close all games">✕ all</button>
      </div>

      <!-- Source / category filter tabs -->
      <div class="filter-tabs" id="game-filter-tabs">
        <button class="filter-tab active" data-filter="all">all</button>
        <button class="filter-tab" data-filter="gn-math">gn-math</button>
        <button class="filter-tab" data-filter="truffled">truffled</button>
        <button class="filter-tab" data-filter="favs" id="favs-tab">♥ favs</button>
      </div>
      <input type="text" id="game-search" class="game-search" placeholder="filter games..." autocomplete="off" />
      <div class="panel-links" id="games-list">
        <span class="loading-text">loading games...</span>
      </div>
      <p id="games-no-results" class="loading-text" hidden>no games match that filter</p>
    </section>

    <section class="section-panel" id="panel-apps" hidden>
      <h2 class="panel-title">apps</h2>
      <div class="panel-links">
        <a class="panel-link" href="#" data-pxy="https://www.youtube.com/">YouTube</a>
        <a class="panel-link" href="#" data-pxy="https://www.tiktok.com/">TikTok</a>
        <a class="panel-link" href="#" data-pxy="https://www.twitch.tv/">Twitch</a>
        <a class="panel-link" href="#" data-pxy="https://discord.com/app">Discord</a>
        <a class="panel-link" href="#" data-pxy="https://www.spotify.com/">Spotify</a>
        <a class="panel-link" href="#" data-pxy="https://www.instagram.com/">Instagram</a>
        <a class="panel-link" href="#" data-pxy="https://x.com/">X / Twitter</a>
        <a class="panel-link" href="#" data-pxy="https://www.reddit.com/">Reddit</a>
        <a class="panel-link" href="#" data-pxy="https://www.roblox.com/">Roblox</a>
        <a class="panel-link" href="#" data-pxy="https://www.netflix.com/">Netflix</a>
        <a class="panel-link" href="#" data-pxy="https://www.chess.com/">Chess.com</a>
        <a class="panel-link" href="#" data-pxy="https://www.soundcloud.com/">SoundCloud</a>
      </div>
    </section>

    <section class="section-panel" id="panel-extra" hidden>
      <h2 class="panel-title">partners</h2>
      <div class="panel-links">
        <p class="loading-text">coming soon</p>
      </div>
    </section>

    <!-- TOAST -->
    <div id="toast" class="toast" aria-live="polite"></div>

    <!-- BOTTOM BAR -->
    <footer class="bottom-bar">
      <div class="bottom-links">
        <span class="bottom-tagline">cowboysstuff</span>
        <a class="footer-page-link" href="https://cw14709201-creator.github.io/cowboysstaarpractice/dmca.html">dmca</a>
        <a class="footer-page-link" href="https://cw14709201-creator.github.io/cowboysstaarpractice/credits.html">credits</a>
      </div>
      <div class="bottom-actions">
        <button class="bottom-btn" id="footer-settings" title="Settings" aria-label="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </footer>

    <!-- SCROLL TO TOP -->
    <button id="scroll-top" aria-label="Scroll to top" title="Scroll to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>

  <!-- Achievements Panel -->
  <section class="section-panel" id="panel-achievements" hidden>
    <div class="panel-header">
      <h2 class="panel-title">achievements</h2>
      <span class="panel-count" id="ach-count-label"></span>
    </div>
    <div id="achievements-container"></div>
  </section>

  <!-- Collections Panel -->
  <section class="section-panel" id="panel-collections" hidden>
    <div class="panel-header">
      <h2 class="panel-title">collections</h2>
      <button class="panel-action-btn" id="new-collection-btn" title="New collection">+</button>
    </div>
    <div id="collections-container">
      <p class="loading-text" id="collections-empty">no collections yet — create one to save games</p>
      <div id="collections-list"></div>
    </div>
  </section>

  <!-- Leaderboard Panel -->
  <section class="section-panel" id="panel-leaderboard" hidden>
    <div class="panel-header">
      <h2 class="panel-title">leaderboard</h2>
      <span class="panel-count">by plays</span>
    </div>
    <div id="leaderboard-container"></div>
  </section>

  <!-- Now Playing Bar -->
  <div id="now-playing" hidden>
    <div class="np-dot"></div>
    <span class="np-title" id="np-title">nothing playing</span>
    <span class="np-time" id="np-time">0:00</span>
    <button class="np-btn" id="np-resume">resume ▶</button>
    <button class="np-btn" id="np-close-btn">✕</button>
  </div>

  <!-- Game Info Modal -->
  <div id="game-info-overlay" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-box game-info-box">
      <div class="gi-header">
        <span class="gi-source" id="gi-source"></span>
        <button class="gi-fav" id="gi-fav" aria-label="Favourite">♡</button>
      </div>
      <h2 class="gi-title" id="gi-title"></h2>
      <div class="gi-stats">
        <span id="gi-plays">0 plays</span>
        <span id="gi-ptime">0m played</span>
        <span id="gi-mp" hidden>multiplayer</span>
      </div>
      <div class="gi-controls">
        <div class="gi-control-row"><kbd>Arrow keys</kbd> move</div>
        <div class="gi-control-row"><kbd>Z / X</kbd> action buttons</div>
        <div class="gi-control-row"><kbd>Enter</kbd> start / confirm</div>
        <div class="gi-control-row"><kbd>Esc</kbd> pause / back</div>
      </div>
      <div class="gi-actions">
        <button class="modal-btn" id="gi-play-btn">▶ play now</button>
        <button class="gi-pip-btn" id="gi-pip-btn" title="Open in mini PiP window">mini</button>
        <button class="gi-share-btn" id="gi-share-btn" title="Copy share link">share</button>
      </div>
      <div class="gi-playnext" id="gi-playnext" hidden>
        <p class="gi-playnext-label">you might also like</p>
        <div class="gi-playnext-list" id="gi-playnext-list"></div>
      </div>
      <button class="gi-close" id="gi-close">✕</button>
    </div>
  </div>

  <!-- New Collection Modal -->
  <div id="new-collection-overlay" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-box" style="max-width:360px">
      <p class="modal-welcome">new collection</p>
      <input id="new-collection-input" class="settings-input" type="text" placeholder="collection name..." autocomplete="off" style="margin:16px 0 20px;width:100%;color:#111;background:#fafafa;border:1px solid #ddd;border-radius:6px;padding:8px 12px;font-family:inherit" />
      <div style="display:flex;gap:10px;justify-content:flex-end">
        <button id="new-collection-cancel" class="settings-action-btn">cancel</button>
        <button id="new-collection-save" class="modal-btn">create</button>
      </div>
    </div>
  </div>

  <!-- Add-to-Collection Picker Modal -->
  <div id="add-col-overlay" class="modal-overlay hidden" role="dialog" aria-modal="true">
    <div class="modal-box" style="max-width:380px;text-align:left">
      <p class="modal-welcome" style="margin-bottom:4px">add to collection</p>
      <p class="col-picker-game-name" id="col-picker-game-name" style="font-size:0.78rem;color:#888;font-family:var(--font-mono);margin-bottom:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></p>
      <div id="col-picker-list" class="col-picker-list"></div>
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid #eee;display:flex;gap:10px;align-items:center">
        <button id="col-picker-new" class="settings-action-btn" style="font-size:0.78rem">+ new collection</button>
        <button id="col-picker-cancel" class="modal-btn" style="margin-left:auto;background:#f5f5f5;color:#555;border:1px solid #ddd">cancel</button>
      </div>
    </div>
  </div>

  <!-- Picture-in-Picture mini window -->
  <div id="pip-window" hidden>
    <div id="pip-bar">
      <span id="pip-title"></span>
      <div style="display:flex;gap:4px">
        <button class="pip-btn" id="pip-expand" title="Expand">⛶</button>
        <button class="pip-btn" id="pip-close" title="Close">✕</button>
      </div>
    </div>
    <iframe id="pip-frame" allowfullscreen
      allow="fullscreen; autoplay; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"></iframe>
  </div>

  </div><!-- /app -->

  <script>
window.PROXY_ORIGIN = '';

window.PROXY_BASE  = window.PROXY_ORIGIN ? window.PROXY_ORIGIN + '/p/' : '';
window.BACKUP_BASE = window.PROXY_ORIGIN ? window.PROXY_ORIGIN + '/b/' : '';
window.GAME_BASE   = window.PROXY_ORIGIN ? window.PROXY_ORIGIN + '/game' : './game.html';
window.WATCH_BASE  = window.PROXY_ORIGIN ? window.PROXY_ORIGIN + '/watch' : './watch.html';

</script>
  <script>
    // Fix all href="#" data-pxy="URL" elements using configured proxy base
    document.addEventListener('DOMContentLoaded', function() {
      var base = window.PROXY_BASE || '';
      document.querySelectorAll('[data-pxy]').forEach(function(el) {
        var url = el.dataset.pxy;
        if (!url) return;
        el.href = base ? base + url : url;
        if (!base) el.target = '_blank';
        el.removeAttribute('data-pxy');
      });
    });
  </script>
  <script>
const THEME_KEY = 'cowboysstuff_theme';

window.THEMES = {
  'cowboy':   { name: 'Cowboy Gold',   icon: '🤠', gold: '#d4a017', goldDim: '#9a7412', goldGlow: 'rgba(212,160,23,0.18)',  bg: '#080808', surface: '#121212', surface2: '#1a1a1a', border: '#2a2a2a', white: '#f5f5f0', muted: '#666' },
  'neon':     { name: 'Neon Purple',   icon: '💜', gold: '#c084fc', goldDim: '#9333ea', goldGlow: 'rgba(192,132,252,0.18)', bg: '#0a0510', surface: '#130b1f', surface2: '#1c1030', border: '#3b1d6e', white: '#f0e8ff', muted: '#7c5cbf' },
  'ocean':    { name: 'Ocean Blue',    icon: '🌊', gold: '#38bdf8', goldDim: '#0ea5e9', goldGlow: 'rgba(56,189,248,0.18)',  bg: '#050d14', surface: '#0a1929', surface2: '#102235', border: '#1e4060', white: '#e0f0ff', muted: '#4a7fa0' },
  'crimson':  { name: 'Crimson',       icon: '❤️', gold: '#f87171', goldDim: '#ef4444', goldGlow: 'rgba(248,113,113,0.18)', bg: '#0d0505', surface: '#1a0a0a', surface2: '#241010', border: '#4a1818', white: '#fff0f0', muted: '#9a5555' },
  'matrix':   { name: 'Matrix Green',  icon: '💚', gold: '#4ade80', goldDim: '#16a34a', goldGlow: 'rgba(74,222,128,0.18)',  bg: '#020d05', surface: '#061510', surface2: '#0c2018', border: '#14502a', white: '#e0ffe8', muted: '#3a7a50' },
  'midnight': { name: 'Midnight',      icon: '🌑', gold: '#94a3b8', goldDim: '#64748b', goldGlow: 'rgba(148,163,184,0.14)', bg: '#020204', surface: '#0a0a12', surface2: '#11111c', border: '#1e1e2e', white: '#e2e8f0', muted: '#4a4a6a' },
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
    btn.innerHTML = \`<span class="theme-btn-icon">\${icon}</span><span class="theme-btn-name">\${name}</span>\`;
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

</script>
  <script>
window.ACHIEVEMENTS = [
  
  { id:'first-play',   name:'First Game',           icon:'[x]', desc:'Play your first game.',                         secret:false },
  { id:'five-games',   name:'Five Games',      icon:'[g]', desc:'Play 5 different games.',                      secret:false },
  { id:'ten-games',    name:'Ten Games',         icon:'[m]', desc:'Play 10 different games.',                     secret:false },
  { id:'twenty-five',  name:'25 Games',         icon:'[*]', desc:'Play 25 different games.',                     secret:false },
  { id:'fifty-games',  name:'50 Games',       icon:'[k]', desc:'Play 50 different games.',                     secret:false },

  
  { id:'min-30',       name:'30 Minutes',          icon:'[t]', desc:'Play for 30 minutes total.',               secret:false },
  { id:'hr-1',         name:'One Hour',        icon:'[t]', desc:'Play for 1 hour total.',                       secret:false },
  { id:'hr-5',         name:'Five Hours',    icon:'[!]', desc:'Play for 5 hours total.',                      secret:false },
  { id:'hr-24',        name:'24 Hours',         icon:'[x]', desc:'Play for 24 hours total.',                     secret:true  },

  
  { id:'daily-game',   name:'Daily Game',  icon:'[o]', desc:'Play the daily featured game.',                secret:false },
  { id:'try-flash',    name:'Flash',      icon:'[z]', desc:'Play a Flash game.',                           secret:false },
  { id:'try-retro',    name:'Retro',      icon:'[g]', desc:'Play a retro console game.',                   secret:false },
  { id:'try-gnmath',   name:'gn-math',   icon:'[m]', desc:'Play a gn-math game.',                         secret:false },
  { id:'try-truffled', name:'Truffled',  icon:'[t]', desc:'Play a Truffled game.',                        secret:false },
  { id:'all-consoles', name:'All Consoles',  icon:'[c]', desc:'Try NES, SNES, GBA, Genesis, and Atari.',      secret:false },
  { id:'multiplayer',  name:'Multiplayer', icon:'[w]', desc:'Open a multiplayer game.',                     secret:false },

  
  { id:'share-game',   name:'Shared',            icon:'[s]', desc:'Copy a game share link.',                      secret:false },
  { id:'pip-open',     name:'Mini Window',     icon:'[p]',  desc:'Open a game in mini PiP window.',             secret:false },
  { id:'daily-3',      name:'Three Days',icon:'[d]', desc:'Play the daily featured game 3 days in a row.',secret:false },

  
  { id:'fav-1',        name:'First Fav',      icon:'[h]',  desc:'Favourite your first game.',                   secret:false },
  { id:'fav-5',        name:'Five Favs',       icon:'[h]', desc:'Favourite 5 games.',                           secret:false },
  { id:'fav-10',       name:'Ten Favs',         icon:'[h]', desc:'Favourite 10 games.',                          secret:false },
  { id:'playlist-1',   name:'First List',         icon:'[l]', desc:'Create your first collection.',                secret:false },
  { id:'playlist-3',   name:'Three Lists',              icon:'[l]', desc:'Create 3 collections.',                        secret:false },
  { id:'playlist-20',  name:'20 Games Saved',       icon:'[l]', desc:'Add 20 games across all collections.',         secret:false },

  
  { id:'surprise-me',  name:'Random',   icon:'[r]', desc:'Use the Surprise Me button.',                  secret:false },
  { id:'sort-use',     name:'Sorted',   icon:'[n]', desc:'Sort the game list.',                          secret:false },
  { id:'theme-change', name:'New Theme',     icon:'[c]', desc:'Change the site theme.',                       secret:false },
  { id:'kb-nav',       name:'Keys Only',        icon:'[k]',  desc:'Navigate to a game using keyboard 1-9.',       secret:false },
  { id:'fuzzy-search', name:'Typo Search',       icon:'[s]', desc:'Find a game with a fuzzy (typo) search.',      secret:false },
  { id:'leaderboard',  name:'Leaderboard',    icon:'[1]', desc:'View your personal leaderboard.',              secret:false },

  
  { id:'unlock-10',    name:'10 Badges', icon:'[+]', desc:'Unlock 10 achievements.',                      secret:false },
  { id:'unlock-20',    name:'20 Badges',     icon:'[+]', desc:'Unlock 20 achievements.',                      secret:false },
  { id:'unlock-all',   name:'All Badges', icon:'[k]', desc:'Unlock every achievement.',                  secret:true  },

  
  { id:'kromp-code',   name:'Found It',    icon:'[?]', desc:'Type the secret code.',                        secret:true  },
  { id:'midnight',     name:'After Midnight',       icon:'[n]', desc:'Play a game after midnight.',                  secret:true  },
];

const ACH_KEY = 'cowboysstuff_achievements';

function getUnlocked() {
  try { return new Set(JSON.parse(localStorage.getItem(ACH_KEY) || '[]')); }
  catch { return new Set(); }
}

function saveUnlocked(set) {
  localStorage.setItem(ACH_KEY, JSON.stringify([...set]));
}

function isUnlocked(id) { return getUnlocked().has(id); }

function unlock(id) {
  const set = getUnlocked();
  if (set.has(id)) return false;
  set.add(id);
  saveUnlocked(set);

  const ach = window.ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return true;

  showAchievementNotification(ach);
  checkMetaAchievements(set.size);
  return true;
}

function showAchievementNotification(ach) {
  // Don't stack more than 3
  const existing = document.querySelectorAll('.ach-notif');
  if (existing.length >= 3) return;

  const div = document.createElement('div');
  div.className = 'ach-notif';
  div.innerHTML = \`
    <div class="ach-notif-icon">\${ach.icon}</div>
    <div class="ach-notif-text">
      
      <div class="ach-notif-name">\${ach.name}</div>
    </div>\`;
  document.body.appendChild(div);

  // Offset stacked notifications
  const offset = existing.length * 76;
  div.style.bottom = (24 + offset) + 'px';

  requestAnimationFrame(() => div.classList.add('show'));
  setTimeout(() => {
    div.classList.remove('show');
    setTimeout(() => div.remove(), 400);
  }, 3500);

  // Also confetti on meta achievements
  if (ach.id === 'unlock-all' || ach.id === 'legendary') {
    launchConfetti();
  }
}

function checkMetaAchievements(count) {
  if (count >= 10) unlock('unlock-10');
  if (count >= 20) unlock('unlock-20');
  if (count >= window.ACHIEVEMENTS.length) unlock('unlock-all');
}

const _achGamePlayed = new Set(); // track unique games this session

window.achOnGamePlay = function(gameId, source) {
  _achGamePlayed.add(gameId);
  const unique = getUnlockedGameIds();
  if (!unique.has(gameId)) {
    addUnlockedGameId(gameId);
    const total = getUnlockedGameIds().size;
    if (total >= 1)  unlock('first-play');
    if (total >= 5)  unlock('five-games');
    if (total >= 10) unlock('ten-games');
    if (total >= 25) unlock('twenty-five');
    if (total >= 50) unlock('fifty-games');
  }

  // Source-based
  if (source === 'gn-math')  unlock('try-gnmath');
  if (source === 'truffled') unlock('try-truffled');

  // Time of day
  const h = new Date().getHours();
  if (h === 0 || h === 1 || h === 2 || h === 3) unlock('midnight');
};

window.achOnFlashPlay   = () => unlock('try-flash');
window.achOnRetroPlay   = () => unlock('try-retro');

window.achOnPlaytime = function(totalSecs) {
  if (totalSecs >= 30 * 60)         unlock('min-30');
  if (totalSecs >= 60 * 60)         unlock('hr-1');
  if (totalSecs >= 5  * 60 * 60)    unlock('hr-5');
  if (totalSecs >= 24 * 60 * 60)    unlock('hr-24');
};

window.achOnDailyGame = function() {
  unlock('daily-game');
  checkDailyStreak();
};

window.achOnFav = function() {
  const { getFavs } = window;
  if (!getFavs) return;
  const count = getFavs().size;
  if (count >= 1)  unlock('fav-1');
  if (count >= 5)  unlock('fav-5');
  if (count >= 10) unlock('fav-10');
};

window.achOnPlaylistCreate = function() {
  unlock('playlist-1');
  const cols = getCollections();
  if (cols.length >= 3) unlock('playlist-3');
};

window.achOnPlaylistTotal = function(total) {
  if (total >= 20) unlock('playlist-20');
};

window.achOnShareLink    = () => unlock('share-game');
window.achOnPip          = () => unlock('pip-open');
window.achOnSurprise     = () => unlock('surprise-me');
window.achOnSort         = () => unlock('sort-use');
window.achOnThemeChange  = () => unlock('theme-change');
window.achOnKbNav        = () => unlock('kb-nav');
window.achOnFuzzySearch  = () => unlock('fuzzy-search');
window.achOnLeaderboard  = () => unlock('leaderboard');
window.achOnMultiplayer  = () => unlock('multiplayer');

window.achOnKrompCode    = () => unlock('kromp-code');

const CONSOLE_KEY = 'cowboysstuff_consoles_tried';
function getConsolesTriedSet() {
  try { return new Set(JSON.parse(localStorage.getItem(CONSOLE_KEY)||'[]')); } catch { return new Set(); }
}
window.achOnConsoleTried = function(consoleName) {
  const s = getConsolesTriedSet();
  s.add(consoleName.toLowerCase());
  localStorage.setItem(CONSOLE_KEY, JSON.stringify([...s]));
  if (['nes','snes','gba','genesis','atari 2600'].every(c => s.has(c))) {
    unlock('all-consoles');
  }
};

const UGAMES_KEY = 'cowboysstuff_played_ids';
function getUnlockedGameIds() {
  try { return new Set(JSON.parse(localStorage.getItem(UGAMES_KEY)||'[]')); } catch { return new Set(); }
}
function addUnlockedGameId(id) {
  const s = getUnlockedGameIds(); s.add(id);
  localStorage.setItem(UGAMES_KEY, JSON.stringify([...s]));
}

const DAILY_STREAK_KEY = 'cowboysstuff_daily_streak';
function checkDailyStreak() {
  const today = new Date().toDateString();
  let data;
  try { data = JSON.parse(localStorage.getItem(DAILY_STREAK_KEY)||'{}'); } catch { data = {}; }
  if (data.last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const streak = (data.last === yesterday) ? (data.streak || 1) + 1 : 1;
  localStorage.setItem(DAILY_STREAK_KEY, JSON.stringify({ last: today, streak }));
  if (streak >= 3) unlock('daily-3');
}

function launchConfetti() {
  const colors = ['#d4a017','#fff','#ff6b6b','#6bffb8','#6baeff'];
  for (let i = 0; i < 80; i++) {
    const dot = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * window.innerWidth;
    const size = Math.random() * 8 + 4;
    dot.style.cssText = \`position:fixed;top:-10px;left:\${x}px;width:\${size}px;height:\${size}px;
      border-radius:\${Math.random()>.5?'50%':'2px'};background:\${color};
      pointer-events:none;z-index:99999;
      animation:confetti-fall \${Math.random()*1.5+1}s ease-out \${Math.random()*0.6}s forwards\`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 3000);
  }
}

window.renderAchievementsPanel = function(container) {
  const unlocked = getUnlocked();
  const pct = Math.round(unlocked.size / window.ACHIEVEMENTS.length * 100);

  container.innerHTML = \`
    <div class="ach-header">
      <span class="ach-count">\${unlocked.size} / \${window.ACHIEVEMENTS.length}</span>
      <div class="ach-progress-bar"><div class="ach-progress-fill" style="width:\${pct}%"></div></div>
      <span class="ach-pct">\${pct}%</span>
    </div>
    <div class="ach-grid" id="ach-grid"></div>\`;

  const grid = container.querySelector('#ach-grid');
  window.ACHIEVEMENTS.forEach(ach => {
    const got  = unlocked.has(ach.id);
    const card = document.createElement('div');
    card.className = 'ach-card' + (got ? ' unlocked' : '') + (ach.secret && !got ? ' secret' : '');
    card.innerHTML = \`
      <div class="ach-card-icon">\${ach.secret && !got ? '?' : ach.icon}</div>
      <div class="ach-card-name">\${ach.secret && !got ? '???' : ach.name}</div>
      <div class="ach-card-desc">\${ach.secret && !got ? 'Keep playing to discover this.' : ach.desc}</div>
      \${got ? '<div class="ach-card-badge">✓</div>' : ''}\`;
    grid.appendChild(card);
  });
};

window.getTotalPlaytime = function() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('cowboysstuff_ptime_')) {
      total += parseInt(localStorage.getItem(k)||'0', 10);
    }
  }
  return total;
};

(function initKrompCode() {
  let buf = '';
  document.addEventListener('keydown', e => {
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    buf += e.key.toLowerCase();
    if (buf.length > 5) buf = buf.slice(-5);
    if (buf === 'kromp') {
      window.achOnKrompCode?.();
      buf = '';
      // Easter egg visual
      const el = document.createElement('div');
      el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:6rem;z-index:99999;pointer-events:none;animation:logo-spin-pulse .8s ease both';
      el.textContent = '[x]';
      document.body.appendChild(el);
      launchConfetti();
      setTimeout(() => el.remove(), 2000);
    }
  });
})();

console.log('[achievements] engine loaded —', window.ACHIEVEMENTS.length, 'achievements');

</script>
  <script>
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
const TRUFFLED_API = 'https://data.jsdelivr.com/v1/package/gh/molkify/truffled-games@main/flat';
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
        const filename = f.name.replace(/^\\//, '');
        return {
          name:   filename.replace(/\\.html$/i, '').replace(/[-_]/g, ' ').trim(),
          url:    TRUFFLED_CDN + f.name,
          gameId: 'truffled-' + filename.replace(/\\.html$/i, '').replace(/[^a-z0-9]/gi, '-'),
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
    frag.appendChild(_makeGameLink(window.PROXY_BASE ? window.PROXY_BASE + raw : raw, zone.name || zone.title || ('Game ' + zone.id), 'gnmath-' + zone.id, 'gn-math', raw));
  });
  unique.forEach((g) => frag.appendChild(_makeGameLink(window.PROXY_BASE ? window.PROXY_BASE + g.url : g.url, g.name, g.gameId, 'truffled', g.url)));
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

  const isUrl = (s) => /^[^\\s]+\\.[^\\s]+$/.test(s) && !/\\s/.test(s);

  function navigate(q) {
    q = q.trim();
    if (!q) return;
    const target = isUrl(q)
      ? (/^https?:\\/\\//i.test(q) ? q : 'https://' + q)
      : getSearchUrl(q);
    addRecent(target, q);
    const openIn = getLinkTarget();
    const dest = window.PROXY_BASE ? window.PROXY_BASE + target : target;
    if (openIn === '_blank' || !window.PROXY_BASE) window.open(dest, '_blank');
    else window.location.href = dest;
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
      ctx.fillStyle = \`rgba(255,255,255,\${a.toFixed(3)})\`;
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
      card.style.transform = \`perspective(400px) rotateX(\${tiltX}deg) rotateY(\${tiltY}deg)\`;
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
    dot.style.cssText = \`
      width: \${size}px; height: \${size}px;
      left:  \${e.clientX - r.left  - size / 2}px;
      top:   \${e.clientY - r.top   - size / 2}px;
    \`;
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
      dot.style.cssText = \`
        position:fixed;left:\${cx}px;top:\${cy}px;
        width:\${size}px;height:\${size}px;
        border-radius:50%;background:#d4a017;
        pointer-events:none;z-index:9000;
        transition:transform 0.45s ease-out,opacity 0.45s ease-out;
        transform:translate(-50%,-50%);opacity:0.9;
      \`;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = \`translate(calc(-50% + \${Math.cos(angle)*dist}px), calc(-50% + \${Math.sin(angle)*dist}px))\`;
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
  const href = game.href || \`/game?url=\${encodeURIComponent(game.rawUrl||game.url||'')}&name=\${encodeURIComponent(game.name)}\`;

  startPlaytimeTracking(id);

  const fsDefault = localStorage.getItem(FS_DEFAULT_KEY) === 'on';
  const finalHref = fsDefault ? href + '&fs=1' : href;

  // If no proxy configured, open game URL directly
  if (!window.PROXY_BASE) {
    const rawUrl = game.rawUrl || '';
    if (rawUrl) { window.open(rawUrl, '_blank'); return; }
  }

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
    const href = \`/game?url=\${encodeURIComponent(_pendingGame.rawUrl||_pendingGame.url||'')}&name=\${encodeURIComponent(_pendingGame.name)}\`;
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
    ? \`/game?url=\${encodeURIComponent(rawUrl)}&name=\${encodeURIComponent(game.name)}\`
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
    header.innerHTML = \`
      <span class="collection-name">\${col.name}</span>
      <span class="collection-count">\${col.games.length} game\${col.games.length !== 1 ? 's' : ''}</span>
      <button class="collection-del" data-id="\${col.id}" title="Delete collection">🗑</button>\`;

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
      chip.innerHTML = \`<span>\${g.name}</span><button class="collection-rm-btn" title="Remove">✕</button>\`;
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

  container.innerHTML = \`
    <div class="ach-header" style="margin-bottom:14px">
      <span class="ach-count">\${totalPlays} total plays</span>
      <span class="ach-pct">\${fmt(totalPtime)} played</span>
    </div>\`;

  top10.forEach((e, i) => {
    const row = document.createElement('div');
    row.className = 'lb-entry';
    row.innerHTML = \`
      <span class="lb-rank">\${['🥇','🥈','🥉'][i] || (i+1)}</span>
      <span class="lb-name">\${e.name}</span>
      <span class="lb-plays">\${e.plays}×</span>
      <span class="lb-time">\${fmt(e.ptime)}</span>\`;
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const link = document.querySelector(\`.game-link[data-game="\${e.gameId}"]\`);
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

      item.innerHTML = \`
        <div class="col-picker-item-check">\${alreadyIn ? '✓' : ''}</div>
        <span class="col-picker-item-name">\${col.name}</span>
        <span class="col-picker-item-count">\${col.games.length} game\${col.games.length !== 1 ? 's' : ''}</span>\`;

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

  const isUrl = s => /^https?:\\/\\//i.test(s) || s.includes('.') && !s.includes(' ');

  function playCustomUrl(rawUrl) {
    rawUrl = rawUrl.trim();
    if (!rawUrl) return;

    // Normalise to full URL
    const url = /^https?:\\/\\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl;

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
        return (last.replace(/\\.(html?|swf|php|aspx?)$/i, '').replace(/[-_]/g, ' ').trim() || u.hostname) || 'custom game';
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
    // Backtick key — \` — toggle boss overlay
    if (e.key === '\`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
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
    href:    game.href || \`/game?url=\${encodeURIComponent(game.rawUrl || '')}&name=\${encodeURIComponent(game.name)}\`,
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
    const link = document.querySelector(\`.game-link[data-game="\${lastId}"]\`);
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

</script>
</body>
</html>
`;
  document.open();
  document.write(html);
  document.close();
})();
