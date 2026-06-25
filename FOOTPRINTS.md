# SHERRY'S FOOTPRINTS — 足迹清单（数据源）

> 站点结构：**世界地图（去过的国家高亮）→ 国家（按省/州，或小国直接到城市）→ 城市 → 景点 → 照片 + 小作文**
> 主轴 = 地图，时间 = 年份筛选（跨度 2014–2026）。层级按数据密度自适应，不强制统一。
>
> 标记：**✅** = 有本人照片（在 `photos/`，清单 `_manifest_year.csv`）；**🖼** = 无照片，待补网图（可商用 / CC 来源）。
> 坐标：✅ 用照片 GPS 中位数、**截断 3 位小数**脱敏；🖼 用城市中心坐标。
> 🖼 网图已按地标存入 `photos/<国家>/<州·省>/<地标>{1,2,3}.jpg`（每地标 3 张候选，本地、未提交）；坐标已全部接入 `data/footprints.json`（共 330 个地图节点，13 国所有州/省/地标都有点）。

## 去过的国家（13）— 世界地图高亮

加拿大 · 美国 · 中国 · 英国 · 法国 · 比利时 · 德国 · 意大利 · 瑞士 · 挪威 · 丹麦 · 梵蒂冈 · 泰国

> 台湾属于中国（数据层已并入中国，世界图金色一体、点台湾进中国）。

## 层级规范（哪些国家几层）

- **3 层**（国家 → 省/州 → 城市 → 景点）：🇨🇦 加拿大 · 🇺🇸 美国 · 🇨🇳 中国
- **2 层**（国家 → 城市 → 景点）：🇬🇧 英国 · 🇫🇷 法国 · 🇧🇪 比利时 · 🇩🇪 德国 · 🇨🇭 瑞士 · 🇮🇹 意大利 · 🇻🇦 梵蒂冈 · 🇳🇴 挪威 · 🇩🇰 丹麦 · 🇹🇭 泰国

> 点国家显示**整个国家地图**（本土轮廓占满）；省/州界用底图，去过的省/州金色高亮。
> 退层（标准 drill-down）：缩到比"进入该层时的展示 zoom"小约 0.85 级、或平移移出该层范围 → 退上层（一次缩可连退多层）。基准是每层自己的展示 zoom，与国家大小/纬度无关，加拿大/中国一样能退世界。也可点印章（返回上层）/ 面包屑跳层。层内可自由缩放看细节。
> 回归测试见 `tests/regression.js`（浏览器控制台粘贴运行）。

---

## 🇨🇦 加拿大（按省）

| 省 | 城市 / 景点 | 年份 | 照片 |
| --- | --- | --- | --- |
| British Columbia | Victoria（高中；BC Parliament·Butchart·Inner Harbour）、Vancouver（Stanley Park·Capilano·Steveston·Whistler·Joffre Lakes）、Richmond | 2014–17 / 2025 | Victoria🖼 Vancouver🖼 Richmond✅(4) |
| Alberta | Banff 自驾（Lake Louise·Moraine·Peyto·Bow·Minnewanka·Johnston Canyon·Castle Mtn·Vermilion·Gondola） | ~2014 | 🖼(9) |
| Ontario | Toronto（CN Tower·Distillery·St Lawrence·High Park·City Hall·Yonge-Dundas·Eaton·Allan Gardens）、Waterloo（本科·UWaterloo） | 2025–26 / 2017–21 | Toronto✅(533) Waterloo🖼 |
| Nova Scotia | Halifax（Citadel·Waterfront·Public Gardens）、Lunenburg、Peggys Cove、Cabot Trail | 2025 | ✅(216) |
| New Brunswick | Fundy NP（Alma）、Hopewell Rocks、Magnetic Hill | 2025 | ✅(134) |
| Prince Edward Island | Charlottetown、Cavendish Beach、Green Gables、Confederation Bridge、PEI NP | 2025 | ✅(73) |

> 注：海洋三省 EXIF 有 81 张标 2021，用户确定 2021 没去过，**当 2025 处理**（照片保留）。

## 🇺🇸 美国（按州，DC 与 Virginia 分开）

| 州 | 城市 / 景点 | 年份 | 照片 |
| --- | --- | --- | --- |
| New York | NYC（自由女神·帝国大厦·中央公园·时代广场·布鲁克林桥·大都会·MoMA·洛克菲勒·中央车站·华尔街·圣帕特里克·Summit·Broadway·9/11·罗斯福岛）、Niagara·Buffalo、Cornell(Ithaca)、Columbia | NYC 2024 / Buffalo 2019·21·26 | ✅ + 🖼 |
| Pennsylvania | Hamlin / Mead / Warren（NW PA）、Philadelphia（Independence Hall·Museum of Art）、Fallingwater | 2020–26 | ✅ + 🖼 |
| Virginia | Arlington、Mount Vernon | 2021 | ✅(6) + 🖼 |
| District of Columbia | Washington（White House·华盛顿纪念碑·航空航天博物馆·国会图书馆·Georgetown） | 2021 | ✅(5) + 🖼 |
| California | SF（金门桥·恶魔岛·九曲花街·双子峰·渔人码头）、LA（好莱坞·Griffith·圣莫尼卡·环球·Disneyland）、Yosemite、Death Valley、Joshua Tree、Redwood、Mammoth、Stanford | 待补 | 🖼(16) |
| Hawaii | Oahu（Waikiki·珍珠港·钻石头）、Maui（Haleakalā·Road to Hana）、Big Island（火山·Mauna Kea·黑沙滩·夜潜魔鬼鱼）、Kauai（Nā Pali·Waimea Canyon） | 待补 | 🖼(12) |
| Nevada | Las Vegas（Strip·Bellagio·Sphere）、Hoover Dam、Lake Mead、Great Basin、Valley of Fire | 待补 | 🖼(7) |
| Arizona | Grand Canyon、Page（羚羊谷·马蹄湾·Lake Powell）、Sedona、Monument Valley | 待补 | 🖼(6) |
| Massachusetts | Boston（自由之路·Common·Quincy Market·MFA）、Cambridge（Harvard·MIT） | 待补 | 🖼(6) |
| Utah | Zion、Bryce Canyon、Arches、Canyonlands | 待补 | 🖼(4) |
| Florida | Orlando（迪士尼世界·环球）、Miami、Key West | 待补 | 🖼(4) |

## 🇨🇳 中国（按省）

| 省 | 城市 / 景点 | 年份 | 照片 |
| --- | --- | --- | --- |
| 北京 | 故宫·天安门·长城·天坛·颐和园·圆明园·鸟巢/水立方 | 待补 | 🖼(7) |
| 天津 | 天津之眼 | 待补 | 🖼(1) |
| 山东 | 泰山（泰安） | 待补 | 🖼(1) |
| 云南 | 丽江古城·泸沽湖·玉龙雪山·西双版纳 | 待补 | 🖼(4) |
| 安徽 | 黄山 | 待补 | 🖼(1) |
| 上海 | 上海（外滩·东方明珠） | 2021 | ✅(133) |
| 浙江 | 杭州（西湖·灵隐寺）、宁波（天一阁·普陀山）、绍兴（鲁迅故里）、金华（横店）、温州（楠溪江）、舟山 | 2020–21 | 混 |
| 江苏 | 南京、丹阳、苏州（古典园林） | 2020 | 混 |
| 湖北 | 黄石、武汉（黄鹤楼） | 2021 | 混 |
| 湖南 | 长沙（橘子洲·五一广场）、张家界 | 2020 | ✅ |
| 江西 | 南昌（滕王阁） | 2020 | ✅(16) |
| 广东 | 广州（广州塔·珠江夜游）、深圳 | 2021 | 混 |

## 🌍 欧洲（按国家）

| 国家 | 城市 / 景点 | 年份 | 照片 |
| --- | --- | --- | --- |
| 英国 | London（Big Ben·Tower Bridge·London Eye·Buckingham·British Museum）、Oxford·Cambridge、Edinburgh、Scottish Highlands、Stonehenge | 待补 | 🖼(9) |
| 法国 | Paris（Eiffel·Louvre·Versailles）、Mont Saint-Michel、Loire Valley、Provence、French Riviera | 待补 | 🖼(7) |
| 比利时 | Brussels（Grand Place）、Bruges、Ghent | 待补 | 🖼(3) |
| 意大利 | Rome（Colosseum）、Venice、Florence（Duomo）、Pisa、Cinque Terre、Amalfi Coast | 待补 | 🖼(6) |
| 梵蒂冈 | St Peter's Basilica（最小国） | 待补 | 🖼(1) |
| 瑞士 | Zermatt·Lauterbrunnen·Lucerne·Jungfraujoch·Glacier Express·Rhine Falls·Chillon·Lake Thun·Andermatt·Spiez | 2019 | ✅(14) |
| 挪威 | Bergen·Geirangerfjord·Flåm·Preikestolen·Trolltunga·Kjeragbolten·Lofoten·Tromsø（峡湾区） | 2019 | ✅(11) |
| 德国 | Munich、Neuschwanstein(Schwangau)、Brandenburg Gate·Cologne·Rothenburg·Black Forest·Königssee | 2019 | ✅(4) |
| 丹麦 | Copenhagen（Nyhavn·Little Mermaid·Tivoli·Rosenborg·Round Tower·Christianshavn）、Kronborg | 2019 | ✅(1) |

## 🇹🇭 亚洲

| 国家 | 城市 / 景点 | 年份 | 照片 |
| --- | --- | --- | --- |
| 泰国 | Bangkok（Grand Palace·Wat Arun·Wat Pho）、Ayutthaya、Chiang Mai（Doi Suthep）、Chiang Rai（White Temple）、Damnoen Saduak 水上市场 | 待补 | 🖼(7) |

---

## 待补 / 待办（按依赖顺序）

1. **旅行年份**：🖼（网图）节点的景点都已补全，但具体哪年去的还要你确认填进各表的「年份」列。
2. **可能还有遗漏的国家 / 省**（想起来补这里）。
3. **景点层**：每个城市点进去的具体景点 —— 逐个城市再定。
4. **网图**：🖼 节点找可商用 / CC 图（注意版权，同 BGM）。
5. ~~**坐标**~~ ✅ 已接入 `data/footprints.json`：✅ 节点用照片 GPS 中位数截 3 位；🖼 节点填地标实际坐标（3 位，比城市中心更准）。
6. **作文**：每个景点的小手记。

_更新于 2026-06-24。_
