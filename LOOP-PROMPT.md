# 夜间自动迭代 Loop 指令（footprints）

> 用法：`/loop 15m 读 LOOP-PROMPT.md，执行一轮（One iteration only）`
> 每次 loop 触发都是一段新的上下文。你的状态来自**文件 + git**，不靠记忆。
> 目标：趁用户睡觉，把这个静态站**安全地**往前推一点，早上他用 `git log` 就能逐条看到改了啥、测了没。

---

## 0. 这是什么项目（30 秒）

- 纯静态站，无构建：`index.html`（个人主页，英文/正式）+ `footprints.html`（古海图多层钻取地图）。
- 数据：`data/footprints.json`（所有地点/坐标/国家）。主页文案：`profile/data.js`。
- 设计规范：`DESIGN.md`（约束 index.html）、`DESIGN-MAP.md`（约束 footprints.html）——这就是“大厂风格”的硬规则，照它走，别自己拍脑袋。
- 本地预览：`npm start` → live-server `http://localhost:1999`。
- 测试：3 个浏览器 console 脚本，`tests/design.js`、`tests/design-map.js`、`tests/regression.js`，输出 ✅/❌。
- 已装 Playwright MCP，可无头加载页面、跑测试脚本、截图。

---

## 1. 绝对红线（永远不破）

1. **`photos/` 一个字节都不准动**——不新建、不改、不删、不移、不重命名。读元信息可以，写入绝对禁止。
2. **`data/*.geojson` 不准改**（world/states/borders/lakes 是 Natural Earth 底图几何，代码不碰它）。
3. **不准臆造旅行数据**——地点、年份、坐标只能用 `FOOTPRINTS.md` / `data/footprints.json` / 照片清单里**已有的事实**。任何需要用户拍板的事（先做哪个城市、哪年去的、选哪几张照片、版权确认）→ **跳过，记一笔到 LOOP-LOG.md，绝不猜**。
4. **严格遵守 `DESIGN.md` / `DESIGN-MAP.md`**。视觉只允许两类改动：(a) 把不合规的地方改到合规；(b) 修明显 bug。**禁止口味性大改版**、禁止重命名/删除现有视觉元素（火漆印章、图标等）。拿不准就不动。
5. **不删用户内容**。不 `git push`，不部署，不发任何外部请求/邮件。本地提交即可。
6. **不催用户**、不在结尾写“下一步要不要…”。

---

## 2. 工作分支（第一轮先做）

- 不在 `main` 上动手。检查当前分支：若不是 `auto/overnight`，则 `git switch -c auto/overnight`（已存在就 `git switch auto/overnight`）。
- 所有提交只落在这个分支。早上用户在 `main` 上 `git log auto/overnight` 审查，喜欢就 merge，不喜欢直接删分支，零风险。
- 开工前确保工作区基于已有的未提交改动是干净的：若 `git status` 有用户遗留的未提交改动，先 `git stash`（记一笔），别把它们混进你的提交。

---

## 3. 每一轮只做一件事（原子化）

**一轮 = 选一个任务 → 最小实现 → 验证 → 绿了就提交 → 写日志 → 停。** 下一轮 tick 再做下一件。别贪多。

### 步骤

1. **读状态**：`git log --oneline -15`、`LOOP-LOG.md`（没有就建）、`TODO.md`。判断哪些已做。
2. **选任务**：从 §4 阶梯里挑**第一个还没做、且自包含（不需要用户拍板）**的任务。
3. **实现**：遵循 Karpathy 原则——外科手术式、最简、不加没要求的抽象、改动每一行都能追溯到任务本身。
4. **验证（必须真跑，不准嘴上说过了）**：
   - 端口 1999 没起就后台 `npm start`。
   - Playwright 加载 `http://localhost:1999/index.html` 和 `/footprints.html`，确认**控制台 0 报错**。
   - 跑相关测试脚本（把对应 `tests/*.js` 内容用 `browser_evaluate` 注入执行；regression 跑完读 `window._testFP`，design 类读它打印的 console / 在脚本尾部 `return R` 取结果）。确认**没有新增 ❌**。
   - 截图 light + dark 两套存到 `.playwright-mcp/`（地图改动也截一张）。
5. **判定**：全绿 → 提交；有红 → 修到绿，或 `git checkout` 回退本次改动，**绝不提交坏的**。
6. **提交**：中文 message，对齐仓库风格（看历史 commit），结尾加
   `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
7. **写日志**：往 `LOOP-LOG.md` 追加一条（日期取 `date` 命令、本轮任务、改了哪些文件、测试结果 X/Y、截图路径、跳过了什么及原因）。
8. **停**。本轮结束。

---

## 4. 任务优先级阶梯（自包含，不需要用户输入）

按顺序选第一个未完成的：

- **A. 测试健康（最高）**：跑全部 3 套测试。任何 ❌ → 定位并修到绿。永远不留坏测试。
- **B. 公开前加固（TODO ②，纯代码）**：
  - 写 `README.md`：运行（`npm start`）+ 部署（Vercel/Netlify/GitHub Pages）说明。
  - maplibre 的 JS/CSS CDN 加 SRI 完整性校验（或本地化）。**改完务必 Playwright 验证地图仍能加载**，破了就回退。
  - ⚠️ BGM 换 CC0 这件**先别做**（要下载外部音频文件，有风险）——只在 LOOP-LOG 记一笔提醒用户。
- **C. 移动端适配（TODO ③ “随时可调”）**：给 `index.html` + `footprints.html` 加响应式 CSS（遵守 DESIGN.md 的 8px 网格 + 字号阶梯）。Playwright 用手机视口（如 390×844）截图验证不溢出、可点。
- **D. DESIGN.md 合规补齐**：`tests/design.js` 暴露的任何 ❌、缺失的 `:active` 按压态 / `:focus-visible` 焦点环 / `prefers-reduced-motion` 降级——补齐。
- **E. 代码质量（只在你本轮已动的文件上）**：去重、简化、注释风格对齐周围代码。不顺手重构无关代码。
- **F. 微调（严格在 DESIGN.md token 内）**：间距/字号/圆角对齐规范的小修。**不是**重设计。

> 阶梯里所有内容做完、测试全绿、剩下的都需要用户拍板 → 在 LOOP-LOG.md 写一条总结（列出待用户决定的项），然后**不再调度下一轮，停**。别反复刷“没事可做”。

---

## 5. 收尾自检（每轮提交前默念）

- [ ] 没碰 `photos/`、没碰 `data/*.geojson`
- [ ] 没臆造任何地点/年份/坐标
- [ ] 在 `auto/overnight` 分支上
- [ ] Playwright 真的跑过、0 console 报错、无新增 ❌、有截图
- [ ] commit message 中文 + Co-Authored-By
- [ ] LOOP-LOG.md 写了这一条
