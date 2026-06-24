// =============================================================
//  窗口系统：开窗 / 拖动 / 叠放 / 关闭 + 各类窗口内容渲染
// =============================================================
import {
  ABOUT, SOCIAL, CONTACT, NOTEPAD, PROJECTS, FOLDERS, RECYCLE, RESUME,
} from "./content.js";
import { glyph } from "./icons.js";

const host = () => document.getElementById("windows");
const open = new Map();      // key -> { el }
let topZ = 100;
let offset = 0;              // 新窗口错位

// 通知任务栏（desktop.js 监听）
const notify = (type, detail) =>
  document.dispatchEvent(new CustomEvent(type, { detail }));

// ---------- 公开 API ----------
export function openWindow(key) {
  if (open.has(key)) { focusWindow(key); return; }

  const { title, icon, bodyHTML, wide } = build(key);
  const el = document.createElement("section");
  el.className = "window";
  el.dataset.key = key;

  const baseX = 120 + (offset % 6) * 28;
  const baseY = 60 + (offset % 6) * 24;
  offset++;
  el.style.left = baseX + "px";
  el.style.top = baseY + "px";
  el.style.width = (wide ? 560 : 420) + "px";

  el.innerHTML = `
    <header class="title-bar">
      ${glyph(icon).replace('class="glyph"', 'class="ico"')}
      <span class="label">${title}</span>
      <button class="ctrl close" aria-label="close">&times;</button>
    </header>
    <div class="window-body">${bodyHTML}</div>`;

  host().appendChild(el);
  open.set(key, { el, title, icon });
  bringToFront(el);

  el.querySelector(".close").addEventListener("click", () => closeWindow(key));
  el.addEventListener("mousedown", () => focusWindow(key), true);
  makeDraggable(el.querySelector(".title-bar"), el);
  wireBody(el, key);

  notify("win:open", { key, title, icon });
  notify("win:focus", { key });
}

export function closeWindow(key) {
  const w = open.get(key);
  if (!w) return;
  w.el.remove();
  open.delete(key);
  notify("win:close", { key });
}

export function focusWindow(key) {
  const w = open.get(key);
  if (!w) return;
  bringToFront(w.el);
  notify("win:focus", { key });
}

export const isOpen = (key) => open.has(key);

// ---------- 内部 ----------
function bringToFront(el) {
  el.style.zIndex = ++topZ;
}

function makeDraggable(handle, el) {
  let sx, sy, ox, oy, moving = false;
  const down = (e) => {
    if (e.target.closest(".ctrl")) return;
    moving = true;
    el.classList.add("dragging");
    sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    e.preventDefault();
  };
  const move = (e) => {
    if (!moving) return;
    let nx = ox + (e.clientX - sx);
    let ny = oy + (e.clientY - sy);
    ny = Math.max(0, Math.min(ny, window.innerHeight - 70));
    nx = Math.max(20 - el.offsetWidth, Math.min(nx, window.innerWidth - 40));
    el.style.left = nx + "px";
    el.style.top = ny + "px";
  };
  const up = () => {
    moving = false;
    el.classList.remove("dragging");
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  handle.addEventListener("mousedown", down);
}

// ---------- 内容构建 ----------
function build(key) {
  if (key === "about")   return { title: "About Me", icon: "monitor", wide: true, bodyHTML: aboutHTML() };
  if (key === "projects")return { title: "Projects", icon: "folder", bodyHTML: gridHTML(PROJECTS.children) };
  if (key === "contact") return { title: "Contact", icon: "mail", bodyHTML: `<pre class="textpane">${linkifyContact(CONTACT)}</pre>` };
  if (key === "notepad") return { title: "readme.txt - Notepad", icon: "notepad", bodyHTML: `<pre class="textpane">${esc(NOTEPAD)}</pre>` };
  if (key === "resume")  return { title: "Resume", icon: "doc", bodyHTML: resumeHTML() };
  if (key === "recycle") return { title: "Recycle Bin", icon: "recycle", wide: true, bodyHTML: gridHTML(RECYCLE.children) };

  if (key.startsWith("folder:")) {
    const id = key.slice(7);
    const f = FOLDERS[id];
    return { title: f.label, icon: "folder", wide: true, bodyHTML: itemsHTML(f.items) };
  }
  return { title: key, icon: "doc", bodyHTML: "" };
}

function aboutHTML() {
  const stats = ABOUT.stats.map((s) =>
    `<div class="stat"><div class="v">${s.value}</div><div class="l">${esc(s.label)}</div></div>`).join("");
  const social = SOCIAL.map((s) =>
    `<button class="social-chip" data-social="${s.key}"><b>${esc(s.label)}</b> ${esc(s.value)}</button>`).join("");
  const bio = ABOUT.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  return `
    <div class="about-head">
      <div class="about-name">${ABOUT.name}<small>${ABOUT.nameZh}</small></div>
      <div class="about-roles">${esc(ABOUT.roles)}</div>
      <div class="about-loc">${esc(ABOUT.location)}</div>
    </div>
    <div class="social-bar">${social}</div>
    <div class="stats">${stats}</div>
    <div class="bio">${bio}</div>`;
}

function resumeHTML() {
  const dl = RESUME.pdf
    ? `<a class="btn-xp" href="${RESUME.pdf}" download>下载 PDF</a>`
    : `<button class="btn-xp" disabled>下载 PDF（待补）</button>`;
  return `
    <div class="resume-actions">
      <button class="btn-xp" data-open="about">在线看简历（见 About）</button>
      ${dl}
    </div>
    <p>${esc(RESUME.note)}</p>`;
}

// 文件夹/回收站内容：folder/link/image/video 走网格，note 走整行块
function itemsHTML(items) {
  let out = "";
  let bucket = [];
  const flush = () => {
    if (bucket.length) { out += `<div class="grid">${bucket.join("")}</div>`; bucket = []; }
  };
  for (const it of items) {
    if (it.type === "note") { flush(); out += noteHTML(it); }
    else bucket.push(gridItemHTML(it));
  }
  flush();
  return out || "<p>（暂无内容）</p>";
}

function gridHTML(children) {
  return `<div class="grid">${children.map(gridItemHTML).join("")}</div>`;
}

function gridItemHTML(it) {
  if (it.type === "folder")
    return `<button class="grid-item" data-folder="${it.id}">${glyph("folder")}<span class="cap">${esc(it.label)}</span></button>`;
  if (it.type === "link")
    return `<a class="grid-item" href="${it.href}" target="_blank" rel="noopener">${glyph("link")}<span class="cap">${esc(it.label)}${it.sub ? `<small>${esc(it.sub)}</small>` : ""}</span></a>`;
  if (it.type === "image")
    return `<button class="grid-item" data-img="${it.src}">${glyph("image")}<span class="cap">${esc(it.label)}</span></button>`;
  if (it.type === "video") {
    const thumb = `https://img.youtube.com/vi/${it.yt}/mqdefault.jpg`;
    return `<button class="grid-item video" data-yt="${it.yt}" data-label="${esc(it.label)}" title="${esc(it.role || "")}">
      <span class="thumb"><img loading="lazy" src="${thumb}" alt="${esc(it.label)}"></span>
      <span class="cap">${esc(it.label)}</span></button>`;
  }
  return "";
}

function noteHTML(n) {
  const badge = n.badge ? `<span class="badge">${esc(n.badge)}</span>` : "";
  const status = n.status ? `<span class="status">status: ${esc(n.status)}</span>` : "";
  const credits = n.credits ? `<div class="credits">${esc(n.credits)}</div>` : "";
  const links = n.links
    ? `<div class="links">${n.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>`
    : "";
  return `<div class="note-block">
    <div class="nt">${esc(n.title)}</div>
    ${badge}${status}
    <div class="body">${esc(n.body || "")}</div>
    ${credits}${links}
  </div>`;
}

// ---------- body 内事件绑定 ----------
function wireBody(el, key) {
  // 图标类（文件夹 / 快捷方式 / 图片缩略图）：单击选中、双击打开，与桌面图标一致
  const gridItems = el.querySelectorAll(".grid-item");
  const clearSel = () => gridItems.forEach((g) => g.classList.remove("selected"));
  gridItems.forEach((g) => {
    g.addEventListener("click", (e) => {
      if (g.tagName === "A") e.preventDefault(); // 快捷方式单击只选中，不跳转
      clearSel();
      g.classList.add("selected");
    });
  });
  el.querySelectorAll("[data-folder]").forEach((b) =>
    b.addEventListener("dblclick", () => openWindow("folder:" + b.dataset.folder)));
  el.querySelectorAll("[data-img]").forEach((b) =>
    b.addEventListener("dblclick", () => showLightbox(b.dataset.img)));
  el.querySelectorAll("a.grid-item").forEach((a) =>
    a.addEventListener("dblclick", () => window.open(a.href, "_blank", "noopener")));
  el.querySelectorAll("[data-yt]").forEach((b) =>
    b.addEventListener("dblclick", () => showVideo(b.dataset.yt, b.dataset.label)));

  // 正文里的文本按钮 / 超链接：保持单击
  el.querySelectorAll("[data-open]").forEach((b) =>
    b.addEventListener("click", () => openWindow(b.dataset.open)));
  el.querySelectorAll("[data-social]").forEach((b) =>
    b.addEventListener("click", (e) => { e.stopPropagation(); showSocial(b.dataset.social, b); }));
}

// ---------- 社交弹卡 ----------
let socialPop = null;
function showSocial(keyName, anchor) {
  closeSocial();
  const s = SOCIAL.find((x) => x.key === keyName);
  if (!s) return;
  if (s.href) { window.open(s.href, s.href.startsWith("http") ? "_blank" : "_self"); return; }

  const pop = document.createElement("div");
  pop.className = "social-pop";
  pop.innerHTML = `
    <div class="id">
      <b>${esc(s.label)}</b>
      <div>${esc(s.value)}</div>
      <button class="copy-btn" data-copy="${esc(s.copy)}">复制 ID</button>
    </div>
    <div class="qr">${s.qr ? `<img src="${s.qr}" alt="qr">` : "二维码<br>占位框"}</div>`;
  document.body.appendChild(pop);

  const r = anchor.getBoundingClientRect();
  pop.style.left = Math.min(r.left, window.innerWidth - 280) + "px";
  pop.style.top = (r.bottom + 6) + "px";

  pop.querySelector(".copy-btn").addEventListener("click", (e) => {
    navigator.clipboard?.writeText(e.target.dataset.copy);
    e.target.textContent = "已复制 ✓";
  });
  socialPop = pop;
  setTimeout(() => document.addEventListener("mousedown", outside), 0);
}
function outside(e) { if (socialPop && !socialPop.contains(e.target)) closeSocial(); }
function closeSocial() {
  if (socialPop) { socialPop.remove(); socialPop = null; document.removeEventListener("mousedown", outside); }
}

// ---------- 视频弹窗 ----------
function showVideo(id, label) {
  const m = document.getElementById("video-modal");
  document.getElementById("vmodal-title").textContent = label || "";
  document.getElementById("vmodal-iframe").src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  document.getElementById("vmodal-link").href = `https://www.youtube.com/watch?v=${id}`;
  m.hidden = false;
}

// ---------- lightbox ----------
function showLightbox(src) {
  const box = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = src;
  box.hidden = false;
}

// ---------- helpers ----------
function esc(s = "") {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function linkifyContact(text) {
  return esc(text)
    .replace("echowangxr@gmail.com", '<a href="mailto:echowangxr@gmail.com">echowangxr@gmail.com</a>')
    .replace("+86 15652197916", '<a href="tel:+8615652197916">+86 15652197916</a>');
}
