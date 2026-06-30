# SHERRY'S FOOTPRINTS — 待办

> 足迹数据见 [FOOTPRINTS.md](FOOTPRINTS.md)。
> **地图框架已完成**：多层钻取（世界→国家→省/州→城市→景点）、古海图风格、点击/跨国跳转、缩放退层、年份带、10m 边界。
> 剩下的主要是**填内容**和**公开前加固**。

> **数据 / 代码已分开**（2026-06-25）：所有地点参数都集中在 `data/footprints.json`，`footprints.html` 不再硬编码任何国家 / 省州 / 坐标 / ISO（`ne_names`、`iso_a3`、高亮、国界线全部从数据推导）。
> **以后加地点**：① 城市 / 景点 → 只改 `footprints.json`；② 州 / 省 → `footprints.json` 加 region＋节点 **＋** `states.geojson` 加 1 个边界多边形；③ 国家 → 只改 `footprints.json`（加一个对象，含 `center` / `split` / `ne_names` / `iso_a3` / `regions`）。
> 底图几何在 `data/{world,states,borders,lakes}.geojson`（Natural Earth，代码不碰）。

## ① 内容（核心，慢慢填）

- [ ] **景点 + 手记** —— ✅ 有照片的城市，景点现为"街区级"自动名（如多伦多 32 个 Financial District…），要合并/重命名成真实景点 + 写小作文。先做哪个城市你定（多伦多 / 加东起步？）。
- [ ] **照片接入** —— 故事卡现为 `— photo · journal —` 留白，把 `photos/` 的照片接进去（每景点 1–3 张）。
- [~] **🖼 网图节点** —— 各地标网图已下载并接进 `data/footprints.json`（13 国、330 个节点，与 `photos/` 一一对应）。**剩**：确认版权（可商用 / CC）+ 把图真正显示进故事卡。

## ② 公开前加固

- [ ] **换无版权 BGM** —— 现 `audio/call-of-silence.mp3` 是《进击的巨人》OST（受版权），换 CC0 / royalty-free。
- [~] **CDN 加固** —— ✅ maplibre 已加 SRI、unpkg 已 preconnect。**剩**：字体（Google Fonts）/ 底图瓦片（openfreemap）国内访客可能加载失败，考虑本地化（边界数据已本地化在 `data/`）。

## ③ 部署

- [ ] **发公网** —— Vercel / Netlify / GitHub Pages（会自动 gzip，~5MB 边界数据可压到 ~1MB）。
- [ ] **自定义域名**（可选）。

## 随时可调（非阻塞）

- [ ] 配色 / UI 微调（卡片 = 样式6：近白底 + 近白卡 + 印章红左边条；持续打磨）

---

_更新于 2026-06-30。_
