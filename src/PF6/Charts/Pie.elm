module PF6.Charts.Pie exposing
    ( PieChart, Slice
    , fromData
    , withSize
    , withTheme
    , withColors
    , withTitle
    , withLoading
    , withTooltips
    , toSvg
    )

{-| Pie chart — full circular slices for part-to-whole relationships.

Similar to `Donut` but with no hollow center. Use `Donut` when you need to
display a summary metric in the center.


# Types

@docs PieChart, Slice


# Constructor

@docs fromData


# Modifiers

@docs withSize
@docs withTheme
@docs withColors
@docs withTitle
@docs withLoading
@docs withTooltips


# Renderer

@docs toSvg

-}

import Html exposing (Html)
import Html.Attributes as HA
import Path
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Shape exposing (Arc)
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| An opaque pie chart configuration.
-}
type PieChart
    = PieChart Config


{-| A single slice in a pie chart, identified by a label and a numeric value.

    { label = "US East", value = 35 }

-}
type alias Slice =
    { label : String
    , value : Float
    }


type alias Config =
    { size : Int
    , data : List Slice
    , colors : List String
    , title : String
    , theme : Theme
    , loading : Bool
    , tooltips : Bool
    }


defaultConfig : List Slice -> Config
defaultConfig data =
    { size = 230
    , data = data
    , colors = Colors.blueFamily
    , title = ""
    , theme = Theme.light
    , loading = False
    , tooltips = False
    }


{-| Create a pie chart from a list of slices.

    chart =
        Pie.fromData
            [ { label = "Running", value = 42 }
            , { label = "Stopped", value = 8 }
            , { label = "Pending", value = 5 }
            ]

-}
fromData : List Slice -> PieChart
fromData slices =
    PieChart (defaultConfig slices)


{-| Set the overall SVG size (width = height). Default: 230.
-}
withSize : Int -> PieChart -> PieChart
withSize s (PieChart cfg) =
    PieChart { cfg | size = s }


{-| Apply a `Theme`.
-}
withTheme : Theme -> PieChart -> PieChart
withTheme theme (PieChart cfg) =
    PieChart { cfg | theme = theme }


{-| Override the slice color list.
-}
withColors : List String -> PieChart -> PieChart
withColors colors (PieChart cfg) =
    PieChart { cfg | colors = colors }


{-| Set the chart title rendered below the pie.
-}
withTitle : String -> PieChart -> PieChart
withTitle t (PieChart cfg) =
    PieChart { cfg | title = t }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> PieChart -> PieChart
withLoading l (PieChart cfg) =
    PieChart { cfg | loading = l }


{-| Enable SVG `<title>` tooltips on each slice. Default: `False`.

When enabled, hovering over a slice shows a browser-native tooltip with the
label, value, and percentage (e.g. `"Running: 42 (76%)"`). No ports required.

-}
withTooltips : Bool -> PieChart -> PieChart
withTooltips t (PieChart cfg) =
    PieChart { cfg | tooltips = t }


{-| Render to `Html msg`.
-}
toSvg : PieChart -> Html msg
toSvg (PieChart cfg) =
    if cfg.loading then
        Skeleton.viewPie cfg.size

    else
    let
        svgSize =
            cfg.size

        titleHeight =
            if cfg.title /= "" then
                30
            else
                0

        totalHeight =
            svgSize + titleHeight

        cx =
            toFloat svgSize / 2

        cy =
            toFloat svgSize / 2

        outerRadius =
            toFloat svgSize / 2 - 10

        values =
            List.map .value cfg.data

        pieArcs : List Arc
        pieArcs =
            Shape.pie
                { startAngle = 0
                , endAngle = 2 * pi
                , padAngle = 0.02
                , sortingFn = \_ _ -> EQ
                , valueFn = identity
                , innerRadius = 0
                , outerRadius = outerRadius
                , cornerRadius = 2
                , padRadius = 0
                }
                values

        seriesColors =
            cfg.colors ++ List.repeat 20 Colors.primary

        labelColor =
            Theme.labelColor cfg.theme

        font =
            Theme.fontFamily cfg.theme

        totalVal =
            List.sum (List.map .value cfg.data)

        slices =
            List.indexedMap
                (\idx arc ->
                    let
                        color =
                            List.drop idx seriesColors
                                |> List.head
                                |> Maybe.withDefault Colors.primary

                        slice =
                            List.drop idx cfg.data
                                |> List.head
                                |> Maybe.withDefault { label = "", value = 0 }

                        pct =
                            if totalVal > 0 then
                                round (slice.value / totalVal * 100)

                            else
                                0

                        arcPath =
                            Path.element
                                (Shape.arc
                                    { innerRadius = 0
                                    , outerRadius = outerRadius
                                    , cornerRadius = 2
                                    , startAngle = arc.startAngle
                                    , endAngle = arc.endAngle
                                    , padAngle = arc.padAngle
                                    , padRadius = 0
                                    }
                                )
                                [ SA.fill color
                                , SA.stroke Colors.white
                                , SA.strokeWidth "2"
                                , SA.transform
                                    ("translate("
                                        ++ String.fromFloat cx
                                        ++ ","
                                        ++ String.fromFloat cy
                                        ++ ")"
                                    )
                                ]
                    in
                    if cfg.tooltips then
                        Svg.g []
                            [ arcPath
                            , Svg.node "title"
                                []
                                [ Svg.text
                                    (slice.label
                                        ++ ": "
                                        ++ String.fromFloat slice.value
                                        ++ " ("
                                        ++ String.fromInt pct
                                        ++ "%)"
                                    )
                                ]
                            ]

                    else
                        arcPath
                )
                pieArcs
    in
    Html.div
        [ HA.style "display" "inline-block"
        , HA.style "font-family" font
        ]
        [ Svg.svg
            [ SA.width (String.fromInt totalHeight)
            , SA.height (String.fromInt totalHeight)
            , SA.viewBox
                ("0 0 "
                    ++ String.fromInt totalHeight
                    ++ " "
                    ++ String.fromInt totalHeight
                )
            , SA.style ("font-family: " ++ font ++ "; font-size: 12px;")
            ]
            (slices
                ++ [ if cfg.title /= "" then
                        Svg.text_
                            [ SA.x (String.fromFloat cx)
                            , SA.y (String.fromInt (svgSize + 20))
                            , SA.textAnchor "middle"
                            , SA.fontSize "13"
                            , SA.fill labelColor
                            ]
                            [ Svg.text cfg.title ]

                     else
                        Svg.text ""
                   ]
            )
        ]
