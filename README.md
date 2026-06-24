# ECHO-OS · Echo Wang Portfolio

一个复古桌面 OS 风格的个人作品集。打开 = 开机进桌面，桌面图标双击开窗，项目里的链接新标签页打开、图片窗口内放大。

## 跑起来

纯静态站，没有构建步骤。任选一种：

```bash
# 方式一：Python
python3 -m http.server 5173

# 方式二：任意静态服务器
npx serve .
```

然后开 http://localhost:5173

## 结构

```
index.html
styles/   reset / desktop / window / boot  四份 CSS
js/
  content.js   所有文案、链接、图片数据  ← 加内容只改这里
  icons.js     SVG 图标
  boot.js      开机自检
  windows.js   窗口系统 + 各窗口内容渲染
  desktop.js   桌面图标、任务栏、Start 菜单、lightbox
  main.js      入口
```

## 改内容

只动 `js/content.js`。例如加一个项目作品图，往对应文件夹的 `items` 里加一条
`{ type: "image", label: "...", src: "..." }` 即可，结构和样式都不用动。

## 待补

- 小红书 / 微信二维码图（`SOCIAL[].qr`，现在是占位框）
- Delysium ONE、sip、NOFA、百度游戏 的作品图与说明
- 各 landing 截图、Resume PDF（放 `assets/`，填 `RESUME.pdf`）

## 部署

Vercel：import 仓库，framework 选 Other，无构建命令，直接发布。

## 素材与授权

- **图标**：[Memphis icon theme](https://github.com/infofintech/memphis)（MIT），9x/XP 风重画，文件在 `assets/icons/`。回收站（满）取自 [Alex Meub 的 Windows 98 图标集](https://win98icons.alexmeub.com/)。
- **鼠标**：`assets/cursors/` 下的像素箭头与指点手，本仓库自绘（`serve.py` 同目录的生成思路），默认箭头、可点元素用手型。
- **壁纸**：`assets/bliss.jpeg` 为 Windows XP "Bliss"，微软版权，仅个人怀旧用途。如需可商用，替换为 CC 授权的仿 Bliss 图即可。
