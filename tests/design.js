/* 个人主页设计规范 — 自检测试 (index.html)
 * 用法：浏览器打开 http://localhost:1999 → F12 控制台 → 粘贴本文件全部内容回车。
 * 逐条对照 DESIGN.md 检查 light/dark 两套主题的设计 token，最后 console.table 输出 ✅/❌。
 * 覆盖：系统字体 / 禁纯黑 / 海拔=更亮表面 / 文字不透明度分级 / 强调色去饱和 /
 *      毛玻璃材质 / 切换同步过渡 / html 背景 / 圆角 / 阴影 / 交互态 / 对比度(AA·AAA)。
 * 注：配色读 CSS 变量（瞬时生效，不受主题切换的 0.3s 过渡干扰）。
 */
(async () => {
  const root = document.documentElement;
  const css = [...document.querySelectorAll("style")]
    .map((s) => s.textContent)
    .join("\n");
  const gcs = (sel) =>
    getComputedStyle(typeof sel === "string" ? document.querySelector(sel) : sel);
  const vAt = (theme, name) => {
    // 在不触发可见过渡的前提下读某主题下的变量值
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
  // 把带 alpha 的前景色合成到背景上（算真实对比度用）
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
    R.push({ 测试: name, 结果: cond ? "✅" : "❌", 实测: info ?? "" });

  if (!document.querySelector(".item")) {
    return console.error("没找到 .item 卡片，确认在 http://localhost:1999 且页面已加载");
  }

  // —— 主题无关 ——
  ok(
    "§1 系统字体栈(San Francisco)",
    /apple-system|system-ui/i.test(gcs(document.body).fontFamily),
    gcs(document.body).fontFamily.split(",")[0],
  );
  ok(
    "§1 不加载外部/Google 字体",
    ![...document.querySelectorAll('link[rel="stylesheet"]')].some((l) =>
      /googleapis|fonts\.g/.test(l.href),
    ),
  );
  ok("§1 基准字号 16px", gcs(document.body).fontSize === "16px", gcs(document.body).fontSize);

  const nav = document.querySelector(".nav");
  const bf = gcs(nav).backdropFilter || gcs(nav).webkitBackdropFilter || "";
  ok("§4 导航栏毛玻璃材质(backdrop blur)", /blur/.test(bf), bf || "none");
  ok(
    "§4 导航背景与 body 同步过渡",
    /background-color|(^|\s)all(\s|,|$)/.test(gcs(nav).transitionProperty),
    gcs(nav).transitionProperty,
  );
  ok(
    "§4 html 设置背景(防回弹透白)",
    !["rgba(0, 0, 0, 0)", "transparent"].includes(gcs(root).backgroundColor),
    gcs(root).backgroundColor,
  );
  // §4 导航材质够实(≥0.85)：太透的话滚动内容会透出来糊在一起
  const navAlpha = (t) => parse(vAt(t, "--material")).a;
  ok(
    "§4 导航材质不透明度 ≥0.85",
    navAlpha("light") >= 0.85 && navAlpha("dark") >= 0.85,
    `light ${navAlpha("light")} / dark ${navAlpha("dark")}`,
  );
  // §4 暗色导航分隔线不能是发白的亮线(原 bug: border-bottom 用了白色 hairline)
  {
    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    const bw = parseFloat(gcs(nav).borderBottomWidth) || 0;
    const bc = parse(gcs(nav).borderBottomColor);
    if (prev) root.setAttribute("data-theme", prev);
    else root.removeAttribute("data-theme");
    ok(
      "§4 暗色导航无发白边线",
      !(bw > 0 && bc.a > 0.05 && lum(bc) > 0.3),
      `${bw}px alpha=${bc.a}`,
    );
  }

  const item = document.querySelector(".item");
  const rad = parseFloat(gcs(item).borderTopLeftRadius);
  ok("§6 卡片圆角 6–20px(非直角/非胶囊)", rad >= 6 && rad <= 20, rad + "px");
  // §5/§6 样式6:所有卡片(.item 与 .fp)统一 8px 圆角 + 印章红 3px 左边条
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
    ok("§5 样式6:卡片 8px 圆角 + 3px 印章红左边条(.item/.fp 同一语言)", style6,
      cards.map((el) => `${el.className.split(" ")[0]}: r${parseFloat(gcs(el).borderTopLeftRadius)} b${parseFloat(gcs(el).borderLeftWidth)}`).join(" / "));
  }
  // §1 headline 对 DESIGN.md 字面值(17px):从变量自读会自证,必须写死
  ok(
    "§1 --fs-headline = 17px(对照 DESIGN.md 字面值)",
    getComputedStyle(root).getPropertyValue("--fs-headline").trim() === "17px",
    getComputedStyle(root).getPropertyValue("--fs-headline").trim(),
  );
  {
    const ic = gcs(item);
    const hasBorder = ["borderTopWidth","borderLeftWidth"].some(p => parseFloat(ic[p]) > 0);
    ok("§5 卡片有定义(阴影或描边)", ic.boxShadow !== "none" || hasBorder, ic.boxShadow !== "none" ? "shadow" : "border");
  }
  ok("§8 :active 按压态存在", /:active/.test(css));
  ok("§8 :focus-visible 焦点环存在", /:focus-visible/.test(css));
  ok("§9 prefers-reduced-motion 降级", /prefers-reduced-motion/.test(css));
  ok(
    "§3.3 次级文字用不透明度分级(<1)",
    parse(vAt("light", "--muted")).a < 1 && parse(vAt("dark", "--muted")).a < 1,
    `light a=${parse(vAt("light", "--muted")).a} / dark a=${parse(vAt("dark", "--muted")).a}`,
  );

  // §1 字号阶梯：所有文字字号只能取 type scale token（禁止零散/小数字号）
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
  ok("§1 字号都来自 type scale", offScale.length === 0, offScale.length ? "off: " + offScale.join(",") : "全部 on-scale");
  const ht = parseFloat(gcs(".hero-title").fontSize);
  ok("§1 Hero 字号在 display 区间(40–64)", ht >= 40 && ht <= 64, ht + "px");

  // —— 逐主题：禁纯黑 / 海拔 / 对比度 / 去饱和（读 token，不受过渡影响）——
  const accents = { light: vAt("light", "--accent"), dark: vAt("dark", "--accent") };
  for (const t of ["light", "dark"]) {
    const bg = parse(vAt(t, "--bg"));
    const card = parse(vAt(t, "--card"));
    const ink = parse(vAt(t, "--ink"));
    const mut = parse(vAt(t, "--muted"));
    const tag = "[" + t + "] ";
    if (t === "dark")
      ok(
        tag + "§3.1 禁止纯黑背景",
        !(bg.r === 0 && bg.g === 0 && bg.b === 0),
        `rgb(${bg.r},${bg.g},${bg.b})`,
      );
    if (t === "light")
      ok(
        tag + "§3.1 禁止纯白背景(会刺眼)",
        !(bg.r === 255 && bg.g === 255 && bg.b === 255),
        `rgb(${bg.r},${bg.g},${bg.b})`,
      );
    // §3.2 暗色：海拔=卡片比背景更亮；浅色：卡片可比底略沉（暖米白卡），只需与底可辨
    ok(
      tag + (t === "dark" ? "§3.2 海拔=卡片比背景更亮" : "§3.2 卡片与背景可辨(浅色卡可略沉)"),
      t === "dark" ? lum(card) > lum(bg) : Math.abs(lum(card) - lum(bg)) > 0.004,
      `card ${lum(card).toFixed(3)} vs bg ${lum(bg).toFixed(3)}`,
    );
    ok(tag + "§9 主文字对比 ≥7 (AAA)", ratio(over(ink, bg), bg) >= 7, ratio(over(ink, bg), bg).toFixed(1) + ":1");
    ok(tag + "§9 次文字对比 ≥4.5 (AA)", ratio(over(mut, bg), bg) >= 4.5, ratio(over(mut, bg), bg).toFixed(1) + ":1");
  }
  ok("§3.4 强调色暗色去饱和/提亮(≠浅色)", accents.light !== accents.dark, `${accents.light} → ${accents.dark}`);

  const pass = R.filter((r) => r.结果 === "✅").length;
  console.log(
    `%c个人主页设计规范自检 — 见 DESIGN.md — 通过 ${pass}/${R.length}`,
    "font-weight:bold;font-size:13px",
  );
  console.table(R);
})();
