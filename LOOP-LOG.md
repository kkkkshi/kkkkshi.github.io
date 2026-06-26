# 夜间自动迭代日志（auto/overnight）

> 每轮一条。给用户早上 review 用。指令见 [LOOP-PROMPT.md](LOOP-PROMPT.md)。

---

## 🏁 收尾总结（2026-06-26 05:08，第 15 轮后停）

按 LOOP-PROMPT §4:**清晰、安全、不需你拍板的活已做完**,剩下的都需要你拍板或带主观/较大风险 → 写总结、**停止调度**(已 CronDelete),不再刷无效轮次。`git log auto/overnight` 可逐条看本夜 15 轮。

**本夜落地(15 轮,全部测试保绿):**
- 1 修回归测试(印章改首页致套件失效);2 favicon 清 404;3 移动端审查 + 首页 theme-color;5 地图控件焦点环;6 maplibre SRI;7+8 两页社交分享卡(OG/Twitter);9 根目录 README;10 地图 theme-color 随昼夜;11 unpkg preconnect;12 地图节点全键盘可达(下钻);13 面包屑+印章键盘可达(上退/回首页)→ **键盘无障碍闭环**;14 首页打印/存 PDF 样式;15 首页 skip-link。
- 4 是诊断轮(无代码):移动端世界视图 bug 定根因。

**🟡 待你拍板 / 决定的(我没擅自动):**
1. **移动端世界视图**:竖屏手机塞不下加拿大↔中国 210° 经度(maplibre 极地钳制,非 bug),要改布局/交互。选项 A/B/C/D 见第 4 轮日志。同源:`regression.js` 在 390 视口有 2 条 zoom 断言失败(桌面全绿)。
2. **双 favicon**:`index.html` 有金罗盘 `favicon.svg` 和绿色 "S" data-uri 两个 icon link,可能互相覆盖,需二选一(我没删,属预存内容)。
3. **部署后补**:两页 `og:image` / `og:url`(需绝对 URL + 1200×630 分享图);发公网后填。
4. **BGM 换 CC0**:`audio/call-of-silence.mp3` 是版权 OST,换无版权(要下外部音频,我不擅自下)。

**⚪ 可做但建议你在场时做(主观/动核心):**
- 首页视觉微调(已很完整,再动是主观口味);
- geojson 瘦身/懒加载(~5MB,提速明显,但动核心地图数据、可能影响古海图边界观感,建议你盯着做)。

**想继续**:`git log`/`⌘P` 看完后,随时再 `/loop` 起一轮,或针对上面某一项让我专门做。

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

---

## 2026-06-26 03:35 多伦多 · 第 9 轮 — 写根目录 README.md(ladder G / TODO ②③)

**任务**:公开前加固。仓库**根目录没有 README**(只有 `profile/README.md`),GitHub 上打开是裸文件列表。补一个专业、准确的 README。

**实现**:新建 `README.md`,内容**全部据实**(写前用 `package.json` + `ls` 核对过):
- 项目是什么(两页:个人主页 + 古海图钻取地图,纯静态无构建);
- 本地运行(`npm install` → `npm start` → localhost:1999);
- 目录结构(index/footprints、profile/data.js、data/footprints.json、data/*.geojson 底图、photos/audio/tests);
- 测试怎么跑(3 套**浏览器 console** 脚本——开页面→F12→粘贴→看 ✅/❌ 表,附表格说明各自测什么);
- 怎么加地点(城市改 json、州省改 json+states.geojson、国家加 json 对象——取自 TODO 已有规则);
- 技术说明(MapLibre + SRI、Natural Earth 底图本地化)与部署(任意静态托管,gzip 后 ~5MB→~1MB)。
- **语言用英文**:站点本身英文、面向(北美)招聘方,公开作品集仓库 README 用英文是惯例(内部 DESIGN/TODO 等仍中文,不动)。

**为何不跑 Playwright**:README 是纯文档,**不被任何页面加载、对站点与测试零运行时影响**。对它有意义的验证是事实准确性 + markdown 合法性,已做:
- 代码围栏配对正确(4 个 ``` = 2 对)✅;
- README 引用的 10 个文件/路径**全部存在**(逐个 `[ -e ]` 校验)✅;
- 描述的命令/结构/数字均与 `package.json`、目录、TODO 一致,未臆造。
- 本轮**未改任何页面**,三套测试与站点维持上轮全绿状态(design 24 / design-map 13 / regression 24)。

**守住**:🧭 没动地图;📇 没编造个人/旅行事实(README 只描述项目本身与已有数据流)。

**改动文件**:`README.md`(新建)、`LOOP-LOG.md`。

---

## 2026-06-26 03:55 多伦多 · 第 10 轮 — 地图页 theme-color 跟随昼夜(移动端地址栏)

**任务**:延续第 3 轮(首页已加 theme-color),给地图页补上。手机浏览器地址栏颜色跟随页面——地图昼夜切换时地址栏也跟着变,是和首页对齐的大厂级细节。

**难点 & 解法**:地图昼夜是 **JS 手动切换**(`body.night` class,不持久化、默认白天),不像首页走 `prefers-color-scheme`,所以 `media=()` 写法不跟手。改用**单个动态 meta + 在切换函数里更新**:
- head 加 `<meta name="theme-color" content="#b9cdd0">`(默认白天=海色,取自 `THEMES.day.sea`);
- 在中心函数 `applyDayNight()` 里随 `night` 更新:夜=`#0c1722`(`THEMES.night.sea`)/ 昼=`#b9cdd0`。海色代表世界视图顶部(多为海)的主色。
- IDE 提示 theme-color 在 Firefox 不支持 → 已知**渐进增强**,Firefox 静默忽略、优雅降级(与首页第 3 轮同),非 bug。

**验证**(Playwright,真跑):
- 移动视口实测:默认 meta=`#b9cdd0`(昼)→ 点昼夜钮 → `#0c1722`(夜,且 `body.night` 生效)→ 再点 → `#b9cdd0`(昼),三态正确;地图 `isStyleLoaded()=true` ✅。
- console **0 报错** ✅。
- 三套测试:**design-map.js 13/13** ✅、**regression.js 桌面 24/24** ✅;index.html 未改(design.js 维持 24)。

**⚠️ 顺带发现(非本轮引入,值得记)**:`regression.js` 在 **390px 移动视口**下有 **2 条断言失败**——「点国家显示整个国家(zoom ~2-4)」「中国缩很多→退世界」。这两条按**桌面视口校准**,窄屏 fit 出的 zoom 不同就不成立。**换回桌面 1280 立刻 24/24 全绿,证明与本轮 theme-color 改动无关**。这与第 4 轮「移动端地图 fit/zoom 行为不同」是同一根源 → 一并归入那个待用户拍板的移动端地图议题(真要支持移动端,测试也得加视口感知)。

**守住**:🧭 没动地图美学/功能(theme-color 是浏览器地址栏,非地图视觉);📇 没动个人内容。

**改动文件**:`footprints.html`(head meta + `applyDayNight` 各 1 处)、`LOOP-LOG.md`。

---

## 2026-06-26 04:06 多伦多 · 第 11 轮 — 给 unpkg 加 preconnect(ladder E 性能,零风险)

**任务**:性能。先排查两处:
- 音频 `call-of-silence.mp3`(3.4MB)——已是 `preload="none"`,首屏不下载,**已最优,不动**。
- maplibre CSS/JS(关键渲染资源,JS 803KB)从 **unpkg** 加载,但 head 里**只给 fonts 做了 preconnect,unpkg 没有** → 浏览器要到解析 `<link>` 时才现建到 unpkg 的连接(DNS+TLS 握手在关键路径上)。

**实现**(纯 head 网络提示,1 行):在 maplibre CSS `<link>` **之前**加
`<link rel="preconnect" href="https://unpkg.com" crossorigin />`。
- 带 `crossorigin`:因为 maplibre 两个资源都用 `crossorigin="anonymous"`(SRI),预连接也得是 crossorigin,握手好的连接才能被那两个 CORS 请求**复用**。
- 放在资源 `<link>` 之前,连接才能提前于请求建立。

**验证**(Playwright):
- 重载后 DOM 实测:preconnect 存在且 `crossOrigin="anonymous"`;`maplibregl` 已定义、地图 `isStyleLoaded()=true` → 资源照常加载 ✅。
- console **0 报错** ✅;**design-map.js 13/13** ✅。
- regression(24 项)**未重跑**:本轮改动是 head 网络提示,**不触及任何地图交互逻辑**(同一份交互代码上轮桌面 24/24),重跑 50s 无意义。

**守住**:🧭 没动地图美学/逻辑;📇 没动个人内容。

**进度提醒**:安全且高价值的活基本做完了,本轮已属「小而稳」(1 行 perf 提示)。剩下的多需用户拍板或带主观/较大风险(首页视觉、移动端地图 fit、地图全键盘可达、geojson 瘦身、双 favicon)。按用户「跑到 10:30」的意愿 loop 继续,但后续若只剩这些,会优先挑最稳的、并在适当时机写总结收尾,不硬刷。

**改动文件**:`footprints.html`(head 加 1 行 preconnect)、`LOOP-LOG.md`。

---

## 2026-06-26 04:22 多伦多 · 第 12 轮 — 地图 drill-down 全键盘可达(ladder F,补完第 5 轮)

**任务**:无障碍。第 5 轮给控件(音乐/昼夜/链接/年份)加了焦点环,但**地图的核心交互——点国家/州/城市进入下一层——键盘根本够不到**(节点是 `<div>`,无 `tabindex`、无键盘事件)。键盘 / 读屏用户只能干看,无法 drill-down。本轮补上。

**实现**(集中在唯一的节点工厂 `addNode()`,一处改动覆盖所有节点):
- 给可点的 target(区域节点=`.lbl`,城市/景点=`.pin`)加 `tabIndex=0` + `role="button"` + `aria-label`(`label — sub`,如 "Canada — 121 cities" / "西湖 — 3 photos");
- 加 `keydown`:`Enter` / `Space` → `preventDefault` + 调用与点击相同的 `onClick()`(进入下一层);
- CSS 补 `.port .pin:focus-visible` / `.port.area .lbl:focus-visible` 的金色焦点环(复用 `--goldhi`,仅键盘可见,不碰古海图观感)。
- 顺带利用浏览器特性:被 declutter 设 `visibility:hidden` 的标签自动**不进 Tab 序**,即「看不见的就不可聚焦」,语义正确。

**验证**(Playwright,真跑):
- 实测世界层 "Canada" 节点:`tabIndex=0 / role=button / aria-label="Canada — 121 cities"`,`:focus-visible` 命中 ✅;**聚焦后按 Enter,标题从 "THE WORLD" → "CANADA"**——键盘 drill-down 成功 ✅。
- console **0 报错** ✅。
- 三套测试:**design-map.js 13/13**(标签全显示断言不受影响)、**regression.js 桌面 24/24**(附加的 keydown 没破坏原 `.click()` 钻取)✅;index.html 未改(design.js 24)。

**守住**:🧭 没动地图美学/既有点击行为(纯附加键盘通道 + 仅键盘可见的焦点环);📇 没动个人内容。

**留给后续**:面包屑 `.cr` 与火漆印章 `#seal`(返回上层 / 回首页)仍是不可聚焦的 `<span>`/`<svg>`——键盘现在能向下钻、但「向上 / 回首页」还得靠地图 canvas 的 `−` 缩放退层。给这两个也加 tabindex+键盘事件即彻底闭环,可单独一轮。

**改动文件**:`footprints.html`(`addNode` 键盘通道 + 节点焦点环 CSS)、`LOOP-LOG.md`。

---

## 2026-06-26 04:36 多伦多 · 第 13 轮 — 面包屑 + 印章键盘可达,无障碍闭环(ladder F)

**任务**:接第 12 轮收尾。下钻已能键盘操作,但**向上(面包屑退层)和回首页(火漆印章)**还是不可聚焦的 `<span>`/`<svg>` → 键盘导航半通。本轮补齐,闭合整条键盘路径。

**实现**:
- **面包屑** `renderCrumbs()`:`.cr` 模板加 `tabindex="0" role="button" aria-label="Go to …"`;`forEach` 里给每个 `.cr` 加 `keydown`(Enter/Space → 与点击相同的 `jumpTo`)。
- **印章** `#seal`:在元素上设 `role="button"` + `tabIndex=0` + `aria-label="Return to homepage"`。**注意**:SVG 内原有 `<title>返回个人主页 · Home</title>` 会被 `drawSeal()` 的 `innerHTML=` 覆盖丢失,所以可达名放在**元素属性 aria-label**(不被 innerHTML 清掉)才稳。加 `keydown`(Enter/Space → `location.href="index.html"`)。
- CSS:`#crumbs .cr:focus-visible`(圆角环)、`#seal:focus-visible`(`border-radius:50%` 圆环贴合圆形印章),金色 `--goldhi`,仅键盘可见。

**验证**(Playwright,真跑):
- 键盘 Enter 钻进 Canada → 面包屑 "The World" 实测 `tabindex=0 / role=button / aria-label="Go to The World"`、`:focus-visible` 命中 → **聚焦后 Enter,标题 CANADA → THE WORLD**(键盘退层成功)✅。
- 印章实测 `role=button / tabindex=0 / aria-label="Return to homepage"` ✅(未真触发以免跳走首页)。
- console **0 报错** ✅;**design-map.js 13/13 · regression.js 桌面 24/24** ✅(附加键盘通道没破坏原点击退层)。

**🎯 键盘无障碍闭环完成**:第 5 轮(控件焦点环)+ 第 12 轮(下钻 pin)+ 本轮(面包屑上退 / 印章回首页)→ 纯键盘可完成「进入下层 → 退回上层 → 回个人主页」全流程,各控件均有金色焦点环与 ARIA 角色名。

**守住**:🧭 没动地图美学/既有点击行为;📇 没动个人内容。

**进度**:至此**清晰、安全、高价值的迭代基本做完**(13 轮见 git log)。剩下的都落到「需用户拍板」(移动端地图竖屏 fit、双 favicon 二选一、部署后补 og:image/url)或「带主观/较大风险」(首页视觉微调、geojson 瘦身)。下一轮起若仍只剩这些,将按 LOOP-PROMPT §4 写收尾总结、不再硬刷无效轮次。

**改动文件**:`footprints.html`(面包屑 + 印章键盘可达 + 焦点环 CSS)、`LOOP-LOG.md`。

---

## 2026-06-26 04:52 多伦多 · 第 14 轮 — 首页打印 / 存 PDF 样式(ladder C/F,零屏幕回退风险)

**任务**:首页打磨。截图审了首页(桌面亮/暗),版式/层级/留白已经很完整,**没有客观该改的视觉缺陷**——纯视觉再动属主观调味,半夜自动改风险高,**不碰**。转而找一个**客观有用、且完全不改屏幕观感**的点:这是一张简历/作品集页,招聘方常「存 PDF / 打印」,但页面**没有 `@media print`** → 打印会带导航条、暗色背景(费墨)、地图入口、且折叠的经历/项目印不全。

**实现**(纯 `@media print`,只影响纸面,屏幕零变化):
- 即使在暗色下打印也强制浅色:在 print 里把 `[data-theme="dark"]` 的表面/文字/强调/阴影变量翻回浅色(白底、`--ink` 深字、绿色用深一档的 `#1a5740`、阴影置 none)→ 省墨清晰;
- 隐藏屏幕专属控件 `.nav` / `.theme-toggle` / `.fp`(地图入口)/ `.show-all-btn`;
- `.is-extra { display:block }` → 折叠的经历 / 项目**打印时全展开**(简历要完整);
- `.card / section / .item { break-inside: avoid }` → 卡片不被分页切断;`* { box-shadow:none }` 省墨。

**验证**(Playwright):
- CSSOM 实测:`@media print` 块**解析成功**,6 条规则,选择器 `.nav/.theme-toggle/.fp/.show-all-btn/.is-extra/.card…` **全部命中页面真实元素** ✅。
- **屏幕零影响**:`design.js` 仍 **24/24**(print 块不泄漏到屏幕)✅;console **0 报错** ✅。
- ⚠️ **诚实说明**:当前 Playwright MCP 工具**无法真模拟打印画面**,故打印效果是用「规则解析成功 + 命中真实元素 + 屏幕回归全绿」来验证的;规则均为标准 print 写法(display:none / 变量覆盖 / break-inside),行为可预期。建议你早上在浏览器里 ⌘P 预览一眼确认排版。

**守住**:🧭 没动地图;📇 没动个人内容(只控制打印呈现,不改任何文案/数据);**屏幕视觉完全不变**(print-only)。

**进度**:这轮刻意避开了主观视觉改动,挑了零回退风险的 print 样式。安全活确实见底——下一轮起多半只剩需你拍板/带主观风险的,会按 §4 写收尾、不硬刷。

**改动文件**:`index.html`(`@media print` 块)、`LOOP-LOG.md`。

---

## 2026-06-26 05:06 多伦多 · 第 15 轮 — 首页「跳到主内容」skip 链接(ladder F 无障碍)

**任务**:无障碍。键盘用户每次 Tab 进页面都得先穿过导航才到正文,缺标准的 skip-link(WCAG 2.4.1 Bypass Blocks)。首页已有 `<main id="top">` 可直接当目标。

**实现**(平时移出视口,仅键盘 Tab 时滑入 → 屏幕视觉零变化):
- `<body>` 首个元素加 `<a class="skip-link" href="#top">Skip to content</a>`;
- `<main id="top">` 加 `tabindex="-1"`,使激活 skip 后**焦点真正落入正文**(不只是滚动);
- `.skip-link` CSS:`position:fixed` + `translateY(-200%)` 默认藏在视口上方,`:focus` 时 `translateY(0)` 滑入(绿底白字、圆角、阴影,与首页体系一致);`#top{outline:none}` 避免容器聚焦时整块描边。

**验证**(Playwright,真跑):
- 重载后**首个 Tab** 即聚焦 `.skip-link`("Skip to content"),computed `transform=translateY(0)` → 滑入可见 ✅;
- **激活后 `document.activeElement` = `<main id="top">`**(焦点落入正文,绕过导航)✅;
- `design.js` **24/24**、console **0 报错** ✅;平时 `translateY(-200%)` 不可见 → 屏幕零变化。

**守住**:🧭 没动地图;📇 没动个人内容;屏幕视觉不变(仅键盘聚焦时出现)。

**改动文件**:`index.html`(skip 链接 + CSS + main tabindex)、`LOOP-LOG.md`。
