module PF6.Charts.Theme exposing
    ( Theme, Mode(..)
    , light, dark, fromMode
    , primaryColor, seriesColor, axisColor, gridColor, labelColor, backgroundColor, fontFamily
    )

{-| Chart theme system for PF6 — light and dark modes.

Mirrors the pattern from `PF6.Theme` in elm-ui-patternfly, adapted for
chart-specific tokens (axis, grid, series colors).


# Types

@docs Theme, Mode


# Constructors

@docs light, dark, fromMode


# Accessors

@docs primaryColor, seriesColor, axisColor, gridColor, labelColor, backgroundColor, fontFamily

-}

import PF6.Charts.Colors as Colors


{-| An opaque type holding all color tokens for chart rendering.
-}
type Theme
    = Theme Config


{-| The visual mode — `Light` or `Dark`.
-}
type Mode
    = Light
    | Dark


type alias Config =
    { primary : String
    , series : List String
    , axis : String
    , grid : String
    , label : String
    , background : String
    , fontFamily : String
    }



-- CONSTRUCTORS


{-| PF6 light mode chart theme.
-}
light : Theme
light =
    Theme
        { primary = Colors.primary
        , series = Colors.multiOrdered
        , axis = Colors.axisLine
        , grid = Colors.gridLine
        , label = Colors.labelText
        , background = Colors.background
        , fontFamily = "Red Hat Text, RedHatText, sans-serif"
        }


{-| PF6 dark mode chart theme. Uses lighter colors on dark backgrounds.
-}
dark : Theme
dark =
    Theme
        { primary = "#73bcf7"
        , series =
            [ "#73bcf7"
            , "#7cc674"
            , "#009596"
            , "#f0ab00"
            , "#ef9234"
            , "#4394e5"
            , "#4cb140"
            , "#005f60"
            , "#c58c00"
            , "#c46100"
            ]
        , axis = "#4a4a4a"
        , grid = "#3a3a3a"
        , label = "#e0e0e0"
        , background = "#212427"
        , fontFamily = "Red Hat Text, RedHatText, sans-serif"
        }


{-| Derive a theme from a `Mode` value.

    fromMode Light == light
    fromMode Dark  == dark

-}
fromMode : Mode -> Theme
fromMode mode =
    case mode of
        Light ->
            light

        Dark ->
            dark



-- ACCESSORS


{-| The primary series color for single-series charts.
-}
primaryColor : Theme -> String
primaryColor (Theme c) =
    c.primary


{-| All series colors as an ordered list. Use index into this list to color
each series in multi-series charts. Falls back to primary if index is out of range.
-}
seriesColor : Int -> Theme -> String
seriesColor idx (Theme c) =
    c.series
        |> List.drop idx
        |> List.head
        |> Maybe.withDefault c.primary


{-| Axis line and tick mark color.
-}
axisColor : Theme -> String
axisColor (Theme c) =
    c.axis


{-| Grid line color.
-}
gridColor : Theme -> String
gridColor (Theme c) =
    c.grid


{-| Tick label and legend text color.
-}
labelColor : Theme -> String
labelColor (Theme c) =
    c.label


{-| Chart background color.
-}
backgroundColor : Theme -> String
backgroundColor (Theme c) =
    c.background


{-| Font family string for chart text (tick labels, legends, annotations).
-}
fontFamily : Theme -> String
fontFamily (Theme c) =
    c.fontFamily
