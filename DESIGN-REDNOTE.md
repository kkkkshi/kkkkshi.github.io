---
version: alpha
name: 看图猜城市 — 小红书风格探索页
description: >-
  Mock only. Xiaohongshu(RED)-style feed for "guess the city" posts, paired with
  procedurally-generated warm ArcGIS-style city maps. Constrains mock-rednote.html.
  Pure front-end, zero external requests; all maps are generated SVG.
colors:
  primary: "#ff2e4d"          # 小红书红 · 强调/关注按钮/选中
  paper: "#fbf7ef"            # 屏内底（暖白）
  ink: "#23201b"             # 主文字
  muted: "#8d8475"           # 次文字/元信息
  hair: "#efe7d9"            # 分隔线
  gold: "#c9a44a"            # 难度星 · 与正式站火漆金同源
  # —— 暖色 GIS 地图调色（程序化生成时按色相 21–33° 抖动，下面是代表值）——
  map-water: "#f0e7d6"        # 水面/留白
  map-land: "#d98b52"         # 街区底
  map-land-deep: "#c5712f"    # 深色街区
  map-land-light: "#e6ad77"   # 浅色街区
  map-road: "#a4561f"         # 主干道（深赭）
typography:
  # 小红书走系统中文栈；不加载外部字体。
  brand:    { fontFamily: "-apple-system, 'PingFang SC', 'Hiragino Sans GB', system-ui, sans-serif", fontSize: 16.5px, fontWeight: 600 }   # 顶部 tab/品牌
  postTitle: { fontSize: 18px, fontWeight: 700, lineHeight: 1.3 }    # 详情帖标题
  cardTitle: { fontSize: 13.5px, fontWeight: 600, lineHeight: 1.34 } # feed 卡片标题（2 行截断）
  body:     { fontFamily: "-apple-system, 'PingFang SC', 'Hiragino Sans GB', system-ui, sans-serif", fontSize: 14.5px, fontWeight: 400, lineHeight: 1.55 }
  meta:     { fontSize: 11.5px, fontWeight: 400 }                   # 作者/点赞/元信息
  tag:      { fontSize: 13px, fontWeight: 400 }                     # 话题标签
spacing:
  xs: 4px
  gap: 7px        # 瀑布流卡片间距
  sm: 9px
  md: 14px
  lg: 16px
rounded:
  badge: 6px      # 标签胶囊
  card: 13px      # feed 卡片
  pill: 99px      # 关注按钮/搜索框/动作
  phone: 46px     # 手机外壳
components:
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.card}"
    border: "1px solid #f1ead8"
    shadow: "0 1px 3px rgba(50,35,10,0.07)"
    activeScale: 0.975
  follow-button:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  nav:
    backgroundColor: "rgba(251,247,239,0.94)"
    backdropFilter: "blur(10px)"
  tab-active:
    underlineColor: "{colors.primary}"
    textColor: "{colors.ink}"
---

# 小红书风格探索页设计规范 — `mock-rednote.html`

> 目的：给「看图猜城市」探索页一套硬规则，让过夜 loop（`LOOP-PROMPT-REDNOTE.md`）照着迭代、不跑偏。
> ⚠️ 这是 **mock**：纯前端、零外部请求，地图全部程序化 SVG 生成。**不碰** `index.html` / `footprints.html` / `photos/` / `data/`。

## Overview · 气质

两种气质叠在一起：**小红书 App 的产品外壳** + **暖色 ArcGIS 城市制图** 的内容。
参考图：`f70734bcf66eedb39bc61c0614df3b04.jpg`（奶油底 + 赭红街道/街区 + 留白水面）。
情绪：温暖、手作感、「制图作品」的精致；不要冷蓝科技感、不要花哨。内容是 Sherry **真去过**的城市，口吻是小红书的轻松，但**事实不编造**。

## Colors · 配色

- **primary `#ff2e4d`**：小红书红，只用在强调点——选中 tab 下划线、关注按钮、点赞激活态。**克制**，不要大面积铺。
- 暖色 GIS 地图是页面主色：`map-land` 系赭橙铺街区，`map-water` 奶油留白做水面，`map-road` 深赭画主干道。生成时按色相 21–33° 轻抖，让每座城**不同且可信**。
- `gold` 难度星与正式站火漆金同源，保持品牌一致。

## Typography · 字体

系统中文栈（PingFang SC / 苹方），**不加载外部字体**。层级见 tokens：品牌/帖标题/卡片标题/正文/元信息/标签。卡片标题 2 行截断。

## Layout · 布局

- **双列瀑布流**是小红书的灵魂：`column-count:2`，卡片间距 `gap 7px`，高度随地图高度变化错落。
- 顶部 hero 卡可 `column-span:all` 跨两列做「挑战赛」入口。
- 整页装在 390×812 手机壳里，桌面居中。遵守安全区（灵动岛 / 底部 home 条留白）。

## Elevation & Depth · 层级

- 扁平为主：卡片 `shadow 0 1px 3px`，详情帖从右侧滑入盖住 feed（`translateX` 过渡 .26s）。
- 地图用径向暗角制造「成图」纵深，不是真投影。
- 顶/底栏半透明毛玻璃（带 `-webkit-` 前缀），z 轴：详情帖 50 > 底部导航 30。

## Shapes · 形状

圆角：卡片 13、标签 6、关注/搜索胶囊 99、手机壳 46。卡片不直角。

## Components · 组件

- **卡片**：白底、13 圆角、极淡描边、按压 `scale .975`、点按进详情帖。
- **关注按钮**：小红书红实心胶囊。
- **详情帖**：顶部返回+作者+关注；大图 + `1/3` 轮播点；标题+正文；**「点击揭晓答案」**折叠块（先猜后揭晓）；话题标签；底部点赞/收藏/评论动作条 + 输入框。
- **底部导航**：首页/市集/＋/消息/我，＋为红色凸块。

## Do's and Don'ts

- ✅ 地图**程序化生成**，每座城用固定 seed → 可复现、各不相同。
- ✅ 城市只用 `data/footprints.json` 里 Sherry **真去过**的；文案小红书口吻但事实可靠。
- ✅ 难度星级合理：独特地形（海湾/峡湾）好认=星少，规整棋盘大城=中等，冷门小城=星多。
- ❌ 不拉任何外部资源（地图瓦片/图片/字体 CDN）——离线也要能跑。
- ❌ 不碰正式站文件、不动 `photos/` / `data/*.geojson`。
- ❌ primary 红不要滥用；不要把暖色调成冷色;不要花哨动效压过内容。
