window.PROXY_ORIGIN = '';   // ← PUT YOUR WORKER URL HERE

window.PROXY_BASE  = window.PROXY_ORIGIN + '/p/';
window.BACKUP_BASE = window.PROXY_ORIGIN + '/b/';
window.GAME_BASE   = window.PROXY_ORIGIN ? window.PROXY_ORIGIN + '/game' : './game.html';
window.WATCH_BASE  = window.PROXY_ORIGIN ? window.PROXY_ORIGIN + '/watch' : './watch.html';
