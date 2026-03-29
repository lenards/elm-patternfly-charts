# elm-patternfly-charts

PatternFly v6 chart components for Elm, built on
[gampleman/elm-visualization](https://package.elm-lang.org/packages/gampleman/elm-visualization/latest/).

**Live gallery:** https://lenards.github.io/elm-patternfly-charts/

## Chart types

| Module | Chart |
|--------|-------|
| `PF6.Charts.Area` | Area chart — filled line for continuous metrics |
| `PF6.Charts.Bar` | Bar chart — grouped or single-series vertical bars |
| `PF6.Charts.BoxPlot` | Box plot — statistical distribution per category |
| `PF6.Charts.Bullet` | Bullet chart — measure vs. range + target marker |
| `PF6.Charts.Donut` | Donut chart — ring with center metric label |
| `PF6.Charts.DonutUtilization` | Donut utilization — single-metric with warning/danger thresholds |
| `PF6.Charts.Line` | Line chart — multi-series continuous data |
| `PF6.Charts.Pie` | Pie chart — solid slices for part-to-whole |
| `PF6.Charts.Scatter` | Scatter chart — multi-series 2D point cloud |
| `PF6.Charts.Sparkline` | Sparkline — miniature inline trend line |
| `PF6.Charts.Stack` | Stacked area chart — cumulative series |
| `PF6.Charts.Threshold` | Threshold chart — line chart with warning/danger lines |
| `PF6.Charts.Skeleton` | Skeleton placeholders for loading states |

## Quick start

```elm
import PF6.Charts.Area as Area

view : Html msg
view =
    Area.fromData
        [ ( 0, 42 ), ( 1, 55 ), ( 2, 48 ), ( 3, 72 ), ( 4, 63 ) ]
        |> Area.withWidth 500
        |> Area.withXLabel "Time (min)"
        |> Area.withYLabel "CPU %"
        |> Area.withTitle "CPU Utilization"
        |> Area.withTooltips True
        |> Area.toSvg
```

All charts follow the same builder pattern: `fromData |> withX |> toSvg`.

## Features

- **PF6 color tokens** — `PF6.Charts.Colors` exposes the full PatternFly v6 color scale
- **Light / dark themes** — `PF6.Charts.Theme` with `Theme.light` and `Theme.dark`
- **Custom themes** — `Theme.fromUiThemeColors` accepts a plain record of hex strings,
  no dependency on any UI library
- **Loading skeletons** — every chart has `withLoading : Bool` that swaps in a shimmer
  placeholder while data is fetching
- **SVG tooltips** — `withTooltips True` on Area, Bar, Donut, Pie, and Scatter adds
  browser-native `<title>` hover text, zero state required
- **Responsive** — all charts accept `withWidth`/`withHeight`; pair with a
  `ResizeObserver` port in your app (see the gallery's "Resize Observer" panel)

## Bridging from an existing theme

If your app already uses a UI theme library you can extract its colors into a
plain record and pass it to `Theme.fromUiThemeColors` without adding a
dependency on that library here:

```elm
import PF6.Charts.Theme as ChartTheme

-- Convert your UI theme colors to hex strings however your library supports,
-- then build a ChartTheme:
myChartTheme : ChartTheme.Theme
myChartTheme =
    ChartTheme.fromUiThemeColors
        { primary      = "#0066cc"
        , labelText    = "#151515"
        , background   = "#ffffff"
        , borderDefault = "#d2d2d2"
        }
```

## Running the gallery locally

```bash
cd demo
elm make src/Main.elm --output main.js
# then open index.html in a browser, or:
npx serve .
```

## Repository layout

```
elm-patternfly-charts/
├── src/PF6/Charts/   ← library source
├── demo/             ← gallery application
│   ├── src/Main.elm
│   └── index.html
└── docs/             ← GitHub Pages output (compiled demo)
    ├── index.html
    └── main.js
```

To rebuild `docs/main.js` after changes:

```bash
cd demo
elm make src/Main.elm --optimize --output ../docs/main.js
```
