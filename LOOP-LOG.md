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
