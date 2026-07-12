#!/usr/bin/env python3
"""Web-image manifest + thumbnail builder.

Scans landmark web images in photos/ (landmark_name_1/2/3.jpg) and matches them
against source:web entries in data/footprints.json by "normalized name"
(accent folding, & -> and, apostrophe removal, centre/center, etc.),
generates thumbnails into photos/_thumbs/ with sips (longest side 1200px, originals untouched),
and writes data/webimages.json: { "country|region|place": ["photos/_thumbs/....jpg", ...] }.
Idempotent: existing thumbnails are skipped. Usage: python3 scripts/build-webimages.py
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
MAX_PX = "800"  # cards render at ~260px; 800 covers 3x screens; smaller files leave headroom for future hosting

# Manual mapping for letters NFD normalization cannot fold
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
    sq = snake(name).replace("_", "")  # reverse of the word-split mismatch: data name has underscores, filename doesn't
    if sq not in v:
        v.append(sq)
    return v


def dir_index(reldir: str):
    """Group files in a directory by stem (with the _N suffix stripped): stem -> [relative paths, sorted by _N].
    Also aliases each stem with its underscore-free form (word-split mismatches like zhang_jia_jie ≙ zhangjiajie)."""
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
    # (Re)generate when missing or when the original is newer than the thumbnail
    if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        r = subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80",
             "-Z", MAX_PX, src, "--out", dst],
            capture_output=True, text=True)
        if r.returncode != 0:
            print(f"  !! sips failed {rel}: {r.stderr.strip()}", file=sys.stderr)
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
                # Try country/region/ first, then country/ (flat countries have no region subdirectory)
                reldirs = ([os.path.join(cdir, snake(rname))] if rname else []) + [cdir]
                # The city/landmark entry itself (photo cities like Zhangjiajie also participate in matching),
                # plus named spots within photo cities (e.g. Juzizhou in Changsha)
                names = [ct["name"]] + [
                    s["spot"] for s in ct.get("spots") or [] if (s.get("spot") or "").strip()
                ]
                for i, name in enumerate(names):
                    files = find_files(reldirs, name)
                    if not files:
                        # Only report missing images for web entries (photo cities/spots without web images are intentionally blank)
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
    print(f"Matched {matched} landmarks / {thumbed} thumbnails -> {os.path.relpath(OUT, ROOT)}")
    if missing:
        print(f"{len(missing)} with no images found (in the data but not in photos/):")
        for m in missing:
            print("  -", m)


if __name__ == "__main__":
    main()
