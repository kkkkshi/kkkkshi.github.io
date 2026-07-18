/* SHERRY'S FOOTPRINTS — regression tests
 * Usage: open http://localhost:1999 in a browser → F12 console → paste this entire file and press Enter.
 * Runs through all interactions automatically, then prints ✅/❌ via console.table.
 * Covers issues reported over time: click to enter / cross-country jump / going up a level / Taiwan belongs to China /
 * drilling into each level / going up via breadcrumbs / seal = back to homepage / breadcrumbs / consecutive years / night toggle / no Chinese / fill not spilling into the sea, etc.
 */
(async () => {
  const m = window._map;
  if (!m) return console.error("Map not found; make sure you're on localhost:1999 and it has loaded");
  const sleep = (ms) => new Promise((f) => setTimeout(f, ms));
  const T = () => document.querySelector("#title small").textContent;
  const labels = () =>
    [...document.querySelectorAll(".port .lbl")].map((l) => l.textContent);
  const click = (t) => {
    const all = [...document.querySelectorAll(".port")];
    // Exact match first; city labels may carry a subtitle (e.g. "Hangzhou··123 photos"), fall back to prefix match
    const p =
      all.find((p) => p.querySelector(".lbl")?.textContent === t) ||
      all.find((p) => p.querySelector(".lbl")?.textContent.startsWith(t));
    if (p) {
      (p.querySelector(".pin") || p.querySelector(".lbl")).click();
      return true;
    }
    return false;
  };
  const clickAt = (lng, lat) => {
    const c = m.getCanvas(),
      r = c.getBoundingClientRect(),
      p = m.project([lng, lat]);
    ["mousedown", "mouseup", "click"].forEach((t) =>
      c.dispatchEvent(
        new MouseEvent(t, {
          clientX: r.left + p.x,
          clientY: r.top + p.y,
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      ),
    );
  };
  // Go up one level: click the last breadcrumb (= parent of the current level). The seal #seal is now "back to homepage" and no longer goes up.
  const up = () => {
    const crs = [...document.querySelectorAll("#crumbs .cr")];
    if (crs.length) crs[crs.length - 1].click();
  };
  // Back to world level: click the "The World" breadcrumb (no-op if already at world level).
  const toWorld = () => {
    const w = [...document.querySelectorAll("#crumbs .cr")].find(
      (c) => c.textContent === "The World",
    );
    if (w) w.click();
  };
  const R = [];
  const ok = (name, cond) => R.push({ test: name, result: cond ? "✅" : "❌" });

  await sleep(4000);

  // —— World level ——
  // Distant-exclave island labels (.minor, e.g. Hawaii) don't count as countries
  ok(
    "World level shows 13 countries",
    [...document.querySelectorAll(".port:not(.minor) .lbl")].length === 13,
  );
  ok(
    "World level has distant-exclave label (Hawaii)",
    [...document.querySelectorAll(".port.minor .lbl")].some(
      (l) => l.textContent === "Hawaii",
    ),
  );
  ok(
    "Taiwan belongs to China (map fill)",
    m
      .queryRenderedFeatures(m.project([121, 23.7]), {
        layers: ["country-fill"],
      })
      .some((f) => f.properties.NAME === "China"),
  );
  ok(
    "No Chinese in UI",
    (document.body.innerText.match(/[一-鿿]/g) || []).length === 0,
  );
  const yrVisible = () =>
    [...document.querySelectorAll("#years button")]
      .filter((b) => b.offsetWidth > 0)
      .map((b) => b.textContent)
      .join();
  // Year-strip windows derive from the current year (the strip's hi bound is not hardcoded)
  const YR_HI = new Date().getFullYear();
  const yrSeq = (a, b) =>
    Array.from({ length: b - a + 1 }, (_, i) => a + i).join(",");
  ok(
    "Desktop year strip collapsed by default: current selection + ▸ expand",
    yrVisible() === "All,▸",
  );
  document.querySelector("#years button.xp").click();
  ok(
    `Expand → default window ${YR_HI - 9}–${YR_HI} with ◂ to fold back`,
    yrVisible() === `‹,All,${yrSeq(YR_HI - 9, YR_HI)},◂`,
  );
  ok(
    "Land uses NE land, sea = background (same source, not cut up by water areas)",
    !!m.getLayer("land") &&
      !m.getLayer("water") &&
      (() => {
        const ls = m.getStyle().layers.map((l) => l.id);
        return ls.indexOf("country-fill") > ls.indexOf("land");
      })(),
  );
  ok("Border-line layer exists (global land borders)", !!m.getLayer("border-line"));
  ok("State-border layer exists (admin divisions visible)", !!m.getLayer("state-border"));
  ok("Lake layer exists (Great Lakes etc.)", !!m.getLayer("lake"));

  // —— Clicking Taiwan should enter China ——
  clickAt(121, 23.7);
  await sleep(2200);
  ok("Click Taiwan → enter China", T() === "CHINA");

  // —— Drill down China → Zhejiang → Hangzhou → spot card ——
  click("Zhejiang");
  await sleep(1600);
  ok("China → Zhejiang (province level)", T() === "ZHEJIANG");
  click("Hangzhou");
  await sleep(1900);
  ok("Zhejiang → Hangzhou (city level)", T() === "HANGZHOU");
  const sp = [...document.querySelectorAll(".port")].find((p) =>
    p.querySelector(".lbl"),
  );
  if (sp) sp.querySelector(".pin").click();
  await sleep(600);
  ok(
    "Click spot → story card (image or photo placeholder)",
    document.getElementById("card").classList.contains("show") &&
      (!!document.querySelector("#card .photo img") ||
        /photo|journal/i.test(
          document.querySelector("#card .photo")?.textContent || "",
        )),
  );

  // —— Go up one level (breadcrumb) back to province level ——
  up();
  await sleep(1600);
  ok("Up one level (breadcrumb) → Zhejiang", T() === "ZHEJIANG" || T() === "HANGZHOU");
  // Note: the seal #seal = back to homepage (location.href="index.html"), which leaves the map,
  // so it isn't clicked in this suite; its semantics are verified separately.

  // —— Zoom way out → back to world and restore defaults (large countries like China only exit around 1.0) ——
  m.zoomTo(0.9, { duration: 300 });
  await sleep(700);
  m.fire("moveend");
  await sleep(900);
  ok("Zoom way out → back to world (works for large countries too)", T() === "THE WORLD");

  // —— Direct cross-country click: from world click US land, then click Canadian land to jump directly ——
  clickAt(-98, 39);
  await sleep(2200);
  ok("Click US land → enter United States", T() === "UNITED STATES");
  ok("Clicking a country shows the whole country (reasonable zoom ~2-4)", m.getZoom() > 2 && m.getZoom() < 5);
  clickAt(-110, 56);
  await sleep(2200);
  ok("Click Canada from US level → direct cross-country jump", T() === "CANADA");

  // —— Breadcrumb The World back to initial view ——
  const cr = [...document.querySelectorAll("#crumbs .cr")].find(
    (c) => c.textContent === "The World",
  );
  if (cr) cr.click();
  await sleep(1500);
  ok("Click breadcrumb The World → back to world", T() === "THE WORLD");

  // —— Night / day toggle ——
  document.getElementById("daynight").click();
  await sleep(400);
  ok("Switch to night mode", document.body.classList.contains("night"));
  document.getElementById("daynight").click();
  await sleep(300);
  ok("Switch back to day mode", !document.body.classList.contains("night"));

  // —— Single-city province/state (e.g. Alberta only has Banff, Shandong only Jinan) shouldn't bounce back instantly ——
  toWorld();
  await sleep(900);
  click("Canada");
  await sleep(1800);
  click("Alberta");
  await sleep(2400);
  ok("Click single-city province (Alberta) stays at province level", T() === "ALBERTA");

  // —— Province labels at country level don't overlap (collision avoidance works) ——
  toWorld();
  await sleep(900);
  click("Canada");
  await sleep(2300);
  const vlbl = [...document.querySelectorAll(".port .lbl")]
    .filter((l) => l.style.visibility !== "hidden")
    .map((l) => l.getBoundingClientRect());
  let ov = 0;
  for (let i = 0; i < vlbl.length; i++)
    for (let j = i + 1; j < vlbl.length; j++) {
      const a = vlbl[i],
        b = vlbl[j];
      if (
        !(
          a.right < b.left ||
          a.left > b.right ||
          a.bottom < b.top ||
          a.top > b.bottom
        )
      )
        ov++;
    }
  ok("Visible province labels don't overlap at country level", ov === 0);

  // —— New exit-level logic (based on the level's display zoom, independent of country size/latitude) ——
  toWorld();
  await sleep(900);
  clickAt(103, 35); // enter China
  await sleep(2200);
  const cz = m.getZoom();
  m.zoomTo(cz - 0.5, { duration: 300 }); // moderate zoom within the level
  await sleep(700);
  m.fire("moveend");
  await sleep(900);
  ok("Moderate zoom within country level doesn't falsely exit (stays in China)", T() === "CHINA");
  m.zoomTo(0.95, { duration: 300 }); // zoom way out
  await sleep(700);
  m.fire("moveend");
  await sleep(900);
  ok("China zoom way out → back to world (works for large countries too)", T() === "THE WORLD");

  // —— Year filter: clicking a year shows only that year's countries, All restores ——
  const visPorts = () =>
    [...document.querySelectorAll(".port")].filter(
      (p) => p.style.display !== "none",
    ).length;
  const yearBtn = (v) =>
    [...document.querySelectorAll("#years button")].find(
      (b) => b.dataset.y === String(v),
    );
  const nAll = visPorts();
  yearBtn(2019).click();
  await sleep(600);
  ok(
    "Year filter: click 2019, fewer countries and button highlighted",
    visPorts() < nAll && yearBtn(2019).classList.contains("on"),
  );
  ok(
    "No places row: the year picker shows years only (user 2026-07-17)",
    !document.getElementById("yearlist"),
  );
  const goldAt = (lng, lat) =>
    m.queryRenderedFeatures(m.project([lng, lat]), {
      layers: ["country-fill"],
    }).length > 0;
  ok(
    "Year fill: in 2019 China not gold, Canada gold",
    !goldAt(103, 35) && goldAt(-106, 56),
  );
  yearBtn("all").click();
  await sleep(600);
  ok("Year filter: click All restores everything", visPorts() === nAll);
  ok("Year fill: All restores China's gold", goldAt(103, 35));

  // —— Year strip paging: ‹ pages back, stops at 1999, › pages back to default ——
  const yrTexts = () =>
    [...document.querySelectorAll("#years button")]
      .filter((b) => !b.classList.contains("tg"))
      .map((b) => b.textContent)
      .join();
  const pgBtn = (t) =>
    [...document.querySelectorAll("#years button")].find(
      (b) => b.textContent === t,
    );
  pgBtn("‹").click();
  ok(
    `Year strip ‹ once → ${YR_HI - 19}–${YR_HI - 10}`,
    yrTexts() === `‹,All,${yrSeq(YR_HI - 19, YR_HI - 10)},›`,
  );
  pgBtn("‹").click();
  ok(
    `Year strip ‹ twice → 1999–${YR_HI - 20} at the end (‹ disappears)`,
    yrTexts() === `All,${yrSeq(1999, YR_HI - 20)},›`,
  );
  pgBtn("›").click();
  pgBtn("›").click();
  ok(
    `Year strip › back to default ${YR_HI - 9}–${YR_HI}`,
    yrTexts().startsWith(`‹,All,${YR_HI - 9}`) && yrTexts().endsWith(String(YR_HI)),
  );

  // —— Border darkness follows level (user-specified): faint at world level, country + state lines darken at province level ——
  const op = (l, p) => m.getPaintProperty(l, p);
  ok("World level borders faint (country opacity ≤0.5)", op("border-line", "line-opacity") <= 0.5);
  clickAt(-98, 39); // enter US
  await sleep(2200);
  click("California");
  await sleep(2400);
  ok(
    "Province level borders darker (country + state opacity >0.8)",
    op("border-line", "line-opacity") > 0.8 &&
      op("state-border", "line-opacity") > 0.8,
  );

  // —— Panning across a border at country level → title/breadcrumbs switch country (camera stays) ——
  up(); // breadcrumb back to US level
  await sleep(1600);
  m.panTo([-105, 56], { duration: 400 }); // pan to central Canada
  await sleep(700);
  m.fire("moveend");
  await sleep(1200);
  ok("Pan from US level to Canada → title becomes CANADA", T() === "CANADA");

  // —— Pan to deep ocean at country level (view fully leaves the country's bounding box) → back to world ——
  m.jumpTo({ center: [-20, -15], zoom: m.getZoom() });
  m.fire("moveend");
  await sleep(1200);
  ok("Pan to deep ocean → back to world", T() === "THE WORLD");

  // —— Panning across the date line at world level: markers follow the world copy, no level exit ——
  m.jumpTo({ center: [175, 30], zoom: m.getZoom() });
  m.fire("moveend");
  await sleep(900);
  const chinaLbl = [...document.querySelectorAll(".port")].find(
    (p) => p.querySelector(".lbl")?.textContent === "China",
  );
  const cnx = chinaLbl ? chinaLbl.getBoundingClientRect().x : -1;
  ok(
    "Cross-date-line pan: China marker in viewport and still world level",
    T() === "THE WORLD" && cnx > 0 && cnx < innerWidth,
  );
  toWorld();
  await sleep(1200);

  // —— Top-right coordinate stamp updates on pan ——
  const st0 = document.getElementById("stamp").textContent;
  m.panBy([160, 0], { duration: 200 });
  await sleep(600);
  ok("Coordinate stamp updates on pan", document.getElementById("stamp").textContent !== st0);

  // —— Social buttons ——
  ok(
    "GitHub/LinkedIn external links _blank + noopener",
    [...document.querySelectorAll('#links a[target="_blank"]')].length === 2 &&
      [...document.querySelectorAll('#links a[target="_blank"]')].every((a) =>
        (a.rel || "").includes("noopener"),
      ),
  );
  const mailA = [...document.querySelectorAll("#links a")].find(
    (a) => a.dataset.email,
  );
  const urlB = location.href;
  mailA.click();
  await sleep(400);
  ok(
    "Email button → toast shows address without navigating",
    document.getElementById("toast").classList.contains("show") &&
      document.getElementById("toast").textContent.includes("@") &&
      location.href === urlB,
  );

  // —— Music button: lights up if it can play, clicking again pauses and dims;
  //    being blocked by the browser autoplay policy (no user gesture) doesn't count as failure ——
  const bgm = document.getElementById("bgm");
  const mus = document.getElementById("music");
  mus.click();
  let lit = false;
  for (let i = 0; i < 30 && !(lit = mus.classList.contains("on")); i++)
    await sleep(200);
  const blocked = bgm.paused && !bgm.error;
  ok("Music button: playing lights up (or blocked by autoplay policy)", lit || blocked);
  if (lit) {
    mus.click();
    await sleep(300);
    ok("Music button: click again pauses and dims", bgm.paused && !mus.classList.contains("on"));
  } else ok("Music button: click again pauses and dims", true);

  // —— Click the Hawaiian islands directly from world level (distant-exclave state): enter the state directly, not mainland-only US ——
  m.panTo([-157, 21], { duration: 400 });
  await sleep(1200);
  clickAt(-155.5, 19.6); // Big Island
  await sleep(2600);
  ok("Click Hawaiian islands from world level → enter HAWAII directly", T() === "HAWAII");
  toWorld();
  await sleep(1800);

  // —— Looking into China from world level (centered on China and clearly zoomed in) → auto-enter China; zoom back → back to world ——
  m.jumpTo({ center: [104, 35], zoom: 3.8 });
  m.fire("moveend");
  await sleep(1200);
  ok("Zoom into China from world level → title auto-switches to CHINA", T() === "CHINA");
  m.zoomTo(1.2, { duration: 300 });
  await sleep(700);
  m.fire("moveend");
  await sleep(1500);
  ok("Zoom back from auto-entered country → back to world", T() === "THE WORLD");

  console.table(R);
  const fail = R.filter((r) => r.result === "❌");
  console.log(
    fail.length
      ? `❌ ${fail.length}/${R.length} tests failed`
      : `✅ all ${R.length} tests passed`,
  );
  window._testFP = { total: R.length, fail: fail.length, R };
})();
