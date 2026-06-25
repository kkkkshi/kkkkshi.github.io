/* 足迹地图设计规范 — 自检测试 (footprints.html)
 * 用法：浏览器打开 http://localhost:1999/footprints.html → F12 控制台 → 粘贴本文件回车。
 * 对照 DESIGN-MAP.md 检查 UI 浮层是否套上了结构规则，最后 console.table 输出 ✅/❌。
 * 古海图主题(羊皮纸/衬线/罗盘/配色)是有意为之，不在校验范围内。
 */
(async () => {
  const sleep = (ms) => new Promise((f) => setTimeout(f, ms));
  const css = [...document.querySelectorAll("style")]
    .map((s) => s.textContent)
    .join("\n");
  // style + script：reduced-motion 在本页是用 JS matchMedia 实现的
  const allText = [...document.querySelectorAll("style,script")]
    .map((s) => s.textContent)
    .join("\n");
  const gcs = (sel) =>
    getComputedStyle(typeof sel === "string" ? document.querySelector(sel) : sel);
  const R = [];
  const ok = (name, cond, info) =>
    R.push({ 测试: name, 结果: cond ? "✅" : "❌", 实测: info ?? "" });

  if (!document.querySelector("#daynight") || !document.querySelector("#card")) {
    return console.error("没找到地图 UI，确认在 http://localhost:1999/footprints.html 且已加载");
  }

  // §0 衬线主题
  ok(
    "§0 衬线字体(古海图)",
    /fell|songti|georgia|serif/i.test(gcs(document.body).fontFamily),
    gcs(document.body).fontFamily.split(",")[0],
  );

  // §材质
  const card = document.querySelector("#card");
  const cbf = gcs(card).backdropFilter || gcs(card).webkitBackdropFilter || "";
  ok("§材质 卡片磨砂(backdrop blur)", /blur/.test(cbf), cbf || "none");
  let ybf = "";
  try {
    ybf =
      getComputedStyle(document.querySelector("#years"), "::before")
        .backdropFilter || "";
  } catch (e) {}
  ok(
    "§材质 年份带磨砂浮层",
    /blur/.test(ybf) || /#years::before[\s\S]*?backdrop-filter[\s\S]*?blur/.test(css),
    ybf || "(查 CSS 文本)",
  );

  // §层级
  const zCard = parseInt(gcs(card).zIndex) || 0;
  const zMap = parseInt(gcs("#map").zIndex) || 0;
  ok("§层级 卡片在地图之上", zCard > zMap, `card ${zCard} > map ${zMap}`);

  // §形状
  const rad = parseFloat(gcs(card).borderTopLeftRadius);
  ok("§形状 卡片圆角 >0(非直角)", rad > 0, rad + "px");
  ok("§阴影 卡片有阴影", gcs(card).boxShadow !== "none");

  // §按钮态
  ok("§按钮 :active 按压态存在", /:active/.test(css));
  const td = gcs("#daynight").transitionDuration;
  ok("§按钮 控件有过渡反馈", td !== "0s" && td !== "", td);

  // §不透明度分级（未选中的年份按钮应被压暗 <1；选中的 .on 为 1）
  const ybs = [...document.querySelectorAll("#years button")];
  ok(
    "§透明度 年份带不透明度分级",
    ybs.some((b) => parseFloat(gcs(b).opacity) < 1),
    ybs.length ? "min=" + Math.min(...ybs.map((b) => parseFloat(gcs(b).opacity))) : "无年份按钮",
  );

  // §昼夜 禁纯黑
  const wasNight = document.body.classList.contains("night");
  document.body.classList.add("night");
  await sleep(30);
  const mapBg = getComputedStyle(document.querySelector("#map")).backgroundColor;
  const c = (mapBg.match(/\d+/g) || [0, 0, 0]).map(Number);
  ok("§昼夜 夜晚模式禁纯黑", !(c[0] === 0 && c[1] === 0 && c[2] === 0), mapBg);
  if (!wasNight) document.body.classList.remove("night");

  // §无障碍（本页用 JS matchMedia 关闭开场动画，故扫 style+script）
  ok("§无障碍 prefers-reduced-motion 降级", /prefers-reduced-motion/.test(allText));

  // §海面 排除轮渡航线(ferry)：底图 transportation 图层带 filter，否则海上画出一片航线
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
  ok("§海面 排除轮渡航线(ferry)", ferryExcluded, ferryInfo.slice(0, 70));

  // §世界层 去过的国家标签全部显示（不被避让藏掉；非世界层则跳过）
  const atWorld = (document.querySelector("#title small")?.textContent || "")
    .toUpperCase()
    .includes("WORLD");
  const areaLbls = [...document.querySelectorAll(".port.area .lbl")];
  const hiddenCount = areaLbls.filter(
    (l) => getComputedStyle(l).visibility === "hidden",
  ).length;
  ok(
    "§世界层 国家标签全显示(0 隐藏)",
    atWorld ? areaLbls.length > 0 && hiddenCount === 0 : true,
    atWorld ? `${areaLbls.length} 个标签, ${hiddenCount} 隐藏` : "非世界层,跳过",
  );

  const pass = R.filter((r) => r.结果 === "✅").length;
  console.log(
    `%c足迹地图设计规范自检 — 见 DESIGN-MAP.md — 通过 ${pass}/${R.length}`,
    "font-weight:bold;font-size:13px",
  );
  console.table(R);
})();
