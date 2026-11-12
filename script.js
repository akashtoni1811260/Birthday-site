const $ = (id) => document.getElementById(id);
const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const I = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l15 8-15 8z"/></svg>',
  plus: '<svg class="stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-5.200-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 5.800-8 11-8 11z"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v2h-2zm0 4h2v6h-2z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
  vol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 8.500a5 5 0 0 1 0 7M18.500 6a8.500 8.500 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  chev: '<svg class="stroke" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg>',
};

/* ---------- Placeholder when a photo is missing ---------- */
const PALETTES = [
  ["#e50914", "#4a0b10"], ["#8e54e9", "#2b1055"], ["#185a9d", "#43cea2"],
  ["#f5576c", "#f093fb"], ["#4facfe", "#1d2b64"], ["#fa709a", "#fee140"],
];
function placeholder(i, label = "Add photo") {
  const [a, b] = PALETTES[i % PALETTES.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
    <rect width='600' height='800' fill='url(#g)'/>
    <text x='300' y='410' font-family='sans-serif' font-size='34' fill='white' fill-opacity='.85' text-anchor='middle'>${label}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
function safeImg(img, i, label) {
  img.onerror = () => { img.onerror = null; img.src = placeholder(i, label); };
}

/* ---------- Profiles ("Who's watching?") ---------- */
function makeAvatar(p) {
  const a = el("div", "avatar");
  a.style.backgroundColor = p.color || "#8e54e9";
  a.textContent = p.name.trim()[0].toUpperCase();
  const probe = new Image();
  probe.onload = () => { a.style.backgroundImage = `url("${p.avatar}")`; a.textContent = ""; };
  probe.src = p.avatar;
  return a;
}
$("profilesBrand").textContent = SITE.brand;
$("splashLogo").textContent = SITE.brand;
$("profilesTitle").textContent = SITE.introTitle || "Who's watching?";
SITE.profiles.forEach((p) => {
  const btn = el("button", "profile");
  const label = el("span");
  label.textContent = p.name;
  btn.append(makeAvatar(p), label);
  btn.onclick = () => enterAs(p);
  $("profileList").appendChild(btn);
});

function enterAs(p) {
  $("navProfile").replaceChildren(makeAvatar(p));
  $("welcome").textContent = p.welcome || `Welcome, ${p.name}.`;
  const reveal = () => { document.body.classList.remove("locked"); window.scrollTo(0, 0); onScroll(); };
  if (reduced) return reveal();
  const sp = $("splash");
  sp.className = "splash";
  sp.hidden = false;
  setTimeout(() => {
    reveal();
    sp.classList.add("out");
    setTimeout(() => { sp.hidden = true; }, 500);
  }, 1500);
}
function switchProfile() {
  closeLightbox(); closeModal();
  document.body.classList.add("locked");
  window.scrollTo(0, 0);
}
$("navProfile").onclick = switchProfile;
$("tabMe").onclick = switchProfile;

/* ---------- Hero ---------- */
$("brand").textContent = SITE.brand;
document.title = `Happy Birthday ${SITE.name[0] + SITE.name.slice(1).toLowerCase()}`;

const badge = $("heroBadge");
const mark = el("i");
mark.textContent = SITE.brand[0];
badge.append(mark, " " + (SITE.badge || ""));

$("heroName").textContent = SITE.name;
const topEl = $("heroTop");
topEl.innerHTML = '<span class="top10"><small>TOP</small><b>10</b></span>';
topEl.append(SITE.topLine || "");
$("heroTags").textContent = (SITE.tags || []).join(" • ");
$("heroDesc").textContent = SITE.description;
$("heroRating").textContent = SITE.rating;
$("playBtn").innerHTML = I.play + "<span>Play</span>";
$("infoBtn").innerHTML = I.info + "<span>More Info</span>";
$("modalPlay").innerHTML = I.play + "<span>Play</span>";

function setHero(url) {
  $("heroBg").style.backgroundImage = url;
  $("modalHero").style.backgroundImage = url;
}
const heroProbe = new Image();
heroProbe.onload = () => setHero(`url("${SITE.heroImage}")`);
heroProbe.onerror = () => setHero(`url("${placeholder(0, "")}")`);
heroProbe.src = SITE.heroImage;

/* ---------- Rows ---------- */
const all = []; // flat list for the viewer
let n = 0;

SITE.rows.forEach((row) => {
  const section = el("section", "row" + (row.rank ? " ranked" : ""));
  section.id = row.id;
  section.innerHTML = `<h2></h2><div class="slider">
    <button class="handle left" aria-label="Scroll left">${I.chev}</button>
    <div class="track"></div>
    <button class="handle right" aria-label="Scroll right">${I.chev}</button></div>`;
  section.querySelector("h2").textContent = row.title;
  const track = section.querySelector(".track");

  row.photos.forEach((p, k) => {
    const idx = n++;
    all.push(p);
    const item = el("div", "item");
    if (row.rank) {
      const r = el("span", "rank");
      r.textContent = k + 1;
      item.appendChild(r);
    }
    const card = el("button", "card");
    card.innerHTML = '<img loading="lazy" alt="">';
    const img = card.querySelector("img");
    safeImg(img, idx);
    img.alt = p.caption || "";
    img.src = p.src;
    card.onclick = () => openLightbox(idx);
    item.appendChild(card);

    if (!row.rank) {
      const panel = el("div", "panel");
      const match = 90 + ((idx * 7) % 10);
      panel.innerHTML = `<div class="p-btns">
          <button class="rbtn solid" data-play aria-label="Play">${I.play}</button>
          <button class="rbtn" aria-label="Add to list">${I.plus}</button>
          <button class="rbtn" aria-label="Love">${I.heart}</button></div>
        <p class="p-meta"><b>${match}% Match</b><span class="age"></span><span class="hd">HD</span></p>
        <p class="p-cap"></p><p class="p-tags"></p>`;
      panel.querySelector(".age").textContent = SITE.rating;
      panel.querySelector(".p-cap").textContent = p.caption || "";
      panel.querySelector(".p-tags").textContent = (SITE.tags || []).join(" • ");
      panel.querySelector("[data-play]").onclick = () => openLightbox(idx);
      panel.querySelectorAll(".rbtn:not(.solid)").forEach((b) => (b.onclick = () => b.classList.toggle("on")));
      item.appendChild(panel);
    }
    track.appendChild(item);
  });

  const go = (dir) => track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
  section.querySelector(".left").onclick = () => go(-1);
  section.querySelector(".right").onclick = () => go(1);
  $("rows").appendChild(section);
});

$("finalTitle").textContent = SITE.closing.title;
$("finalText").textContent = SITE.closing.text;
$("finalSign").textContent = SITE.closing.signature;
$("tabMem").href = "#" + SITE.rows[Math.min(1, SITE.rows.length - 1)].id;

/* ---------- Nav (links, active state, solid bar) ---------- */
const links = $("navLinks");
[...SITE.rows.map((r) => ({ id: r.id, label: r.nav })), { id: "final", label: SITE.closing.nav }].forEach((l) => {
  const a = el("a");
  a.href = `#${l.id}`;
  a.textContent = l.label;
  links.appendChild(a);
});
const navLinks = [...links.querySelectorAll("a")];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
function onScroll() {
  $("nav").classList.toggle("solid", window.scrollY > 40);
  let current = 0;
  sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.45) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- More Info modal ---------- */
const matchTop = "100% Match";
$("modalTitle").textContent = SITE.name;
$("modalTag").textContent = SITE.tagline || "";
$("modalDesc").textContent = SITE.description;
$("modalMeta").innerHTML = `<b>${matchTop}</b><span>${SITE.year || ""}</span><span class="age"></span><span>${SITE.season || ""}</span><span class="hd">HD</span>`;
$("modalMeta").querySelector(".age").textContent = SITE.rating;
const side = $("modalSide");
[["Starring: ", SITE.starring], ["Genres: ", (SITE.tags || []).join(", ")]].forEach(([k, v]) => {
  const p = el("p"), s = el("span");
  s.textContent = k;
  p.append(s, v || "");
  side.appendChild(p);
});
function openModal() { $("modal").hidden = false; document.body.style.overflow = "hidden"; }
function closeModal() { $("modal").hidden = true; document.body.style.overflow = ""; }
$("infoBtn").onclick = openModal;
$("modalX").onclick = closeModal;
$("modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
$("modalPlay").onclick = () => { closeModal(); startShow(); };

/* ---------- Music: your mp3, or a built-in music-box "Happy Birthday" ---------- */
const Synth = (() => {
  let ctx = null, master = null, loopT = null, playing = false, muted = false;
  const B = 60 / 104; // seconds per beat
  const F = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
  const SONG = [
    ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
    ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
    ["G4", .75], ["G4", .25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 1],
    ["F5", .75], ["F5", .25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 2],
    [null, 2],
  ];
  function unlock() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.5;
      const delay = ctx.createDelay(); delay.delayTime.value = 0.28;
      const fb = ctx.createGain(); fb.gain.value = 0.3;
      const wet = ctx.createGain(); wet.gain.value = 0.25;
      master.connect(ctx.destination);
      master.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(ctx.destination);
    }
    if (ctx.resume) ctx.resume();
    return true;
  }
  function note(f, t, d) {
    const o = ctx.createOscillator(), o2 = ctx.createOscillator();
    const g = ctx.createGain(), g2 = ctx.createGain();
    o.type = "triangle"; o.frequency.value = f;
    o2.type = "sine"; o2.frequency.value = f * 2; g2.gain.value = 0.25;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.35, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + Math.max(d, 0.5) + 0.4);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(master);
    o.start(t); o2.start(t); o.stop(t + d + 1); o2.stop(t + d + 1);
  }
  function playSong() {
    let t = ctx.currentTime + 0.1;
    SONG.forEach(([n, b]) => { if (n) note(F[n], t, b * B); t += b * B; });
    loopT = setTimeout(() => { if (playing && ctx) playSong(); }, (t - ctx.currentTime) * 1000);
  }
  return {
    unlock,
    start() { if (!unlock()) return; playing = true; clearTimeout(loopT); playSong(); },
    stop() { playing = false; clearTimeout(loopT); if (ctx) { try { ctx.close(); } catch (e) {} ctx = null; master = null; } },
    mute(m) { muted = m; if (master) master.gain.value = m ? 0 : 0.5; },
    pause(p) { if (ctx) (p ? ctx.suspend() : ctx.resume()); },
  };
})();

const Music = {
  el: null, synth: false, muted: false,
  start() {
    this.stop();
    Synth.unlock(); // inside the click, so the fallback is allowed to play
    Synth.mute(this.muted);
    const fallback = () => {
      if (this.synth) return;
      this.synth = true;
      if (this.el) { this.el.pause(); this.el = null; }
      Synth.start();
    };
    if (!SITE.music) return fallback();
    const a = new Audio(SITE.music);
    a.loop = true; a.volume = 0.8; a.muted = this.muted;
    this.el = a;
    a.addEventListener("error", fallback);
    const p = a.play();
    if (p && p.catch) p.catch(fallback);
  },
  stop() {
    if (this.el) { this.el.pause(); this.el = null; }
    Synth.stop();
    this.synth = false;
  },
  setMuted(m) { this.muted = m; if (this.el) this.el.muted = m; Synth.mute(m); },
  setPaused(p) {
    if (this.el) { p ? this.el.pause() : this.el.play().catch(() => {}); }
    if (this.synth) Synth.pause(p);
  },
};

/* ---------- Photo viewer + random slideshow ---------- */
let cur = 0, timer = null, slideshow = false, paused = false, order = [], pos = 0;
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
};
const secs = () => SITE.slideSeconds || 4;

function show(i) {
  cur = (i + all.length) % all.length;
  const img = $("lbImg");
  safeImg(img, cur);
  img.src = all[cur].src;
  $("lbCap").textContent = all[cur].caption || "";
  img.classList.remove("kb");
  if (slideshow) {
    void img.offsetWidth; // restart the zoom animation
    img.style.animationDuration = secs() + "s";
    img.classList.add("kb");
    $("lightbox").style.setProperty("--bgimg", `url("${all[cur].src}")`);
  }
}
function step(dir) {
  if (!slideshow) return show(cur + dir);
  pos += dir;
  if (pos >= order.length) { // everything shown once: reshuffle, avoid repeating the same photo back to back
    order = shuffle(all.map((_, i) => i));
    if (order.length > 1 && order[0] === cur) order.push(order.shift());
    pos = 0;
  }
  if (pos < 0) pos = order.length - 1;
  show(order[pos]);
  new Image().src = all[order[(pos + 1) % order.length]].src; // preload next
}
function restartTimer() {
  clearInterval(timer);
  timer = null;
  if (slideshow && !paused) timer = setInterval(() => step(1), secs() * 1000);
}
function updateCtl() {
  $("lbPause").innerHTML = paused ? I.play : I.pause;
  $("lbMute").innerHTML = Music.muted ? I.mute : I.vol;
  $("lightbox").classList.toggle("paused", paused);
}
function togglePause() { paused = !paused; Music.setPaused(paused); restartTimer(); updateCtl(); }
function toggleMute() { Music.setMuted(!Music.muted); updateCtl(); }

function openLightbox(i) { $("lightbox").hidden = false; document.body.style.overflow = "hidden"; show(i); }
function startShow() {
  if (!all.length) return;
  slideshow = true; paused = false;
  order = shuffle(all.map((_, i) => i)); pos = 0;
  $("lightbox").classList.add("show");
  $("lightbox").hidden = false;
  document.body.style.overflow = "hidden";
  updateCtl();
  show(order[0]);
  restartTimer();
  Music.start();
}
function closeLightbox() {
  clearInterval(timer); timer = null;
  slideshow = false; paused = false;
  $("lightbox").classList.remove("show", "paused");
  $("lightbox").hidden = true;
  $("lbImg").classList.remove("kb");
  document.body.style.overflow = "";
  Music.stop();
}

$("playBtn").onclick = startShow;
$("lbClose").onclick = closeLightbox;
$("lbPrev").onclick = () => { step(-1); restartTimer(); };
$("lbNext").onclick = () => { step(1); restartTimer(); };
$("lbPause").onclick = togglePause;
$("lbMute").onclick = toggleMute;
$("lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });

let sx = null;
$("lightbox").addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
$("lightbox").addEventListener("touchend", (e) => {
  if (sx === null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) { step(dx < 0 ? 1 : -1); restartTimer(); }
  sx = null;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); closeModal(); }
  if ($("lightbox").hidden) return;
  if (e.key === "ArrowLeft") { step(-1); restartTimer(); }
  if (e.key === "ArrowRight") { step(1); restartTimer(); }
  if (slideshow && e.key === " ") { e.preventDefault(); togglePause(); }
  if (slideshow && (e.key === "m" || e.key === "M")) toggleMute();
});

/* ---------- Confetti ---------- */
const cv = $("confetti"), ctx = cv.getContext("2d");
function celebrate() {
  cv.width = innerWidth; cv.height = innerHeight;
  const colors = ["#e50914", "#ffffff", "#f6c177", "#8e54e9", "#4facfe"];
  const bits = Array.from({ length: 160 }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.5,
    w: 6 + Math.random() * 6, h: 10 + Math.random() * 8,
    vy: 2 + Math.random() * 4, vx: -1.5 + Math.random() * 3,
    r: Math.random() * 6, vr: -0.2 + Math.random() * 0.4,
    c: colors[Math.floor(Math.random() * colors.length)],
  }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    bits.forEach((b) => {
      b.x += b.vx; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
      ctx.fillStyle = b.c; ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore();
    });
    if (++frames < 260) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}
$("confettiBtn").onclick = celebrate;
