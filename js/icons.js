// 桌面图标：Memphis 图标主题（MIT 授权，9x/XP 风重画）的本地 PNG。
// 源：https://github.com/infofintech/memphis  · 文件在 assets/icons/
// glyph(name) 返回 <img class="glyph" ...>，沿用 class="glyph" 约定，
// 这样 windows.js / desktop.js 里把 class 换成 "ico" / "dot" 的逻辑照常生效。

const BASE = "assets/icons/";

// 语义名 → Memphis 文件名
const MAP = {
  monitor: "memphis.home",      // CRT 老电脑 → About / 我的电脑
  folder:  "memphis.directory", // 黄文件夹
  doc:     "memphis.note",      // 带字的文档 → Resume
  mail:    "memphis.mail",      // 信封 → Contact
  notepad: "memphis.text",      // 记事本纸张 → Notepad
  recycle: "memphis.trash",     // 带回收箭头的垃圾桶 → Recycle Bin
  link:    "memphis.link",      // 地球快捷方式 → 外链
  image:   "memphis.image",     // 图片缩略图占位
};

export const glyph = (name) => {
  const file = MAP[name] || MAP.doc;
  return `<img class="glyph" src="${BASE}${file}.png" alt="" draggable="false">`;
};
