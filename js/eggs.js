// =============================================================
//  彩蛋：Konami 字符雨 / 待机屏保 / 桌面右键菜单 / 关于 ECHO-OS / 关机
// =============================================================
import { openWindow } from "./windows.js";

export function initEggs() {
  konami();
  screensaver();
  contextMenu();
}

// ---------- 小工具 ----------
function makeToast(text, ms = 2600) {
  const t = document.createElement("div");
  t.className = "eg-toast";
  t.textContent = text;
  document.body.appendChild(t);
  if (ms) setTimeout(() => t.remove(), ms);
  return t;
}

// ---------- 1) Konami → 绿色字符雨 ----------
function konami() {
  const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let i = 0;
  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    i = k === seq[i] ? i + 1 : (k === seq[0] ? 1 : 0);
    if (i === seq.length) { i = 0; matrixRain(); }
  });
}
function matrixRain() {
  if (document.getElementById("matrix")) return;
  const c = document.createElement("canvas");
  c.id = "matrix";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const chars = "アイウエオ0123456789ECHODESIGNCODE<>/{}".split("");
  const cols = Math.floor(c.width / 14);
  const drops = Array(cols).fill(0).map(() => Math.random() * -40);
  const timer = setInterval(() => {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#7CFC6A";
    ctx.font = "14px monospace";
    for (let x = 0; x < drops.length; x++) {
      ctx.fillText(chars[(Math.random() * chars.length) | 0], x * 14, drops[x] * 14);
      drops[x] = drops[x] * 14 > c.height && Math.random() > 0.975 ? 0 : drops[x] + 1;
    }
  }, 50);
  const toast = makeToast("↑↑↓↓←→←→ B A — CHEAT ON", 0);
  const end = () => {
    clearInterval(timer); c.remove(); toast.remove();
    window.removeEventListener("keydown", end);
  };
  c.addEventListener("click", end);
  window.addEventListener("keydown", end);
  setTimeout(end, 7000);
}

// ---------- 2) 待机屏保：弹跳 ECHO-OS ----------
function screensaver() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const IDLE = 45000;
  let timer, raf, saver = null;
  const start = () => {
    if (saver) return;
    saver = document.createElement("div");
    saver.id = "saver";
    saver.innerHTML = `<div class="saver-logo">ECHO<small>-OS</small></div>`;
    document.body.appendChild(saver);
    const logo = saver.querySelector(".saver-logo");
    let x = 140, y = 120, dx = 2.4, dy = 1.9;
    const hue = () => `hsl(${(Math.random() * 360) | 0}, 80%, 66%)`;
    logo.style.color = hue();
    const step = () => {
      const w = innerWidth - logo.offsetWidth, h = innerHeight - logo.offsetHeight;
      x += dx; y += dy;
      let hit = false;
      if (x <= 0 || x >= w) { dx = -dx; x = Math.max(0, Math.min(x, w)); hit = true; }
      if (y <= 0 || y >= h) { dy = -dy; y = Math.max(0, Math.min(y, h)); hit = true; }
      if (hit) logo.style.color = hue();
      logo.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(step);
    };
    step();
  };
  const stop = () => { cancelAnimationFrame(raf); if (saver) { saver.remove(); saver = null; } };
  const reset = () => { clearTimeout(timer); stop(); timer = setTimeout(start, IDLE); };
  ["mousemove", "mousedown", "keydown", "wheel", "touchstart"].forEach((ev) =>
    window.addEventListener(ev, reset, { passive: true }));
  reset();
}

// ---------- 3) 桌面右键菜单 ----------
function contextMenu() {
  const menu = document.createElement("ul");
  menu.id = "ctxmenu";
  menu.hidden = true;
  menu.innerHTML = `
    <li data-act="refresh">刷新</li>
    <li data-act="arrange">排列图标</li>
    <li class="sep"></li>
    <li data-act="notepad">新建 → 灵感.txt</li>
    <li class="sep"></li>
    <li data-act="about">关于 ECHO-OS</li>`;
  document.body.appendChild(menu);
  const hide = () => { menu.hidden = true; };
  const desktop = document.getElementById("desktop");
  desktop.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".window") || e.target.closest(".start-menu")) return;
    e.preventDefault();
    menu.hidden = false;
    menu.style.left = Math.min(e.clientX, innerWidth - menu.offsetWidth - 6) + "px";
    menu.style.top = Math.min(e.clientY, innerHeight - menu.offsetHeight - 6) + "px";
  });
  window.addEventListener("click", hide);
  window.addEventListener("blur", hide);
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  menu.addEventListener("click", (e) => {
    const act = e.target.dataset.act;
    if (!act) return;
    if (act === "notepad") openWindow("notepad");
    else if (act === "about") aboutOS();
    else if (act === "refresh") refreshFlash();
    else if (act === "arrange") makeToast("图标已经很整齐了 ✦");
  });
}
function refreshFlash() {
  const icons = document.getElementById("icons");
  if (!icons) return;
  icons.style.transition = "opacity .12s";
  icons.style.opacity = "0";
  setTimeout(() => { icons.style.opacity = "1"; }, 130);
}

// ---------- 4) 关于 ECHO-OS ----------
function aboutOS() {
  if (document.querySelector(".eg-modal")) return;
  const m = document.createElement("div");
  m.className = "eg-modal";
  m.innerHTML = `
    <div class="eg-dialog">
      <header class="title-bar"><span class="label">关于 ECHO-OS</span><button class="ctrl eg-x" aria-label="close">&times;</button></header>
      <div class="eg-body">
<pre class="eg-spec">ECHO-OS  v2.6   (c) 2026 Echo W.

处理器   Creative-Core(TM) 设计 + 代码 @ 97 MHz
内存     想法 ........... 640K（够用了）
显示     像素完美渲染 ... OK
已安装   vibe coding · 审美 · 咖啡因
授权给   Echo
彩蛋     试试  ↑ ↑ ↓ ↓ ← → ← →  B A</pre>
        <button class="btn-xp eg-ok">确定</button>
      </div>
    </div>`;
  document.body.appendChild(m);
  const close = () => m.remove();
  m.querySelector(".eg-x").addEventListener("click", close);
  m.querySelector(".eg-ok").addEventListener("click", close);
  m.addEventListener("click", (e) => { if (e.target === m) close(); });
}

// ---------- 5) 关机：CRT 关机动画 → 点击重开 ----------
export function crtShutdown() {
  const desktop = document.getElementById("desktop");
  if (!desktop || document.getElementById("shutdown")) return;
  document.body.classList.add("powering-off");
  desktop.classList.add("crt-off-anim");
  setTimeout(() => {
    const o = document.createElement("div");
    o.id = "shutdown";
    o.innerHTML = `<span class="off-dot"></span><span class="off-text">ECHO-OS 已关机　·　点击重新开机</span>`;
    document.body.appendChild(o);
    o.addEventListener("click", () => location.reload());
  }, 700);
}
