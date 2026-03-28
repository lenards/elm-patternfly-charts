module PF.Colors exposing
    ( -- Blue scale (confirmed from patternfly-react test snapshots)
      blue100
    , blue200
    , blue300
    , blue400
    , blue500
      -- Multi-ordered: bar, donut, pie (highest contrast across categories)
    , multiOrdered
      -- Multi-unordered: area, line, sparkline (trends over time)
    , multiUnordered
      -- Semantic shorthand
    , primary
      -- UI chrome
    , axisLine
    , gridLine
    , labelText
    , background
    )

{-| PatternFly v6 chart color tokens.

Hex values verified against patternfly-react test snapshots and the
@patternfly/patternfly design token palette (light theme, default).

See: https://www.patternfly.org/charts/colors-for-charts/
-}


-- Blue scale — single-color themed charts

blue100 : String
blue100 =
    "#92c5f9"


blue200 : String
blue200 =
    "#4394e5"


blue300 : String
blue300 =
    "#0066cc"


blue400 : String
blue400 =
    "#004d99"


blue500 : String
blue500 =
    "#003366"


{-| The primary blue used in single-series charts (blue300). -}
primary : String
primary =
    blue300


{-| Multi-ordered color scale for categorical charts (bar, donut, pie).
Cycles through blue → green → teal → gold → orange with
deliberate contrast ordering for adjacent slices/bars.
-}
multiOrdered : List String
multiOrdered =
    [ "#0066cc" -- blue-300
    , "#63993d" -- green-300
    , "#37a3a3" -- teal-300
    , "#dca614" -- gold-300
    , "#f5921b" -- orange-300
    , "#4394e5" -- blue-200
    , "#87bb62" -- green-200
    , "#63bdbd" -- teal-200
    , "#ffcc17" -- gold-200
    , "#f8ae54" -- orange-200
    ]


{-| Multi-unordered color scale for trend charts (area, line, sparkline).
Each series should be visually distinct across the full time axis.
-}
multiUnordered : List String
multiUnordered =
    [ "#0066cc" -- blue-300 (primary)
    , "#63993d" -- green-300
    , "#37a3a3" -- teal-300
    , "#dca614" -- gold-300
    , "#f5921b" -- orange-300
    ]


{-| Axis lines, tick marks, and grid lines. -}
axisLine : String
axisLine =
    "#c7c7c7"


{-| Horizontal grid lines (same value as axisLine per PF v6 spec). -}
gridLine : String
gridLine =
    "#c7c7c7"


{-| Axis tick labels and chart text. -}
labelText : String
labelText =
    "#383838"


{-| Chart background (transparent in PF, white as fallback). -}
background : String
background =
    "#ffffff"
