(function(){var d=document;d.open();d.write(`<!DOCTYPE html>
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

/* ── AI Chat Panel ─────────────────────────────────────────── */
#panel-ai {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  max-height: 700px;
}
#ai-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 2px 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.ai-msg {
  max-width: 85%;
  padding: 9px 13px;
  border-radius: 12px;
  font-size: .82rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}
.ai-msg.user {
  align-self: flex-end;
  background: var(--gold);
  color: #080808;
  border-bottom-right-radius: 3px;
}
.ai-msg.assistant {
  align-self: flex-start;
  background: var(--surface);
  color: var(--white);
  border: 1px solid var(--border);
  border-bottom-left-radius: 3px;
}
.ai-msg.error {
  align-self: flex-start;
  background: #2a0a0a;
  color: #ff6b6b;
  border: 1px solid #4a1a1a;
  font-size: .78rem;
}
.ai-msg.thinking {
  align-self: flex-start;
  color: var(--muted);
  font-style: italic;
  font-size: .78rem;
  background: none;
  padding: 4px 2px;
  border: none;
}
.ai-thinking-dots::after {
  content: '...';
  animation: ai-dots 1s steps(4, end) infinite;
}
@keyframes ai-dots {
  0%, 100% { content: '.'; }
  33%       { content: '..'; }
  66%       { content: '...'; }
}
#ai-input-row {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-shrink: 0;
}
#ai-input {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: .8rem;
  padding: 8px 12px;
  outline: none;
  transition: border-color .15s;
  min-width: 0;
}
#ai-input:focus { border-color: var(--gold-dim); }
#ai-input::placeholder { color: var(--muted); }
#ai-send-btn {
  background: var(--gold);
  border: none;
  border-radius: var(--radius-sm);
  color: #080808;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: .78rem;
  font-weight: 700;
  padding: 8px 16px;
  flex-shrink: 0;
  transition: opacity .15s;
}
#ai-send-btn:disabled { opacity: .4; cursor: default; }
#ai-send-btn:not(:disabled):hover { opacity: .85; }

/* ── Home Stats ──────────────────────────────────────────────────── */
.home-stats {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 14px 0 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 18px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stat-val {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  font-family: var(--font-mono);
}
.stat-lbl {
  font-size: .65rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .08em;
}

/* ── Pinned Bar ──────────────────────────────────────────────────── */
.pinned-bar {
  display: flex;
  gap: 6px;
  padding: 8px 16px;
  overflow-x: auto;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  scrollbar-width: none;
  flex-shrink: 0;
}
.pinned-bar::-webkit-scrollbar { display: none; }
.pinned-chip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--white);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: .72rem;
  padding: 4px 12px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: border-color .15s, color .15s;
}
.pinned-chip:hover { border-color: var(--gold-dim); color: var(--gold); }

/* ── Pin Button in Game Info Modal ───────────────────────────────── */
.gi-pin {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--muted);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: .72rem;
  padding: 3px 8px;
  transition: color .12s, border-color .12s;
  flex-shrink: 0;
  margin-left: 4px;
}
.gi-pin:hover { color: var(--gold); border-color: var(--gold-dim); }

/* ── Settings select ─────────────────────────────────────────────── */
.settings-select {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: .8rem;
  padding: 6px 10px;
  outline: none;
  cursor: pointer;
  margin-top: 6px;
}
.settings-select:focus { border-color: var(--gold-dim); }

/* ── New Themes ──────────────────────────────────────────────────── */
[data-theme="synthwave"] {
  --bg:         #0a0015;
  --surface:    #160025;
  --border:     #3d0066;
  --white:      #f0e6ff;
  --muted:      #9966bb;
  --gold:       #ff6ec7;
  --gold-dim:   #cc3399;
  --accent:     #00ffff;
}

[data-theme="matrix"] {
  --bg:         #000300;
  --surface:    #001200;
  --border:     #003300;
  --white:      #00ff41;
  --muted:      #007700;
  --gold:       #00ff41;
  --gold-dim:   #00aa2b;
  --accent:     #39ff14;
}

[data-theme="ocean"] {
  --bg:         #020c1b;
  --surface:    #0a192f;
  --border:     #112240;
  --white:      #ccd6f6;
  --muted:      #8892b0;
  --gold:       #64ffda;
  --gold-dim:   #00b4d8;
  --accent:     #57cbff;
}

[data-theme="lava"] {
  --bg:         #0d0000;
  --surface:    #200000;
  --border:     #3d0000;
  --white:      #ffe0d0;
  --muted:      #994422;
  --gold:       #ff4500;
  --gold-dim:   #cc2200;
  --accent:     #ff7700;
}

[data-theme="mint"] {
  --bg:         #010f08;
  --surface:    #051a0f;
  --border:     #0a3020;
  --white:      #e0fff2;
  --muted:      #4a9b6f;
  --gold:       #00e676;
  --gold-dim:   #00b050;
  --accent:     #69ffb7;
}

[data-theme="sakura"] {
  --bg:         #0f0108;
  --surface:    #1f0518;
  --border:     #3d0a30;
  --white:      #ffe4f0;
  --muted:      #996688;
  --gold:       #ff80ab;
  --gold-dim:   #d44080;
  --accent:     #ffb3d1;
}

/* ── Extras count badge on filter tab ───────────────────────────── */
.filter-tab[data-filter="extras"]::after {
  content: ' +';
  opacity: .5;
  font-size: .65em;
}

/* ── Screen Guard Overlay ────────────────────────────────────────── */
#sg-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  background: #fff;
  overflow-y: auto;
}
#sg-content {
  width: 100%;
  min-height: 100vh;
}
#sg-hint {
  position: fixed;
  bottom: 12px;
  right: 16px;
  font-family: var(--font-mono);
  font-size: .7rem;
  color: transparent;
  /* hidden from view but keyboard shortcut still works */
  pointer-events: none;
  user-select: none;
}
/* Only show hint when hovering bottom-right corner */
#sg-overlay:hover #sg-hint {
  color: rgba(0,0,0,.2);
}
kbd {
  background: rgba(0,0,0,.08);
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 3px;
  padding: 0 4px;
  font-size: .65rem;
}

/* ── Settings desc text ──────────────────────────────────────────── */
.settings-desc {
  font-size: .72rem;
  color: var(--muted);
  margin: 2px 0 8px;
  line-height: 1.4;
}

/* ── Lock / Setup Screen ─────────────────────────────────────────── */
#lock-screen,
#setup-screen {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: lock-in .2s ease;
}
@keyframes lock-in { from { opacity: 0; transform: scale(.97); } }
.lock-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 360px;
  padding: 32px 24px;
}
.lock-icon { font-size: 2.5rem; }
.lock-title {
  font-size: 1.4rem;
  color: var(--white);
  margin: 0;
  font-family: var(--font-mono);
}
.lock-sub {
  font-size: .82rem;
  color: var(--muted);
  margin: 0;
  text-align: center;
}
.lock-input {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: .9rem;
  padding: 10px 14px;
  outline: none;
  box-sizing: border-box;
  text-align: center;
  letter-spacing: .15em;
  transition: border-color .15s;
}
.lock-input:focus { border-color: var(--gold-dim); }
.lock-btn {
  width: 100%;
  background: var(--gold);
  border: none;
  border-radius: var(--radius-sm);
  color: #080808;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: .85rem;
  font-weight: 700;
  padding: 10px;
  transition: opacity .15s;
}
.lock-btn:hover { opacity: .85; }
.lock-btn-ghost {
  background: none;
  border: 1px solid var(--border);
  color: var(--muted);
}
.lock-btn-sm {
  width: auto;
  padding: 6px 14px;
  font-size: .75rem;
}
.lock-error {
  color: #ff6b6b;
  font-size: .78rem;
  font-family: var(--font-mono);
  min-height: 18px;
  text-align: center;
}
.lock-hint {
  font-size: .7rem;
  color: var(--muted);
  text-align: center;
}
.settings-row { display: flex; gap: 8px; flex-wrap: wrap; }

/* ── Notes Panel ─────────────────────────────────────────────────── */
#panel-notes { display: flex; flex-direction: column; }
.notes-title-input {
  background: none;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  padding: 8px 0 10px;
  outline: none;
  width: 100%;
  margin-bottom: 12px;
  transition: border-color .15s;
}
.notes-title-input:focus { border-color: var(--gold-dim); }
.notes-body {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: .82rem;
  line-height: 1.65;
  padding: 14px;
  resize: none;
  outline: none;
  min-height: 400px;
  transition: border-color .15s;
}
.notes-body:focus { border-color: var(--gold-dim); }

/* ── Music Player Bar ────────────────────────────────────────────── */
#music-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 48px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  font-family: var(--font-mono);
  font-size: .78rem;
}
.music-btn {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: color .12s;
  flex-shrink: 0;
}
.music-btn:hover { color: var(--gold); }
.music-btn.playing { color: var(--gold); }
.music-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
#music-track-name {
  color: var(--white);
  font-size: .78rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.music-station {
  color: var(--muted);
  font-size: .65rem;
  text-transform: uppercase;
}
.music-vol {
  width: 80px;
  accent-color: var(--gold);
  flex-shrink: 0;
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

        <button class="nav-icon-btn" id="nav-games" title="Games (G)" aria-label="Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="2" y="6" width="20" height="13" rx="4"/>
            <path d="M6 12.5h5M8.5 10v5"/>
            <circle cx="17" cy="12.5" r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="14" cy="12.5" r="1.2" fill="currentColor" stroke="none" opacity=".45"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-apps" title="Apps (A)" aria-label="Apps">
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
        <button class="nav-icon-btn" id="nav-notes" title="Notes (N)" aria-label="Notes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-ai" title="AI Chat (I)" aria-label="AI Chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <button class="nav-icon-btn" id="nav-music" title="Music (U)" aria-label="Music">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
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
        <button class="filter-tab" data-filter="freebuisness">gn-math</button>
        <button class="filter-tab" data-filter="truffled">truffled</button>
        <button class="filter-tab" data-filter="extras">extras</button>
        <button class="filter-tab" data-filter="favs" id="favs-tab">♥ favs</button>
      </div>
      <input type="text" id="game-search" class="game-search" placeholder="filter games..." autocomplete="off" />
      <div class="panel-links" id="games-list">
        <span class="loading-text">loading games...</span>
      </div>
      <p id="games-no-results" class="loading-text" hidden>no games match that filter</p>
    </section>

    <section class="section-panel" id="panel-extra" hidden>
      <h2 class="panel-title">apps</h2>
      <div class="panel-links">
        <a class="panel-link" href="#" data-pxy="https://znkblx.xyz/">Zinkblox</a>
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
  <section class="section-panel" id="panel-ai" hidden>
    <div class="panel-header">
      <h2 class="panel-title">ai chat</h2>
      <button id="ai-clear-btn" class="panel-count" style="cursor:pointer;background:none;border:none;color:var(--muted);font-family:var(--font-mono);font-size:.75rem;" title="Clear chat">clear</button>
    </div>
    <div id="ai-messages"></div>
    <div id="ai-input-row">
      <input id="ai-input" type="text" autocomplete="off" spellcheck="false" placeholder="ask anything..." maxlength="2000" />
      <button id="ai-send-btn">send</button>
    </div>
  </section>

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
        <button class="gi-pin" id="gi-pin-btn" title="Pin to quick bar">📌 pin</button>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <h2 class="gi-title" id="gi-title" style="flex:1;min-width:0"></h2>
        <button id="gi-rename-btn" title="Rename game" style="background:none;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--muted);cursor:pointer;font-family:var(--font-mono);font-size:.72rem;padding:3px 8px;flex-shrink:0;transition:color .12s,border-color .12s" onmouseover="this.style.color='var(--white)';this.style.borderColor='var(--gold-dim)'" onmouseout="this.style.color='var(--muted)';this.style.borderColor='var(--border)'">rename</button>
      </div>
      <div id="gi-rename-row" hidden style="display:flex;gap:6px;margin-bottom:6px">
        <input id="gi-rename-input" type="text" autocomplete="off" spellcheck="false"
          style="flex:1;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--white);font-family:var(--font-mono);font-size:.8rem;padding:5px 10px;outline:none" />
        <button id="gi-rename-save" style="background:var(--gold);border:none;border-radius:var(--radius-sm);color:#080808;cursor:pointer;font-family:var(--font-mono);font-size:.75rem;font-weight:700;padding:5px 12px">save</button>
        <button id="gi-rename-clear" title="Reset to default" style="background:none;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--muted);cursor:pointer;font-family:var(--font-mono);font-size:.72rem;padding:5px 8px">×</button>
      </div>
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
  // ── Playtime milestones ──────────────────────────────────────────────────
  { id:'time-1h',      name:'Time Flies',       icon:'[t]', desc:'Play for 1 hour total.',                       secret:false },
  { id:'time-5h',      name:'Clockwatcher',     icon:'[T]', desc:'Play for 5 hours total.',                      secret:false },
  { id:'time-24h',     name:'Day Wasted',        icon:'[W]', desc:'Play for 24 hours total.',                     secret:true  },
  { id:'time-100h',    name:'Century Player',   icon:'[C]', desc:'Play for 100 hours total.',                    secret:true  },

  // ── Game count milestones ────────────────────────────────────────────────
  { id:'games-25',     name:'Getting Around',   icon:'[g]', desc:'Play 25 different games.',                     secret:false },
  { id:'games-50',     name:'Variety Pack',     icon:'[v]', desc:'Play 50 different games.',                     secret:false },
  { id:'games-100',    name:'Centurion',         icon:'[c]', desc:'Play 100 different games.',                    secret:false },
  { id:'games-200',    name:'Collector',         icon:'[o]', desc:'Play 200 different games.',                    secret:true  },

  // ── Single game depth ────────────────────────────────────────────────────
  { id:'hooked',       name:'Hooked',            icon:'[h]', desc:'Play the same game 20 times.',                 secret:false },
  { id:'addicted',     name:'Addicted',          icon:'[A]', desc:'Play the same game 50 times.',                 secret:true  },
  { id:'main-game',    name:'Main Game',         icon:'[m]', desc:'Play the same game 100 times.',                secret:true  },
  { id:'speedrun',     name:'Speedrunner',       icon:'[s]', desc:'Open 3 different games in under 1 minute.',    secret:true  },

  // ── Collection achievements ──────────────────────────────────────────────
  { id:'col-1',        name:'Organiser',         icon:'[l]', desc:'Create your first collection.',                secret:false },
  { id:'col-5',        name:'Archivist',         icon:'[a]', desc:'Create 5 collections.',                        secret:false },
  { id:'col-full',     name:'Fully Stocked',     icon:'[f]', desc:'Add 20 games to a single collection.',         secret:true  },

  // ── Social / hidden ──────────────────────────────────────────────────────
  { id:'ai-chat',      name:'Robot Friend',      icon:'[r]', desc:'Send your first message to AI.',               secret:false },
  { id:'ai-50',        name:'Philosopher',       icon:'[p]', desc:'Send 50 messages to AI.',                      secret:true  },
  { id:'boss-key-10',  name:'Quick Fingers',     icon:'[q]', desc:'Use the boss key 10 times.',                   secret:true  },
  { id:'rename-game',  name:'My Name Now',       icon:'[n]', desc:'Rename a game.',                               secret:false },
  { id:'pin-game',     name:'Thumbtack',         icon:'[u]', desc:'Pin your first game to the quick bar.',        secret:false },
  { id:'pin-5',        name:'Wall of Pins',      icon:'[w]', desc:'Pin 5 games to the quick bar.',                secret:true  },
  { id:'all-themes',   name:'Fashionista',       icon:'[F]', desc:'Try every theme.',                             secret:true  },
  { id:'cloak',        name:'Sneaky',            icon:'[S]', desc:'Enable tab cloaking.',                         secret:true  },
  { id:'share',        name:'Spreading the Word',icon:'[w]', desc:'Share the site link.',                         secret:true  },
  { id:'night-owl',    name:'Night Owl',         icon:'[N]', desc:'Play 5 nights in a row after 10pm.',           secret:true  },
  { id:'early-bird',   name:'Early Bird',        icon:'[e]', desc:'Play before 7am.',                             secret:true  },
  { id:'weekend',      name:'Weekend Warrior',   icon:'[W]', desc:'Play on both Saturday and Sunday.',            secret:false },
  { id:'monday',       name:'Case of the Mondays',icon:'[M]',desc:'Play on a Monday.',                            secret:true  },
  { id:'new-year',     name:'New Year New Games',icon:'[Y]', desc:"Play on January 1st.",                         secret:true  },
  { id:'score-1k',     name:'High Scorer',       icon:'[1]', desc:'Score points in 10 different games.',          secret:false },
  { id:'extras-5',     name:'Going Further',     icon:'[>]', desc:'Play 5 games from the extras tab.',            secret:false },
  { id:'io-gamer',     name:'.io Champion',      icon:'[i]', desc:'Play 10 different .io games.',                 secret:false },
  { id:'idle-fan',     name:'Idle Hours',        icon:'[I]', desc:'Play 5 different idle/incremental games.',     secret:false },
  { id:'custom-url',   name:'Traveller',         icon:'[>]', desc:'Play a game from a custom URL.',               secret:false },
  { id:'konami',       name:'Up Up Down Down',   icon:'[K]', desc:'Enter the Konami code.',                       secret:true  },
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
const GAME_NAMES_KEY   = 'cowboysstuff_game_names';

function getCustomNames() {
  try { return JSON.parse(localStorage.getItem(GAME_NAMES_KEY) || '{}'); } catch { return {}; }
}
function getGameName(gameId, defaultName) {
  return getCustomNames()[gameId] || defaultName;
}
function setGameName(gameId, name) {
  const m = getCustomNames();
  m[gameId] = name.trim();
  localStorage.setItem(GAME_NAMES_KEY, JSON.stringify(m));
}
function clearGameName(gameId) {
  const m = getCustomNames();
  delete m[gameId];
  localStorage.setItem(GAME_NAMES_KEY, JSON.stringify(m));
}
function applyCustomNamesToDOM() {
  const map = getCustomNames();
  document.querySelectorAll('#games-list .game-link[data-game]').forEach(link => {
    const id = link.dataset.game;
    if (!map[id]) return;
    const ns = link.querySelector('.game-name');
    if (ns) ns.textContent = map[id];
    link.dataset.displayName = map[id];
  });
}
const CLOAK_TITLE_KEY  = 'cowboysstuff_cloak_title';
const CLOAK_URL_KEY    = 'cowboysstuff_cloak_url';
const RECENT_MAX       = 8;


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

const FREEBUISNESS_API  = 'https://data.jsdelivr.com/v1/package/gh/freebuisness/html@main/flat';
const FREEBUISNESS_CDN  = 'https://cdn.jsdelivr.net/gh/freebuisness/html@main';
const GNMATH_ZONES_URL  = 'https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/gnmath.js';
const TRUFFLED_API      = 'https://data.jsdelivr.com/v1/package/gh/molkify/truffled-games@main/flat';
const TRUFFLED_BASE     = 'https://truffled.lol';
const FB_NAMES_KEY      = 'cowboysstuff_fb_names_cache';

// Build a filename→name map by loading the gnmath zones script
// gnmath.js sets window.zones = [{id, name, url, ...}]
// zone.url contains the CDN path to the freebuisness file
async function loadFreebuisnessNames() {
  // Check cache first (avoid re-fetching on every page load)
  try {
    const cached = sessionStorage.getItem(FB_NAMES_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}

  try {
    const res  = await fetch(GNMATH_ZONES_URL);
    if (!res.ok) return {};
    const text = await res.text();
    // Execute the script in a sandboxed way to extract window.zones
    const sandbox = {};
    const fn = new Function('window', text + '\\nreturn window.zones || [];');
    const zones = fn(sandbox);
    if (!Array.isArray(zones)) return {};

    // Build map: filename (e.g. "182") → game name
    const map = {};
    zones.forEach(z => {
      if (!z.name || !z.url) return;
      // url is like "https://cdn.jsdelivr.net/gh/freebuisness/html@main/182.html"
      // or "{HTML_URL}/182.html" or just "182.html"
      const match = String(z.url).match(/\\/(\\d+[^/]*\\.html)(?:\\?|$)/);
      if (match) {
        const fname = match[1].replace(/\\.html.*$/, '');
        map[fname] = z.name;
      }
    });
    sessionStorage.setItem(FB_NAMES_KEY, JSON.stringify(map));
    return map;
  } catch { return {}; }
}

async function loadFreebuisnessGames() {
  try {
    const [res, nameMap] = await Promise.all([
      fetch(FREEBUISNESS_API),
      loadFreebuisnessNames(),
    ]);
    if (!res.ok) return [];
    const data  = await res.json();
    const seen  = new Set();
    return (data.files || [])
      .filter(f => f.name.endsWith('.html') && !f.name.includes('.html-') && f.size > 5000)
      .map(f => {
        const filename  = f.name.replace(/^\\//, '').replace(/\\.html$/i, '');
        const numMatch  = filename.match(/^(\\d+)/);
        const num       = numMatch ? numMatch[1] : filename;
        const gameId    = 'fb-' + num;
        if (seen.has(gameId)) return null;
        seen.add(gameId);
        // Use real name from gnmath zones if available
        const realName = nameMap[filename] || nameMap[num] ||
          'Game ' + filename.replace(/-(fix\\d*|fixed|fix2?|fixx|f|a|b|c|e|el|u|z|update|upd\\d*|awe|temp\\d*|work|win|wow|ff|fi)$/gi,'').replace(/-+$/,'');
        return { gameId, name: realName, rawUrl: FREEBUISNESS_CDN + f.name, source: 'gn-math' };
      })
      .filter(Boolean);
  } catch { return []; }
}

const TRUFFLED_NAMES = {
  'a-difficult-game-about-climbing': 'A Difficult Game About Climbing',
  'a-game-about-feeding-a-blackhole': 'A Game About Feeding A Blackhole',
  'a-small-world-cup': 'A Small World Cup',
  'academytale': 'Academytale',
  'achievement-unlocked': 'Achievement Unlocked',
  'adofai': 'ADOFAI',
  'adventure-capitalist': 'Adventure Capitalist',
  'amanda-the-adventurer': 'Amanda the adventurer',
  'among-us': 'Among us',
  'amaze': 'Amaze',
  'angry-birds': 'Angry Birds',
  'angry-birds-epic': 'Angry Birds Epic',
  'angry-birds-online': 'Angry Birds Online',
  'animal-crossing-population-growing': 'Animal Crossing Population: Growing!',
  'antonblast': 'Antonblast',
  'apes-vs-helium': 'Apes Vs Helium',
  'arthurs-nightmare': 'Arthur\\'s Nightmare',
  'bad-icecream-1': 'Bad Icecream 1',
  'bad-icecream-2': 'Bad Icecream 2',
  'bad-icecream-3': 'Bad Icecream 3',
  'bad-parenting': 'Bad Parenting',
  'bad-piggies': 'Bad Piggies',
  'bad-time-simulator': 'Bad time Simulator',
  'balatro': 'Balatro',
  'baldis-basics': 'Baldi\\'s Basics',
  'baldis-basics-birthday-bash': 'Baldi\\'s Basics Birthday Bash',
  'baldis-basics-classic-remastered': 'Baldi\\'s Basics Classic Remastered',
  'baldis-basics-plus': 'Baldi\\'s Basics Plus',
  'baldis-fun-new-school-plus-ultimate-edition': 'Baldi\\'s Fun New School Plus Ultimate Edition',
  'baldurs-gate-2': 'Baldurs Gate 2',
  'banjo-kazooie': 'Banjo Kazooie',
  'bart-bash': 'Bart Bash',
  'bart-blast': 'Bart Blast',
  'baseball-bros': 'Baseball Bros',
  'basket-bros': 'Basket Bros',
  'basket-random': 'Basket Random',
  'basketball-stars': 'Basketball stars',
  'beatblock': 'Beatblock',
  'bendy-and-the-ink-machine': 'Bendy And The Ink Machine',
  'bergentruck': 'Bergentruck',
  'bfdia-5b': 'Bfdia 5b',
  'bitlife': 'Bitlife',
  'black-jack': 'Black Jack',
  'block-blast': 'Block Blast',
  'bloodmoney': 'Bloodmoney',
  'bloon-td1': 'Bloon TD1',
  'bloon-td2': 'Bloon TD2',
  'bloon-td3': 'Bloon TD3',
  'bloon-td4': 'Bloon TD4',
  'bloons-td5': 'Bloons TD5',
  'bloons-td6': 'Bloons TD6',
  'bloxors': 'Bloxors',
  'bombmerman': 'Bombmerman',
  'bombmerman-2': 'Bombmerman 2',
  'boxing-random': 'Boxing Random',
  'brotato-paws-and-claws': 'Brotato Paws And Claws',
  'buckshot-roulette': 'Buckshot Roulette',
  'burrito-bison': 'Burrito Bison',
  'burrito-bison-revenge': 'Burrito Bison Revenge',
  'capuchin': 'Capuchin',
  'caseohs-basics-in-eating-and-fast-food': 'CaseOhs Basics in Eating and Fast Food',
  'celeste': 'Celeste',
  'cheese-rolling': 'Cheese Rolling',
  'christmas-massacre': 'Christmas Massacre',
  'class-of-09': 'Class Of 09',
  'class-of-09-flipside': 'Class Of 09 Flipside',
  'class-of-09-re-up': 'Class Of 09 Re-Up',
  'clover-pit': 'Clover Pit',
  'cluster-rush': 'Cluster Rush',
  'coffee-talk': 'Coffee Talk',
  'cookie-clicker': 'Cookie Clicker',
  'cooking-mama': 'Cooking Mama',
  'cooking-mama-2': 'Cooking Mama 2',
  'cooking-mama-3': 'Cooking Mama 3',
  'counter-stike-08': 'Counter Stike 0.8',
  'crash-bandicoot-1': 'Crash Bandicoot 1',
  'crash-bandicoot-2': 'Crash Bandicoot 2',
  'crash-bandicoot-3': 'Crash Bandicoot 3',
  'crazy-balls': 'Crazy Balls',
  'crazycattle3d': 'CrazyCattle3D',
  'crossy-roads': 'Crossy Roads',
  'cruelty-squad': 'Cruelty Squad',
  'csgo-clicker': 'Csgo Clicker',
  'cuphead': 'Cuphead',
  'customer-support': 'Customer Support',
  'cut-the-rope': 'Cut The Rope',
  'cut-the-rope-time-travel': 'Cut The Rope : Time Travel',
  'cut-the-rope-holiday': 'Cut The Rope Holiday',
  'dadish': 'Dadish',
  'dadish-2': 'Dadish 2',
  'dadish-3': 'Dadish 3',
  'dadish-3d': 'Dadish 3d',
  'dadish-daily': 'Dadish Daily',
  'danganronpa': 'Danganronpa',
  'dead-plate': 'DEAD PLATE',
  'dead-tapes': 'Dead Tapes',
  'deadseat': 'Deadseat',
  'death-run-3d': 'Death Run 3D',
  'deltarune': 'Deltarune',
  'deltatraveler': 'Deltatraveler',
  'diablo': 'Diablo',
  'dice-a-million': 'Dice A Million',
  'dinosaur': 'Dinosaur',
  'do-not-take-this-cat-home': 'Do Not Take This Cat Home',
  'doge-miner': 'Doge Miner',
  'doge-miner-2': 'Doge Miner 2',
  'dome-keeper': 'Dome Keeper',
  'doodle-jump': 'Doodle Jump',
  'doom': 'Doom',
  'doom-2': 'Doom 2',
  'doom-3': 'Doom 3',
  'doom-64': 'Doom 64',
  'dr-mario': 'Dr. Mario',
  'dreadhead-parkour': 'Dreadhead Parkour',
  'drift-boss': 'Drift Boss',
  'drift-hunter': 'Drift Hunter',
  'drive-mad': 'Drive Mad',
  'duck-life-1': 'Duck Life 1',
  'duck-life-2': 'Duck Life 2',
  'duck-life-3': 'Duck Life 3',
  'duck-life-4': 'Duck Life 4',
  'duck-life-5': 'Duck Life 5',
  'duck-life-6': 'Duck Life 6',
  'duck-life-7': 'Duck Life 7',
  'duck-life-8': 'Duck Life 8',
  'dumb-ways-to-die': 'Dumb Ways To Die',
  'eggy-car': 'Eggy Car',
  'escape-road': 'Escape Road',
  'escape-road-2': 'Escape Road 2',
  'escape-road-3': 'Escape Road 3',
  'escape-road-city-2': 'Escape Road City 2',
  'falling-fred': 'Falling Fred',
  'fallout': 'Fallout',
  'fallout-2': 'Fallout 2',
  'fancy-pants-adventures': 'Fancy Pants Adventures',
  'fancy-pants-adventures-2': 'Fancy Pants Adventures 2',
  'fancy-pants-adventures-3': 'Fancy Pants Adventures 3',
  'fears-to-fathom-home-alone': 'Fears To Fathom: Home Alone',
  'fez': 'FEZ',
  'final-fantasy-vii': 'Final Fantasy VII',
  'fireboy-and-watergirl': 'Fireboy and Watergirl',
  'fireboy-and-watergirl-2': 'Fireboy and Watergirl 2',
  'fireboy-and-watergirl-3': 'Fireboy and Watergirl 3',
  'fireboy-and-watergirl-4': 'Fireboy and Watergirl 4',
  'fish': 'FISH',
  'five-nights-at-candys': 'Five Nights At Candys',
  'five-nights-at-candys-2': 'Five Nights At Candys 2',
  'five-nights-at-epsteins': 'Five Nights At Epsteins',
  'five-nights-at-last-breath': 'Five Nights At Last Breath',
  'flappy-bird': 'Flappy bird',
  'flying-gorilla': 'Flying Gorilla',
  'fnaf': 'FNAF',
  'fnaf-sisters-location': 'FNAF Sisters Location',
  'fnaf-ultimate-custom-night': 'FNAF Ultimate Custom Night',
  'fnaf-world': 'FNAF World',
  'fnaf-world-refreshed': 'FNAF World Refreshed',
  'fnaf2': 'FNAF2',
  'fnaf3': 'FNAF3',
  'fnaf4': 'FNAF4',
  'fnaf4-halloween': 'FNAF4 Halloween',
  'fnaw': 'FNAW',
  'fnf-friday-night-funkin': 'Friday Night Funkin',
  'friday-night-funkin-bop-city': 'Friday Night Funkin Bop City',
  'football-bros': 'Football Bros',
  'fruit-ninja': 'Fruit Ninja',
  'fused240': 'Fused240',
  'gabriels-awesome-schoolhouse': 'Gabriel\\'s Awesome Schoolhouse',
  'gacha-life': 'Gacha Life',
  'gacha-verse': 'Gacha Verse',
  'getaway-shootout': 'Getaway Shootout',
  'geometry-dash': 'Geometry Dash',
  'getting-over-it': 'Getting Over It',
  'gladihoppers': 'Gladihoppers',
  'go-to-bed': 'Go to bed',
  'google-baseball': 'Google Baseball',
  'gorilla-tag': 'Gorilla Tag',
  'granny': 'Granny',
  'granny-2': 'Granny 2',
  'granny-3': 'Granny 3',
  'gravity-run': 'Gravity run',
  'greybox': 'Greybox',
  'gta-i': 'GTA I',
  'gta-ii': 'GTA II',
  'gta-iii': 'GTA III',
  'gta-san-andreas': 'GTA San Andreas',
  'gta-vice-city': 'GTA Vice City',
  'gun-mayhem': 'Gun Mayhem',
  'gun-mayhem-2': 'Gun Mayhem 2',
  'gun-mayhem-redux': 'Gun Mayhem Redux',
  'gunspin': 'Gunspin',
  'half-life': 'Half life',
  'half-life-2': 'Half life 2',
  'half-life-opposing-force': 'Half life: Opposing Force',
  'happy-wheels': 'Happy Wheels',
  'helltaker': 'Helltaker',
  'hollow-knight': 'Hollow Knight',
  'hotline-miami': 'Hotline Miami',
  'house-of-hazards': 'House Of Hazards',
  'human-expenditure-program': 'HUMAN EXPENDITURE PROGRAM',
  'ice-baby-quest-2': 'Ice Baby Quest 2',
  'idle-breakout': 'Idle Breakout',
  'iron-lung': 'Iron Lung',
  'jeffrey-epstein-basics-in-education-and-kidnapping': 'Jeffrey Epstein Basics In Education And Kidnapping',
  'jeffys-basics': 'Jeffys Basics',
  'jelly-drift': 'Jelly Drift',
  'jetpack-joyride': 'Jetpack Joyride',
  'jumbo-mario': 'Jumbo Mario',
  'karlson': 'Karlson',
  'karlson2d': 'Karlson2D',
  'kindergarten-1': 'Kindergarten 1',
  'kindergarten-2': 'Kindergarten 2',
  'kindergarten-3': 'Kindergarten 3',
  'kirby-soft-and-wet': 'Kirby Soft And Wet',
  'klifur': 'Klifur',
  'laceys-flash-games': 'Lacey\\'s Flash Games',
  'learn-to-fly': 'Learn To Fly',
  'learn-to-fly-2': 'Learn To Fly 2',
  'learn-to-fly-3': 'Learn To Fly 3',
  'learn-to-fly-idle': 'Learn To Fly Idle',
  'lego-star-wars': 'Lego Star Wars',
  'level-devil': 'Level Devil',
  'line-rider': 'Line Rider',
  'little-alchemy': 'Little Alchemy',
  'little-alchemy-2': 'Little Alchemy 2',
  'little-big-planet': 'Little Big Planet',
  'madness-melee': 'Madness Melee',
  'mario-kart-64': 'Mario Kart 64',
  'mario-kart-7': 'Mario Kart 7',
  'mario-kart-ds': 'Mario Kart DS',
  'mario-party-1': 'Mario Party 1',
  'mario-party-2': 'Mario Party 2',
  'mario-party-3': 'Mario Party 3',
  'megaman': 'Megaman',
  'melon-playground': 'Melon Playground',
  'merge-rot': 'Merge Rot',
  'milkman-karlson': 'Milkman karlson',
  'minecraft-1122': 'Minecraft 1.12.2',
  'minecraft-188': 'Minecraft 1.8.8',
  'minecraft-legacy-console-edition': 'Minecraft Legacy Console Edition',
  'minecraft-pocket-edition': 'Minecraft Pocket Edition',
  'minecraft-wurst': 'Minecraft Wurst',
  'minesweeper-mania': 'Minesweeper Mania',
  'minesweeper-plus': 'Minesweeper Plus',
  'monkey-mart': 'Monkey Mart',
  'moto-x3m': 'Moto X3M',
  'my-teardrop': 'My teardrop, daniel',
  'n-gon': 'n-gon',
  'nazi-zombies-portable': 'Nazi Zombies: Portable',
  'needy-streamer-overload': 'Needy Streamer Overload',
  'new-super-mario-bros': 'New Super Mario Bros',
  'node-buster': 'Node Buster',
  'nubbys-number-factory': 'Nubbys Number Factory',
  'om-nom-run': 'Om Nom Run',
  'omori': 'OMORI',
  'oneshot': 'Oneshot',
  'orange-roulette': 'Orange Roulette',
  'oshi-oshi-punch': 'Oshi Oshi Punch',
  'osu': 'Osu!',
  'overburden': 'Overburden',
  'ovo': 'OvO',
  'ovo-2': 'OvO 2',
  'ovo-dimensions': 'OvO Dimensions',
  'pacman': 'Pacman',
  'pacman-world': 'Pacman World',
  'pacman-world-2': 'Pacman World 2',
  'paint-gal-adventures': 'Paint Gal Adventures',
  'papas-bakeria': 'Papas Bakeria',
  'papas-burgeria': 'Papas Burgeria',
  'papas-cheeseria': 'Papas Cheeseria',
  'papas-donuteria': 'Papas Donuteria',
  'papas-freezeria': 'Papas Freezeria',
  'papas-pizzaeria': 'Papas Pizzaeria',
  'paper-mario': 'Paper Mario',
  'paperio-2': 'Paperio 2',
  'papers-please': 'Papers, Please',
  'parappa-the-rapper': 'Parappa The Rapper',
  'parappa-the-rapper-2': 'Parappa The Rapper 2',
  'peaks-of-yore': 'Peaks of Yore',
  'peggle': 'Peggle',
  'people-playground': 'People Playground',
  'pixel-gun-3d': 'Pixel Gun 3D',
  'pizza-tower': 'Pizza Tower',
  'pizza-tower-scoutdigo': 'Pizza Tower: Scoutdigo',
  'plants-vs-zombies': 'Plants VS Zombies',
  'plants-vs-zombies-garden-endless': 'Plants VS Zombies Garden Endless',
  'plauge-inc': 'Plauge Inc',
  'pokemon-academy-life-forever': 'Pokemon Academy Life Forever',
  'pokemon-blue': 'Pokemon Blue',
  'pokemon-crystal': 'Pokemon Crystal',
  'pokemon-emerald': 'Pokemon Emerald',
  'pokemon-gold': 'Pokemon Gold',
  'pokemon-red': 'Pokemon Red',
  'polytrack': 'Polytrack',
  'portal': 'Portal',
  'postal': 'Postal',
  'pretend-its-not-there': 'Pretend its not there',
  'quake': 'Quake',
  'quake-ii': 'Quake II',
  'quake-iii': 'Quake III',
  'raft-wars': 'Raft Wars',
  'raft-wars-2': 'Raft Wars 2',
  'raft': 'RAFT',
  'ragdoll-archers': 'Ragdoll Archers',
  'ragdoll-hit': 'Ragdoll Hit',
  'raldis-crack-house': 'Raldi\\'s Crack House',
  'rayman': 'Rayman',
  'rerun': 'RE:RUN',
  'repo': 'REPO',
  'resident-evil-1': 'Resident Evil 1',
  'resident-evil-2': 'Resident Evil 2',
  'retro-bowl': 'Retro Bowl',
  'retro-bowl-college': 'Retro Bowl College',
  'riddle-school': 'Riddle School',
  'riddle-school-2': 'Riddle School 2',
  'riddle-school-3': 'Riddle School 3',
  'riddle-school-4': 'Riddle School 4',
  'riddle-school-5': 'Riddle School 5',
  'riddle-school-transfer': 'Riddle School Transfer',
  'riddle-school-transfer-2': 'Riddle School Transfer 2',
  'rooftop-snipers': 'Rooftop Snipers',
  'rooftop-snipers-2': 'Rooftop Snipers 2',
  'run': 'Run',
  'run-2': 'Run 2',
  'run-3': 'Run 3',
  'running-fred': 'Running Fred',
  'saihate-station': 'Saihate Station',
  'sandboxels': 'Sandboxels',
  'sanic-ball': 'Sanic Ball',
  'scary-path': 'Scary Path',
  'schoolboy-runaway': 'Schoolboy Runaway',
  'shift-at-midnight': 'Shift At Midnight',
  'silksong': 'Silksong',
  'skibidi-shooter': 'Skibidi Shooter',
  'slender-the-8-pages': 'Slender: The 8 Pages',
  'slendytubbies': 'Slendytubbies',
  'slient-hill': 'Slient Hill',
  'slime-ranchers': 'Slime Ranchers',
  'slitherio': 'Slither.io',
  'slope': 'Slope',
  'slowroads': 'Slowroads',
  'sm64-super-mario-64': 'Super Mario 64',
  'super-mario-bros': 'Super Mario Bros',
  'super-mario-galaxy-ds': 'Super Mario Galaxy DS',
  'super-oliver-world': 'Super Oliver World',
  'super-smash-bros': 'Super Smash Bros',
  'smash-karts': 'Smash Karts',
  'snow-rider-3d': 'Snow Rider 3D',
  'snow-battle': 'Snow Battle',
  'soccer-bros': 'Soccer Bros',
  'soccer-random': 'Soccer Random',
  'solar-smash': 'Solar Smash',
  'solitaire': 'Solitaire',
  'sonic-1': 'Sonic 1',
  'sonic-2': 'Sonic 2',
  'sonic-3': 'Sonic 3',
  'sonic-4': 'Sonic 4',
  'sonic-3d-blast': 'Sonic 3D Blast',
  'sonic-cd': 'Sonic CD',
  'sonic-exe': 'Sonic EXE',
  'sonic-jam': 'Sonic Jam',
  'sonic-mania': 'Sonic Mania',
  'sonic-r': 'Sonic R',
  'sonic-robo-blast-2': 'Sonic Robo Blast 2',
  'sonic-robo-blast-2-kart': 'Sonic Robo Blast 2 KART',
  'sonic-world-next': 'Sonic World Next',
  'space-waves': 'Space waves',
  'spank-the-monkey': 'Spank the monkey, bogs favorites',
  'speed-stars': 'Speed Stars',
  'spelunky-classic-hd': 'Spelunky Classic HD',
  'starbound': 'Starbound',
  'stardew-valley': 'Stardew Valley',
  'stick-war-legacy': 'Stick War: Legacy',
  'stick-with-it': 'Stick With It',
  'stickman-hook': 'Stickman Hook',
  'subway-surfers': 'Subway Surfers',
  'super-hot': 'Super Hot',
  'super-meat-boy': 'Super Meat Boy',
  'super-monkey-ball-1-2': 'Super Monkey Ball 1 & 2',
  'super-monkey-ball-jr': 'Super Monkey Ball JR',
  'super-smash-flash': 'Super Smash Flash',
  'super-smash-flash-2': 'Super Smash Flash 2',
  'survivorio': 'Survivor.io',
  'taiko-no-tatsujini': 'Taiko No Tatsujini',
  'tanuki-sunset': 'Tanuki Sunset',
  'tattle-tail': 'Tattle Tail',
  'ten-basket': 'Ten Basket',
  'terraria': 'Terraria',
  'tetris': 'Tetris',
  'tetrisweeper': 'Tetrisweeper',
  'the-binding-of-issac': 'The Binding Of Issac',
  'the-binding-of-isaac-wrath-of-the-lamb': 'The Binding Of Isaac Wrath Of The Lamb',
  'the-binding-of-isaac-wrath-of-the-lamb-eternal': 'The Binding Of Isaac Wrath Of The Lamb: Eternal',
  'the-binding-of-issac-rebirth': 'The Binding Of Issac: Rebirth',
  'the-impossible-quiz': 'The Impossible Quiz',
  'the-legend-of-zelda-ocarina-of-time': 'The Legend of Zelda Ocarina of Time',
  'thats-not-my-neighbor': 'Thats Not My Neighbor',
  'there-is-no-game': 'There Is No Game',
  'time-shooter-1': 'Time Shooter 1',
  'time-shooter-2': 'Time Shooter 2',
  'time-shooter-3': 'Time Shooter 3',
  'tiny-fishing': 'Tiny Fishing',
  'to-the-core': 'To The Core',
  'tomb-of-the-mask': 'Tomb Of The Mask',
  'tomodachi-collection': 'Tomodachi Collection',
  'touhou-mother': 'Touhou Mother',
  'tube-jumpers': 'Tube Jumpers',
  'tung-tung-horror': 'Tung Tung Horror',
  'ultrakill': 'Ultrakill',
  'ultrapool': 'Ultrapool',
  'um-jammer-lammy': 'Um Jammer Lammy',
  'undertale': 'Undertale',
  'undertale-yellow': 'Undertale Yellow',
  'untitled-goose-game': 'Untitled Goose Game',
  'vampire-survivors': 'Vampire Survivors',
  'vex': 'Vex',
  'vex-2': 'Vex 2',
  'vex-3': 'Vex 3',
  'vex-4': 'Vex 4',
  'vex-5': 'Vex 5',
  'vex-6': 'Vex 6',
  'vex-7': 'Vex 7',
  'vex-8': 'Vex 8',
  'vib-ribbon': 'Vib-Ribbon',
  'volley-random': 'Volley Random',
  'warioware-diy': 'Warioware D.I.Y',
  'we-become-what-we-behold': 'We Become What We behold',
  'webfishing': 'Webfishing',
  'whos-your-daddy': 'Who\\'s Your Daddy',
  'witchs-heart': 'Witch\\'s Heart',
  'wordle': 'Wordle',
  'worlds-hardest-game': 'Worlds Hardest Game',
  'worlds-hardest-game-2': 'Worlds Hardest Game 2',
  'worlds-hardest-game-3': 'Worlds Hardest Game 3',
  'woodys-incredible-journey-to-the-escape-from-eternal-terror': 'Woody\\'s Incredible Journey To The Escape From Eternal Terror',
  'yandere-simulator': 'Yandere Simulator',
  'yoked': 'Yoked',
  'your-only-move-is-hustle': 'Your Only Move Is HUSTLE, YOMI Hustle',
  'yume-nikki': 'Yume Nikki'
};

async function loadTruffledGames() {
  try {
    const res  = await fetch(TRUFFLED_API);
    if (!res.ok) return [];
    const data = await res.json();
    const seen = new Set();
    return (data.files || [])
      .filter(f => typeof f.name === 'string' && f.name.endsWith('.html'))
      .map(f => {
        const filename = f.name.replace(/^\\//, '').replace(/\\.html$/i,'');
        if (seen.has(filename)) return null;
        seen.add(filename);
        // Use hardcoded name map, fall back to title-cased folder name
        const name = TRUFFLED_NAMES[filename] || (function(){
          const SMALL = new Set(['a','an','the','and','but','or','for','nor','on','at','to','by','in','of','up','as','vs','vs.']);
          return filename.split('-').map((w,i) =>
            (i === 0 || !SMALL.has(w.toLowerCase()))
              ? w.charAt(0).toUpperCase() + w.slice(1)
              : w.toLowerCase()
          ).join(' ');
        })();
        const gameUrl = TRUFFLED_BASE + '/unityframe.html?url=' + encodeURIComponent('/games/' + filename + '/index.html');
        return { gameId: 'tr-' + filename.replace(/[^a-z0-9]/gi,'-'), name, rawUrl: gameUrl, source: 'truffled' };
      })
      .filter(Boolean);
  } catch { return []; }
}


// ── Extra curated games ────────────────────────────────────────────────────
const EXTRA_GAMES = [
  // ── .io Multiplayer ──────────────────────────────────────────────────────
  { name: 'Krunker.io',             url: 'https://krunker.io/' },
  { name: 'Shell Shockers',         url: 'https://shellshockers.io/' },
  { name: 'Agar.io',                url: 'https://agar.io/' },
  { name: 'Diep.io',                url: 'https://diep.io/' },
  { name: 'Bonk.io',                url: 'https://bonk.io/' },
  { name: 'Skribbl.io',             url: 'https://skribbl.io/' },
  { name: 'Gartic.io',              url: 'https://gartic.io/' },
  { name: 'Moomoo.io',              url: 'https://moomoo.io/' },
  { name: 'Paper.io',               url: 'https://paper-io.com/' },
  { name: 'Wormate.io',             url: 'https://wormate.io/' },
  { name: 'Zombs.io',               url: 'https://zombs.io/' },
  { name: 'Stabfish.io',            url: 'https://stabfish.io/' },
  { name: 'Superhex.io',            url: 'https://superhex.io/' },
  { name: 'Hole.io',                url: 'https://hole.io/' },
  { name: 'Tanki Online',           url: 'https://tankionline.com/' },
  { name: 'Narwhale.io',            url: 'https://narwhale.io/' },
  { name: 'Survev.io',              url: 'https://survev.io/' },
  { name: 'Lordz.io',               url: 'https://www.lordz.io/' },
  { name: 'Snowball.io',            url: 'https://snowball.io/' },
  { name: 'Repuls.io',              url: 'https://repuls.io/' },
  { name: 'Warbrokers.io',          url: 'https://warbrokers.io/' },
  { name: 'Ev.io',                  url: 'https://ev.io/' },
  { name: 'Wings.io',               url: 'https://wings.io/' },
  { name: 'Defly.io',               url: 'https://defly.io/' },
  { name: 'Hexar.io',               url: 'https://hexar.io/' },
  { name: 'Spinz.io',               url: 'https://spinz.io/' },
  { name: 'Starblast.io',           url: 'https://starblast.io/' },
  { name: 'Brutes.io',              url: 'https://brutes.io/' },
  { name: 'Gulper.io',              url: 'https://gulper.io/' },
  { name: 'Gats.io',                url: 'https://gats.io/' },
  { name: 'Brutal.io',              url: 'https://brutal.io/' },
  { name: 'Zlax.io',                url: 'https://zlax.io/' },
  { name: 'Taming.io',              url: 'https://taming.io/' },
  { name: 'Sushi Party',            url: 'https://sushiparty.io/' },
  { name: 'Florr.io',               url: 'https://florr.io/' },
  { name: 'Gemix.io',               url: 'https://gemix.io/' },
  { name: 'Foes.io',                url: 'https://foes.io/' },
  { name: 'Yohoho.io',              url: 'https://yohoho.io/' },
  { name: 'BigShot.io',             url: 'https://bigshot.io/' },
  { name: 'Sploop.io',              url: 'https://sploop.io/' },
  { name: 'Bloxd.io',               url: 'https://bloxd.io/' },
  { name: 'Kirka.io',               url: 'https://kirka.io/' },
  { name: 'Venge.io',               url: 'https://venge.io/' },
  { name: 'Zombs Royale',           url: 'https://zombsroyale.io/' },
  { name: 'Lordz2.io',              url: 'https://www.lordz2.io/' },
  { name: 'Territorial.io',         url: 'https://territorial.io/' },
  { name: 'Chompers.io',            url: 'https://chompers.io/' },
  { name: 'Agario Classic',         url: 'https://agarioplay.com/' },
];

function loadExtraGames() {
  return EXTRA_GAMES.map((g, i) => ({
    gameId:  'ex-' + i,
    name:    g.name,
    rawUrl:  g.url,
    source:  'extras',
  }));
}

let gamesLoaded  = false;
let gamesLoading = false;

async function loadAndRenderGames() {
  if (gamesLoaded || gamesLoading) return;
  gamesLoading = true;

  const list    = document.getElementById('games-list');
  const countEl = document.getElementById('panel-game-count');
  list.innerHTML = '<span class="loading-text">loading games...</span>';

  try {
    const [fbGames, trGames] = await Promise.all([loadFreebuisnessGames(), loadTruffledGames()]);
    const extraGames = loadExtraGames();
    const allGames = [...fbGames, ...trGames, ...extraGames];

    if (!allGames.length) {
      list.innerHTML = '<span class="loading-text">could not load games</span>';
      gamesLoading = false;
      return;
    }

    const frag     = document.createDocumentFragment();
    const seen     = new Set();   // by gameId
    const seenNames = new Set();  // by normalized name — prevents cross-source dupes

    function normName(n) {
      return n.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/\\s+/g, '');
    }

    allGames.forEach(g => {
      if (seen.has(g.gameId)) return;
      const nn = normName(g.name);
      if (seenNames.has(nn)) return;
      seen.add(g.gameId);
      seenNames.add(nn);
      const proxyUrl = window.PROXY_BASE ? window.PROXY_BASE + g.rawUrl : g.rawUrl + '?t=' + Date.now();
      frag.appendChild(_makeGameLink(proxyUrl, g.name, g.gameId, g.source, g.rawUrl));
    });

    list.innerHTML = '';
    list.appendChild(frag);
    if (countEl) countEl.textContent = seen.size + ' games';

    const searchInput = document.getElementById('game-search');
    if (searchInput) {
      searchInput.value = '';
      searchInput.addEventListener('input', applyGameFilter);
    }
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        applyGameFilter();
      });
    });

    applyCustomNamesToDOM();
    refreshCounterUI();
    applyGameFilter();

    const snap = JSON.stringify([...seen]);
    const prev = localStorage.getItem('cowboysstuff_game_snap');
    if (prev) {
      const prevSet  = new Set(JSON.parse(prev));
      const newCount = [...seen].filter(id => !prevSet.has(id)).length;
      const badge    = document.getElementById('new-games-badge');
      if (badge && newCount > 0) { badge.textContent = '+' + newCount + ' new'; badge.hidden = false; }
    }
    localStorage.setItem('cowboysstuff_game_snap', snap);

    gamesLoaded  = true;
  } catch(err) {
    list.innerHTML = '<span class="loading-text">could not load games</span>';
  }
  gamesLoading = false;
}

function _makeGameLink(href, name, gameId, source, rawUrlOverride) {
  const a      = document.createElement('a');
  const rawUrl = rawUrlOverride || (href.startsWith(window.PROXY_BASE||'_') ? href.slice((window.PROXY_BASE||'').length) : href);
  const displayName = getGameName(gameId, name);
  a.className       = 'panel-link game-link';
  a.href            = '#';
  a.dataset.game    = gameId;
  a.dataset.source  = source;
  a.dataset.rawUrl  = rawUrl;
  a.dataset.defaultName = name;
  a.dataset.displayName = displayName;
  a.target          = '_self';
  a.addEventListener('click', e => {
    e.preventDefault();
    const currentName = getGameName(gameId, name);
    openGameInfo({ gameId, name: currentName, source, rawUrl, href });
  });
  const ns = document.createElement('span'); ns.className = 'game-name'; ns.textContent = displayName;
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
    const matchQ = !q || (nameEl && nameEl.textContent.toLowerCase().includes(q)) || (link.dataset.defaultName||'').toLowerCase().includes(q);
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
  const panels  = {
    games:        document.getElementById('panel-games'),
    apps:         document.getElementById('panel-extra'),
    notes:        document.getElementById('panel-notes'),
    achievements: document.getElementById('panel-achievements'),
    collections:  document.getElementById('panel-collections'),
    leaderboard:  document.getElementById('panel-leaderboard'),
    ai:           document.getElementById('panel-ai'),
  };
  const navBtns = {
    games:        document.getElementById('nav-games'),
    apps:         document.getElementById('nav-apps'),
    achievements: document.getElementById('nav-achievements'),
    collections:  document.getElementById('nav-collections'),
    ai:           document.getElementById('nav-ai'),
    notes:        document.getElementById('nav-notes'),
  };
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
    else if (k === 'K') toggle('achievements');
    else if (k === 'C') toggle('collections');
    else if (k === 'L') toggle('leaderboard');
    else if (k === 'I') toggle('ai');
    else if (k === 'N') toggle('notes');
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
  if (renameRow) renameRow.hidden = true;
  const displayedName = getGameName(game.gameId || game.id || '', game.name);
  document.getElementById('gi-title').textContent = displayedName;
  // Update pin button
  const _pinBtn = document.getElementById('gi-pin-btn');
  if (_pinBtn && window.isPinned) {
    _pinBtn.textContent = window.isPinned(game.gameId) ? '📌 pinned' : '📌 pin';
    _pinBtn.onclick = () => {
      window.togglePin(game.gameId, displayedName, game.rawUrl);
    };
  }
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

  const rawUrl    = game.rawUrl || game.url || '';
  const linkTarget = getLinkTarget ? getLinkTarget() : '_self';

  if (window.PROXY_BASE && rawUrl) {
    // Load the game URL through the proxy directly
    const proxied = window.PROXY_BASE + rawUrl;
    if (linkTarget === '_blank') window.open(proxied, '_blank');
    else window.location.href = proxied;
    return;
  }

  // No proxy — open raw URL directly in new tab
  if (rawUrl) {
    window.open(rawUrl, '_blank');
    return;
  }

  // Fallback to game.html wrapper
  const fsDefault = localStorage.getItem(FS_DEFAULT_KEY) === 'on';
  const finalHref = fsDefault ? href + '&fs=1' : href;
  if (linkTarget === '_blank') window.open(finalHref, '_blank');
  else window.location.href = finalHref;
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('game-info-overlay');
  if (!overlay) return;

  // Rename game
  const renameBtn   = document.getElementById('gi-rename-btn');
  const renameRow   = document.getElementById('gi-rename-row');
  const renameInput = document.getElementById('gi-rename-input');
  const renameSave  = document.getElementById('gi-rename-save');
  const renameClear = document.getElementById('gi-rename-clear');

  renameBtn?.addEventListener('click', () => {
    if (!_pendingGame) return;
    renameRow.hidden = false;
    renameInput.value = getGameName(_pendingGame.gameId, _pendingGame.name);
    renameInput.focus();
    renameInput.select();
  });

  function applyRename() {
    if (!_pendingGame) return;
    const id  = _pendingGame.gameId;
    const val = renameInput.value.trim();
    if (!val) return;
    setGameName(id, val);
    // Update modal title
    document.getElementById('gi-title').textContent = val;
    // Update DOM link
    const link = document.querySelector('.game-link[data-game="' + id + '"] .game-name');
    if (link) { link.textContent = val; }
    _pendingGame.name = val;
    renameRow.hidden = true;
    toast('name saved');
  }

  renameSave?.addEventListener('click', applyRename);
  renameInput?.addEventListener('keydown', e => { if (e.key === 'Enter') applyRename(); if (e.key === 'Escape') renameRow.hidden = true; });
  renameClear?.addEventListener('click', () => {
    if (!_pendingGame) return;
    clearGameName(_pendingGame.gameId);
    const def = _pendingGame.defaultName || _pendingGame.name;
    document.getElementById('gi-title').textContent = def;
    const link = document.querySelector('.game-link[data-game="' + _pendingGame.gameId + '"] .game-name');
    if (link) link.textContent = def;
    renameInput.value = def;
    renameRow.hidden = true;
    toast('name reset');
  });

  document.getElementById('gi-play-btn')?.addEventListener('click', () => {
    overlay.classList.add('hidden');
    if (_pendingGame) playGame(_pendingGame);
  });

  document.getElementById('gi-close')?.addEventListener('click', () => {
    overlay.classList.add('hidden');
    _pendingGame = null;
    if (renameRow) renameRow.hidden = true;
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
  'cowboysstuff_game_names',
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
  'cowboysstuff_game_names',
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

// ── AI Chat ────────────────────────────────────────────────────
(function initAiChat() {
  const API_KEY  = 'sk-navy-qGpaQOidm4dVweVspfUDbqJAnJRAibjIGCHR_GVu2Bw';
  const API_BASE = 'https://api.navy/v1';
  const MODEL    = 'gpt-4.1';
  const HISTORY_KEY = 'cowboysstuff_ai_history';
  const MAX_HISTORY = 40; // messages to keep in memory

  let history = [];
  let busy    = false;

  function loadHistory() {
    try { history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { history = []; }
  }
  function saveHistory() {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-MAX_HISTORY))); }
    catch {}
  }

  function scrollBottom() {
    const msgs = document.getElementById('ai-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function addBubble(role, text) {
    const msgs = document.getElementById('ai-messages');
    if (!msgs) return null;
    const div = document.createElement('div');
    div.className = 'ai-msg ' + role;
    div.textContent = text;
    msgs.appendChild(div);
    scrollBottom();
    return div;
  }

  function renderHistory() {
    const msgs = document.getElementById('ai-messages');
    if (!msgs) return;
    msgs.innerHTML = '';
    history.forEach(m => addBubble(m.role, m.content));
  }

  async function sendMessage(text) {
    if (busy || !text.trim()) return;
    busy = true;

    const input   = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send-btn');
    if (input)   input.value = '';
    if (sendBtn) sendBtn.disabled = true;

    history.push({ role: 'user', content: text });
    addBubble('user', text);

    const thinking = addBubble('thinking', '');
    if (thinking) thinking.innerHTML = 'thinking<span class="ai-thinking-dots"></span>';

    try {
      const res = await fetch(API_BASE + '/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + API_KEY,
        },
        body: JSON.stringify({
          model:    MODEL,
          messages: [
            { role: 'system', content: 'You are a helpful assistant on cowboysstuff, an unblocked games site. Keep replies concise and friendly.' },
            ...history.slice(-20),
          ],
          stream: true,
        }),
      });

      if (!res.ok) throw new Error('API error ' + res.status);

      // Remove thinking bubble, create streaming bubble
      if (thinking && thinking.parentNode) thinking.parentNode.removeChild(thinking);
      const bubble = addBubble('assistant', '');
      let full = '';

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\\n')) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (!trimmed.startsWith('data: ')) continue;
          try {
            const json  = JSON.parse(trimmed.slice(6));
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              full += delta;
              if (bubble) bubble.textContent = full;
              scrollBottom();
            }
          } catch {}
        }
      }

      if (full) {
        history.push({ role: 'assistant', content: full });
        saveHistory();
      }

    } catch (err) {
      if (thinking && thinking.parentNode) thinking.parentNode.removeChild(thinking);
      addBubble('error', 'Error: ' + (err.message || 'could not reach AI'));
    }

    busy = false;
    if (sendBtn) sendBtn.disabled = false;
    if (input)   input.focus();
  }

  // Wire nav button
  document.addEventListener('DOMContentLoaded', () => {
    loadHistory();

    const navAi = document.getElementById('nav-ai');
    if (navAi) {
      navAi.addEventListener('click', () => {
        const panel = document.getElementById('panel-ai');
        const isOpen = panel && !panel.hidden;
        // Close all panels first (reuse existing closeAll or just toggle)
        if (typeof window._closeNav === 'function') window._closeNav();
        if (!isOpen && panel) {
          panel.hidden = false;
          renderHistory();
          setTimeout(() => {
            const input = document.getElementById('ai-input');
            if (input) input.focus();
          }, 50);
        }
      });
    }

    const sendBtn = document.getElementById('ai-send-btn');
    const input   = document.getElementById('ai-input');
    const clearBtn = document.getElementById('ai-clear-btn');

    if (sendBtn) sendBtn.addEventListener('click', () => {
      const v = input?.value.trim();
      if (v) sendMessage(v);
    });

    if (input) input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const v = input.value.trim();
        if (v) sendMessage(v);
      }
    });

    if (clearBtn) clearBtn.addEventListener('click', () => {
      history = [];
      saveHistory();
      const msgs = document.getElementById('ai-messages');
      if (msgs) msgs.innerHTML = '';
    });
  });

  // Keyboard shortcut: I key
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.key === 'i' || e.key === 'I') {
      const navAi = document.getElementById('nav-ai');
      if (navAi) navAi.click();
    }
  });
})();

// ── Tab Cloaking ───────────────────────────────────────────────────────────
(function initTabCloak() {
  const CLOAK_KEY = 'cowboysstuff_cloak';
  const CLOAKS = {
    gdocs:    { title: 'Document — Google Docs',         favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
    gclass:   { title: 'Stream — Google Classroom',      favicon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    gdrive:   { title: 'My Drive — Google Drive',        favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
    khan:     { title: 'Khan Academy',                   favicon: 'https://cdn.kastatic.org/images/favicon.ico' },
    desmos:   { title: 'Desmos | Graphing Calculator',   favicon: 'https://www.desmos.com/assets/img/apps/graphing/favicon.ico' },
    wiki:     { title: 'Wikipedia, the free encyclopedia', favicon: 'https://en.wikipedia.org/favicon.ico' },
    canvas:   { title: 'Dashboard - Canvas',             favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico' },
    quizlet:  { title: 'Quizlet',                        favicon: 'https://quizlet.com/favicon.ico' },
    newsela:  { title: 'Newsela | Instructional Content Hub', favicon: 'https://newsela.com/static/img/favicon.ico' },
    duolingo: { title: 'Learn a language for free — Duolingo', favicon: 'https://d35aaqx5ub95lt.cloudfront.net/favicon.ico' },
  };

  let _origTitle   = document.title;
  let _origFavicon = null;

  function getFaviconEl() {
    let el = document.querySelector("link[rel~='icon']");
    if (!el) { el = document.createElement('link'); el.rel = 'icon'; document.head.appendChild(el); }
    return el;
  }

  function applyCloak(val) {
    const el = getFaviconEl();
    if (!_origFavicon) _origFavicon = el.href;
    if (!val || !CLOAKS[val]) {
      document.title = _origTitle;
      el.href = _origFavicon;
      localStorage.removeItem(CLOAK_KEY);
      return;
    }
    const c = CLOAKS[val];
    document.title = c.title;
    el.href = c.favicon;
    localStorage.setItem(CLOAK_KEY, val);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('cloak-select');
    const saved = localStorage.getItem(CLOAK_KEY) || '';
    if (saved && sel) sel.value = saved;
    applyCloak(saved);
    if (sel) sel.addEventListener('change', () => applyCloak(sel.value));
  });
})();

// ── Quick Pinned Games Bar ─────────────────────────────────────────────────
(function initPinnedBar() {
  const PINNED_KEY = 'cowboysstuff_pinned';
  const MAX_PINS   = 8;

  function getPinned() {
    try { return JSON.parse(localStorage.getItem(PINNED_KEY) || '[]'); } catch { return []; }
  }
  function savePinned(arr) {
    localStorage.setItem(PINNED_KEY, JSON.stringify(arr.slice(0, MAX_PINS)));
  }
  function isPinned(gameId) { return getPinned().includes(gameId); }

  function togglePin(gameId, name, rawUrl) {
    const pins = getPinned();
    const idx  = pins.indexOf(gameId);
    if (idx >= 0) { pins.splice(idx, 1); savePinned(pins); toast('unpinned'); }
    else if (pins.length >= MAX_PINS) { toast('max ' + MAX_PINS + ' pins'); return; }
    else { pins.push(gameId); savePinned(pins); toast('pinned!'); }
    renderPinnedBar();
    updatePinBtn(gameId);
  }

  function updatePinBtn(gameId) {
    const btn = document.getElementById('gi-pin-btn');
    if (btn) btn.textContent = isPinned(gameId) ? '📌 pinned' : '📌 pin';
  }

  function renderPinnedBar() {
    const bar  = document.getElementById('pinned-bar');
    const pins = getPinned();
    if (!bar) return;
    bar.innerHTML = '';
    if (!pins.length) { bar.hidden = true; return; }
    bar.hidden = false;

    pins.forEach(gameId => {
      // Find game in DOM
      const link = document.querySelector('.game-link[data-game="' + gameId + '"]');
      const name = link?.querySelector('.game-name')?.textContent || gameId;
      const rawUrl = link?.dataset?.rawUrl || '';

      const chip = document.createElement('button');
      chip.className = 'pinned-chip';
      chip.textContent = name;
      chip.title = name;
      chip.addEventListener('click', () => {
        const game = { gameId, name, rawUrl };
        playGame(game);
      });
      chip.addEventListener('contextmenu', e => {
        e.preventDefault();
        togglePin(gameId, name, rawUrl);
      });
      bar.appendChild(chip);
    });
  }

  window.togglePin    = togglePin;
  window.isPinned     = isPinned;
  window.renderPinnedBar = renderPinnedBar;
  window.updatePinBtn = updatePinBtn;

  document.addEventListener('DOMContentLoaded', renderPinnedBar);
})();

// ── Home Screen Stats ───────────────────────────────────────────────────────
(function initHomeStats() {
  function update() {
    const totalEl  = document.getElementById('stat-total-games');
    const playsEl  = document.getElementById('stat-total-plays');
    const timeEl   = document.getElementById('stat-total-time');
    const favsEl   = document.getElementById('stat-favs');

    if (totalEl) {
      const count = document.querySelectorAll('.game-link').length;
      totalEl.textContent = count > 0 ? count + '+' : '1200+';
    }

    const counts = (() => {
      try { return JSON.parse(localStorage.getItem('cowboysstuff_counts') || '{}'); } catch { return {}; }
    })();
    const total = Object.values(counts).reduce((a, b) => a + (Number(b) || 0), 0);
    if (playsEl) playsEl.textContent = total;

    // Session time in minutes
    const sessionMs = Date.now() - (window._sessionStart || Date.now());
    const totalMs   = parseInt(localStorage.getItem('cowboysstuff_total_time') || '0') + sessionMs;
    const mins      = Math.floor(totalMs / 60000);
    if (timeEl) timeEl.textContent = mins < 60 ? mins + 'm' : Math.floor(mins/60) + 'h ' + (mins%60) + 'm';

    const favs = (() => {
      try { return JSON.parse(localStorage.getItem('cowboysstuff_favs') || '[]'); } catch { return []; }
    })();
    if (favsEl) favsEl.textContent = favs.length;
  }

  document.addEventListener('DOMContentLoaded', () => {
    update();
    setInterval(update, 10000);
  });
  window._updateHomeStats = update;
})();

// ── Konami Code ────────────────────────────────────────────────────────────
(function initKonami() {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[pos]) {
      pos++;
      if (pos === KONAMI.length) {
        pos = 0;
        window.achUnlock?.('konami');
        launchConfetti();
        toast('↑↑↓↓←→←→BA — you know the code');
      }
    } else {
      pos = e.key === KONAMI[0] ? 1 : 0;
    }
  });
})();

// ── Achievement triggers for new achievements ──────────────────────────────
(function initNewAchTriggers() {
  // AI chat achievement
  const origSend = window.sendMessage;
  let aiMsgCount = parseInt(localStorage.getItem('cowboysstuff_ai_msgs') || '0');

  // Boss key counter
  let bossKeyCount = parseInt(localStorage.getItem('cowboysstuff_boss_count') || '0');
  document.addEventListener('keydown', e => {
    if (e.key === '\`') {
      bossKeyCount++;
      localStorage.setItem('cowboysstuff_boss_count', bossKeyCount);
      if (bossKeyCount >= 10) window.achUnlock?.('boss-key-10');
    }
  });

  // Cloak achievement
  const cloakSel = document.getElementById('cloak-select');
  if (cloakSel) {
    cloakSel.addEventListener('change', () => {
      if (cloakSel.value) window.achUnlock?.('cloak');
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      const sel = document.getElementById('cloak-select');
      if (sel) sel.addEventListener('change', () => {
        if (sel.value) window.achUnlock?.('cloak');
      });
    });
  }

  // Pin achievements
  window._origTogglePin = window.togglePin;
  const origTogglePin = window.togglePin;
  window.togglePin = function(gameId, name, rawUrl) {
    origTogglePin(gameId, name, rawUrl);
    const pins = JSON.parse(localStorage.getItem('cowboysstuff_pinned') || '[]');
    if (pins.length >= 1) window.achUnlock?.('pin-game');
    if (pins.length >= 5) window.achUnlock?.('pin-5');
  };

  // Rename achievement
  const origSetGameName = window.setGameName;
  if (typeof setGameName !== 'undefined') {
    window.achUnlock?.('rename-game');
  }

  // Weekend achievement
  const day = new Date().getDay();
  if (day === 0 || day === 6) {
    const played = JSON.parse(localStorage.getItem('cowboysstuff_weekend_days') || '[]');
    if (!played.includes(day)) {
      played.push(day);
      localStorage.setItem('cowboysstuff_weekend_days', JSON.stringify(played));
      if (played.includes(0) && played.includes(6)) window.achUnlock?.('weekend');
    }
  }

  // Monday
  if (new Date().getDay() === 1) window.achUnlock?.('monday');

  // Early bird
  const hour = new Date().getHours();
  if (hour < 7) window.achUnlock?.('early-bird');

  // New Year
  const now = new Date();
  if (now.getMonth() === 0 && now.getDate() === 1) window.achUnlock?.('new-year');

  // Time achievements - check on page load
  function checkTimeAchs() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith('cowboysstuff_ptime_')) total += parseInt(localStorage.getItem(k)||'0',10);
    }
    const hrs = total / 3600000;
    if (hrs >= 1)   window.achUnlock?.('time-1h');
    if (hrs >= 5)   window.achUnlock?.('time-5h');
    if (hrs >= 24)  window.achUnlock?.('time-24h');
    if (hrs >= 100) window.achUnlock?.('time-100h');
  }
  setTimeout(checkTimeAchs, 2000);

  // Games played count
  function checkGamesAchs() {
    const counts = JSON.parse(localStorage.getItem('cowboysstuff_counts') || '{}');
    const unique = Object.keys(counts).length;
    if (unique >= 25)  window.achUnlock?.('games-25');
    if (unique >= 50)  window.achUnlock?.('games-50');
    if (unique >= 100) window.achUnlock?.('games-100');
    if (unique >= 200) window.achUnlock?.('games-200');

    // Hooked - same game many times
    const max = Math.max(...Object.values(counts).map(Number));
    if (max >= 20)  window.achUnlock?.('hooked');
    if (max >= 50)  window.achUnlock?.('addicted');
    if (max >= 100) window.achUnlock?.('main-game');
  }
  setTimeout(checkGamesAchs, 3000);
})();

// ── Screen Guard (GoGuardian / Aristotle / etc.) ───────────────────────────
(function initScreenGuard() {
  const SG_KEY      = 'cowboysstuff_sg_on';
  const SG_MODE_KEY = 'cowboysstuff_sg_mode';

  // Fake page HTML for each mode
  const MODES = {
    gdocs: () => \`
      <style>
        body{margin:0;font-family:Arial,sans-serif;background:#fff;color:#202124;}
        .gdocs-bar{height:64px;background:#fff;border-bottom:1px solid #e0e0e0;display:flex;align-items:center;padding:0 16px;gap:12px;}
        .gdocs-icon{width:32px;height:32px;background:#4285f4;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:bold;}
        .gdocs-title{font-size:18px;color:#202124;}
        .gdocs-menu{display:flex;gap:0;margin-left:8px;}
        .gdocs-menu span{font-size:13px;padding:4px 10px;cursor:pointer;border-radius:3px;}
        .gdocs-menu span:hover{background:#f1f3f4;}
        .gdocs-toolbar{height:40px;background:#f8f9fa;border-bottom:1px solid #e0e0e0;display:flex;align-items:center;padding:0 16px;gap:8px;}
        .gdocs-body{max-width:816px;min-height:1056px;margin:32px auto;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.2);padding:96px 96px;font-size:11pt;line-height:1.5;color:#202124;}
        .gdocs-h1{font-size:20pt;font-weight:bold;margin-bottom:16px;}
        .gdocs-cursor{display:inline-block;width:2px;height:18px;background:#4285f4;animation:blink 1s step-end infinite;vertical-align:text-bottom;margin-left:1px;}
        @keyframes blink{50%{opacity:0}}
        .tb-btn{width:24px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;color:#444;}
        .tb-btn:hover{background:#e8eaed;}
        .tb-sep{width:1px;height:20px;background:#e0e0e0;margin:0 4px;}
      </style>
      <div class="gdocs-bar">
        <div class="gdocs-icon">D</div>
        <div>
          <div class="gdocs-title">Notes - Chapter 5</div>
          <div class="gdocs-menu">
            <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Extensions</span><span>Help</span>
          </div>
        </div>
      </div>
      <div class="gdocs-toolbar">
        <div class="tb-btn">↩</div><div class="tb-btn">↪</div>
        <div class="tb-sep"></div>
        <div class="tb-btn" style="font-size:11px;width:60px">100% ▾</div>
        <div class="tb-sep"></div>
        <div class="tb-btn" style="font-size:11px;width:80px">Normal t... ▾</div>
        <div class="tb-sep"></div>
        <div class="tb-btn" style="font-size:11px;width:70px">Arial ▾</div>
        <div class="tb-sep"></div>
        <div class="tb-btn" style="width:40px;font-size:11px">11 ▾</div>
        <div class="tb-sep"></div>
        <div class="tb-btn" style="font-weight:bold">B</div>
        <div class="tb-btn" style="font-style:italic">I</div>
        <div class="tb-btn" style="text-decoration:underline">U</div>
      </div>
      <div class="gdocs-body" contenteditable="true" spellcheck="false">
        <div class="gdocs-h1">Chapter 5 Study Notes<span class="gdocs-cursor"></span></div>
        <p>Key vocabulary terms from today's reading:</p>
        <p><strong>Photosynthesis</strong> — the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.</p>
        <p><strong>Mitosis</strong> — a type of cell division resulting in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.</p>
        <p><br></p>
        <p>The main themes discussed in class today include the water cycle, cellular respiration, and the importance of ecosystems in maintaining biological diversity.</p>
        <p><br></p>
        <p>For tomorrow: review pages 112–134 and complete the worksheet on photosynthesis reactions.</p>
      </div>\`,

    gclass: () => \`
      <style>
        body{margin:0;font-family:'Google Sans',Roboto,Arial,sans-serif;background:#f1f3f4;color:#202124;}
        .gc-header{height:64px;background:#fff;border-bottom:1px solid #e0e0e0;display:flex;align-items:center;padding:0 24px;gap:16px;box-shadow:0 1px 3px rgba(0,0,0,.1);}
        .gc-logo{color:#1a73e8;font-size:22px;font-weight:500;}
        .gc-logo span{color:#34a853;}
        .gc-nav{display:flex;gap:4px;margin-left:auto;}
        .gc-nav-item{padding:8px 16px;border-radius:4px;font-size:14px;cursor:pointer;color:#5f6368;}
        .gc-nav-item:hover{background:#f1f3f4;}
        .gc-nav-item.active{color:#1a73e8;background:#e8f0fe;}
        .gc-main{max-width:900px;margin:24px auto;padding:0 16px;}
        .gc-card{background:#fff;border-radius:8px;padding:24px;margin-bottom:16px;box-shadow:0 1px 2px rgba(0,0,0,.1);}
        .gc-class-header{height:200px;background:linear-gradient(135deg,#1a73e8,#34a853);border-radius:8px 8px 0 0;padding:24px;color:#fff;margin:-24px -24px 16px;}
        .gc-class-name{font-size:28px;font-weight:500;margin-top:80px;}
        .gc-class-section{font-size:16px;opacity:.85;}
        .gc-assignment{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid #e0e0e0;}
        .gc-assignment:last-child{border-bottom:none;}
        .gc-assign-icon{width:40px;height:40px;border-radius:50%;background:#e8f0fe;display:flex;align-items:center;justify-content:center;color:#1a73e8;font-size:20px;flex-shrink:0;}
        .gc-assign-title{font-size:14px;font-weight:500;}
        .gc-assign-due{font-size:12px;color:#5f6368;margin-top:2px;}
        .gc-due-chip{background:#fce8e6;color:#c5221f;border-radius:4px;padding:2px 8px;font-size:11px;margin-left:8px;}
      </style>
      <div class="gc-header">
        <div class="gc-logo">Google <span>Classroom</span></div>
        <div class="gc-nav">
          <div class="gc-nav-item active">Stream</div>
          <div class="gc-nav-item">Classwork</div>
          <div class="gc-nav-item">People</div>
          <div class="gc-nav-item">Grades</div>
        </div>
      </div>
      <div class="gc-main">
        <div class="gc-card">
          <div class="gc-class-header">
            <div class="gc-class-name">Biology — Period 3</div>
            <div class="gc-class-section">Mr. Johnson · Room 204</div>
          </div>
          <div class="gc-assignment">
            <div class="gc-assign-icon">📋</div>
            <div><div class="gc-assign-title">Chapter 5 Reading Quiz <span class="gc-due-chip">Due today</span></div><div class="gc-assign-due">Posted 8:30 AM · 10 points</div></div>
          </div>
          <div class="gc-assignment">
            <div class="gc-assign-icon">📄</div>
            <div><div class="gc-assign-title">Photosynthesis Worksheet</div><div class="gc-assign-due">Posted yesterday · Due Friday · 25 points</div></div>
          </div>
          <div class="gc-assignment">
            <div class="gc-assign-icon">📹</div>
            <div><div class="gc-assign-title">Watch: Cellular Respiration Video</div><div class="gc-assign-due">Posted Monday · No due date</div></div>
          </div>
        </div>
      </div>\`,

    khan: () => \`
      <style>
        body{margin:0;font-family:Lato,Arial,sans-serif;background:#fff;color:#21242c;}
        .kh-header{height:56px;background:#1c1d1f;display:flex;align-items:center;padding:0 20px;gap:20px;}
        .kh-logo{color:#14bf96;font-size:20px;font-weight:bold;}
        .kh-nav{display:flex;gap:4px;}
        .kh-nav a{color:#fff;text-decoration:none;font-size:14px;padding:8px 12px;border-radius:4px;}
        .kh-nav a:hover{background:rgba(255,255,255,.1);}
        .kh-main{max-width:1000px;margin:40px auto;padding:0 24px;}
        .kh-hero{background:linear-gradient(135deg,#1c1d1f,#14bf96);padding:60px 40px;border-radius:12px;color:#fff;margin-bottom:32px;}
        .kh-hero h1{font-size:36px;margin:0 0 12px;}
        .kh-hero p{font-size:18px;opacity:.85;margin:0 0 24px;}
        .kh-btn{background:#1865f2;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:16px;cursor:pointer;}
        .kh-subjects{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
        .kh-subject{background:#f7f8fa;border-radius:8px;padding:24px;text-align:center;cursor:pointer;}
        .kh-subject:hover{background:#e0f7f1;}
        .kh-subject-icon{font-size:32px;margin-bottom:8px;}
        .kh-subject-name{font-size:14px;font-weight:600;}
        .kh-progress{display:flex;gap:8px;margin-top:32px;}
        .kh-prog-bar{height:8px;background:#e0e0e0;border-radius:4px;flex:1;}
        .kh-prog-fill{height:100%;background:#14bf96;border-radius:4px;width:62%;}
      </style>
      <div class="kh-header">
        <div class="kh-logo">Khan Academy</div>
        <div class="kh-nav">
          <a href="#">Courses</a><a href="#">Math</a><a href="#">Science</a><a href="#">Computing</a><a href="#">Humanities</a>
        </div>
      </div>
      <div class="kh-main">
        <div class="kh-hero">
          <h1>Keep learning, \${localStorage.getItem('cowboysstuff_player') || 'student'}</h1>
          <p>Pick up where you left off in Algebra 2</p>
          <button class="kh-btn">Resume course →</button>
        </div>
        <div class="kh-subjects">
          <div class="kh-subject"><div class="kh-subject-icon">📐</div><div class="kh-subject-name">Math</div></div>
          <div class="kh-subject"><div class="kh-subject-icon">🔬</div><div class="kh-subject-name">Science</div></div>
          <div class="kh-subject"><div class="kh-subject-icon">💻</div><div class="kh-subject-name">Computing</div></div>
          <div class="kh-subject"><div class="kh-subject-icon">📚</div><div class="kh-subject-name">History</div></div>
        </div>
      </div>\`,

    desmos: () => \`
      <style>
        body{margin:0;font-family:sans-serif;background:#fff;display:flex;flex-direction:column;height:100vh;}
        .dm-header{height:44px;background:#fff;border-bottom:1px solid #ccc;display:flex;align-items:center;padding:0 16px;gap:12px;}
        .dm-logo{font-size:18px;font-weight:bold;color:#008f00;}
        .dm-title{font-size:14px;color:#555;}
        .dm-body{display:flex;flex:1;overflow:hidden;}
        .dm-sidebar{width:280px;border-right:1px solid #ccc;overflow-y:auto;flex-shrink:0;}
        .dm-expr{border-bottom:1px solid #eee;padding:10px 16px;display:flex;align-items:center;gap:8px;font-family:'Courier New',monospace;font-size:14px;}
        .dm-expr-num{color:#999;font-size:12px;width:20px;text-align:right;}
        .dm-expr-input{flex:1;border:none;outline:none;font-family:inherit;font-size:14px;color:#222;}
        .dm-canvas{flex:1;background:#fff;position:relative;}
        .dm-canvas canvas{width:100%;height:100%;}
        .dm-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.06) 1px,transparent 1px);background-size:40px 40px;}
        .dm-axis-x{position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.3);}
        .dm-axis-y{position:absolute;top:0;bottom:0;left:50%;width:1px;background:rgba(0,0,0,.3);}
        .dm-curve{position:absolute;inset:0;pointer-events:none;}
      </style>
      <div class="dm-header">
        <div class="dm-logo">Desmos</div>
        <div class="dm-title">Graphing Calculator</div>
      </div>
      <div class="dm-body">
        <div class="dm-sidebar">
          <div class="dm-expr"><span class="dm-expr-num">1</span><input class="dm-expr-input" value="y = x^2" readonly></div>
          <div class="dm-expr"><span class="dm-expr-num">2</span><input class="dm-expr-input" value="y = 2x + 1" readonly></div>
          <div class="dm-expr"><span class="dm-expr-num">3</span><input class="dm-expr-input" value="y = sin(x)" readonly></div>
          <div class="dm-expr"><span class="dm-expr-num">4</span><input class="dm-expr-input" value="" placeholder="Type an expression..."></div>
        </div>
        <div class="dm-canvas">
          <div class="dm-grid"></div>
          <div class="dm-axis-x"></div>
          <div class="dm-axis-y"></div>
          <svg class="dm-curve" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 580 Q 100 400 200 280 Q 300 200 400 300 Q 500 400 600 200 Q 700 100 800 50" stroke="#c74440" stroke-width="2" fill="none"/>
            <path d="M 0 200 L 800 400" stroke="#2d70b3" stroke-width="2"/>
            <path d="M 0 300 Q 60 250 120 300 Q 180 350 240 300 Q 300 250 360 300 Q 420 350 480 300 Q 540 250 600 300 Q 660 350 720 300 Q 780 250 800 290" stroke="#388c46" stroke-width="2" fill="none"/>
          </svg>
        </div>
      </div>\`,

    blank: () => \`<style>body{margin:0;background:#fff;}</style><div></div>\`,
  };

  let sgEnabled = localStorage.getItem(SG_KEY) === 'on';
  let sgMode    = localStorage.getItem(SG_MODE_KEY) || 'gdocs';
  let sgVisible = false;

  function showGuard() {
    const overlay = document.getElementById('sg-overlay');
    const content = document.getElementById('sg-content');
    if (!overlay || !content) return;
    const fn = MODES[sgMode] || MODES.gdocs;
    content.innerHTML = fn();
    overlay.hidden = false;
    sgVisible = true;
    document.title = {
      gdocs:  'Notes - Chapter 5 — Google Docs',
      gclass: 'Stream — Google Classroom',
      khan:   'Khan Academy',
      desmos: 'Desmos | Graphing Calculator',
      blank:  '',
    }[sgMode] || document.title;
  }

  function hideGuard() {
    const overlay = document.getElementById('sg-overlay');
    if (!overlay) return;
    overlay.hidden = true;
    sgVisible = false;
    // Restore title via cloak or original
    const cloakSel = document.getElementById('cloak-select');
    if (cloakSel?.value) {
      // Let cloak system handle it
    } else {
      document.title = 'cowboysstuff';
    }
  }

  // Focus loss detection — triggers when tab loses visibility or window blurs
  function handleVisibilityChange() {
    if (!sgEnabled) return;
    if (document.visibilityState === 'hidden') {
      showGuard();
    }
  }

  function handleBlur() {
    if (!sgEnabled) return;
    // Small delay — don't trigger on internal focus changes (e.g. game iframe)
    setTimeout(() => {
      if (!document.hasFocus() && !sgVisible) showGuard();
    }, 300);
  }

  function handleFocus() {
    // Don't auto-hide when returning — user should press ESC intentionally
    // This prevents the guard from flashing on/off
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);

  // ESC closes the guard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sgVisible) {
      e.stopPropagation();
      hideGuard();
    }
  });

  // Manual panic shortcut — Shift+P
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
    if (e.shiftKey && e.key === 'P') {
      if (sgVisible) hideGuard();
      else showGuard();
    }
  });

  // Wire settings controls
  document.addEventListener('DOMContentLoaded', () => {
    const toggle  = document.getElementById('sg-toggle');
    const modeSel = document.getElementById('sg-mode');

    if (toggle) {
      toggle.setAttribute('aria-checked', sgEnabled ? 'true' : 'false');
      toggle.textContent = sgEnabled ? 'on' : 'off';
      toggle.addEventListener('click', () => {
        sgEnabled = !sgEnabled;
        toggle.setAttribute('aria-checked', sgEnabled ? 'true' : 'false');
        toggle.textContent = sgEnabled ? 'on' : 'off';
        localStorage.setItem(SG_KEY, sgEnabled ? 'on' : 'off');
        if (sgEnabled) window.achUnlock?.('cloak');
      });
    }

    if (modeSel) {
      modeSel.value = sgMode;
      modeSel.addEventListener('change', () => {
        sgMode = modeSel.value;
        localStorage.setItem(SG_MODE_KEY, sgMode);
      });
    }
  });

  window._screenGuardShow = showGuard;
  window._screenGuardHide = hideGuard;
  window._screenGuardEnabled = () => sgEnabled;
})();

// ── Password Lock System ───────────────────────────────────────────────────
(function initPasswordLock() {
  const PW_KEY       = 'cowboysstuff_pw_hash';
  const UNLOCKED_KEY = 'cowboysstuff_unlocked'; // sessionStorage
  const LOCK_TIME_KEY = 'cowboysstuff_lock_time';
  const IDLE_LIMIT   = 10 * 60 * 1000; // 10 minutes

  async function hash(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str + 'cs_salt_2025'));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  }

  function getHash()    { return localStorage.getItem(PW_KEY); }
  function isUnlocked() { return sessionStorage.getItem(UNLOCKED_KEY) === '1'; }
  function setUnlocked(){ sessionStorage.setItem(UNLOCKED_KEY, '1'); }

  function showLock() {
    const ls = document.getElementById('lock-screen');
    if (ls) { ls.hidden = false; document.getElementById('lock-input')?.focus(); }
  }
  function hideLock() {
    const ls = document.getElementById('lock-screen');
    if (ls) ls.hidden = true;
  }
  function showSetup() {
    const ss = document.getElementById('setup-screen');
    if (ss) { ss.hidden = false; document.getElementById('setup-input')?.focus(); }
  }
  function hideSetup() {
    const ss = document.getElementById('setup-screen');
    if (ss) ss.hidden = true;
  }

  async function tryUnlock(pw) {
    const stored = getHash();
    if (!stored) { setUnlocked(); hideLock(); return; }
    const h = await hash(pw);
    if (h === stored) {
      setUnlocked();
      hideLock();
      localStorage.setItem(LOCK_TIME_KEY, Date.now());
      window.achUnlock?.('unlock-first');
    } else {
      const err = document.getElementById('lock-error');
      if (err) { err.textContent = 'wrong password'; setTimeout(() => err.textContent = '', 2000); }
      const inp = document.getElementById('lock-input');
      if (inp) { inp.value = ''; inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 500); }
    }
  }

  async function setupPassword(pw, confirm) {
    const err = document.getElementById('setup-error');
    if (pw.length < 4) { if(err) err.textContent = 'min 4 characters'; return; }
    if (pw !== confirm) { if(err) err.textContent = 'passwords do not match'; return; }
    const h = await hash(pw);
    localStorage.setItem(PW_KEY, h);
    setUnlocked();
    hideSetup();
    toast('password set');
  }

  // Check on page load
  document.addEventListener('DOMContentLoaded', () => {
    const stored = getHash();
    if (!stored) {
      // First visit — show setup after short delay
      const seen = localStorage.getItem('cowboysstuff_setup_seen');
      if (!seen) { setTimeout(() => showSetup(), 800); localStorage.setItem('cowboysstuff_setup_seen', '1'); }
      else setUnlocked();
    } else if (!isUnlocked()) {
      showLock();
    } else {
      // Check if idle too long (computer was locked)
      const lastTime = parseInt(localStorage.getItem(LOCK_TIME_KEY) || '0');
      if (lastTime && Date.now() - lastTime > IDLE_LIMIT) { showLock(); }
      else { localStorage.setItem(LOCK_TIME_KEY, Date.now()); }
    }

    // Wire lock screen
    const lockInput  = document.getElementById('lock-input');
    const lockSubmit = document.getElementById('lock-submit');
    lockInput?.addEventListener('keydown',  e => { if (e.key === 'Enter') tryUnlock(lockInput.value); });
    lockSubmit?.addEventListener('click',   () => tryUnlock(lockInput?.value || ''));

    // Wire setup screen
    const setupInput   = document.getElementById('setup-input');
    const setupConfirm = document.getElementById('setup-confirm');
    const setupSubmit  = document.getElementById('setup-submit');
    const setupSkip    = document.getElementById('setup-skip');
    setupSubmit?.addEventListener('click', () => setupPassword(setupInput?.value || '', setupConfirm?.value || ''));
    setupSkip?.addEventListener('click',   () => { hideSetup(); setUnlocked(); });
    setupConfirm?.addEventListener('keydown', e => { if (e.key === 'Enter') setupSubmit?.click(); });

    // Wire settings buttons
    document.getElementById('change-password-btn')?.addEventListener('click', () => {
      hideSetup();
      const ss = document.getElementById('setup-screen');
      if (ss) { ss.hidden = false; document.getElementById('setup-input')?.focus(); }
    });
    document.getElementById('remove-password-btn')?.addEventListener('click', () => {
      if (!confirm('Remove password protection?')) return;
      localStorage.removeItem(PW_KEY);
      setUnlocked();
      toast('password removed');
    });

    // Proxy URL setting
    const proxyInput = document.getElementById('proxy-url-input');
    const proxySave  = document.getElementById('proxy-save-btn');
    if (proxyInput) proxyInput.value = window.PROXY_ORIGIN || '';
    proxySave?.addEventListener('click', () => {
      const val = proxyInput?.value.trim().replace(/\\/$/, '');
      localStorage.setItem('cowboysstuff_proxy_override', val);
      window.PROXY_ORIGIN = val;
      window.PROXY_BASE   = val ? val + '/p/' : '';
      toast(val ? 'proxy saved — reload to apply' : 'proxy removed');
    });
    // Load saved proxy override on startup
    const saved = localStorage.getItem('cowboysstuff_proxy_override');
    if (saved !== null) {
      window.PROXY_ORIGIN = saved;
      window.PROXY_BASE   = saved ? saved + '/p/' : '';
      if (proxyInput) proxyInput.value = saved;
    }
  });

  // Lock when tab hidden > 10 min
  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      hiddenAt = Date.now();
    } else if (hiddenAt && getHash()) {
      const away = Date.now() - hiddenAt;
      if (away > IDLE_LIMIT) {
        sessionStorage.removeItem(UNLOCKED_KEY);
        showLock();
      }
      hiddenAt = 0;
    }
  });

  // Manual lock: Shift+L
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
    if (e.shiftKey && e.key === 'L' && getHash()) {
      sessionStorage.removeItem(UNLOCKED_KEY);
      showLock();
    }
  });

  window._lockSite = () => {
    if (getHash()) { sessionStorage.removeItem(UNLOCKED_KEY); showLock(); }
  };
})();

// ── Notes Panel ────────────────────────────────────────────────────────────
(function initNotes() {
  const NOTES_KEY = 'cowboysstuff_notes';
  let notes = [];
  let activeIdx = 0;
  let saveTimer = null;

  function loadNotes() {
    try { notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]'); } catch { notes = []; }
    if (!notes.length) notes = [{ title: 'Note 1', body: '' }];
  }
  function saveNotes() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => localStorage.setItem(NOTES_KEY, JSON.stringify(notes)), 500);
  }
  function renderTabs() {
    const sel = document.getElementById('notes-tab-sel');
    if (!sel) return;
    sel.innerHTML = '';
    notes.forEach((n, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = n.title || ('Note ' + (i+1));
      if (i === activeIdx) opt.selected = true;
      sel.appendChild(opt);
    });
  }
  function renderNote() {
    const n = notes[activeIdx];
    const titleEl = document.getElementById('notes-title-input');
    const bodyEl  = document.getElementById('notes-body');
    if (titleEl) titleEl.value = n?.title || '';
    if (bodyEl)  bodyEl.value  = n?.body  || '';
  }
  function init() {
    loadNotes();
    renderTabs();
    renderNote();

    const sel   = document.getElementById('notes-tab-sel');
    const title = document.getElementById('notes-title-input');
    const body  = document.getElementById('notes-body');
    const newBtn = document.getElementById('notes-new-btn');
    const delBtn = document.getElementById('notes-del-btn');

    sel?.addEventListener('change', () => {
      activeIdx = parseInt(sel.value);
      renderNote();
    });
    title?.addEventListener('input', () => {
      notes[activeIdx].title = title.value;
      renderTabs();
      saveNotes();
    });
    body?.addEventListener('input', () => {
      notes[activeIdx].body = body.value;
      saveNotes();
    });
    newBtn?.addEventListener('click', () => {
      notes.push({ title: 'Note ' + (notes.length + 1), body: '' });
      activeIdx = notes.length - 1;
      renderTabs();
      renderNote();
      saveNotes();
      title?.focus();
    });
    delBtn?.addEventListener('click', () => {
      if (notes.length <= 1) { notes[0] = { title: 'Note 1', body: '' }; renderNote(); saveNotes(); return; }
      notes.splice(activeIdx, 1);
      activeIdx = Math.max(0, activeIdx - 1);
      renderTabs();
      renderNote();
      saveNotes();
    });
  }
  document.addEventListener('DOMContentLoaded', init);
})();

// ── Music Player ───────────────────────────────────────────────────────────
(function initMusic() {
  const STATIONS = [
    { name: 'lofi hip hop',      station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio17.mp3' },
    { name: 'chillhop',          station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio18.mp3' },
    { name: 'jazz vibes',        station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio16.mp3' },
    { name: 'synthwave',         station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio19.mp3' },
    { name: 'ambient focus',     station: 'radio',  src: 'https://somafm.com/missioncontrol130.pls' },
    { name: 'deep focus',        station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio14.mp3' },
    { name: 'drum & bass',       station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio15.mp3' },
    { name: 'phonk',             station: 'radio',  src: 'https://streams.ilovemusic.de/iloveradio24.mp3' },
  ];
  let idx     = 0;
  let playing = false;
  const MUSIC_VOL_KEY = 'cowboysstuff_music_vol';
  const MUSIC_IDX_KEY = 'cowboysstuff_music_idx';

  function getAudio()     { return document.getElementById('music-audio'); }
  function getPlayBtn()   { return document.getElementById('music-play'); }
  function getTrackName() { return document.getElementById('music-track-name'); }
  function getStation()   { return document.getElementById('music-station'); }

  function loadStation(i) {
    idx = ((i % STATIONS.length) + STATIONS.length) % STATIONS.length;
    const s   = STATIONS[idx];
    const aud = getAudio();
    if (!aud) return;
    const wasPlaying = playing;
    aud.src = s.src;
    const nameEl = getTrackName(), stEl = getStation();
    if (nameEl) nameEl.textContent = s.name;
    if (stEl)   stEl.textContent   = s.station;
    localStorage.setItem(MUSIC_IDX_KEY, idx);
    if (wasPlaying) aud.play().catch(() => {});
  }

  function togglePlay() {
    const aud = getAudio(), btn = getPlayBtn();
    if (!aud) return;
    if (playing) {
      aud.pause(); playing = false;
      if (btn) { btn.textContent = '▶'; btn.classList.remove('playing'); }
    } else {
      if (!aud.src || aud.src === location.href) loadStation(idx);
      aud.play().catch(() => toast('could not load stream'));
      playing = true;
      if (btn) { btn.textContent = '⏸'; btn.classList.add('playing'); }
    }
  }

  function showBar() {
    const bar = document.getElementById('music-bar');
    if (bar) { bar.hidden = false; document.body.style.paddingBottom = '48px'; }
  }
  function hideBar() {
    const bar = document.getElementById('music-bar');
    if (bar) { bar.hidden = true; document.body.style.paddingBottom = ''; }
    const aud = getAudio();
    if (aud) { aud.pause(); aud.src = ''; }
    playing = false;
  }

  document.addEventListener('DOMContentLoaded', () => {
    idx = parseInt(localStorage.getItem(MUSIC_IDX_KEY) || '0');
    const savedVol = parseFloat(localStorage.getItem(MUSIC_VOL_KEY) || '0.5');
    const volEl = document.getElementById('music-vol');
    if (volEl) volEl.value = savedVol;
    const aud = getAudio();
    if (aud) aud.volume = savedVol;

    document.getElementById('music-play')?.addEventListener('click', togglePlay);
    document.getElementById('music-prev')?.addEventListener('click', () => loadStation(idx - 1));
    document.getElementById('music-next')?.addEventListener('click', () => loadStation(idx + 1));
    document.getElementById('music-close-btn')?.addEventListener('click', hideBar);
    document.getElementById('nav-music')?.addEventListener('click', () => {
      const bar = document.getElementById('music-bar');
      if (bar?.hidden) { showBar(); loadStation(idx); } else hideBar();
    });
    volEl?.addEventListener('input', () => {
      const v = parseFloat(volEl.value);
      const a = getAudio(); if (a) a.volume = v;
      localStorage.setItem(MUSIC_VOL_KEY, v);
    });
    // Station names in track display
    loadStation(idx);
  });

  // U shortcut
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
    if ((e.key === 'u' || e.key === 'U') && !e.shiftKey) {
      document.getElementById('nav-music')?.click();
    }
  });
})();

</script>
</body>
</html>
`);d.close();})();
