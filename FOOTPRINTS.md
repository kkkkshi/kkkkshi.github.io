# SHERRY'S FOOTPRINTS — Footprints Checklist (Data Source)

> Site structure: **World map (visited countries highlighted) → country (by province/state, or straight to cities for small countries) → city → landmark → photos + short write-up**
> Main axis = the map; time = year filter (span 1999–2026, a lifetime span set by the user; photos only cover 2014 onward — the remaining years were backfilled into footprints.json in 2026-07 from the user's verbal account). The year band collapses to a "Years" toggle by default; opened, it shows 10 years at a time (default 2017–2026), ‹ pages back; selecting a year lists the countries visited that year above the band. Levels adapt to data density; no forced uniformity.
>
> Markers: **✅** = has her own photos (in `photos/`, manifest `_manifest_year.csv`); **🖼** = no personal photos, uses web images (all 663 are wired in and live).
> Coordinates: ✅ uses the median of photo GPS, **truncated to 3 decimal places** for privacy; 🖼 uses city-center coordinates.
> 🖼 Web images are stored per landmark at `photos/<country>/<region>/<landmark>_{1,2,3}.jpg` (folders/filenames uniformly **lowercase snake_case**, no spaces/apostrophes/non-ASCII; 3 candidates per landmark; originals stay local and out of the repo, thumbnails `photos/_thumbs` + manifest `data/webimages.json` are committed and live); coordinates are all wired into `data/footprints.json` (330 map nodes total; every state/province/landmark across the 13 countries has a point).

## Countries Visited (13) — highlighted on the world map

Canada · United States · China · UK · France · Belgium · Germany · Italy · Switzerland · Norway · Denmark · Vatican City · Thailand

> Taiwan is shown as part of China (merged at the data layer; one gold shape on the world map, clicking Taiwan enters China).

## Level Conventions (how many levels each country gets)

- **3 levels** (country → province/state → city → landmark): 🇨🇦 Canada · 🇺🇸 United States · 🇨🇳 China
- **2 levels** (country → city → landmark): 🇬🇧 UK · 🇫🇷 France · 🇧🇪 Belgium · 🇩🇪 Germany · 🇨🇭 Switzerland · 🇮🇹 Italy · 🇻🇦 Vatican City · 🇳🇴 Norway · 🇩🇰 Denmark · 🇹🇭 Thailand

> Clicking a country shows the **whole country map** (mainland outline fills the view); province/state borders come from the basemap, with visited provinces/states highlighted in gold.
> Going back up (standard drill-down): zoom out about 0.85 levels below "the display zoom at which you entered the level", or pan out of the level's bounds → go up one level (a single zoom-out can pop multiple levels). The baseline is each level's own display zoom, independent of country size/latitude — Canada/China can pop back to the world just the same. You can also jump levels via the breadcrumbs. Within a level you can zoom freely for detail. The wax seal in the top right = back to the personal homepage (`index.html`), not up a level.
> Regression tests: see `tests/regression.js` (paste into the browser console to run).

---

## 🇨🇦 Canada (by province)

| Province | Cities / Landmarks | Years | Photos |
| --- | --- | --- | --- |
| British Columbia | Victoria (high school; BC Parliament·Butchart·Inner Harbour), Vancouver (Stanley Park·Capilano·Steveston·Whistler·Joffre Lakes), Richmond | 2014–17 / 2025 | Victoria🖼 Vancouver🖼 Richmond✅(4) |
| Alberta | Banff road trip (Lake Louise·Moraine·Peyto·Bow·Minnewanka·Johnston Canyon·Castle Mtn·Vermilion·Gondola) | 2014 | 🖼(9) |
| Ontario | Toronto (CN Tower·Distillery·St Lawrence·High Park·City Hall·Yonge-Dundas·Eaton·Allan Gardens), Waterloo (undergrad·UWaterloo) | 2017–21 · 2024–26 | Toronto✅(533) Waterloo🖼 |
| Nova Scotia | Halifax (Citadel·Waterfront·Public Gardens), Lunenburg, Peggys Cove, Cabot Trail | 2025 | ✅(216) |
| New Brunswick | Fundy NP (Alma), Hopewell Rocks, Magnetic Hill | 2025 | ✅(134) |
| Prince Edward Island | Charlottetown, Cavendish Beach, Green Gables, Confederation Bridge, PEI NP | 2025 | ✅(73) |

> Note: 81 Maritimes photos are EXIF-dated 2021; the user is certain she did not go in 2021, so they are **treated as 2025** (photos kept).

## 🇺🇸 United States (by state, DC and Virginia separate)

| State | Cities / Landmarks | Years | Photos |
| --- | --- | --- | --- |
| New York | NYC (Statue of Liberty·Empire State Building·Central Park·Times Square·Brooklyn Bridge·The Met·MoMA·Rockefeller·Grand Central·Wall Street·St Patrick's·Summit·Broadway·9/11·Roosevelt Island), Niagara·Buffalo, Cornell (Ithaca), Columbia | 2021 · 2023–24 (lived) · 2026 (Buffalo) | ✅ + 🖼 |
| Pennsylvania | Hamlin / Mead / Warren (NW PA), Philadelphia (Independence Hall·Museum of Art), Fallingwater | 2026 (earlier photos treated as passing through) | ✅ + 🖼 |
| Virginia | Arlington, Mount Vernon | 2021–22 (lived) · 2024 | ✅(6) + 🖼 |
| District of Columbia | Washington (White House·Washington Monument·Air and Space Museum·Library of Congress·Georgetown) | 2021–22 · 2024 | ✅(5) + 🖼 |
| California | SF (Golden Gate Bridge·Alcatraz·Lombard Street·Twin Peaks·Fisherman's Wharf), LA (Hollywood·Griffith·Santa Monica·Universal·Disneyland), Yosemite, Death Valley, Joshua Tree, Redwood, Mammoth, Stanford | 2010 · 2026 | 🖼(16) |
| Hawaii | Oahu (Waikiki·Pearl Harbor·Diamond Head), Maui (Haleakalā·Road to Hana), Big Island (volcanoes·Mauna Kea·black-sand beach·manta ray night dive), Kauai (Nā Pali·Waimea Canyon) | 2024 | 🖼(12) |
| Nevada | Las Vegas (Strip·Bellagio·Sphere), Hoover Dam, Lake Mead, Great Basin, Valley of Fire | 2026 | 🖼(7) |
| Arizona | Grand Canyon, Page (Antelope Canyon·Horseshoe Bend·Lake Powell), Sedona, Monument Valley | 2026 | 🖼(6) |
| Massachusetts | Boston (Freedom Trail·Common·Quincy Market·MFA), Cambridge (Harvard·MIT) | 2022–2023 | 🖼(6) |
| Utah | Zion, Bryce Canyon, Arches, Canyonlands | 2026 | 🖼(4) |
| Florida | Orlando (Disney World·Universal), Miami, Key West | 2022 | 🖼(4) |

## 🇨🇳 China (by province)

| Province | Cities / Landmarks | Years | Photos |
| --- | --- | --- | --- |
| Beijing | Forbidden City·Tiananmen Square·Great Wall·Temple of Heaven·Summer Palace·Old Summer Palace·Bird's Nest / Water Cube | 2006 · 2020 (layover) | 🖼(7) |
| Tianjin | Tianjin Eye | 2005 | 🖼(1) |
| Shandong | Mount Tai (Tai'an) | 1999–2000 · 2002 · 2004 · 2006 | 🖼(1) |
| Yunnan | Lijiang Old Town·Lugu Lake·Jade Dragon Snow Mountain·Xishuangbanna | 2009 | 🖼(4) |
| Anhui | Mount Huangshan | 2007 · 2021 | 🖼(1) |
| Shanghai | Shanghai (The Bund·Oriental Pearl Tower) | 2021 | ✅(133) |
| Zhejiang | Hangzhou (West Lake·Lingyin Temple), Ningbo (Tianyi Pavilion·Mount Putuo), Shaoxing (Lu Xun's Hometown), Jinhua (Hengdian World Studios), Wenzhou (Nanxi River), Zhoushan | 1999–2014 (home) · 2020–21 | Mixed |
| Jiangsu | Nanjing, Danyang, Suzhou (classical gardens) | 2020 | Mixed |
| Hubei | Huangshi, Wuhan (Yellow Crane Tower) | 2021 | Mixed |
| Hunan | Changsha (Juzizhou (Orange Isle)·Wuyi Square), Zhangjiajie | 2020 | ✅ |
| Jiangxi | Nanchang (Tengwang Pavilion) | 2020 | ✅(16) |
| Guangdong | Guangzhou (Canton Tower·Pearl River Night Cruise), Shenzhen, Zhuhai | 2002 (Zhuhai) · 2011 (Shenzhen) · 2021 | Mixed |

## 🌍 Europe (by country)

| Country | Cities / Landmarks | Years | Photos |
| --- | --- | --- | --- |
| UK | London (Big Ben·Tower Bridge·London Eye·Buckingham·British Museum), Oxford·Cambridge, Edinburgh, Scottish Highlands, Stonehenge | 2013 | 🖼(9) |
| France | Paris (Eiffel·Louvre·Versailles), Mont Saint-Michel, Loire Valley, Provence, French Riviera | 2013 | 🖼(7) |
| Belgium | Brussels (Grand Place), Bruges, Ghent | 2013 | 🖼(3) |
| Italy | Rome (Colosseum), Venice, Florence (Duomo), Pisa, Cinque Terre, Amalfi Coast | 2013 | 🖼(6) |
| Vatican City | St Peter's Basilica (smallest country) | 2013 | 🖼(1) |
| Switzerland | Zermatt·Lauterbrunnen·Lucerne·Jungfraujoch·Glacier Express·Rhine Falls·Chillon·Lake Thun·Andermatt·Spiez | 2019 | ✅(14) |
| Norway | Bergen·Geirangerfjord·Flåm·Preikestolen·Trolltunga·Kjeragbolten·Lofoten·Tromsø (fjord region) | 2019 | ✅(11) |
| Germany | Munich, Neuschwanstein (Schwangau), Brandenburg Gate·Cologne·Rothenburg·Black Forest·Königssee | 2019 | ✅(4) |
| Denmark | Copenhagen (Nyhavn·Little Mermaid·Tivoli·Rosenborg·Round Tower·Christianshavn), Kronborg | 2019 | ✅(1) |

## 🇹🇭 Asia

| Country | Cities / Landmarks | Years | Photos |
| --- | --- | --- | --- |
| Thailand | Bangkok (Grand Palace·Wat Arun·Wat Pho), Ayutthaya, Chiang Mai (Doi Suthep), Chiang Rai (White Temple), Damnoen Saduak floating market | 2008 | 🖼(7) |

---

## Dev Notes (README keeps only the public-facing intro; all internal notes live here; todos are separate in `TODO.md`)

- Run locally: `npm install && npm start`, open http://localhost:1999.
- Self-checks: paste the scripts under `tests/` into the browser console and hit Enter for a ✅/❌ table. design.js checks the homepage, design-map.js the map, regression.js is the map-interaction regression.
- Adding places: everything goes in `data/footprints.json` (cities go in directly; a new province also needs its boundary polygon added to `data/states.geojson`; a new country needs center / ne_names / iso_a3 / regions). `data/*.geojson` is Natural Earth geometry, never hand-edited.
- Web images: drop `<landmark>_{1,2,3}.jpg` into `photos/<country>[/<region>]/`, then run `scripts/build-webimages.py`; commit `photos/_thumbs` and `data/webimages.json`.

_Updated 2026-07-11. Live at https://kkkkshi.github.io/._
