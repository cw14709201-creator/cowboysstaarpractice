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
  div.innerHTML = `
    <div class="ach-notif-icon">${ach.icon}</div>
    <div class="ach-notif-text">
      
      <div class="ach-notif-name">${ach.name}</div>
    </div>`;
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
    dot.style.cssText = `position:fixed;top:-10px;left:${x}px;width:${size}px;height:${size}px;
      border-radius:${Math.random()>.5?'50%':'2px'};background:${color};
      pointer-events:none;z-index:99999;
      animation:confetti-fall ${Math.random()*1.5+1}s ease-out ${Math.random()*0.6}s forwards`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 3000);
  }
}

window.renderAchievementsPanel = function(container) {
  const unlocked = getUnlocked();
  const pct = Math.round(unlocked.size / window.ACHIEVEMENTS.length * 100);

  container.innerHTML = `
    <div class="ach-header">
      <span class="ach-count">${unlocked.size} / ${window.ACHIEVEMENTS.length}</span>
      <div class="ach-progress-bar"><div class="ach-progress-fill" style="width:${pct}%"></div></div>
      <span class="ach-pct">${pct}%</span>
    </div>
    <div class="ach-grid" id="ach-grid"></div>`;

  const grid = container.querySelector('#ach-grid');
  window.ACHIEVEMENTS.forEach(ach => {
    const got  = unlocked.has(ach.id);
    const card = document.createElement('div');
    card.className = 'ach-card' + (got ? ' unlocked' : '') + (ach.secret && !got ? ' secret' : '');
    card.innerHTML = `
      <div class="ach-card-icon">${ach.secret && !got ? '?' : ach.icon}</div>
      <div class="ach-card-name">${ach.secret && !got ? '???' : ach.name}</div>
      <div class="ach-card-desc">${ach.secret && !got ? 'Keep playing to discover this.' : ach.desc}</div>
      ${got ? '<div class="ach-card-badge">✓</div>' : ''}`;
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
