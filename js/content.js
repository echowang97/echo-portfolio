// =============================================================
//  ECHO-OS · content data
//  所有文案 / 链接 / 图片都在这里。加内容只改这个文件，不动逻辑。
//  以后要迁 React，把这份对象原样搬过去即可。
// =============================================================

export const ARCHIVE = "https://kuse-studio-six.vercel.app";

// 桌面图标（左侧一列）。id 对应 windows 里的 key。
export const DESKTOP_ICONS = [
  { id: "about",   label: "About Me",    icon: "monitor" },
  { id: "projects",label: "Projects",    icon: "folder" },
  { id: "resume",  label: "Resume",      icon: "doc" },
  { id: "contact", label: "Contact",     icon: "mail" },
  { id: "notepad", label: "Notepad",     icon: "notepad" },
  { id: "recycle", label: "Recycle Bin", icon: "recycle" },
];

// 社交链接（About 窗口顶部一行）
export const SOCIAL = [
  { key: "xiaohongshu", label: "小红书", value: "@Echo的画板",        href: null, copy: "@Echo的画板", qr: null },
  { key: "wechat",      label: "微信",   value: "wangxinran_echo",    href: null, copy: "wangxinran_echo", qr: null },
  { key: "email",       label: "Email",  value: "echowangxr@gmail.com",  href: "mailto:echowangxr@gmail.com" },
  { key: "phone",       label: "Phone",  value: "+86 15652197916",       href: "tel:+8615652197916" },
];

export const ABOUT = {
  name: "Echo Wang",
  nameZh: "王欣然",
  roles: "Design Director · Chief of Staff · Creative Developer",
  location: "📍 全球可飞",
  photo: null, // 放照片：填路径，例如 "assets/echo.jpg"（竖图最佳）
  bio: [
    "我是设计负责人，也是亲自下场落地的那个人。在中国 AI 出海最前沿的团队里，我带着约 10 人的设计组，从 0 到 1 搭起 7 个项目的视觉体系（Web3 与 AI 双赛道），同时以 Chief of Staff 的身份直接向 CEO 汇报，参与公司从找 PMF 到 Launch 的全链路决策。",
    "管理上，我用 60/30/10 分配任务、每日 1 对 1、每周设计周会把团队的审美和标准拉齐，连续拿到 S 与 A+ 绩效。设计上，我是唯一贯穿 Kuse 三代产品（白板到文件管理到 Workflow）的设计负责人，每次 pivot 都从 0 重建产品 UI、视觉体系与官网（前后做了 4 版），这套产品服务 170 个国家、50 万注册用户。2022 年主导的 Delysium 交互式白皮书上线 3 个月 124 万次浏览，拿下 Awwwards Honorable Mention。",
    "我不让审美停在 Figma。我把设计规范写成 stylelint 的 CI 硬约束，一个人用 vibe coding 重做了 100+ 页、6 语言的 Kuse 与 Junior 官网，还把方法沉淀成可复用的 skill，教市场同事自己改官网，让设计师不再是瓶颈。个人也在小红书持续输出 vibe coding 内容，积累 6600+ 粉丝。",
    "一句话：既能带团队、定方向，也能亲手把它写进上线代码。",
  ],
  stats: [
    { value: "7",        label: "个 0→1 视觉体系" },
    { value: "~10",      label: "人设计团队" },
    { value: "170 / 50万", label: "国 / 用户" },
    { value: "1",        label: "座 Awwwards" },
  ],
};

export const CONTACT = `想合作 / 想聊聊 / 只是打个招呼都欢迎。
邮件或电话都行，看你方便。

Email   echowangxr@gmail.com
Phone   +86 15652197916
小红书   @Echo的画板
微信     wangxinran_echo`;

export const NOTEPAD = `readme.txt
-----------
你好，你正在浏览的不是网站，是一台 ECHO-OS。
左边的图标都能双击。Projects 里有我做过的东西。
想找我：echowangxr@gmail.com / +86 15652197916
by echo`;

// 项目文件夹 Delysium / Kuse / Junior。每个 item:
//   type: "link"  → 新标签页打开 href
//   type: "image" → 窗口内 lightbox 放大
//   type: "video" → YouTube 缩略图当封面，点开新标签页
//   type: "folder"→ 打开子文件夹窗口（children）
//   type: "note"  → 纯文字说明块
export const PROJECTS = {
  label: "Projects",
  children: [
    { id: "delysium", type: "folder", label: "Delysium", icon: "folder" },
    { id: "kuse",     type: "folder", label: "Kuse",     icon: "folder" },
    { id: "junior",   type: "folder", label: "Junior",   icon: "folder" },
  ],
};

export const FOLDERS = {
  // 项目文件夹用「图堆 piles」：每坨是一个分类，双击进 gallery view。
  // 缺图缺文先留占位（items 为空 / desc 带〔〕），后面逐个补。
  delysium: {
    label: "Delysium",
    piles: [
      {
        id: "site", label: "官网", kind: "image",
        desc: "Delysium 官网 / DNA / Dashboard。〔草稿：补一句定位，待你确认〕",
        items: [
          { img: "assets/covers/delysium.png", caption: "delysium.com · 官网", href: "https://delysium.com" },
          { img: "assets/covers/dna_delysium.png", caption: "dna.delysium.com", href: "https://dna.delysium.com/" },
          { img: "assets/covers/delysium_dashboard.png", caption: "dashboard.delysium.com", href: "https://dashboard.delysium.com" },
        ],
      },
      {
        id: "whitepaper", label: "Whitepaper", kind: "image",
        desc: "横版步行的交互式白皮书。按任意键进入后操控角色走过赛博朋克像素街景，沿途 NPC（META-STEPHENSON、OMNI-KOJIMA…）逐段讲述世界观。🏆 Awwwards Honorable Mention。",
        items: ["00", "03", "06", "09", "12", "16", "20", "24"].map((n, k) => ({
          img: `https://kuse-studio-six.vercel.app/archive/delysium-whitepaper/screens/walk-${n}.png`,
          caption: `walk-${n}`,
          href: k === 0 ? "https://delysium-l7kmeq3yz-rct-ai.vercel.app/whitepaper?production" : undefined,
        })),
      },
      { id: "poster", label: "海报 / 物料", kind: "image", desc: "〔Delysium 海报、物料，后补〕", items: [] },
    ],
  },

  kuse: {
    label: "Kuse",
    piles: [
      {
        id: "site", label: "官网", kind: "image",
        desc: "Kuse 各代官网 / Landing 预览。",
        items: [
          { img: "assets/covers/kuse_ai.png", caption: "kuse.ai · 现在的官网", href: "https://kuse.ai" },
          { img: "assets/covers/kuse_staging.png", caption: "Landing · staging (2026) · 滚动叙事", href: "https://www-staging.kuse.ai/" },
          { img: "assets/covers/kuse_webflow.png", caption: "Landing · Webflow (2025) · 快照", href: "https://kuse-studio-six.vercel.app/archive/webflow-site/kuse.html" },
          { img: "assets/covers/kuse_collage.png", caption: "Landing · 黄色拼贴版 (2024) · 拼贴 + 动效", href: "https://kuse-landing-collage.vercel.app" },
        ],
      },
      {
        id: "app", label: "Kuse App", kind: "image",
        desc: "Kuse 产品本体，服务 170 个国家、50 万注册用户的 AI 协作工作台。〔app 界面图后补〕",
        items: [
          { img: "assets/covers/app_kuse.png", caption: "app.kuse.ai", href: "https://app.kuse.ai" },
        ],
      },
      { id: "poster", label: "海报", kind: "image", desc: "〔Kuse 海报，后补〕", items: [] },
      {
        id: "video", label: "Video", kind: "video",
        desc: "Kuse 发布视频。Echo 负责内容 / 分镜 / 动效 / 整体把控。",
        items: [
          { yt: "nuCxUIsWjsI", caption: "Kuse 1.0 Launch Video · 内容 + 分镜 + 动效 + 整体把控，外部摄影灯光团队协助录制" },
          { yt: "SUtAt2GvSeg", caption: "A Boring Product Introduction · 出镜 + 内容 + 分镜 + 动效，含妆造" },
          { yt: "zzu9PzcS5XQ", caption: "Kuse 2.0 Launch Video · 内容 + 分镜 + 动效 + 整体把控" },
        ],
      },
      {
        id: "material", label: "物料", kind: "image",
        desc: "Kuse 周边物料，含 kuse.love（Kuse Shop）。〔后补更多〕",
        items: [
          { img: "assets/covers/kuse_shop.png", caption: "kuse.love · Kuse Shop", href: "https://kuse.love" },
        ],
      },
    ],
  },

  junior: {
    label: "Junior",
    piles: [
      {
        id: "site", label: "官网", kind: "image",
        desc: "「Hire your first AI employee」，可接入 Slack & Teams 的 AI 助手。",
        items: [{ img: "assets/covers/junior.png", caption: "junior.so", href: "https://junior.so" }],
      },
      {
        id: "video", label: "Video", kind: "video",
        desc: "Junior 发布视频，Echo 负责内容 / 分镜 / 动效 / 整体把控，自主拍摄。",
        items: [{ yt: "yj0Zb4vVDAo", caption: "Junior Launch Video" }],
      },
      {
        id: "design", label: "设计系统 / 物料", kind: "image",
        desc: "设计 token 与组件库（Buttons / Fields / Badges / Cards），绿系品牌色 + Instrument Serif 展示标题 + Montserrat 正文。〔组件图后补〕",
        items: [],
      },
    ],
  },

  // 回收站里的占位文件夹（内容后补，往对应 items 里加图即可）
  "delysium-one": {
    label: "Delysium ONE",
    items: [
      { type: "work", title: "Delysium ONE", status: "放弃 Launch / scrapped", shot: "assets/covers/delysium_one.png",
        desc: "〔一句话说明这是什么、做到哪一步、为什么没上，晚点补充。〕" },
    ],
  },
  sip: {
    label: "sip",
    items: [
      { type: "work", title: "sip · Web3 · 0→1 视觉体系", status: "未 launch", shot: null,
        desc: "〔一句话说明 + 作品图，之后补。〕" },
    ],
  },
  nofa: {
    label: "NOFA",
    items: [
      { type: "work", title: "NOFA · Web3 · 0→1 视觉体系", status: "未 launch", shot: null,
        desc: "〔一句话说明 + 作品图，之后补。〕" },
    ],
  },
  baidu: {
    label: "百度游戏",
    items: [
      { type: "work", title: "百度游戏 · 2021 · 视觉设计（手游）", status: "更早的经历", shot: null,
        desc: "校招进组，参与 S 级日漫 IP 手游发行，做 Banner / 预约页 / icon / LOGO 等；参与百度游戏 LOGO 设计。作品图之后补。" },
    ],
  },
};

// 回收站：没上线 / 过往的东西，诚实又有梗。
// 回收站：用文件夹图标占位，双击进去看说明（作品图后补）
export const RECYCLE = {
  label: "Recycle Bin",
  children: [
    { id: "delysium-one", type: "folder", label: "Delysium ONE", icon: "folder" },
    { id: "sip",          type: "folder", label: "sip",          icon: "folder" },
    { id: "nofa",         type: "folder", label: "NOFA",         icon: "folder" },
    { id: "baidu",        type: "folder", label: "百度游戏",      icon: "folder" },
  ],
};

export const RESUME = {
  note: "在线简历可看下面信息，或下载 PDF。",
  pdf: null, // 放 PDF 后填路径，例如 "assets/echo-resume.pdf"
};

// 开机自检画面文本（BIOS / POST 风）
export const BOOT_LINES = [
  "ECHO-OS  v2.6   (c) 2026 Echo Wang. All rights reserved.",
  "------------------------------------------------------------",
  "CPU      : Creative-Core(TM)  Design + Code   @ 97 MHz",
  "Memory   : Ideas ........................ OK   [ 640K ]",
  "------------------------------------------------------------",
  "Detecting drives...",
  "  C:\\ ABOUT ................................ [ READY ]",
  "  D:\\ PROJECTS ............................. [ READY ]",
  "  E:\\ CONTACT .............................. [ READY ]",
  "------------------------------------------------------------",
  "Loading desktop environment ............... ▓▓▓▓▓▓▓▓▓▓ 100%",
  "",
  ">  Press any key to enter _",
];

export const BOOT_LOGO = `   ███████╗ ██████╗██╗  ██╗ ██████╗
   ██╔════╝██╔════╝██║  ██║██╔═══██╗
   █████╗  ██║     ███████║██║   ██║
   ██╔══╝  ██║     ██╔══██║██║   ██║
   ███████╗╚██████╗██║  ██║╚██████╔╝
   ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝
        W A N G   ·   D E S I G N   &   C O D E`;
