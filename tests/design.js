/* Personal homepage design spec — self-check tests (index.html)
 * Usage: open http://localhost:1999 in a browser → F12 console → paste this entire file and press Enter.
 * Checks light/dark theme design tokens item by item against DESIGN.md, then prints ✅/❌ via console.table.
 * Covers: system fonts / no pure black / elevation = lighter surface / text opacity tiers / desaturated accent /
 *      frosted-glass material / synced theme transition / html background / border radius / shadows / interaction states / contrast (AA·AAA).
 * Note: colors are read from CSS variables (instant, unaffected by the 0.3s theme-switch transition).
 */
(async () => {
  const root = document.documentElement;
  const css = [...document.querySelectorAll("style")]
    .map((s) => s.textContent)
    .join("\n");
  const gcs = (sel) =>
    getComputedStyle(typeof sel === "string" ? document.querySelector(sel) : sel);
  const vAt = (theme, name) => {
    // Read a variable's value under a given theme without triggering a visible transition
    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", theme);
    const val = getComputedStyle(root).getPropertyValue(name).trim();
    if (prev) root.setAttribute("data-theme", prev);
    else root.removeAttribute("data-theme");
    return val;
  };
  const parse = (s) => {
    s = String(s).trim();
    let m = s.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(",").map((x) => parseFloat(x));
      return { r: p[0], g: p[1], b: p[2], a: p[3] == null ? 1 : p[3] };
    }
    m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      let h = m[1];
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: 1,
      };
    }
    return { r: 0, g: 0, b: 0, a: 1 };
  };
  // Composite an alpha foreground color over the background (to compute real contrast)
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
  });
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => {
    const l1 = lum(a),
      l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const R = [];
  const ok = (name, cond, info) =>
    R.push({ test: name, result: cond ? "✅" : "❌", actual: info ?? "" });

  if (!document.querySelector(".item")) {
    return console.error("No .item card found; make sure you're on http://localhost:1999 and the page has loaded");
  }

  // —— Theme-independent ——
  ok(
    "§1 System font stack (San Francisco)",
    /apple-system|system-ui/i.test(gcs(document.body).fontFamily),
    gcs(document.body).fontFamily.split(",")[0],
  );
  ok(
    "§1 No external/Google fonts loaded",
    ![...document.querySelectorAll('link[rel="stylesheet"]')].some((l) =>
      /googleapis|fonts\.g/.test(l.href),
    ),
  );
  ok("§1 Base font size 16px", gcs(document.body).fontSize === "16px", gcs(document.body).fontSize);

  const nav = document.querySelector(".nav");
  const bf = gcs(nav).backdropFilter || gcs(nav).webkitBackdropFilter || "";
  ok("§4 Nav bar frosted glass (backdrop blur)", /blur/.test(bf), bf || "none");
  ok(
    "§4 Nav background transitions in sync with body",
    /background-color|(^|\s)all(\s|,|$)/.test(gcs(nav).transitionProperty),
    gcs(nav).transitionProperty,
  );
  ok(
    "§4 html has a background (prevents white flash on overscroll)",
    !["rgba(0, 0, 0, 0)", "transparent"].includes(gcs(root).backgroundColor),
    gcs(root).backgroundColor,
  );
  // §4 Nav material opaque enough (>=0.85): if too transparent, scrolled content bleeds through and muddies together
  const navAlpha = (t) => parse(vAt(t, "--material")).a;
  ok(
    "§4 Nav material opacity ≥0.85",
    navAlpha("light") >= 0.85 && navAlpha("dark") >= 0.85,
    `light ${navAlpha("light")} / dark ${navAlpha("dark")}`,
  );
  // §4 Dark nav divider must not be a whitish bright line (old bug: border-bottom used a white hairline)
  {
    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    const bw = parseFloat(gcs(nav).borderBottomWidth) || 0;
    const bc = parse(gcs(nav).borderBottomColor);
    if (prev) root.setAttribute("data-theme", prev);
    else root.removeAttribute("data-theme");
    ok(
      "§4 No whitish border line on dark nav",
      !(bw > 0 && bc.a > 0.05 && lum(bc) > 0.3),
      `${bw}px alpha=${bc.a}`,
    );
  }

  const item = document.querySelector(".item");
  const rad = parseFloat(gcs(item).borderTopLeftRadius);
  ok("§6 Card radius 6–20px (not square/not pill)", rad >= 6 && rad <= 20, rad + "px");
  // §5/§6 Style 6: all cards (.item and .fp) share 8px radius + 3px seal-red left border
  {
    const accent = parse(getComputedStyle(root).getPropertyValue("--accent"));
    const cards = [".item", ".fp"].map((s) => document.querySelector(s)).filter(Boolean);
    const style6 = cards.every((el) => {
      const c = gcs(el);
      const bc = parse(c.borderLeftColor);
      return (
        parseFloat(c.borderTopLeftRadius) === 8 &&
        parseFloat(c.borderLeftWidth) === 3 &&
        bc.r === accent.r && bc.g === accent.g && bc.b === accent.b
      );
    });
    ok("§5 Style 6: cards 8px radius + 3px seal-red left border (.item/.fp same language)", style6,
      cards.map((el) => `${el.className.split(" ")[0]}: r${parseFloat(gcs(el).borderTopLeftRadius)} b${parseFloat(gcs(el).borderLeftWidth)}`).join(" / "));
  }
  // §1 headline vs DESIGN.md literal value (17px): reading it from the variable would be self-proving, must hardcode
  ok(
    "§1 --fs-headline = 17px (vs DESIGN.md literal value)",
    getComputedStyle(root).getPropertyValue("--fs-headline").trim() === "17px",
    getComputedStyle(root).getPropertyValue("--fs-headline").trim(),
  );
  {
    const ic = gcs(item);
    const hasBorder = ["borderTopWidth","borderLeftWidth"].some(p => parseFloat(ic[p]) > 0);
    ok("§5 Card has definition (shadow or border)", ic.boxShadow !== "none" || hasBorder, ic.boxShadow !== "none" ? "shadow" : "border");
  }
  ok("§8 :active pressed state exists", /:active/.test(css));
  ok("§8 :focus-visible focus ring exists", /:focus-visible/.test(css));
  ok("§9 prefers-reduced-motion fallback", /prefers-reduced-motion/.test(css));
  ok(
    "§3.3 Secondary text uses opacity tiers (<1)",
    parse(vAt("light", "--muted")).a < 1 && parse(vAt("dark", "--muted")).a < 1,
    `light a=${parse(vAt("light", "--muted")).a} / dark a=${parse(vAt("dark", "--muted")).a}`,
  );

  // §1 Type scale: all text font sizes must come from type scale tokens (no ad-hoc/fractional sizes)
  const scale = [
    "--fs-title2", "--fs-title3", "--fs-headline", "--fs-body",
    "--fs-callout", "--fs-subhead", "--fs-footnote", "--fs-caption",
  ].map((n) => parseFloat(getComputedStyle(root).getPropertyValue(n)));
  const onScale = (px) => scale.some((v) => Math.abs(v - px) < 0.6);
  const typeSels = [
    ".hero-lead", ".prose .lead", ".item-t", ".item-desc", ".item-meta",
    ".item-when", ".tag", ".fp-title", ".fp-meta", ".block-h",
    ".kicker", ".lnk", ".navlinks a",
  ];
  const offScale = typeSels.filter(
    (s) => document.querySelector(s) && !onScale(parseFloat(gcs(s).fontSize)),
  );
  ok("§1 All font sizes from type scale", offScale.length === 0, offScale.length ? "off: " + offScale.join(",") : "all on-scale");
  const ht = parseFloat(gcs(".hero-title").fontSize);
  ok("§1 Hero font size in display range (40–64)", ht >= 40 && ht <= 64, ht + "px");

  // —— Per theme: no pure black / elevation / contrast / desaturation (reads tokens, unaffected by transitions) ——
  const accents = { light: vAt("light", "--accent"), dark: vAt("dark", "--accent") };
  for (const t of ["light", "dark"]) {
    const bg = parse(vAt(t, "--bg"));
    const card = parse(vAt(t, "--card"));
    const ink = parse(vAt(t, "--ink"));
    const mut = parse(vAt(t, "--muted"));
    const tag = "[" + t + "] ";
    if (t === "dark")
      ok(
        tag + "§3.1 No pure black background",
        !(bg.r === 0 && bg.g === 0 && bg.b === 0),
        `rgb(${bg.r},${bg.g},${bg.b})`,
      );
    if (t === "light")
      ok(
        tag + "§3.1 No pure white background (glaring)",
        !(bg.r === 255 && bg.g === 255 && bg.b === 255),
        `rgb(${bg.r},${bg.g},${bg.b})`,
      );
    // §3.2 Dark: elevation = card lighter than bg; light: card may sit slightly darker (warm off-white card), just needs to be distinguishable
    ok(
      tag + (t === "dark" ? "§3.2 Elevation = card lighter than bg" : "§3.2 Card distinguishable from bg (light card may be slightly darker)"),
      t === "dark" ? lum(card) > lum(bg) : Math.abs(lum(card) - lum(bg)) > 0.004,
      `card ${lum(card).toFixed(3)} vs bg ${lum(bg).toFixed(3)}`,
    );
    ok(tag + "§9 Primary text contrast ≥7 (AAA)", ratio(over(ink, bg), bg) >= 7, ratio(over(ink, bg), bg).toFixed(1) + ":1");
    ok(tag + "§9 Secondary text contrast ≥4.5 (AA)", ratio(over(mut, bg), bg) >= 4.5, ratio(over(mut, bg), bg).toFixed(1) + ":1");
  }
  ok("§3.4 Accent desaturated/lightened in dark (≠ light)", accents.light !== accents.dark, `${accents.light} → ${accents.dark}`);

  const pass = R.filter((r) => r.result === "✅").length;
  console.log(
    `%cHomepage design spec self-check — see DESIGN.md — passed ${pass}/${R.length}`,
    "font-weight:bold;font-size:13px",
  );
  console.table(R);
})();
