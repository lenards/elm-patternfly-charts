module PF6.Charts.Colors exposing
    ( primary
    , blue100, blue200, blue300, blue400, blue500
    , green100, green200, green300, green400, green500
    , teal100, teal200, teal300, teal400, teal500
    , gold100, gold200, gold300, gold400, gold500
    , orange100, orange200, orange300, orange400, orange500
    , axisLine, gridLine, labelText, background
    , multiOrdered, multiUnordered
    , white, black
    )

{-| PatternFly v6 chart color tokens.

Hex values verified against `patternfly-react` test snapshots (light theme).
Use `multiOrdered` for categorical data (bars, pie slices) and `multiUnordered`
for time-series with multiple series (stacked area, multi-line).


# Primary / Blue Scale

@docs primary
@docs blue100, blue200, blue300, blue400, blue500


# Green Scale

@docs green100, green200, green300, green400, green500


# Teal Scale

@docs teal100, teal200, teal300, teal400, teal500


# Gold Scale

@docs gold100, gold200, gold300, gold400, gold500


# Orange Scale

@docs orange100, orange200, orange300, orange400, orange500


# Chart Structure

@docs axisLine, gridLine, labelText, background


# Multi-series Color Scales

@docs multiOrdered, multiUnordered


# Utility

@docs white, black

-}


-- Blue scale


{-| PF6 primary blue — `#0066cc`.
-}
primary : String
primary =
    "#0066cc"


{-| Blue 100 — `#92c5f9`. Lightest, used for tertiary fills.
-}
blue100 : String
blue100 =
    "#92c5f9"


{-| Blue 200 — `#4394e5`. Secondary series.
-}
blue200 : String
blue200 =
    "#4394e5"


{-| Blue 300 — `#0066cc`. Primary series / active states.
-}
blue300 : String
blue300 =
    "#0066cc"


{-| Blue 400 — `#004d99`. Dark series.
-}
blue400 : String
blue400 =
    "#004d99"


{-| Blue 500 — `#003366`. Darkest series.
-}
blue500 : String
blue500 =
    "#003366"



-- Green scale


{-| Green 100 — `#bde5b8`.
-}
green100 : String
green100 =
    "#bde5b8"


{-| Green 200 — `#7cc674`.
-}
green200 : String
green200 =
    "#7cc674"


{-| Green 300 — `#4cb140`.
-}
green300 : String
green300 =
    "#4cb140"


{-| Green 400 — `#38812f`.
-}
green400 : String
green400 =
    "#38812f"


{-| Green 500 — `#23511e`.
-}
green500 : String
green500 =
    "#23511e"



-- Teal scale


{-| Teal 100 — `#a2d9d9`.
-}
teal100 : String
teal100 =
    "#a2d9d9"


{-| Teal 200 — `#73c5c5`.
-}
teal200 : String
teal200 =
    "#73c5c5"


{-| Teal 300 — `#009596`.
-}
teal300 : String
teal300 =
    "#009596"


{-| Teal 400 — `#005f60`.
-}
teal400 : String
teal400 =
    "#005f60"


{-| Teal 500 — `#003737`.
-}
teal500 : String
teal500 =
    "#003737"



-- Gold scale


{-| Gold 100 — `#f9e0a2`.
-}
gold100 : String
gold100 =
    "#f9e0a2"


{-| Gold 200 — `#f6d173`.
-}
gold200 : String
gold200 =
    "#f6d173"


{-| Gold 300 — `#f4c145`.
-}
gold300 : String
gold300 =
    "#f4c145"


{-| Gold 400 — `#f0ab00`.
-}
gold400 : String
gold400 =
    "#f0ab00"


{-| Gold 500 — `#c58c00`.
-}
gold500 : String
gold500 =
    "#c58c00"



-- Orange scale


{-| Orange 100 — `#f4b678`.
-}
orange100 : String
orange100 =
    "#f4b678"


{-| Orange 200 — `#ef9234`.
-}
orange200 : String
orange200 =
    "#ef9234"


{-| Orange 300 — `#ec7a08`.
-}
orange300 : String
orange300 =
    "#ec7a08"


{-| Orange 400 — `#c46100`.
-}
orange400 : String
orange400 =
    "#c46100"


{-| Orange 500 — `#8f4700`.
-}
orange500 : String
orange500 =
    "#8f4700"



-- Chart structure


{-| Axis line and tick color — `#c7c7c7`.
-}
axisLine : String
axisLine =
    "#c7c7c7"


{-| Grid line color — `#c7c7c7`.
-}
gridLine : String
gridLine =
    "#c7c7c7"


{-| Tick label and legend text color — `#383838`.
-}
labelText : String
labelText =
    "#383838"


{-| Default chart background — `#ffffff`.
-}
background : String
background =
    "#ffffff"


{-| White — `#ffffff`.
-}
white : String
white =
    "#ffffff"


{-| Black — `#151515`.
-}
black : String
black =
    "#151515"



-- Multi-series scales


{-| Multi-ordered color scale for categorical data — cycles through blue,
green, teal, gold, orange for maximum categorical contrast.

    Bar.fromData categories values
        |> Bar.withColors Colors.multiOrdered
-}
multiOrdered : List String
multiOrdered =
    [ blue300
    , green300
    , teal300
    , gold400
    , orange300
    , blue500
    , green500
    , teal500
    , gold500
    , orange500
    ]


{-| Multi-unordered color scale for time-series data — keeps series visually
distinct across a full time axis (area charts, multi-line charts).
-}
multiUnordered : List String
multiUnordered =
    [ blue300
    , green300
    , gold400
    , teal300
    , orange300
    , blue100
    , green200
    , gold200
    , teal200
    , orange200
    ]
