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

// ---------- 站内编辑：图说 / 描述存浏览器，可导出 JSON ----------
const EDIT_KEY = "echo-edits";
function loadEdits() {
  try { return JSON.parse(localStorage.getItem(EDIT_KEY)) || { cap: {}, desc: {} }; }
  catch { return { cap: {}, desc: {} }; }
}
const EDITS = loadEdits();
function saveEdits() { try { localStorage.setItem(EDIT_KEY, JSON.stringify(EDITS)); } catch {} }
const capKey = (it) => it?.img || (it?.yt ? "yt:" + it.yt : "");
const capOf = (it) => { const k = capKey(it); return (k && EDITS.cap[k] != null ? EDITS.cap[k] : it?.caption) || ""; };
const descOf = (pileKey, pile) => (EDITS.desc[pileKey] != null ? EDITS.desc[pileKey] : pile?.desc) || "";

// 给所有打开的 gallery 的可编辑字段开/关编辑（desktop.js 的编辑开关调用）
export function setEditable(on) {
  document.querySelectorAll("#windows [data-edit]").forEach((n) => {
    n.contentEditable = on ? "true" : "false";
  });
}
// 导出已编辑的图说/描述为 JSON（发我合并进源码）
export function exportEdits() {
  const blob = new Blob([JSON.stringify(EDITS, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "echo-edits.json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- 公开 API ----------
export function openWindow(key) {
  if (open.has(key)) { focusWindow(key); return; }

  const { title, icon, bodyHTML, width } = build(key);
  const el = document.createElement("section");
  el.className = "window";
  el.dataset.key = key;

  el.style.width = (width || 440) + "px";

  el.innerHTML = `
    <header class="title-bar">
      ${glyph(icon).replace('class="glyph"', 'class="ico"')}
      <span class="label">${title}</span>
      <button class="ctrl close" aria-label="close">&times;</button>
    </header>
    <div class="window-body">${bodyHTML}</div>`;

  host().appendChild(el);
  positionWindow(el);
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

// 轻微错层，但始终限制在视口内（底部不被任务栏截断；超大窗贴顶左）
function positionWindow(el) {
  const margin = 10, taskbar = 34;
  const vw = window.innerWidth, vh = window.innerHeight;
  const w = el.offsetWidth, h = el.offsetHeight;
  let left = 64 + (offset % 5) * 26;
  let top = 38 + (offset % 5) * 20;
  offset++;
  left = Math.min(Math.max(left, margin), Math.max(margin, vw - w - margin));
  top = Math.min(Math.max(top, margin), Math.max(margin, vh - taskbar - h - margin));
  el.style.left = left + "px";
  el.style.top = top + "px";
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
  if (key === "about")   return { title: "About Me", icon: "monitor", width: 720, bodyHTML: aboutHTML() };
  if (key === "projects")return { title: "Projects", icon: "folder", width: 380, bodyHTML: gridHTML(PROJECTS.children) };
  if (key === "contact") return { title: "Contact", icon: "mail", width: 440, bodyHTML: `<pre class="textpane">${linkifyContact(CONTACT)}</pre>` };
  if (key === "notepad") return { title: "about.txt - Notepad", icon: "notepad", width: 440, bodyHTML: `<pre class="textpane">${esc(NOTEPAD)}</pre>` };
  if (key === "resume")  return { title: "Resume", icon: "doc", width: 640, bodyHTML: resumeHTML() };
  if (key === "recycle") return { title: "Recycle Bin", icon: "recycle", width: 560, bodyHTML: gridHTML(RECYCLE.children) };

  if (key.startsWith("gallery:")) {
    const [, proj, idxStr] = key.split(":");
    const f = FOLDERS[proj];
    const pile = f?.piles?.[+idxStr];
    return { title: `${f?.label || ""} · ${pile?.label || ""}`, icon: "folder", width: 1040, bodyHTML: galleryHTML(pile, `${proj}:${idxStr}`) };
  }

  if (key.startsWith("folder:")) {
    const id = key.slice(7);
    const f = FOLDERS[id];
    const body = f.piles ? folderPilesHTML(f.piles, id) : itemsHTML(f.items);
    return { title: f.label, icon: "folder", width: f.piles ? 660 : 560, bodyHTML: body };
  }
  return { title: key, icon: "doc", width: 440, bodyHTML: "" };
}

// 缩略图地址：图片直接用 img，视频用 YouTube 封面
function thumbSrc(it) {
  return it?.img || (it?.yt ? `https://img.youtube.com/vi/${it.yt}/mqdefault.jpg` : null);
}

// 文件夹里的「图堆」：每坨叠放几张图，双击进 gallery
function folderPilesHTML(piles, proj) {
  return `<div class="piles">${piles.map((p, i) => pileHTML(p, proj, i)).join("")}</div>`;
}
function pileHTML(p, proj, i) {
  // 三层叠放：顶层是第一张，下面两层往后排（没有就用空框占位）
  const layers = [2, 1, 0].map((k) => {
    const src = thumbSrc((p.items || [])[k]);
    return src ? `<img src="${src}" loading="lazy" alt="">` : `<span class="ph"></span>`;
  }).join("");
  const n = (p.items || []).length;
  const count = n ? `<span class="pile-count">${n}</span>` : `<span class="pile-count empty">空</span>`;
  return `<button class="pile" data-gallery="${proj}:${i}" title="${esc(p.label)}（双击打开）">
    <span class="pile-stack">${layers}</span>
    <span class="pile-label">${esc(p.label)}${count}</span>
  </button>`;
}

// gallery view：左大图、右描述、下缩略图条
function galleryMainHTML(it, kind) {
  if (!it) return `<div class="g-empty">还没有内容<br>稍后补图</div>`;
  if (it.yt) {
    return `<iframe class="g-frame" src="https://www.youtube.com/embed/${it.yt}?rel=0" title="${esc(it.caption || "")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }
  return `<img class="g-img" src="${it.img}" alt="${esc(it.caption || "")}">`;
}
function galleryActions(it) {
  if (!it) return "";
  if (it.href) return `<a class="chip-link" href="${it.href}" target="_blank" rel="noopener">打开网站 ↗</a>`;
  if (it.yt) return `<a class="chip-link" href="https://www.youtube.com/watch?v=${it.yt}" target="_blank" rel="noopener">在 YouTube 打开 ↗</a>`;
  return "";
}
function galleryHTML(pile, pileKey) {
  if (!pile) return "<p>（空）</p>";
  const items = pile.items || [];
  const first = items[0];
  const strip = items.map((it, i) =>
    `<button class="g-thumb${i === 0 ? " active" : ""}" data-gidx="${i}"><img src="${thumbSrc(it)}" loading="lazy" alt=""><span class="g-num">${i + 1}</span></button>`).join("");
  return `<div class="gallery" data-kind="${pile.kind || "image"}">
    <div class="gallery-main" id="gmain">${galleryMainHTML(first, pile.kind)}</div>
    <div class="gallery-desc">
      <div class="g-title">${esc(pile.label)}</div>
      <p class="g-desc" data-edit="desc" data-key="${esc(pileKey)}">${esc(descOf(pileKey, pile))}</p>
      <div class="g-caption" id="gcap" data-edit="cap" data-key="${esc(capKey(first))}">${esc(capOf(first))}</div>
      <div class="g-actions" id="gact">${galleryActions(first)}</div>
    </div>
  </div>
  ${items.length ? `<div class="gallery-strip">${strip}</div>` : ""}`;
}

function aboutHTML() {
  const stats = ABOUT.stats.map((s) =>
    `<div class="stat"><div class="v">${s.value}</div><div class="l">${esc(s.label)}</div></div>`).join("");
  const social = SOCIAL.map((s) =>
    `<button class="social-chip" data-social="${s.key}"><b>${esc(s.label)}</b> ${esc(s.value)}</button>`).join("");
  const bio = ABOUT.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  const photo = ABOUT.photo
    ? `<img class="about-photo" src="${ABOUT.photo}" alt="${ABOUT.name}">`
    : `<div class="about-photo placeholder">照片<br>放这里</div>`;
  return `
    <div class="about-head">
      ${photo}
      <div class="about-meta">
        <div class="about-name">${esc(ABOUT.name)}${ABOUT.nameZh ? `<small>${esc(ABOUT.nameZh)}</small>` : ""}</div>
        <div class="about-roles">${esc(ABOUT.roles)}</div>
        <div class="about-loc">${esc(ABOUT.location)}</div>
        <div class="social-bar">${social}</div>
      </div>
    </div>
    <div class="stats">${stats}</div>
    <div class="bio">${bio}</div>`;
}

function resumeHTML() {
  const r = RESUME;
  const dl = r.pdf
    ? `<a class="btn-xp" href="${r.pdf}" download>下载 PDF</a>`
    : `<button class="btn-xp" disabled>下载 PDF（待补）</button>`;
  const contact = (r.contact || []).map(esc).join("　·　");
  const sections = (r.sections || []).map((s) =>
    `<section class="cv-sec"><h3>${esc(s.h)}</h3>${(s.blocks || []).map(cvBlock).join("")}</section>`).join("");
  const note = r.note ? `<p class="cv-note">${esc(r.note)}</p>` : "";
  return `
    <div class="cv">
      <div class="cv-head">
        <div class="cv-name">${esc(r.name)}<small>${esc(r.nameZh)}</small></div>
        <div class="cv-title">${esc(r.title)}</div>
        <div class="cv-contact">${contact}</div>
      </div>
      <div class="resume-actions">${dl}</div>
      ${sections}
      ${note}
    </div>`;
}

function cvBlock(b) {
  let out = "";
  if (b.sub) out += `<div class="cv-sub">${esc(b.sub)}</div>`;
  if (b.meta) out += `<div class="cv-meta">${esc(b.meta)}</div>`;
  if (b.label) out += `<div class="cv-label">${esc(b.label)}</div>`;
  if (b.p) out += `<p>${esc(b.p)}</p>`;
  if (b.ul) out += `<ul class="cv-ul">${b.ul.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  return out;
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
    else if (it.type === "work") { flush(); out += workHTML(it); }
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
    return `<button class="grid-item img" data-img="${it.src}" title="${esc(it.label || "")}">
      <span class="thumb"><img loading="lazy" src="${it.src}" alt="${esc(it.label || "")}"></span>
      <span class="cap">${esc(it.label || "")}</span></button>`;
  if (it.type === "video") {
    const thumb = `https://img.youtube.com/vi/${it.yt}/mqdefault.jpg`;
    return `<button class="grid-item video" data-yt="${it.yt}" data-label="${esc(it.label)}" title="${esc(it.role || "")}">
      <span class="thumb"><img loading="lazy" src="${thumb}" alt="${esc(it.label)}"></span>
      <span class="cap">${esc(it.label)}</span></button>`;
  }
  return "";
}

// 作品卡片：预览图 + 标题 + 描述 + 链接；双击卡片打开主站
function workHTML(w) {
  const shot = w.shot
    ? `<img class="card-shot" src="${w.shot}" alt="${esc(w.title)}" loading="lazy">`
    : `<div class="card-shot placeholder">预览图<br>后补</div>`;
  const sub = w.sub ? ` <span class="card-sub">${esc(w.sub)}</span>` : "";
  const badge = w.badge ? `<span class="badge">${esc(w.badge)}</span>` : "";
  const status = w.status ? `<span class="status">status: ${esc(w.status)}</span>` : "";
  const desc = w.desc ? `<p class="card-desc">${esc(w.desc)}</p>` : "";
  const credits = w.credits ? `<div class="credits">${esc(w.credits)}</div>` : "";
  const extra = (w.links || [])
    .map((l) => `<a class="chip-link" href="${l.href}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
    .join("");
  const hint = w.href ? `<span class="card-open-hint">双击打开 ↗</span>` : "";
  return `<div class="work-card"${w.href ? ` data-open-href="${w.href}"` : ""}>
    ${shot}
    <div class="card-body">
      <div class="card-title">${esc(w.title)}${sub}</div>
      ${badge}${status}${desc}${credits}
      <div class="card-actions">${hint}${extra}</div>
    </div>
  </div>`;
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
  // 图堆 pile：单击选中、双击进 gallery
  el.querySelectorAll("[data-gallery]").forEach((b) =>
    b.addEventListener("dblclick", () => openWindow("gallery:" + b.dataset.gallery)));

  // gallery 缩略图切换 + 站内编辑
  if (key.startsWith("gallery:")) {
    const [, proj, idxStr] = key.split(":");
    const pile = FOLDERS[proj]?.piles?.[+idxStr];
    const items = pile?.items || [];
    el.querySelectorAll(".g-thumb").forEach((t) =>
      t.addEventListener("click", () => {
        const it = items[+t.dataset.gidx];
        el.querySelector("#gmain").innerHTML = galleryMainHTML(it, pile.kind);
        const cap = el.querySelector("#gcap");
        cap.textContent = capOf(it);       // 应用已编辑的图说
        cap.dataset.key = capKey(it);       // 切换当前图说的存储键
        el.querySelector("#gact").innerHTML = galleryActions(it);
        el.querySelectorAll(".g-thumb").forEach((x) => x.classList.toggle("active", x === t));
      }));
    // 编辑：输入即存
    el.querySelectorAll("[data-edit]").forEach((node) =>
      node.addEventListener("input", () => {
        const k = node.dataset.key;
        if (!k) return;
        EDITS[node.dataset.edit][k] = node.textContent.trim();
        saveEdits();
      }));
    // 若当前处于编辑模式，新开的 gallery 也设为可编辑
    if (document.body.classList.contains("edit-mode")) {
      el.querySelectorAll("[data-edit]").forEach((n) => { n.contentEditable = "true"; });
    }
  }

  // 图标类与作品卡片：单击选中、双击打开，与桌面图标一致
  const selectables = el.querySelectorAll(".grid-item, .work-card, .pile");
  const clearSel = () => selectables.forEach((g) => g.classList.remove("selected"));
  selectables.forEach((g) => {
    g.addEventListener("click", (e) => {
      if (g.tagName === "A") e.preventDefault(); // 快捷方式单击只选中，不跳转
      clearSel();
      g.classList.add("selected");
    });
  });
  el.querySelectorAll(".work-card[data-open-href]").forEach((c) =>
    c.addEventListener("dblclick", (e) => {
      if (e.target.closest("a")) return; // 卡片内的次链接交给它自己
      window.open(c.dataset.openHref, "_blank", "noopener");
    }));
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
