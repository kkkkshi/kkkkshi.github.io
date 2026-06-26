# 夜间自动迭代日志（auto/overnight）

> 每轮一条。给用户早上 review 用。指令见 [LOOP-PROMPT.md](LOOP-PROMPT.md)。

---

## 2026-06-26 00:44 多伦多 · 第 1 轮 — 修复回归测试（ladder A）

**任务**：测试健康 — 跑全部 3 套测试，发现并修复失败项。

**测试基线**：
- `tests/design.js`（首页）：**24/24** ✅
- `tests/design-map.js`（地图）：**13/13** ✅
- `tests/regression.js`（地图交互）：**崩溃** ❌ → 修复后 **24/24** ✅

**发现的 bug（根因）**：`regression.js` 陈旧。它把火漆印章 `#seal` 当作「退回上一层」来用，但 `#seal` 早已被改成 **「返回个人主页 `index.html`」**（元素 `<title>返回个人主页 · Home</title>`，且运行时点击 `location.href="index.html"`，已实测确认跳首页）。于是测试在世界层连点印章 5 次 → 直接跳出地图到首页 → 整个回归套件从那次改版起就一直是坏的。

**修复**（`tests/regression.js`）：
- 退一层改用面包屑：新增 `up()`（点最后一个面包屑=父层）、`toWorld()`（点「The World」面包屑回世界），替换掉所有 `seal()` 调用。
- 印章语义改为单独说明（不在套件内点击，避免离开地图）。
- 同步更新头注释。

**同步文档**（`FOOTPRINTS.md`）：把旧描述「点印章返回上层」改正为「印章=返回个人主页；退层用面包屑/缩放」。

**守住**：🧭 没动地图任何美学/样式，只改测试与文档；📇 没动任何个人经历内容。

**留给下一轮**：
- `footprints.html` 控制台有 1 个 `favicon.ico` 404（唯一报错，无害）→ 下轮补 favicon 清掉。
- 待用户定（不臆造）：FOOTPRINTS.md/DESIGN-MAP 里「退层」的文字规范是否要随印章改版整体复核一遍。

**改动文件**：`tests/regression.js`、`FOOTPRINTS.md`、`LOOP-LOG.md`（新建）。

---

## 2026-06-26 01:13 多伦多 · 第 2 轮 — 清掉 favicon 404（ladder F 健壮性）

**任务**：健壮性 — 消除控制台报错，向「大厂级 0 console 报错」靠拢。

**发现**：两页都没设 favicon，浏览器默认请求 `/favicon.ico` → 404（footprints.html 之前唯一的 console 报错）。

**修复**：
- 新建 `favicon.svg`：金色罗盘星 + 深色圆角底，呼应古海图金/羊皮纸调，亮/暗标签栏都可见。
- `index.html`、`footprints.html` 各加 `<link rel="icon" href="favicon.svg" />`（浏览器改用它，不再请求 favicon.ico）。

**验证**（Playwright）：
- footprints.html：console **0 报错**（404 消失）✅
- index.html：console 0 报错；`design.js` 仍 **24/24** ✅（加 favicon 未引入回归）

**守住**：🧭 没动地图美学（favicon 是浏览器标签图标，非地图视觉）；📇 没动个人内容。

**改动文件**：`favicon.svg`（新建）、`index.html`、`footprints.html`、`LOOP-LOG.md`。

---

## 2026-06-26 01:34 多伦多 · 第 3 轮 — 移动端审查 + theme-color（ladder D / C）

**任务**：移动端（用户从没在别的屏测过）。Playwright 390×844 截图审查两页。

**审查结果**：
- **首页 `index.html`：移动端良好** ✅ —— 单列自适应，标题/按钮/各分区（经历·教育·项目·论文·技能·语言·地图入口）都正常，Apple HIG 那版已把响应式做掉。截图 `.playwright-mcp/m3-index-mobile.png`。
- **地图 `footprints.html`：两个真问题**（截图 `.playwright-mcp/m3-map-mobile.png`）：
  1. 🔴 **世界视图竖屏只露大西洋/欧洲一条**——加拿大/美国/中国等去过的国家在初始视图外，要手动平移才看到（窄竖屏下 `fitBounds` 的结果）。
  2. 🟠 **欧洲国家标签在窄屏挤成一团**（Denmark/Norway/Germany/UK/France/Italy/Belgium/Switzerland/Vatican 叠在一起）。
  - ⚠️ 这俩要动地图 fit 逻辑 + 标签避让，且 `design-map.js` 有「世界层 0 隐藏标签」断言——窄屏 declutter 会与之冲突，需协同改测试。**属于要专门做一轮的活，没在半夜硬改**，留给后续 iteration（守 🧭 美学不变，只调 fit/避让行为）。

**本轮落地的安全改进**：首页加 `theme-color` meta（手机浏览器地址栏跟随主题变色，亮 `#f2f2f7` / 暗 `#16161a`，对齐 DESIGN.md token）。Firefox 不支持会优雅降级。

**验证**：`design.js` 仍 **24/24** ✅（meta 不影响）。

**守住**：🧭 没动地图视觉/fit；📇 没动个人内容。截图存 `.playwright-mcp/`（已 gitignore，不入库）。

**改动文件**：`index.html`、`LOOP-LOG.md`。

---

## 2026-06-26 02:31 多伦多 · 第 4 轮 — 深挖移动端世界视图 🔴 bug,定根因(ladder B/D,**需你拍板**)

**任务**：第 3 轮记的那个 🔴——竖屏手机世界视图只露欧洲/大西洋一条,加拿大/美国/中国在屏外要手动平移。本轮专门去**查根因 + 试修**。

**复现**(Playwright 390×844):确认。当前 `zoom=0.7`、`minZoom=0.6`、`center=[-1,0]`,只显示约 163° 经度(欧洲),裁掉加拿大(-106°)、中国/泰国(+104°)。

**逐层定位**(都用 `window._map` 实测,非猜):
- 去过的 13 国经度跨度 **210°**(加拿大 -106° ↔ 中国 +104°),纬度只 15–61° 一条窄带。
- `fitBounds` 这 210° 在 378px 宽里要缩到 `zoom≈0.16`。
- 我一度以为是 `minZoom 0.6` + 退层逻辑里 `Math.max(0.6, …)` 两处硬底卡住(改成响应式 `worldMinZoom()` 窄屏放开到 -0.2 试了)。
- **但放开 minZoom 后仍卡在 0.7**。用 `cameraForBounds` 算 = 0.16 可行,实际 `fitBounds` 却给 0.7,且 `center` 锁死在 lat 0、显示**整个**南北纬世界(-85…85)。

**真根因**(非 minZoom,非 padding):**maplibre 不允许缩到「世界南北极之外」**。竖屏手机又瘦又高(378×832),要把 210° 经度塞进宽度就得缩到 z≈0.16,但那会要求纵向显示**超过整个纬度世界**(露出极地外的空白)→ 被引擎硬钳在 z≈0.7。**即:这么宽的经度跨度,在竖屏手机上物理上放不下,跟 padding/minZoom 无关。**

**所以**:我那套 minZoom/padding 改动**无效,已全部 `git checkout` 回退**(footprints.html 与 HEAD 字节一致,本轮没动它)。这不是能半夜安全硬改的——要真修得改交互/布局,属于**产品决策,留你拍板**:

> **🟡 待你拍板:移动端世界视图怎么处理?**
> - **A.** 手机上把地图做矮(如 `60vh`),下面接简介/国家列表 → 宽高比变扁,210° 就能 fit(改布局,工作量中)。
> - **B.** 接受平移,加个细微提示「← 拖动看更多 →」或开场轻微自动平移一圈(改动小)。
> - **C.** 手机上世界层不用地图总览,改成**国家 chip 列表**点进去(交互换法)。
> - **D.** 维持现状(已知缺陷),先不动。
> （欧洲国家标签窄屏挤成一团是另一个独立问题 issue#2,且和 `design-map.js`「世界层标签全显示」断言冲突,一并等这次决策。）

**验证**:本轮无代码改动落地(footprints.html 已回退),3 套测试基线不受影响(design 24/24、design-map 13/13、regression 24/24,均自前几轮起为绿)。实验截图存项目根的 `m4-*.png` 已删除。

**守住**:🧭 没留下任何地图改动(实验已回退);📇 没动个人内容。

**改动文件**:仅 `LOOP-LOG.md`(footprints.html 试改后已回退,净改动为 0)。

---

## 2026-06-26 02:40 多伦多 · 第 5 轮 — 地图页键盘焦点环(ladder F 无障碍,守美学)

**任务**:无障碍。审 index.html 发现它已较完整(`:focus-visible` 覆盖所有 a/button、`prefers-reduced-motion` 是全局 `*` 重置)→ 没低垂果实。转去用户更在意的地图页 `footprints.html`。

**发现的缺口**:`footprints.html` **完全没有 `:focus-visible` / `:focus` 规则**——键盘 Tab 到音乐钮、昼夜钮、GitHub/LinkedIn/Email 链接、年份按钮时**看不到任何焦点指示**(鼠标用户无感,但键盘 / 读屏用户彻底迷失)。这是真·大厂级无障碍缺口。

**实现**(纯 CSS,零行为改动):给上述原生可聚焦控件加焦点环——
- `#music` / `#daynight`(30px 圆钮):`outline: 2px solid var(--goldhi); outline-offset: 3px;` → 环跟随 `border-radius:50%` 呈**圆形**。
- `#links a` / `#years button`:同色环 + `border-radius:6px` 圆角。
- 用主题既有的 `--goldhi`(#e0c373 亮金),亮/暗两种模式都可见,与古海图金/羊皮纸调一致。**只在键盘 Tab 时出现**,鼠标用户与地图观感零影响。

**为何不做更多**:面包屑 `.cr` 是 `<span>`(无 `tabindex`,键盘根本聚焦不到)、地图 pin 是 `<div>`——要让它们键盘可达需加 `tabindex`+键盘事件,属行为改动,**留作单独一轮**(本轮守原子化,只做纯 CSS 焦点环)。

**验证**(Playwright,真跑):
- 键盘 `Tab` 后实测 `document.activeElement.matches(':focus-visible')=true`,computed `outline = rgb(224,195,115) 2px`(正是 --goldhi)、`#music` offset 3px 跟随 50% 圆角 ✅。
- footprints.html console **0 报错** ✅。
- 三套测试全绿:**design.js 24/24 · design-map.js 13/13 · regression.js 24/24** ✅(焦点环不影响任何断言)。
- 截图 `.playwright-mcp/m5-focusring-music.png`(已 gitignore,不入库)。

**守住**:🧭 没动地图美学(焦点环仅键盘可见,不改配色/纹理/印章/排版);📇 没动个人内容。

**留给后续**:面包屑 / 地图 pin 的完整键盘可达(tabindex + Enter/Space + role),可单独做一轮。

**改动文件**:`footprints.html`、`LOOP-LOG.md`。

---

## 2026-06-26 02:55 多伦多 · 第 6 轮 — maplibre CDN 加 SRI(ladder G 公开前加固)

**任务**:CDN 加固(TODO ② 明确列了)。`footprints.html` 从 unpkg 加载 **maplibre-gl@4.7.1** 的 CSS(line 9)和 JS(line 980),此前**无完整性校验**——CDN 若被篡改或投毒,用户会静默执行被改过的脚本。

**实现**:给两个标签加 `integrity="sha384-…"` + `crossorigin="anonymous"`。
- 哈希**不靠猜**:在 localhost(SubtleCrypto 的安全上下文)用浏览器 `fetch` 实际从 unpkg 下载这两个文件 → `crypto.subtle.digest('SHA-384')` → base64,得到**浏览器将要校验的同一份字节**的 integrity 值。
  - CSS(65534 B):`sha384-MinO0mNliZ3vwppuPOUnGa+iq619pfMhLVUXfC4LHwSCvF9H+6P/KO4Q7qBOYV5V`
  - JS(803086 B):`sha384-SYKAG6cglRMN0RVvhNeBY0r3FYKNOJtznwA0v7B5Vp9tr31xAHsZC0DqkQ/pZDmj`
- 版本是**固定的 @4.7.1**(非 @latest),字节不变 → SRI 长期有效,不会因上游升级失效。

**验证**(Playwright,真跑——SRI 错的话脚本会被拦、地图根本起不来):
- 重载后:`maplibregl` 已定义、`window._map.getZoom()=1.89`、`isStyleLoaded()=true`、maplibre CSS 生效(canvas `position:absolute`)→ **两个资源都通过 SRI 校验并加载** ✅。
- console **0 报错 0 警告**(无 SRI mismatch)✅。
- 三套测试:**design-map.js 13/13 · regression.js 24/24** ✅;design.js 测的 index.html 本轮未改(上轮 24/24)。

**未做 / 原因**:Google Fonts 的 `css2` 是**动态无版本端点**,SRI 不适用(官方亦不建议),本轮只加固固定版的 maplibre。底图瓦片/字体的本地化或 fallback 是更大的活,留后续。

**守住**:🧭 没动地图美学(只加资源完整性属性);📇 没动个人内容。

**改动文件**:`footprints.html`(2 个 CDN 标签)、`LOOP-LOG.md`。

---

## 2026-06-26 03:05 多伦多 · 第 7 轮 — 首页加社交分享卡片(Open Graph / Twitter)

**任务**:公开前加固。`index.html` 已有 `description` / `theme-color`,但**完全没有 Open Graph / Twitter 卡片** → 把主页链接分享到 LinkedIn / 微信 / iMessage / Slack 时只显示裸 URL,没有标题 + 简介的预览卡。对一个求职作品集页,这是很掉价的缺口。

**实现**(纯 `<head>` meta,不碰视觉/事实):加 OG + Twitter 标签——
- `og:type=website`、`og:title`、`og:description`、`og:site_name`、`og:locale=en_US`;
- `twitter:card=summary`、`twitter:title`、`twitter:description`。
- **文案 100% 复用页面已有的 title / description 原文**(`Sherry (Ke) Shi · Data Scientist` + `…Data Scientist in Toronto. Real-time machine learning for fraud and risk.`),一字未改、未臆造(守 📇)。
- `og:url` / `og:image` 需**绝对** URL,站点还没部署、也没有 1200×630 的分享图 → **没瞎填**,留了注释提示部署后补(避免给出会失效/相对的假值)。

**验证**(Playwright,真跑):
- 重载后 DOM 实测:`og:type/title/description/site_name`、`twitter:card/title` 全部就位且取值正确 ✅。
- console **0 报错 0 警告** ✅。
- `design.js` 仍 **24/24** ✅(meta 不影响断言);本轮只改 `index.html`,地图页两套测试(design-map 13 / regression 24)与此无关,维持上轮绿。

**顺带发现(预存问题,本轮不动,只记一笔)**:`index.html` 有**两个** `<link rel="icon">`——line 6 的 `favicon.svg`(第 2 轮加的金罗盘)和一个 data-uri 的绿色 "S" 圆角块。两者可能互相覆盖(浏览器通常取后者),建议后续二选一统一。**没删**(预存代码,按规矩不顺手清)。

**守住**:🧭 没动地图;📇 文案全用原文,没改没编。

**改动文件**:`index.html`(head 加 OG/Twitter meta)、`LOOP-LOG.md`。

---

## 2026-06-26 03:21 多伦多 · 第 8 轮 — 地图页补 description + 社交分享卡片(对称第 7 轮)

**任务**:延续第 7 轮。`footprints.html` 的 `<head>` 此前**极裸**——只有 charset / viewport / favicon / title,**没有 `description`、没有 OG/Twitter**。地图本身(交互式古海图)是很值得分享的作品,缺分享卡同样掉价。

**实现**(纯 `<head>` meta,不碰地图美学/功能):
- 加 `meta name="description"`;
- 加 OG(`og:type/title/description/site_name/locale`)+ Twitter(`twitter:card=summary/title/description`)。
- 文案只**陈述「这页是什么」**——"An interactive antique-style map tracing the places Sherry (Ke) Shi has lived and traveled."(对作品的客观描述,**没编造任何具体旅行地点/年份**,守 📇)。
- 同第 7 轮:`og:url` / `og:image` 需绝对 URL 且站点未部署 → 没瞎填,留注释待部署后补。

**验证**(Playwright,真跑):
- 重载后 DOM 实测:`description` / `og:title` / `og:description` / `twitter:card` 全部就位且正确;地图正常加载(`isStyleLoaded()=true`)→ 加 meta 没影响地图 ✅。
- console **0 报错 0 警告** ✅。
- 三套测试:**design-map.js 13/13 · regression.js 24/24** ✅;index.html 本轮未改(design.js 上轮 24/24)。

**守住**:🧭 没动地图美学/功能(只加 head meta);📇 描述是对作品的客观陈述,没编造旅行事实。

**留给后续**:① 地图页 `theme-color`——因古海图是 JS 手动昼夜切换(非 OS 偏好),`media=(prefers-color-scheme)` 的写法不跟手,要随昼夜 toggle 用 JS 更新,属单独一轮;② 第 7 轮记的 index.html 双 favicon link 仍待用户二选一;③ 两页的 `og:url` / `og:image` 待部署后补绝对 URL + 分享图。

**改动文件**:`footprints.html`(head 加 description + OG/Twitter)、`LOOP-LOG.md`。
