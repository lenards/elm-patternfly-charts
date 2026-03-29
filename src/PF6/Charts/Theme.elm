module PF6.Charts.Theme exposing
    ( Theme, Mode(..)
    , light, dark, fromMode
    , UiThemeColors, fromUiThemeColors
    , primaryColor, seriesColor, axisColor, gridColor, labelColor, backgroundColor, fontFamily
    )

{-| Chart theme system for PF6 — light and dark modes.

Mirrors the pattern from `PF6.Theme` in elm-ui-patternfly, adapted for
chart-specific tokens (axis, grid, series colors).


# Types

@docs Theme, Mode


# Constructors

@docs light, dark, fromMode


# Bridging from a UI theme library

`PF6.Charts` intentionally has no dependency on `mdgriffith/elm-ui` or any
specific UI theme library. If you are already using `lenards/elm-ui-patternfly`
(or a future `elm-patternfly` built on `elm/html`), use `UiThemeColors` and
`fromUiThemeColors` to bridge your theme into chart tokens.

@docs UiThemeColors, fromUiThemeColors

**Example — bridging from `lenards/elm-ui-patternfly`:**

```elm
import Element exposing (toRgb)
import PF6.Theme as UiTheme
import PF6.Charts.Theme as ChartTheme

{-| Convert an elm-ui Color to a 6-digit hex string.
    Requires rtfeldman/elm-hex or a similar hex-encoding package.
-}
colorToHex : Element.Color -> String
colorToHex color =
    let
        { red, green, blue } =
            Element.toRgb color

        byte n =
            String.padLeft 2 '0' (Hex.toString (round (n * 255)))
    in
    "#" ++ byte red ++ byte green ++ byte blue

{-| Derive chart tokens from a PF6 UI theme.
-}
chartTheme : UiTheme.Theme -> ChartTheme.Theme
chartTheme uiTheme =
    ChartTheme.fromUiThemeColors
        { primary = colorToHex (UiTheme.primary uiTheme)
        , labelText = colorToHex (UiTheme.text uiTheme)
        , background = colorToHex (UiTheme.backgroundDefault uiTheme)
        , borderDefault = colorToHex (UiTheme.borderDefault uiTheme)
        }
```

The same pattern will work for a future `elm-patternfly` library built on
`elm/html` — just swap the `colorToHex` helper for whatever color type that
library exposes.


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



-- BRIDGE FROM UI THEME


{-| A plain record of hex color strings extracted from a UI theme library.

Pass this to `fromUiThemeColors` to get a `Theme` without requiring any
dependency on `mdgriffith/elm-ui` or `lenards/elm-ui-patternfly`.

All fields are 6-digit hex strings, e.g. `"#0066cc"`.

-}
type alias UiThemeColors =
    { primary : String
    , labelText : String
    , background : String
    , borderDefault : String
    }


{-| Build a chart `Theme` from a `UiThemeColors` record.

The chart `series` color scale defaults to `Colors.multiOrdered` with `primary`
as the first color. Axis and grid lines use `borderDefault`. Label text uses
`labelText`. See the module doc for a full bridging example.

-}
fromUiThemeColors : UiThemeColors -> Theme
fromUiThemeColors c =
    Theme
        { primary = c.primary
        , series = c.primary :: List.drop 1 Colors.multiOrdered
        , axis = c.borderDefault
        , grid = c.borderDefault
        , label = c.labelText
        , background = c.background
        , fontFamily = "Red Hat Text, RedHatText, sans-serif"
        }



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
