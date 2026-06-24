// 桌面：图标、任务栏（开窗项 + 时钟）、Start 菜单
import { DESKTOP_ICONS } from "./content.js";
import { glyph } from "./icons.js";
import { openWindow, focusWindow, closeWindow, isOpen } from "./windows.js";

export function initDesktop() {
  renderIcons();
  initClock();
  initStartMenu();
  initTaskbarSync();
}

function renderIcons() {
  const ul = document.getElementById("icons");
  ul.innerHTML = DESKTOP_ICONS.map((ic) =>
    `<li><button class="icon" data-id="${ic.id}" tabindex="0">
       ${glyph(ic.icon)}<span class="name">${ic.label}</span>
     </button></li>`).join("");

  ul.querySelectorAll(".icon").forEach((btn) => {
    const id = btn.dataset.id;
    // 单击选中，双击开窗（桌面图标语义）
    btn.addEventListener("click", () => {
      ul.querySelectorAll(".icon").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    btn.addEventListener("dblclick", () => openWindow(id));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openWindow(id); }
    });
  });
}

function initClock() {
  const el = document.getElementById("clock");
  const tick = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    el.textContent = `${hh}:${mm}`;
  };
  tick();
  setInterval(tick, 15000);
}

function initStartMenu() {
  const btn = document.getElementById("start-btn");
  const menu = document.getElementById("start-menu");
  const list = document.getElementById("start-list");

  list.innerHTML = DESKTOP_ICONS.map((ic) =>
    `<li data-id="${ic.id}">${glyph(ic.icon)} ${ic.label}</li>`).join("");

  const setOpen = (v) => {
    menu.hidden = !v;
    btn.classList.toggle("open", v);
  };

  btn.addEventListener("click", (e) => { e.stopPropagation(); setOpen(menu.hidden); });
  list.querySelectorAll("li").forEach((li) =>
    li.addEventListener("click", () => { openWindow(li.dataset.id); setOpen(false); }));
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) setOpen(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

// 任务栏开窗项：监听 windows.js 派发的事件
function initTaskbarSync() {
  const bar = document.getElementById("taskbar-items");
  const items = new Map(); // key -> button

  const setActive = (key) => {
    items.forEach((b, k) => b.classList.toggle("active", k === key));
  };

  document.addEventListener("win:open", (e) => {
    const { key, title, icon } = e.detail;
    if (items.has(key)) return;
    const b = document.createElement("button");
    b.className = "task-item";
    b.innerHTML = `${glyph(icon).replace('class="glyph"', 'class="dot"')}<span>${title}</span>`;
    b.addEventListener("click", () => {
      if (b.classList.contains("active")) return;
      focusWindow(key);
    });
    bar.appendChild(b);
    items.set(key, b);
  });

  document.addEventListener("win:focus", (e) => setActive(e.detail.key));

  document.addEventListener("win:close", (e) => {
    const b = items.get(e.detail.key);
    if (b) { b.remove(); items.delete(e.detail.key); }
  });
}

// lightbox 关闭
export function initLightbox() {
  const box = document.getElementById("lightbox");
  const close = () => { box.hidden = true; document.getElementById("lightbox-img").src = ""; };
  document.getElementById("lightbox-close").addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) close(); });
}

// 视频弹窗关闭（清空 iframe src 以停止播放）
export function initVideoModal() {
  const m = document.getElementById("video-modal");
  const iframe = document.getElementById("vmodal-iframe");
  const close = () => { m.hidden = true; iframe.src = ""; };
  document.getElementById("vmodal-close").addEventListener("click", close);
  m.addEventListener("click", (e) => { if (e.target === m) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !m.hidden) close(); });
}
