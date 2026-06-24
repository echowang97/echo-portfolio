// 简单的复古风 SVG 图标。返回字符串，直接塞进 innerHTML。
// 风格：实心块面 + 粗描边，贴近老系统图标，不用 emoji。

const wrap = (inner) => `<svg class="glyph" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

export const ICONS = {
  monitor: wrap(`
    <rect x="6" y="8" width="36" height="26" rx="2" fill="#dfe6ee" stroke="#3b4a5a" stroke-width="2"/>
    <rect x="9" y="11" width="30" height="20" fill="#245edb"/>
    <rect x="9" y="11" width="30" height="9" fill="#3f7ae0"/>
    <rect x="18" y="36" width="12" height="4" fill="#9aa6b2"/>
    <rect x="13" y="40" width="22" height="3" rx="1.5" fill="#7c8896"/>`),

  folder: wrap(`
    <path d="M5 13h13l4 4h21v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V13z" fill="#f3c34a" stroke="#a9821f" stroke-width="2"/>
    <path d="M5 19h38v20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V19z" fill="#ffd968"/>`),

  doc: wrap(`
    <path d="M12 5h17l9 9v27a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="#fff" stroke="#5a6675" stroke-width="2"/>
    <path d="M29 5v9h9" fill="none" stroke="#5a6675" stroke-width="2"/>
    <g stroke="#3a86d4" stroke-width="2"><line x1="16" y1="22" x2="32" y2="22"/><line x1="16" y1="28" x2="32" y2="28"/><line x1="16" y1="34" x2="26" y2="34"/></g>`),

  mail: wrap(`
    <rect x="5" y="11" width="38" height="26" rx="2" fill="#fff" stroke="#5a6675" stroke-width="2"/>
    <path d="M6 13l18 13L42 13" fill="none" stroke="#3a86d4" stroke-width="2"/>`),

  notepad: wrap(`
    <rect x="9" y="6" width="30" height="36" rx="2" fill="#fff" stroke="#5a6675" stroke-width="2"/>
    <rect x="9" y="6" width="30" height="7" fill="#f3c34a"/>
    <g stroke="#b8c0ca" stroke-width="2"><line x1="14" y1="20" x2="34" y2="20"/><line x1="14" y1="26" x2="34" y2="26"/><line x1="14" y1="32" x2="30" y2="32"/></g>`),

  recycle: wrap(`
    <path d="M12 16h24l-2 24a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2L12 16z" fill="#c9d2db" stroke="#5a6675" stroke-width="2"/>
    <rect x="9" y="11" width="30" height="5" rx="2" fill="#9aa6b2" stroke="#5a6675" stroke-width="2"/>
    <g stroke="#7c8896" stroke-width="2"><line x1="19" y1="22" x2="20" y2="36"/><line x1="24" y1="22" x2="24" y2="36"/><line x1="29" y1="22" x2="28" y2="36"/></g>
    <path d="M24 5a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z" fill="#3a8a2f"/>`),

  link: wrap(`
    <rect x="6" y="9" width="36" height="30" rx="2" fill="#fff" stroke="#5a6675" stroke-width="2"/>
    <rect x="6" y="9" width="36" height="7" fill="#3a86d4"/>
    <circle cx="24" cy="27" r="7" fill="none" stroke="#3a8a2f" stroke-width="2"/>
    <path d="M24 20v14M17 27h14" stroke="#3a8a2f" stroke-width="2"/>
    <path d="M30 4l3 6-6-1z" fill="#f3c34a"/>`),

  image: wrap(`
    <rect x="6" y="9" width="36" height="30" rx="2" fill="#fff" stroke="#5a6675" stroke-width="2"/>
    <circle cx="16" cy="18" r="3" fill="#f3c34a"/>
    <path d="M8 37l11-12 7 7 6-6 8 9z" fill="#3a86d4"/>`),
};

export const glyph = (name) => ICONS[name] || ICONS.doc;
