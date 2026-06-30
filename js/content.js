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
];

export const ABOUT = {
  name: "Echo W",
  nameZh: "",
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
邮件或社交都行，看你方便。

Email   echowangxr@gmail.com
小红书   @Echo的画板
微信     wangxinran_echo`;

export const NOTEPAD = `关于 ECHO-OS
------------------------------------------
你好，你正在浏览的不是网站，是一台 ECHO-OS。

ECHO-OS  v2.6   (c) 2026 Echo W.

处理器   Creative-Core(TM) 设计 + 代码 @ 97 MHz
内存     想法 ............ 640K（够用了）
显示     像素完美渲染 .... OK
已安装   vibe coding · 审美 · 咖啡因
授权给   Echo

左边的图标都能双击，Projects 里有我做过的东西。
想找我：echowangxr@gmail.com

彩蛋   试试  ↑ ↑ ↓ ↓ ← → ← →  B A
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
  // pile.items 每项可以是：
  //   { img: "...", caption } 静态图
  //   { mp4: "...", poster: "...", caption } 自动播放循环片段（poster 用于缩略图/图堆，强烈建议给）
  //   { yt: "视频ID", caption } YouTube 嵌入
  // 片段建议：720p、几秒、静音、压到 <2MB；放 assets/clips/ 或填外部 CDN 完整 URL 均可。
  // 缺图缺文先留占位（items 为空 / desc 带），后面逐个补。
  delysium: {
    label: "Delysium",
    piles: [
      {
        id: "site", label: "官网", kind: "image",
        desc: "Delysium 官网 / DNA / Dashboard。",
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
      {
        id: "poster", label: "海报 / 物料", kind: "image",
        desc: "Delysium 海报 / 活动 / 社区物料。",
        items: [
          { img: "assets/covers/delysium-poster/whitepaper-banner.jpg", caption: "Whitepaper Banner" },
          { img: "assets/covers/delysium-poster/500k-poster.jpg", caption: "500K Poster" },
          { img: "assets/covers/delysium-poster/nft-2022.jpg", caption: "2022 NFT" },
          { img: "assets/covers/delysium-poster/nft-ingame-banner.jpg", caption: "2022 NFT + in-Game Banner" },
          { img: "assets/covers/delysium-poster/nft-template.jpg", caption: "NFT 活动模板" },
          { img: "assets/covers/delysium-poster/dma-event.jpg", caption: "DMA Event" },
          { img: "assets/covers/delysium-poster/dma-10m.jpg", caption: "DMA 10M" },
          { img: "assets/covers/delysium-poster/infographic-2022.jpg", caption: "2022 Infographic" },
          { img: "assets/covers/delysium-poster/galxe.jpg", caption: "Galxe" },
          { img: "assets/covers/delysium-poster/christmas.jpg", caption: "Christmas" },
          { img: "assets/covers/delysium-poster/calendar.jpg", caption: "Calendar" },
          { img: "assets/covers/delysium-poster/hologram.jpg", caption: "Hologram 全息投影" },
          { img: "assets/covers/delysium-poster/tg-dc-stickers.jpg", caption: "TG & DC 表情包" },
          { img: "assets/covers/delysium-poster/p1441.jpg", caption: "1441" },
        ],
      },
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
        desc: "Kuse 产品本体，服务 170 个国家、50 万注册用户的 AI 协作工作台。",
        items: [
          { img: "assets/covers/app_kuse.png", caption: "app.kuse.ai", href: "https://app.kuse.ai" },
        ],
      },
      {
        id: "poster", label: "海报", kind: "image",
        desc: "Kuse 各类海报 / 营销物料。",
        items: [
          { img: "assets/covers/kuse-poster/nanobananapro.jpg", caption: "Nano Banana Pro" },
          { img: "assets/covers/kuse-poster/agentickuse3_4.jpg", caption: "Agentic Kuse" },
          { img: "assets/covers/kuse-poster/modelposters.jpg", caption: "Model Posters" },
          { img: "assets/covers/kuse-poster/christmasoffer.jpg", caption: "Christmas Offer" },
          { img: "assets/covers/kuse-poster/phstore.jpg", caption: "PH Store" },
          { img: "assets/covers/kuse-poster/phcountdown.jpg", caption: "PH Countdown" },
          { img: "assets/covers/kuse-poster/claude-on-cloud.jpg", caption: "Claude on Cloud" },
          { img: "assets/covers/kuse-poster/hire1.jpg", caption: "Hire 1" },
          { img: "assets/covers/kuse-poster/hire2.jpg", caption: "Hire 2" },
          { img: "assets/covers/kuse-poster/jan13.jpg", caption: "Jan 13" },
          { img: "assets/covers/kuse-poster/0416.jpg", caption: "0416" },
          { img: "assets/covers/kuse-poster/covers.jpg", caption: "Covers" },
          { img: "assets/covers/kuse-poster/ppt.jpg", caption: "PPT" },
          { img: "assets/covers/kuse-poster/ppt-1.jpg", caption: "PPT 1" },
          { img: "assets/covers/kuse-poster/old-ui.jpg", caption: "Old UI" },
          { img: "assets/covers/kuse-poster/kuse-shop1.jpg", caption: "Kuse Shop" },
        ],
      },
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
        desc: "Kuse 周边物料，含 kuse.love（Kuse Shop）。",
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
        desc: "设计 token 与组件库（Buttons / Fields / Badges / Cards），绿系品牌色 + Instrument Serif 展示标题 + Montserrat 正文。",
        items: [],
      },
    ],
  },

  // 回收站里的占位文件夹（内容后补，往对应 items 里加图即可）
  "delysium-one": {
    label: "Delysium ONE",
    items: [
      { type: "work", title: "Delysium ONE", status: "放弃 Launch / scrapped", shot: "assets/covers/delysium_one.png",
        desc: "" },
    ],
  },
  sip: {
    label: "sip",
    items: [
      { type: "work", title: "sip · Web3 · 0→1 视觉体系", status: "未 launch", shot: "assets/covers/sip.png",
        desc: "sip（@sip_trading_）· The ultimate on-chain trading ecosystem。Echo 做的 0→1 品牌视觉。" },
    ],
  },
  nofa: {
    label: "NOFA",
    items: [
      { type: "work", title: "NOFA · Web3 · 0→1 视觉体系", status: "未 launch", shot: "assets/covers/nofa.png",
        desc: "NOFA（@nofA_ai · nofa.ai）· Infrastructure for Agentic Trading。Echo 做的 0→1 品牌视觉。" },
    ],
  },
  t54: {
    label: "t54",
    items: [
      { type: "work", title: "t54 · t54.ai · Trust Layer for Agentic Economy", status: "Web3 / AI · 0→1 视觉", shot: "assets/covers/t54.png",
        desc: "t54（t54.ai）· Trust Layer for Agentic Economy，Backed by Anagram / PL Capital / Franklin Templeton / Ripple。Echo 做的 0→1 品牌视觉。" },
    ],
  },
  baidu: {
    label: "百度游戏",
    items: [
      { type: "note", title: "百度游戏 · 2021 · 视觉设计（手游）", status: "更早的经历",
        body: "校招进组，参与 S 级日漫 IP 手游发行，做 Banner / 预约页 / icon / LOGO 等；参与百度游戏 LOGO 设计。" },
      { type: "image", label: "百度 1", src: "assets/covers/baidu/baidu1.jpg" },
      { type: "image", label: "百度 2", src: "assets/covers/baidu/baidu2.jpg" },
      { type: "image", label: "百度 3", src: "assets/covers/baidu/baidu3.jpg" },
      { type: "image", label: "百度 4", src: "assets/covers/baidu/baidu4.jpg" },
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
    { id: "t54",          type: "folder", label: "t54",          icon: "folder" },
    { id: "baidu",        type: "folder", label: "百度游戏",      icon: "folder" },
  ],
};

// 简历（设计 Lead 版）。来源：简历_设计Lead_v1.md。
// block 类型：{p} 段落 / {sub,meta} 小标题+副行 / {label,ul} 小节标题+要点 / {ul} 要点列表。
export const RESUME = {
  pdf: null, // 放 PDF 后填路径，例如 "assets/echo-resume.pdf"（填了会出「下载 PDF」按钮）
  name: "王欣然",
  nameZh: "echo",
  title: "AI 产品设计总监 / 设计负责人（Design Lead）",
  contact: ["echowangxr@gmail.com", "小红书 6,500+（vibe coding）", "github.com/echowang97"],
  sections: [
    {
      h: "简介",
      blocks: [
        { p: "AI 出海团队的设计负责人，四年里为 7 个产品（Web3 → AI 应用）从 0 搭建视觉与设计体系，带约 10 人设计组。不止管设计：直接向 CEO 汇报、列席核心管理层、参与公司全部决策，跨研发 / 市场 / 设计打破部门墙，具备 Chief of Staff 级的跨职能与组织经验。既能定战略、带团队，也能用 AI 辅助编程亲手把设计落地上线。2025 年两个考核周期评级 S、A+。" },
      ],
    },
    {
      h: "核心能力",
      blocks: [
        { sub: "设计领导力", p: "设计战略与体系规划、设计质量与一致性把控（像素级审核）；多产品 0→1 视觉体系；color token + stylelint 把设计规范固化为 CI 约束。" },
        { sub: "团队管理", p: "带约 10 人设计组，从 0 搭建并带教；60/30/10 任务分配、每日 1 对 1、每周设计周会、季度团建；负责招聘与梯队建设。" },
        { sub: "战略与跨职能协同", p: "直接向 CEO 汇报、列席核心管理层、参与公司全部决策；深入研发与市场一线打破部门墙、对齐上下游，将各角色方法论沉淀为可复用 skill；主持 All Hands、跨部门项目协调。" },
        { sub: "市场 / 增长", p: "官媒矩阵与社媒运营、SEO/GEO、受邀线下宣讲（单场转化百人级进群）；用 AI 批量产出营销素材。" },
        { sub: "AI-native 落地", p: "以 vibe coding 独立交付前端页面与官网；自建十余个 Claude/Codex skill 与跨 session 记忆系统，并外溢为团队可复用工作流。" },
      ],
    },
    {
      h: "工作经历",
      blocks: [
        { sub: "rct AI（dp labs）", meta: "2022.03 – 至今 ｜ 视觉设计师 / 设计组长 → 设计总监（兼 Chief of Staff）｜ 绩效 A(22H2) · A(23H1) · S(25H1) · A+(25H2)" },
        { sub: "Kuse AI（2024 – 至今）— 设计负责人 / 直接向 CEO 汇报", meta: "简历重点" },
        { p: "服务 170 个国家、50 万注册用户的 AI 产品；产品历经 1.0 白板 → 2.0 文件管理 → 3.0 Workflow 自动化三次转型寻找 PMF。" },
        { label: "设计领导与交付", ul: [
          "作为贯穿三代产品的设计负责人，每次转型都从 0 重建产品 UI、视觉体系与品牌官网（累计 4 个官网版本），保持产品对外形象一致可信。",
          "主导并把控 Kuse app 约 80% 功能的 UI/UX 设计（Workflow 自动化、文件管理系统、三栏式主界面布局与整体风格），对最终呈现负责。",
          "统一 color token 与字体，新增 stylelint 规则将设计规范固化为 CI 约束。",
          "设计体系覆盖全触点：线上视觉、产品 UI、周边与线上商城、港 / 台 / 日线下活动物料。",
        ] },
        { label: "业务影响", ul: [
          "主导并独立完成 app 移动端适配，重新承接此前流失的约 70% 社媒自然流量。",
          "一人 vibe coding 重做 SEO 导向新官网（脱离 Webflow、100+ 页、6 语言、响应式）：日均 60,000+ 曝光 / 1,300+ 点击，峰值日均曝光 271,000+（GSC）。",
          "受邀线下宣讲：深圳「十字路口」介绍 Kuse 转化 100+ 进群；2026.04 深圳 AI 论坛介绍 Junior 转化 200+ 进群。",
          "团队里程碑（参与）：2025.08.15 launch 获 Product Hunt 日榜第一；团队 0 外部融资下实现 ARR 9M、单日新增注册峰值 5,000+。",
        ] },
        { label: "战略与组织（Chief of Staff 级经验）", ul: [
          "列席核心管理层、参与公司全部决策，协助 CEO 对齐上下游、补齐视角。",
          "打破部门墙：亲自深入研发与市场（含 vibe coding 后端、上手 SEO），理解各角色难点，并把方法论沉淀为可复用 skill，让经验在组织内可传承。",
          "主导 OKR 试行并在评估后判断形式成本高于收益、主动叫停；主持 All Hands、跨部门项目协调；设计 Contact Us → Lark 反馈自动化流程。",
        ] },
        { sub: "Junior AI — 设计负责人" },
        { p: "独立 vibe coding 完成官网（含 V2.3 首页与移动端）；制作 Use Cases 与 Launch 视频（0 投流 YouTube 44K）。" },
        { sub: "Delysium（Web3 链游，2022.03 – 2023.02）— 视觉设计师 / 设计项目组长" },
        { p: "承接项目全部美术需求，对接研发 / 市场 / 发行 / 商务，负责设计组（约 10 人）的风险评估、排期、分配与验收，兼任团队对外沟通。" },
        { ul: [
          "白皮书网站获 awwwards Honorable Mention（2022.10），上线 3 个月浏览 124 万次。",
          "主导社区物料，在职 8 个月 Discord 社区由 3 万增长至 7 万；联名机甲 NFT 2,000 套 24 小时售罄。",
          "负责纽约 / 菲律宾 / 土耳其线下活动物料与落地。",
        ] },
        { sub: "百度游戏", meta: "2021.01 – 2022.01 ｜ 视觉设计（手游）" },
        { p: "校招进组，参与 S 级日漫 IP 发行（2D 美宣），独立产出 Banner / 预约页 / icon / LOGO；早期深耕 IP 内容与粉丝调研输出宣发草案。" },
        { sub: "麒越教育", meta: "2018.03 – 2020.03 ｜ 视觉设计（兼职）" },
        { p: "从 0 搭建麒越教育及子公司 QS 品牌视觉，负责 LOGO / Banner / 物料与印刷品控。" },
      ],
    },
    {
      h: "教育",
      blocks: [
        { p: "OCAD University（加拿大）｜ 2015.09 – 2020.05 ｜ 平面设计本科，辅修插画；雅思 6.5 免面试保送。8 年加拿大留学，中英文无障碍。" },
      ],
    },
    {
      h: "个人品牌",
      blocks: [
        { p: "在小红书持续输出 vibe coding 内容，积累 6,500+ 粉丝；亦用于辅助团队招聘与品牌建设。" },
      ],
    },
  ],
  note: "待补：portfolio 链接、现带团队人数、ARR 时间措辞；以及简历 PDF。",
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
