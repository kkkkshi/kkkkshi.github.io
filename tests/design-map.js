/* Footprints map design spec — self-check tests (footprints.html)
 * Usage: open http://localhost:1999/footprints.html in a browser → F12 console → paste this file and press Enter.
 * Checks against DESIGN-MAP.md whether the UI overlays follow the structural rules, then prints ✅/❌ via console.table.
 * The antique nautical chart theme (parchment/serif/compass/palette) is intentional and out of scope here.
 */
(async () => {
  const sleep = (ms) => new Promise((f) => setTimeout(f, ms));
  const css = [...document.querySelectorAll("style")]
    .map((s) => s.textContent)
    .join("\n");
  // style + script: reduced-motion on this page is implemented via JS matchMedia
  const allText = [...document.querySelectorAll("style,script")]
    .map((s) => s.textContent)
    .join("\n");
  const gcs = (sel) =>
    getComputedStyle(typeof sel === "string" ? document.querySelector(sel) : sel);
  const R = [];
  const ok = (name, cond, info) =>
    R.push({ test: name, result: cond ? "✅" : "❌", actual: info ?? "" });

  if (!document.querySelector("#daynight") || !document.querySelector("#card")) {
    return console.error("Map UI not found; make sure you're on http://localhost:1999/footprints.html and it has loaded");
  }

  // §0 Serif theme
  ok(
    "§0 Serif font (antique chart)",
    /fell|songti|georgia|serif/i.test(gcs(document.body).fontFamily),
    gcs(document.body).fontFamily.split(",")[0],
  );

  // §Material
  const card = document.querySelector("#card");
  const cbf = gcs(card).backdropFilter || gcs(card).webkitBackdropFilter || "";
  ok("§Material Card frosted (backdrop blur)", /blur/.test(cbf), cbf || "none");
  // User decision 2026-07-16: NO frosted overlays on the chart — the year strip (and title) float
  // bare like map labels, readability via text halos; declutter() makes map labels yield instead
  let ybf = "";
  try {
    ybf =
      getComputedStyle(document.querySelector("#years"), "::before")
        .backdropFilter || "";
  } catch (e) {}
  ok(
    "§Material Year strip floats bare (no frosted overlay)",
    !/blur/.test(ybf),
    ybf || "none",
  );

  // §Layering
  const zCard = parseInt(gcs(card).zIndex) || 0;
  const zMap = parseInt(gcs("#map").zIndex) || 0;
  ok("§Layering Card above map", zCard > zMap, `card ${zCard} > map ${zMap}`);

  // §Shape
  const rad = parseFloat(gcs(card).borderTopLeftRadius);
  ok("§Shape Card radius >0 (not square)", rad > 0, rad + "px");
  ok("§Shadow Card has shadow", gcs(card).boxShadow !== "none");

  // §Button states
  ok("§Buttons :active pressed state exists", /:active/.test(css));
  const td = gcs("#daynight").transitionDuration;
  ok("§Buttons Controls have transition feedback", td !== "0s" && td !== "", td);

  // §Opacity tiers (unselected year buttons should be dimmed <1; selected .on is 1)
  const ybs = [...document.querySelectorAll("#years button")];
  ok(
    "§Opacity Year strip has opacity tiers",
    ybs.some((b) => parseFloat(gcs(b).opacity) < 1),
    ybs.length ? "min=" + Math.min(...ybs.map((b) => parseFloat(gcs(b).opacity))) : "no year buttons",
  );

  // §Day/night no pure black
  const wasNight = document.body.classList.contains("night");
  document.body.classList.add("night");
  await sleep(30);
  const mapBg = getComputedStyle(document.querySelector("#map")).backgroundColor;
  const c = (mapBg.match(/\d+/g) || [0, 0, 0]).map(Number);
  ok("§Day/night Night mode no pure black", !(c[0] === 0 && c[1] === 0 && c[2] === 0), mapBg);
  if (!wasNight) document.body.classList.remove("night");

  // §A11y (this page disables the intro animation via JS matchMedia, hence scanning style+script)
  ok("§A11y prefers-reduced-motion fallback", /prefers-reduced-motion/.test(allText));

  // §Sea Exclude ferry routes: basemap transportation layer needs a filter, otherwise ferry lines get drawn across the sea
  let ferryInfo = "no _map";
  let ferryExcluded = false;
  try {
    const mp = window._map;
    if (mp && mp.getFilter) {
      ferryInfo = JSON.stringify(mp.getFilter("roads"));
      ferryExcluded = /ferry/.test(ferryInfo) && /!=/.test(ferryInfo);
    }
  } catch (e) {
    ferryInfo = String(e);
  }
  ok("§Sea Ferry routes excluded", ferryExcluded, ferryInfo.slice(0, 70));

  // §World layer All visited-country labels shown (none hidden by collision avoidance; skipped if not on world layer)
  const atWorld = (document.querySelector("#title small")?.textContent || "")
    .toUpperCase()
    .includes("WORLD");
  const areaLbls = [...document.querySelectorAll(".port.area .lbl")];
  const hiddenCount = areaLbls.filter(
    (l) => getComputedStyle(l).visibility === "hidden",
  ).length;
  ok(
    "§World layer All country labels shown (0 hidden)",
    atWorld ? areaLbls.length > 0 && hiddenCount === 0 : true,
    atWorld ? `${areaLbls.length} labels, ${hiddenCount} hidden` : "not world layer, skipped",
  );

  const pass = R.filter((r) => r.result === "✅").length;
  console.log(
    `%cFootprints map design spec self-check — see DESIGN-MAP.md — passed ${pass}/${R.length}`,
    "font-weight:bold;font-size:13px",
  );
  console.table(R);
})();
