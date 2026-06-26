# Sherry's Footprints

A small static site with two pages:

- **`index.html`** — a personal homepage (profile, experience, projects).
- **`footprints.html`** — an interactive, antique-chart–styled world map that drills down from world → country → state/province → city → place, tracing where Sherry (Ke) Shi has lived and traveled.

No build step. Plain HTML/CSS/JS, served as static files.

## Run locally

```bash
npm install      # installs live-server (dev dependency)
npm start        # serves at http://localhost:1999
```

Then open <http://localhost:1999/index.html> (homepage) or <http://localhost:1999/footprints.html> (map).

## Project structure

```
index.html          # homepage  (content comes from profile/data.js)
footprints.html     # the drill-down map (data comes from data/footprints.json)
profile/data.js     # homepage content: profile, experience, projects
data/footprints.json# all places: countries, regions, cities, coordinates, years
data/*.geojson      # Natural Earth basemap geometry (world / states / borders / lakes)
photos/             # photos, organized by country/region/place
audio/              # background music
tests/              # in-browser self-check scripts (see below)
DESIGN.md           # design rules for index.html
DESIGN-MAP.md       # design rules for footprints.html
```

The map renders with [MapLibre GL JS](https://maplibre.org/) (loaded from a pinned CDN with Subresource Integrity). Basemap geometry is bundled locally under `data/` so the map's borders don't depend on a tile server.

## Tests

Three self-check scripts live in `tests/`. They run **in the browser console**, not via a test runner:

1. Start the dev server (`npm start`) and open the relevant page.
2. Open DevTools → Console.
3. Paste the contents of the script and press Enter. Results print as a ✅/❌ table.

| Script                   | Page              | Checks                                            |
| ------------------------ | ----------------- | ------------------------------------------------- |
| `tests/design.js`        | `index.html`      | Homepage design-system rules (see `DESIGN.md`)    |
| `tests/design-map.js`    | `footprints.html` | Map UI / overlay rules (see `DESIGN-MAP.md`)      |
| `tests/regression.js`    | `footprints.html` | Map interactions: drill-down, breadcrumbs, zoom-out, year filter, day/night |

## Adding a place

All map data lives in `data/footprints.json` (the page reads it; no hard-coded coordinates):

- **City / place** — add it under the relevant country in `footprints.json`.
- **State / province** — add the region in `footprints.json` **and** add one boundary polygon to `data/states.geojson`.
- **Country** — add one country object in `footprints.json` (with `center`, `ne_names`, `iso_a3`, `regions`).

The `data/*.geojson` basemap files are Natural Earth geometry and are not edited by hand.

## Deploy

It's a static site, so any static host works (Vercel, Netlify, GitHub Pages). Hosts that gzip will compress the ~5 MB of basemap GeoJSON down to roughly 1 MB over the wire.
