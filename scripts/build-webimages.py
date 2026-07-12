#!/usr/bin/env python3
"""网图清单 + 缩略图构建。

扫 photos/ 里的景点网图(景点名_1/2/3.jpg),和 data/footprints.json 里
source:web 的条目按"规范化名字"匹配(重音折叠、&→and、撇号删除、centre/center 等),
用 sips 生成 photos/_thumbs/ 缩略图(最长边 1200px,原图不动),
输出 data/webimages.json: { "国家|省|地名": ["photos/_thumbs/....jpg", ...] }。
幂等:缩略图已存在则跳过。用法: python3 scripts/build-webimages.py
"""

import json
import os
import re
import subprocess
import sys
import unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS = os.path.join(ROOT, "photos")
THUMBS = os.path.join(PHOTOS, "_thumbs")
OUT = os.path.join(ROOT, "data", "webimages.json")
MAX_PX = "800"  # 卡片图实显约 260px,800 覆盖 3x 屏;压体积为将来托管留余地

# NFD 折不掉的字母手动映射
CHAR_MAP = {"ø": "o", "æ": "ae", "ß": "ss", "đ": "d", "ł": "l"}


def snake(name: str) -> str:
    s = name.lower()
    s = s.replace("9/11", "nine eleven")
    s = s.replace("&", " and ")
    s = s.replace("'", "").replace("’", "")
    s = unicodedata.normalize("NFD", s)
    s = "".join(CHAR_MAP.get(ch, ch) for ch in s if not unicodedata.combining(ch))
    return re.sub(r"[^a-z0-9]+", "_", s).strip("_")


def variants(name: str):
    v = [snake(name)]
    for a, b in (("centre", "center"), ("center", "centre")):
        w = snake(name.lower().replace(a, b))
        if w not in v:
            v.append(w)
    sq = snake(name).replace("_", "")  # 拆词差异反向:数据名带下划线、文件名不带
    if sq not in v:
        v.append(sq)
    return v


def dir_index(reldir: str):
    """目录下文件按去掉 _N 后缀的词干分组: stem -> [相对路径(按 _N 排序)]。
    同时给"去下划线"的词干建别名(zhang_jia_jie ≙ zhangjiajie 这类拆词差异)。"""
    absdir = os.path.join(PHOTOS, reldir) if reldir else PHOTOS
    idx = {}
    if not os.path.isdir(absdir):
        return idx
    for f in sorted(os.listdir(absdir)):
        m = re.match(r"(.+)_(\d+)\.jpe?g$", f, re.I)
        if not m:
            continue
        idx.setdefault(m.group(1), []).append(os.path.join(reldir, f))
    for stem in list(idx):
        alias = stem.replace("_", "")
        if alias != stem and alias not in idx:
            idx[alias] = idx[stem]
    return idx


def make_thumb(rel: str) -> str:
    src = os.path.join(PHOTOS, rel)
    dst = os.path.join(THUMBS, rel)
    # 缺失或原图比缩略图新时(重)生成
    if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        r = subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80",
             "-Z", MAX_PX, src, "--out", dst],
            capture_output=True, text=True)
        if r.returncode != 0:
            print(f"  !! sips 失败 {rel}: {r.stderr.strip()}", file=sys.stderr)
            return ""
    return "photos/_thumbs/" + rel.replace(os.sep, "/")


def main():
    data = json.load(open(os.path.join(ROOT, "data", "footprints.json")))
    out, matched, missing, thumbed = {}, 0, [], 0
    idx_cache = {}

    def find_files(reldirs, name):
        for rd in reldirs:
            if rd not in idx_cache:
                idx_cache[rd] = dir_index(rd)
            for v in variants(name):
                if v in idx_cache[rd]:
                    return idx_cache[rd][v]
        return None

    for c in data["countries"]:
        cdir = snake(c["name"])
        for r in c.get("regions", []):
            rname = r.get("name") or ""
            for ct in r["cities"]:
                # 先试 国家/省/ 再试 国家/ (扁平国家没有省子目录)
                reldirs = ([os.path.join(cdir, snake(rname))] if rname else []) + [cdir]
                # 城市/景点条目本身(photo 城市如 Zhangjiajie 也参与匹配),
                # 加上照片城市里的命名 spot(如 Changsha 的 Juzizhou)
                names = [ct["name"]] + [
                    s["spot"] for s in ct.get("spots") or [] if (s.get("spot") or "").strip()
                ]
                for i, name in enumerate(names):
                    files = find_files(reldirs, name)
                    if not files:
                        # 只报 web 条目的缺图(photo 城市/spot 没配网图属正常留白)
                        if i == 0 and ct.get("source") == "web":
                            missing.append(f"{c['name']} | {rname} | {ct['name']}")
                        continue
                    key = f"{c['name']}|{rname}|{name}"
                    if key in out:
                        continue
                    thumbs = [t for t in (make_thumb(f) for f in files) if t]
                    if thumbs:
                        out[key] = thumbs
                        matched += 1
                        thumbed += len(thumbs)
    json.dump(out, open(OUT, "w"), ensure_ascii=False, indent=1)
    print(f"匹配 {matched} 个景点 / {thumbed} 张缩略图 -> {os.path.relpath(OUT, ROOT)}")
    if missing:
        print(f"没找到图的 {len(missing)} 个(数据里有、photos/ 里没有):")
        for m in missing:
            print("  -", m)


if __name__ == "__main__":
    main()
