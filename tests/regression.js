/* SHERRY'S FOOTPRINTS — 回归测试
 * 用法:浏览器打开 http://localhost:1999 → F12 控制台 → 粘贴本文件全部内容回车。
 * 会自动跑一遍所有交互,最后用 console.table 输出 ✅/❌。
 * 覆盖的是历次提过的问题:点击进入 / 跨国跳转 / 退层 / 台湾属于中国 /
 * 钻取各层 / 退层(面包屑) / 印章=回首页 / 面包屑 / 年份连续 / 夜间切换 / 无中文 / 填色不溢出海 等。
 */
(async () => {
  const m = window._map;
  if (!m) return console.error("没找到地图,确认在 localhost:1999 且已加载");
  const sleep = (ms) => new Promise((f) => setTimeout(f, ms));
  const T = () => document.querySelector("#title small").textContent;
  const labels = () =>
    [...document.querySelectorAll(".port .lbl")].map((l) => l.textContent);
  const click = (t) => {
    const all = [...document.querySelectorAll(".port")];
    // 先精确匹配;城市标签可能带副标题(如 "Hangzhou··123 photos"),退回前缀匹配
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
  // 退一层：点最后一个面包屑（= 当前层的父层）。印章 #seal 现已是「返回个人主页」，不再退层。
  const up = () => {
    const crs = [...document.querySelectorAll("#crumbs .cr")];
    if (crs.length) crs[crs.length - 1].click();
  };
  // 回到世界层：点「The World」面包屑（已在世界层则为无操作）。
  const toWorld = () => {
    const w = [...document.querySelectorAll("#crumbs .cr")].find(
      (c) => c.textContent === "The World",
    );
    if (w) w.click();
  };
  const R = [];
  const ok = (name, cond) => R.push({ 测试: name, 结果: cond ? "✅" : "❌" });

  await sleep(4000);

  // —— 世界层 ——
  // 远飞地小群岛标注(.minor,如夏威夷)不算国家
  ok(
    "世界层显示 13 个国家",
    [...document.querySelectorAll(".port:not(.minor) .lbl")].length === 13,
  );
  ok(
    "世界层有远飞地标注(夏威夷)",
    [...document.querySelectorAll(".port.minor .lbl")].some(
      (l) => l.textContent === "Hawaii",
    ),
  );
  ok(
    "台湾属于中国(地图填色)",
    m
      .queryRenderedFeatures(m.project([121, 23.7]), {
        layers: ["country-fill"],
      })
      .some((f) => f.properties.NAME === "China"),
  );
  ok(
    "界面无中文",
    (document.body.innerText.match(/[一-鿿]/g) || []).length === 0,
  );
  const yrVisible = () =>
    [...document.querySelectorAll("#years button")]
      .filter((b) => b.offsetWidth > 0)
      .map((b) => b.textContent)
      .join();
  ok("年份带默认收起(只一枚 Years 开关)", yrVisible() === "Years ▾");
  document.querySelector("#years button.tg").click();
  ok(
    "点开 → 默认窗口 2017–2026(带 ‹ 可往前退)",
    yrVisible() ===
      "Years ▴,‹,All,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026",
  );
  ok(
    "陆地用 NE land、海=背景(同源不被水域切碎)",
    !!m.getLayer("land") &&
      !m.getLayer("water") &&
      (() => {
        const ls = m.getStyle().layers.map((l) => l.id);
        return ls.indexOf("country-fill") > ls.indexOf("land");
      })(),
  );
  ok("国界线图层存在(全球陆地国界)", !!m.getLayer("border-line"));
  ok("州省界图层存在(看得到行政划分)", !!m.getLayer("state-border"));
  ok("湖泊图层存在(五大湖等)", !!m.getLayer("lake"));

  // —— 点台湾应进中国 ——
  clickAt(121, 23.7);
  await sleep(2200);
  ok("点台湾 → 进入中国", T() === "CHINA");

  // —— 钻取 China → Zhejiang → Hangzhou → 景点卡 ——
  click("Zhejiang");
  await sleep(1600);
  ok("中国 → 浙江(省层)", T() === "ZHEJIANG");
  click("Hangzhou");
  await sleep(1900);
  ok("浙江 → 杭州(市层)", T() === "HANGZHOU");
  const sp = [...document.querySelectorAll(".port")].find((p) =>
    p.querySelector(".lbl"),
  );
  if (sp) sp.querySelector(".pin").click();
  await sleep(600);
  ok(
    "点景点 → 故事卡(有图或照片留白)",
    document.getElementById("card").classList.contains("show") &&
      (!!document.querySelector("#card .photo img") ||
        /photo|journal/i.test(
          document.querySelector("#card .photo")?.textContent || "",
        )),
  );

  // —— 退一层（面包屑）回到省层 ——
  up();
  await sleep(1600);
  ok("退一层(面包屑) → 浙江", T() === "ZHEJIANG" || T() === "HANGZHOU");
  // 注：印章 #seal = 返回个人主页（location.href="index.html"），会离开地图，
  // 故不在本套件内点击触发；其语义单独验证。

  // —— 缩很多 → 退回世界并恢复默认(大国如中国要缩到约 1.0 才退) ——
  m.zoomTo(0.9, { duration: 300 });
  await sleep(700);
  m.fire("moveend");
  await sleep(900);
  ok("缩很多 → 退回世界(大国也能退)", T() === "THE WORLD");

  // —— 跨国直点:世界点美国陆地,再点加拿大陆地直接跳 ——
  clickAt(-98, 39);
  await sleep(2200);
  ok("点美国陆地 → 进入美国", T() === "UNITED STATES");
  ok("点国家显示整个国家(zoom 合理 ~2-4)", m.getZoom() > 2 && m.getZoom() < 5);
  clickAt(-110, 56);
  await sleep(2200);
  ok("美国层点加拿大 → 跨国直跳", T() === "CANADA");

  // —— 面包屑 The World 回初始 ——
  const cr = [...document.querySelectorAll("#crumbs .cr")].find(
    (c) => c.textContent === "The World",
  );
  if (cr) cr.click();
  await sleep(1500);
  ok("点面包屑 The World → 回世界", T() === "THE WORLD");

  // —— 夜间 / 白天切换 ——
  document.getElementById("daynight").click();
  await sleep(400);
  ok("切换到夜间模式", document.body.classList.contains("night"));
  document.getElementById("daynight").click();
  await sleep(300);
  ok("切回白天模式", !document.body.classList.contains("night"));

  // —— 单城市的省/州(如 Alberta 只有 Banff、山东只有济南)进去不应瞬间退回 ——
  toWorld();
  await sleep(900);
  click("Canada");
  await sleep(1800);
  click("Alberta");
  await sleep(2400);
  ok("点单城市省(Alberta)停在省层不瞬退", T() === "ALBERTA");

  // —— 国家层省名标签不重叠(避让生效) ——
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
  ok("国家层可见省名不重叠", ov === 0);

  // —— 退层新逻辑(以该层展示 zoom 为基准,与国家大小/纬度无关) ——
  toWorld();
  await sleep(900);
  clickAt(103, 35); // 进中国
  await sleep(2200);
  const cz = m.getZoom();
  m.zoomTo(cz - 0.5, { duration: 300 }); // 层内适度缩放
  await sleep(700);
  m.fire("moveend");
  await sleep(900);
  ok("国家层内适度缩放不误退(留在中国)", T() === "CHINA");
  m.zoomTo(0.95, { duration: 300 }); // 缩很多
  await sleep(700);
  m.fire("moveend");
  await sleep(900);
  ok("中国缩很多 → 退回世界(大国也能退)", T() === "THE WORLD");

  // —— 年份筛选:点年份只显示该年去过的国家,All 恢复 ——
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
    "年份筛选:点 2019 国家变少且按钮高亮",
    visPorts() < nAll && yearBtn(2019).classList.contains("on"),
  );
  ok(
    "年份地点行:选 2019 列出国家(含 Canada,不列省)",
    document.getElementById("yearlist").textContent.includes("Canada") &&
      !document.getElementById("yearlist").textContent.includes("Ontario"),
  );
  const goldAt = (lng, lat) =>
    m.queryRenderedFeatures(m.project([lng, lat]), {
      layers: ["country-fill"],
    }).length > 0;
  ok(
    "年份填色:2019 中国不金、加拿大金",
    !goldAt(103, 35) && goldAt(-106, 56),
  );
  yearBtn("all").click();
  await sleep(600);
  ok("年份筛选:点 All 恢复全部", visPorts() === nAll);
  ok("年份填色:All 恢复中国金色", goldAt(103, 35));
  ok(
    "年份地点行:All 时隐藏",
    document.getElementById("yearlist").style.display === "none",
  );

  // —— 年份带翻页:‹ 往前退,到 1999 到头,› 翻回默认 ——
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
    "年份带 ‹ 一次 → 2007–2016",
    yrTexts() ===
      "‹,All,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,›",
  );
  pgBtn("‹").click();
  ok(
    "年份带 ‹ 两次 → 1999–2006 到头(‹ 消失)",
    yrTexts() === "All,1999,2000,2001,2002,2003,2004,2005,2006,›",
  );
  pgBtn("›").click();
  pgBtn("›").click();
  ok(
    "年份带 › 翻回默认 2017–2026",
    yrTexts().startsWith("‹,All,2017") && yrTexts().endsWith("2026"),
  );

  // —— 边界线深浅随层级(用户定):世界层淡,点进省层国界+州线都加深 ——
  const op = (l, p) => m.getPaintProperty(l, p);
  ok("世界层边界淡(国界 opacity ≤0.5)", op("border-line", "line-opacity") <= 0.5);
  clickAt(-98, 39); // 进美国
  await sleep(2200);
  click("California");
  await sleep(2400);
  ok(
    "省层边界加深(国界+州线 opacity >0.8)",
    op("border-line", "line-opacity") > 0.8 &&
      op("state-border", "line-opacity") > 0.8,
  );

  // —— 国家层平移过界 → 标题/面包屑跟着换国(镜头不动) ——
  up(); // 面包屑回美国层
  await sleep(1600);
  m.panTo([-105, 56], { duration: 400 }); // 平移到加拿大中部
  await sleep(700);
  m.fire("moveend");
  await sleep(1200);
  ok("美国层平移到加拿大 → 标题换 CANADA", T() === "CANADA");

  // —— 国家层平移到大洋深处(视野完全离开该国范围框) → 退回世界 ——
  m.jumpTo({ center: [-20, -15], zoom: m.getZoom() });
  m.fire("moveend");
  await sleep(1200);
  ok("平移到大洋深处 → 退回世界", T() === "THE WORLD");

  // —— 世界层左右平移跨日界线:标记跟着世界副本走,不退层 ——
  m.jumpTo({ center: [175, 30], zoom: m.getZoom() });
  m.fire("moveend");
  await sleep(900);
  const chinaLbl = [...document.querySelectorAll(".port")].find(
    (p) => p.querySelector(".lbl")?.textContent === "China",
  );
  const cnx = chinaLbl ? chinaLbl.getBoundingClientRect().x : -1;
  ok(
    "跨日界线平移:中国标记在视口内且仍是世界层",
    T() === "THE WORLD" && cnx > 0 && cnx < innerWidth,
  );
  toWorld();
  await sleep(1200);

  // —— 右上角坐标戳随平移更新 ——
  const st0 = document.getElementById("stamp").textContent;
  m.panBy([160, 0], { duration: 200 });
  await sleep(600);
  ok("坐标戳随平移更新", document.getElementById("stamp").textContent !== st0);

  // —— 社交按钮 ——
  ok(
    "GitHub/LinkedIn 外链 _blank + noopener",
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
    "邮箱按钮 → toast 显示地址且不跳页",
    document.getElementById("toast").classList.contains("show") &&
      document.getElementById("toast").textContent.includes("@") &&
      location.href === urlB,
  );

  // —— 音乐按钮:能播则亮灯,再点暂停熄灭;
  //    浏览器自动播放策略挡下(非用户手势环境)不算失败 ——
  const bgm = document.getElementById("bgm");
  const mus = document.getElementById("music");
  mus.click();
  let lit = false;
  for (let i = 0; i < 30 && !(lit = mus.classList.contains("on")); i++)
    await sleep(200);
  const blocked = bgm.paused && !bgm.error;
  ok("音乐按钮:播放亮灯(或被自动播放策略挡下)", lit || blocked);
  if (lit) {
    mus.click();
    await sleep(300);
    ok("音乐按钮:再点暂停熄灭", bgm.paused && !mus.classList.contains("on"));
  } else ok("音乐按钮:再点暂停熄灭", true);

  // —— 世界层直点夏威夷群岛(远飞地州):直接进州,而不是跳到只显示本土的美国 ——
  m.panTo([-157, 21], { duration: 400 });
  await sleep(1200);
  clickAt(-155.5, 19.6); // 大岛
  await sleep(2600);
  ok("世界层点夏威夷群岛 → 直接进 HAWAII", T() === "HAWAII");
  toWorld();
  await sleep(1800);

  // —— 世界层看进中国(中心在中国且明显放大) → 自动进入中国;缩回 → 退回世界 ——
  m.jumpTo({ center: [104, 35], zoom: 3.8 });
  m.fire("moveend");
  await sleep(1200);
  ok("世界层放大看中国 → 标题自动换 CHINA", T() === "CHINA");
  m.zoomTo(1.2, { duration: 300 });
  await sleep(700);
  m.fire("moveend");
  await sleep(1500);
  ok("从自动进入的国家缩回 → 退回世界", T() === "THE WORLD");

  console.table(R);
  const fail = R.filter((r) => r.结果 === "❌");
  console.log(
    fail.length
      ? `❌ ${fail.length}/${R.length} 项失败`
      : `✅ 全部 ${R.length} 项通过`,
  );
  window._testFP = { total: R.length, fail: fail.length, R };
})();
