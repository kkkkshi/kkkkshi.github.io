# SHERRY'S FOOTPRINTS — 待办

> 足迹数据见 [FOOTPRINTS.md](FOOTPRINTS.md)。
> **地图框架已完成**：多层钻取（世界→国家→省/州→城市→景点）、古海图风格、点击/跨国跳转、缩放退层、年份带、10m 边界。旧版备份 `index.legacy.html`。
> 剩下的主要是**填内容**和**公开前加固**。

## ① 内容（核心，慢慢填）

- [ ] **景点 + 手记** —— ✅ 有照片的城市，景点现为"街区级"自动名（如多伦多 32 个 Financial District…），要合并/重命名成真实景点 + 写小作文。先做哪个城市你定（多伦多 / 加东起步？）。
- [ ] **照片接入** —— 故事卡现为 `— photo · journal —` 留白，把 `photos/` 的照片接进去（每景点 1–3 张）。
- [ ] **🖼 网图节点** —— 没有自己照片的地方（Victoria / Vancouver / Banff / Waterloo / 北京 / 伦敦…）找可商用 / CC 图。
- [ ] **城市细节补全** —— 山东 / 云南 / 英 / 法 / 比 / 意 / 泰国 的具体城市（想起来就补进 FOOTPRINTS）。

## ② 公开前加固

- [ ] **换无版权 BGM** —— 现 `audio/call-of-silence.mp3` 是《进击的巨人》OST（受版权），换 CC0 / royalty-free。
- [ ] **CDN 加固** —— maplibre JS/CSS 走 unpkg（无 SRI）、字体走 Google Fonts、底图瓦片走第三方 openfreemap；国内访客可能加载失败。给 maplibre 加 SRI 或本地化（边界数据已本地化在 `data/`）。
- [ ] **README** —— 运行（`npm start`）/ 部署说明。

## ③ 部署

- [ ] **发公网** —— Vercel / Netlify / GitHub Pages（会自动 gzip，~5MB 边界数据可压到 ~1MB）。
- [ ] **自定义域名**（可选）。

## 随时可调（非阻塞）

- [ ] 移动端适配
- [ ] 配色 / UI 微调（见对话里的建议）

---

_更新于 2026-06-16。_
