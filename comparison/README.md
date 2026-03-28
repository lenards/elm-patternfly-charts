# PatternFly v6 Charts in Elm — Comparison Experiments

## Background

This directory contains two working experiments exploring whether Elm can
produce charts that match the look, feel, and design guidelines of
[PatternFly v6](https://www.patternfly.org/charts/about-charts/) — the
design system used by Red Hat projects like Cockpit, and the target system
for [Exosphere](https://gitlab.com/exosphere/exosphere), an OpenStack client
aimed at scientists and researchers.

The driving question: could an Elm frontend for Exosphere use one of these
libraries to render infrastructure dashboards (CPU, memory, network,
storage, quota) that feel native to PatternFly rather than bolted on?

## The Two Libraries

### `experiments-elm-charts/` — [terezka/elm-charts](https://www.elm-charts.org/)

A high-level, declarative charting library. The API mirrors HTML elements
and attributes — familiar territory for anyone coming from React/Victory.
Axes, grid lines, and layout are handled automatically.

**Charts implemented:**
- Area chart — CPU utilization over time (monotone interpolation, area fill)
- Bar chart — memory usage by host, grouped bars with rounded tops
- Stacked area — per-project bandwidth using multi-unordered color scale

**Constraint:** Cartesian charts only — no pie or donut support.

### `experiments-elm-viz/` — [gampleman/elm-visualization](https://github.com/gampleman/elm-visualization)

A low-level library of D3-style primitives: `Scale`, `Shape`, `Axis`,
`Histogram`, `Force`, etc. You compose every SVG element manually. More
boilerplate, complete control.

**Charts implemented:**
- Area chart — inbound/outbound network throughput (`Scale.linear` + `Shape.area`)
- Bar chart — instance count by region (`Scale.band` + manual `rect` elements)
- Donut chart — vCPU allocation (`Shape.pie` + `Shape.arc`, hollow center with
  central metric text — a core PatternFly donut pattern)

## PatternFly v6 Design Tokens

Both experiments share a `PF/Colors.elm` module with hex values verified
against `patternfly-react` test snapshots (light theme):

| Token | Value | Used for |
|---|---|---|
| Blue 300 (primary) | `#0066cc` | Primary series, active states |
| Blue 200 | `#4394e5` | Secondary series |
| Blue 100 | `#92c5f9` | Tertiary / light fills |
| Blue 400 | `#004d99` | Dark series |
| Blue 500 | `#003366` | Darkest series |
| Axis / grid lines | `#c7c7c7` | All axis lines, ticks, grid |
| Label text | `#383838` | Tick labels, legend text |
| Font | Red Hat Text | All chart text |

Multi-ordered color scale (bar, donut, pie) cycles through blue → green →
teal → gold → orange for maximum categorical contrast. Multi-unordered
(area, line) keeps series visually distinct across the full time axis.

## Running Locally

```bash
# Install dependencies (first time only)
npm install

# Build Elm — must be run from each experiment subdirectory
cd experiments-elm-charts && elm make src/Main.elm --output=elm-charts.js
cd experiments-elm-viz    && elm make src/Main.elm --output=elm-viz.js

# Serve and open
npm run serve
# then open http://localhost:8080/
```

Individual experiments:
- `http://localhost:8080/experiments-elm-charts/index.html`
- `http://localhost:8080/experiments-elm-viz/index.html`

Note: use the full path including `index.html` to avoid a browser base-URL
quirk where relative script paths resolve incorrectly without a trailing slash.

## Visual Comparison Tests (Playwright)

```bash
# Capture baseline screenshots from live patternfly.org + run smoke tests
npx playwright test --update-snapshots

# Run tests against existing baselines
npx playwright test
```

Reference screenshots from `www.patternfly.org` are stored in
`tests/visual-comparison.spec.ts-snapshots/` for side-by-side comparison.

## Key Findings

**elm-charts** is the right tool for Cartesian charts (area, bar, line,
sparkline) where speed of implementation matters. Very little boilerplate.

**elm-visualization** is necessary for any non-Cartesian chart (donut, pie,
histogram) and gives complete control when a chart needs custom behaviour.
The tradeoff is roughly 2–3× more code per chart.

**Both libraries can match PatternFly v6 design guidelines.** Color tokens,
font, axis styling, and grid lines all apply cleanly. The main limitation is
that PF's Sankey chart uses Apache ECharts under the hood — there is no
elm-visualization equivalent.

A practical Exosphere implementation would use both libraries with a shared
`PF.Colors` and `PF.Theme` module providing consistent tokens, and wrap the
most common chart shapes into reusable Elm modules.
