/* SHERRY'S FOOTPRINTS — 回归测试
 * 用法:浏览器打开 http://localhost:1999 → F12 控制台 → 粘贴本文件全部内容回车。
 * 会自动跑一遍所有交互,最后用 console.table 输出 ✅/❌。
 * 覆盖的是历次提过的问题:点击进入 / 跨国跳转 / 退层 / 台湾属于中国 /
 * 钻取各层 / 印章返回 / 面包屑 / 年份连续 / 夜间切换 / 无中文 / 填色不溢出海 等。
 */
(async () => {
  const m = window._map;
  if (!m) return console.error("没找到地图,确认在 localhost:1999 且已加载");
  const sleep = (ms) => new Promise((f) => setTimeout(f, ms));
  const T = () => document.querySelector("#title small").textContent;
  const labels = () =>
    [...document.querySelectorAll(".port .lbl")].map((l) => l.textContent);
  const click = (t) => {
    const p = [...document.querySelectorAll(".port")].find(
      (p) => p.querySelector(".lbl")?.textContent === t,
    );
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
  const seal = () =>
    document
      .getElementById("seal")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const R = [];
  const ok = (name, cond) => R.push({ 测试: name, 结果: cond ? "✅" : "❌" });

  await sleep(4000);

  // —— 世界层 ——
  ok("世界层显示 13 个国家", labels().length === 13);
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
  ok(
    "年份带连续 2014–2026",
    [...document.querySelectorAll("#years button")]
      .map((b) => b.textContent)
      .join() ===
      "All,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026",
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
  ok("国界线图层存在(只画去过国家)", !!m.getLayer("border-line"));
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
    "点景点 → 故事卡(照片留白)",
    document.getElementById("card").classList.contains("show") &&
      /photo|journal/i.test(
        document.querySelector("#card .photo")?.textContent || "",
      ),
  );

  // —— 印章返回上一层 ——
  seal();
  await sleep(1600);
  ok("印章返回上一层", T() === "ZHEJIANG" || T() === "HANGZHOU");

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
  for (let i = 0; i < 5; i++) {
    seal();
    await sleep(150);
  }
  click("Canada");
  await sleep(1800);
  click("Alberta");
  await sleep(2400);
  ok("点单城市省(Alberta)停在省层不瞬退", T() === "ALBERTA");

  // —— 国家层省名标签不重叠(避让生效) ——
  for (let i = 0; i < 5; i++) {
    seal();
    await sleep(150);
  }
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
  for (let i = 0; i < 6; i++) {
    seal();
    await sleep(150);
  }
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

  console.table(R);
  const fail = R.filter((r) => r.结果 === "❌");
  console.log(
    fail.length
      ? `❌ ${fail.length}/${R.length} 项失败`
      : `✅ 全部 ${R.length} 项通过`,
  );
  window._testFP = { total: R.length, fail: fail.length, R };
})();
