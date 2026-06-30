---
version: alpha
name: Sherry (Ke) Shi — Personal Site
description: >-
  Apple-HIG-grounded personal homepage. System fonts, calm neutral surfaces,
  one brand red (印章红, aligned with footprints), strict 8px grid, Material-3 dark rules. Constrains index.html.
colors:
  # 规范要求至少有 primary。品牌红（印章红）= app tint。light 为基准，*-dark 为暗色对应值。
  primary: "#9b2d20"                  # 印章红 · light（对齐 footprints 古海图）
  primary-dark: "#d9694e"             # 暗色提亮去饱和
  primary-ink: "#7d2017"              # accent pressed
  primary-soft: "rgba(155,45,32,0.10)"
  bg: "#f9f9fa"                       # 近白底【硬规则：不得纯白 #fff】· light
  bg-dark: "#16161a"                  # 非纯黑
  card: "#fcfcfc"                     # 近白卡片：靠细描边 + 印章红左边条定义（样式6）· light
  card-dark: "#1f1f24"                # 比背景更亮（海拔）
  ink: "#1c1c1e"                      # 主文字 · light
  ink-dark: "rgba(255,255,255,0.92)"
  muted: "rgba(60,60,67,0.75)"        # 次文字 · light（≥4.5:1）
  muted-dark: "rgba(255,255,255,0.58)"
  faint: "rgba(60,60,67,0.30)"        # 辅助/元信息 · light
  faint-dark: "rgba(255,255,255,0.38)"
  line: "rgba(60,60,67,0.16)"         # separator
  material: "rgba(249,249,250,0.85)"  # 导航毛玻璃 · light（RGB 对齐 bg）
  material-dark: "rgba(22,22,26,0.72)"
typography:
  # 全部用系统字体栈；仅 display/body 标注 fontFamily，其余同栈。
  display:  { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif", fontSize: 64px, fontWeight: 700, lineHeight: 1.05, letterSpacing: -0.02em }  # 响应式 clamp(40px,7vw,64px)
  title2:   { fontSize: 22px, fontWeight: 600, lineHeight: 1.3 }
  title3:   { fontSize: 20px, fontWeight: 400, lineHeight: 1.4 }
  headline: { fontSize: 17px, fontWeight: 600 }
  body:     { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif", fontSize: 16px, fontWeight: 400, lineHeight: 1.5 }
  callout:  { fontSize: 15px, fontWeight: 400 }
  subhead:  { fontSize: 14px, fontWeight: 400 }
  footnote: { fontSize: 13px, fontWeight: 500 }
  caption:  { fontSize: 12px, fontWeight: 400 }
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 40px
rounded:
  badge: 6px        # 徽章 ≤6
  control: 10px     # 按钮 / 控件
  card: 8px         # 卡片（样式6：小圆角 + 印章红左边条）
  full: 9999px      # 仅链接胶囊，不用于卡片
components:
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"                  # 8px
    border: "1px solid {colors.line}"
    borderLeft: "3px solid {colors.primary}"   # 印章红左边条（样式6，替代阴影做定义）
  button-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.card}"
    rounded: "{rounded.control}"
  nav:
    backgroundColor: "{colors.material}"
    backdropFilter: "blur(20px) saturate(180%)"
    zIndex: 30
---

# 个人主页设计规范 — `index.html`

> 目的：首页 UI 按**大厂设计系统的硬规则**走，不自己拍脑袋。这里只收录「适合个人主页」的那部分。
> 配套自检：[`tests/design.js`](tests/design.js) —— 浏览器控制台粘贴运行，逐条对照下面规则输出 ✅ / ❌。
> 范围：本规范约束 `index.html`（首页）。`footprints.html`（古海图地图）主题独立，但 §4 材质、§5 层级、§8 按钮、§9 无障碍 可借用。

## 0. 来源

| 系统 | 取用的规则 |
| --- | --- |
| **Apple HIG** | 系统字体、Materials（材质/透明度）、语义色、按钮态、圆角 |
| **Material Design 3** | 暗色规范（禁纯黑、海拔=更亮表面、文字不透明度分级、强调色去饱和） |
| **GitHub Primer** | 中性灰阶、8px 间距网格 |
| **WCAG 2.1 AA** | 文字对比度、焦点可见、减少动效 |

---

## 1. 字体 Typography

- 用**系统字体栈**：`-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, …`（Mac 上即 San Francisco）。
- **不加载** Google Fonts / 任何外部字体。
- 基准 **16px**；字重 400 / 500 / 600（大标题可 700）。

**字号阶梯 Type Scale**（对齐 Apple 体系；所有文字只能取这几档，禁止零散/小数字号如 12.5、14.5）：

| token | px | 字重 | 用途 |
| --- | --- | --- | --- |
| `--fs-display` | `clamp(40,7vw,64)` | 700 | Hero 主标题 |
| `--fs-title2` | 22 | 600 | 段落 Lead |
| `--fs-title3` | 20 | 400 | Hero 副文案 |
| `--fs-headline` | 17 | 600 | 卡片标题 |
| `--fs-body` | 16 | 400 | 正文 |
| `--fs-callout` | 15 | — | 描述 / 链接按钮 |
| `--fs-subhead` | 14 | — | 次要描述 |
| `--fs-footnote` | 13 | 500 | 标签 / 眉头 / 时间 |
| `--fs-caption` | 12 | — | 元信息 |

## 2. 配色 Tokens

| token | Light | Dark |
| --- | --- | --- |
| `--bg` 背景 | `#f9f9fa`（近白·**非纯白**） | `#16161a`（**非纯黑**） |
| `--card` 卡片 | `#fcfcfc`（近白，靠**细描边 + 印章红左边条**定义） | `#1f1f24`（比背景**更亮**） |
| `--ink` 主文字 | `#1c1c1e` | `rgba(255,255,255,.92)` |
| `--muted` 次文字 | `rgba(60,60,67,.75)` | `rgba(255,255,255,.58)` |
| `--faint` 辅助/元信息 | `rgba(60,60,67,.3)` | `rgba(255,255,255,.38)` |
| `--accent` 品牌红（印章红，对齐 footprints） | `#9b2d20` | `#d9694e`（提亮去饱和） |
| `--material` 导航材质 | `rgba(255,255,255,.85)` | `rgba(22,22,26,.85)` |

## 3. 暗色硬规则（重点）⭐

1. **禁纯黑 / 禁纯白（硬规则·写死）**：`--bg` 暗色**不得 `#000`**、浅色**不得 `#fff`** —— 纯黑发空、纯白刺眼，且让阴影/层级失效。暗色用深灰、浅色用近白。`design.js` 两条都查。
2. **海拔（暗色规则）= 更亮表面**：**暗色**里层级越高表面越亮 → 卡片亮度必须 **>** 背景亮度。**浅色不强制**：浅色用「白底 + 近白卡」，卡片靠**细描边 + 印章红 `3px` 左边条**定义（不靠亮度跳白、避免刺眼）；只需卡片与底**可辨**即可。
3. **文字不透明度分级**：主 92% / 次 58% / 辅 38% 白，不用纯白怼满。
4. **强调色去饱和**：暗色把品牌色提亮、降饱和（深绿 → 亮绿）。
5. **柔和阴影**：背景非纯黑后，阴影才能重新表达 elevation。

## 4. 材质 / 透明度 Materials

- 顶部导航 = 半透明 + `backdrop-filter: blur(20px) saturate(180%)` 毛玻璃。
- 主题切换：导航材质与 `body` **同步过渡 0.3s**（否则毛玻璃在那 0.3s 透出"渐变中的背景+已换好的材质"，顶栏错色）。
- `html` 必须设 `background: var(--bg)`，否则顶部 / overscroll 回弹会透白。

## 5. 层级 Elevation

- z-index：导航 `30` 高于内容；浮层始终在最上。
- **浅色卡片可不用阴影**：用 `1px` 细描边 + **印章红 `3px` 左边条**做定义（样式6，干净不跳白）；hover 给一抹 `--accent-soft` 淡红 + 左边条加深。暗色仍用柔和阴影表达海拔。

## 6. 形状 Shape

- 圆角：卡片 **8px**（样式6，配印章红 3px 左边条）、按钮/控件 **10px**、徽章 ≤ **6px**。
- **卡片不得直角**；胶囊（999px）只用于链接按钮，不用于卡片。

## 7. 间距 Spacing

- **8px 网格**：4 / 8 / 16 / 24 / 32 / 40 …

## 8. 按钮 & 交互态

- 每个可点元素都要有：`hover` + **`:active` 按压态**（缩放/变色）+ `:focus-visible` 焦点环。
- 按钮分级：filled / tinted / gray（次要）/ plain（纯文字）。

## 9. 无障碍 A11y

- **主文字对比 ≥ 7:1**（AAA），**次文字 ≥ 4.5:1**（AA）。辅助/元信息（`--faint`）属非必要文本，豁免。
- `:focus-visible` 可见焦点环；`prefers-reduced-motion` 时关闭过渡/动画。

## 10. 内容 / 文案 Voice & Copy

大厂文案规范（Apple HIG *Writing* / Material *Writing* 取舍）。内容写在 `profile/data.js`：

- **主动语态、动词开头**：经历 / 项目要点用动词起头（Built / Shipped / Owned…），保持平行结构。
- **简洁、去填充词**：删 "very / really / in order to"；一句话讲清一件事。
- **句式大小写（sentence case）**：句首大写、其余小写；产品名 / 专有名词照原样。
- **术语一致**：`real-time`、`machine learning` / `ML`、`LLM agents` 等全站统一拼写与缩写。
- **散文里不用 `&`**：句子用 "and"；只在简短标签 / 分类名里保留 `&`（如 "NLP & LLMs"）。
- **指标用数字**：60%、15M+、12 ms——保留量化成果。
- **Oxford comma**、统一标点。
- **保留个人声音**：个人主页不是公司官网——克制润色，别把 "survive 3 a.m. in production" 这种声音磨平。

> §10 是人工内容规范（主观，不进自动测试）。

---

## 规则 ↔ 测试对照

| 规则 | 测试项（`tests/design.js`） |
| --- | --- |
| §1 系统字体 / 无外部字体 / 16px | 系统字体栈、不加载 Google 字体、基准字号 16px |
| §1 字号阶梯 type scale | 字号都来自 type scale、Hero 在 display 区间(40–64) |
| §3.1 禁纯黑 / 纯白 | `[dark] 禁纯黑背景`；`[light] 禁纯白背景` |
| §3.2 海拔 / 可辨 | `[dark] 卡片更亮`；`[light] 卡片与背景可辨` |
| §3.3 不透明度分级 | 次级文字用不透明度分级(<1) |
| §3.4 去饱和 | 强调色暗色去饱和/提亮 |
| §4 材质 / 同步过渡 / html 背景 | 导航栏毛玻璃、导航与 body 同步过渡、html 设背景 |
| §6 圆角 | 卡片圆角 6–20px |
| §5 层级 | 卡片有阴影或描边 |
| §8 交互态 | `:active` 按压态、`:focus-visible` 焦点环 |
| §9 对比度 / 减动效 | `[light/dark]` 主文字 ≥7、次文字 ≥4.5、reduced-motion 降级 |

_更新于 2026-06-30。_
