module PF6.Charts.Scatter exposing
    ( ScatterChart, Series
    , fromSeries, fromData
    , withWidth, withHeight
    , withTheme
    , withXLabel, withYLabel
    , withTitle
    , withPointRadius
    , withLoading
    , withTooltips
    , toSvg
    )

{-| Scatter chart — discrete data points on a 2D Cartesian plane.

Supports multiple series with automatic color assignment.


# Types

@docs ScatterChart, Series


# Constructors

@docs fromSeries, fromData


# Modifiers

@docs withWidth, withHeight
@docs withTheme
@docs withXLabel, withYLabel
@docs withTitle
@docs withPointRadius
@docs withLoading
@docs withTooltips


# Renderer

@docs toSvg

-}

import Axis
import Html exposing (Html)
import Html.Attributes as HA
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (ContinuousScale)
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| A named series of `(x, y)` scatter points.
-}
type alias Series =
    { label : String
    , data : List ( Float, Float )
    }


{-| An opaque scatter chart configuration.
-}
type ScatterChart
    = ScatterChart Config


type alias Config =
    { width : Int
    , height : Int
    , series : List Series
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , pointRadius : Float
    , loading : Bool
    , tooltips : Bool
    }


defaultConfig : List Series -> Config
defaultConfig series =
    { width = 500
    , height = 300
    , series = series
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , pointRadius = 5
    , loading = False
    , tooltips = False
    }


{-| Create a scatter chart from multiple named series.
-}
fromSeries : List Series -> ScatterChart
fromSeries series =
    ScatterChart (defaultConfig series)


{-| Create a single-series scatter chart from `(x, y)` pairs.
-}
fromData : List ( Float, Float ) -> ScatterChart
fromData data =
    fromSeries [ { label = "", data = data } ]


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> ScatterChart -> ScatterChart
withWidth w (ScatterChart cfg) =
    ScatterChart { cfg | width = w }


{-| Set chart height in pixels. Default: 300.
-}
withHeight : Int -> ScatterChart -> ScatterChart
withHeight h (ScatterChart cfg) =
    ScatterChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> ScatterChart -> ScatterChart
withTheme theme (ScatterChart cfg) =
    ScatterChart { cfg | theme = theme }


{-| Set the x-axis label.
-}
withXLabel : String -> ScatterChart -> ScatterChart
withXLabel label (ScatterChart cfg) =
    ScatterChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> ScatterChart -> ScatterChart
withYLabel label (ScatterChart cfg) =
    ScatterChart { cfg | yLabel = label }


{-| Set the chart title.
-}
withTitle : String -> ScatterChart -> ScatterChart
withTitle t (ScatterChart cfg) =
    ScatterChart { cfg | title = t }


{-| Set the radius of scatter points in pixels. Default: 5.
-}
withPointRadius : Float -> ScatterChart -> ScatterChart
withPointRadius r (ScatterChart cfg) =
    ScatterChart { cfg | pointRadius = r }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> ScatterChart -> ScatterChart
withLoading l (ScatterChart cfg) =
    ScatterChart { cfg | loading = l }


{-| Enable SVG `<title>` tooltips on each point. Default: `False`.

When enabled, hovering over a scatter point shows a browser-native tooltip
with the x and y coordinates (e.g. `"(3.5, 72.0)"`). No ports or state required.

-}
withTooltips : Bool -> ScatterChart -> ScatterChart
withTooltips t (ScatterChart cfg) =
    ScatterChart { cfg | tooltips = t }


{-| Render to `Html msg`.
-}
toSvg : ScatterChart -> Html msg
toSvg (ScatterChart cfg) =
    if cfg.loading then
        Skeleton.view cfg.width cfg.height

    else
    let
        padTop =
            if cfg.title /= "" then
                40
            else
                20

        padRight =
            30

        hasLegend =
            List.length cfg.series > 1

        padBottom =
            if cfg.xLabel /= "" && hasLegend then
                75
            else if cfg.xLabel /= "" then
                55
            else if hasLegend then
                50
            else
                40

        padLeft =
            if cfg.yLabel /= "" then
                65
            else
                50

        innerW =
            cfg.width - padLeft - padRight

        innerH =
            cfg.height - padTop - padBottom

        allPoints =
            List.concatMap .data cfg.series

        xs =
            List.map Tuple.first allPoints

        ys =
            List.map Tuple.second allPoints

        xMin =
            Maybe.withDefault 0 (List.minimum xs)

        xMax =
            Maybe.withDefault 1 (List.maximum xs)

        yMin =
            Maybe.withDefault 0 (List.minimum ys)

        yMax =
            Maybe.withDefault 1 (List.maximum ys)

        xPad =
            (xMax - xMin) * 0.05

        yPad =
            (yMax - yMin) * 0.1

        xScale : ContinuousScale Float
        xScale =
            Scale.linear ( 0, toFloat innerW ) ( xMin - xPad, xMax + xPad )

        yScale : ContinuousScale Float
        yScale =
            Scale.linear ( toFloat innerH, 0 ) ( yMin - yPad, yMax + yPad )

        labelColor =
            Theme.labelColor cfg.theme

        gridColor =
            Theme.gridColor cfg.theme

        font =
            Theme.fontFamily cfg.theme

        gridLines =
            Scale.ticks yScale 5
                |> List.map
                    (\tick ->
                        let
                            y =
                                Scale.convert yScale tick
                        in
                        Svg.line
                            [ SA.x1 "0"
                            , SA.x2 (String.fromInt innerW)
                            , SA.y1 (String.fromFloat y)
                            , SA.y2 (String.fromFloat y)
                            , SA.stroke gridColor
                            , SA.strokeWidth "1"
                            , SA.strokeDasharray "4,4"
                            ]
                            []
                    )

        points =
            List.concatMap
                (\( idx, series ) ->
                    let
                        color =
                            Theme.seriesColor idx cfg.theme
                    in
                    List.map
                        (\( x, y ) ->
                            Svg.circle
                                [ SA.cx (String.fromFloat (Scale.convert xScale x))
                                , SA.cy (String.fromFloat (Scale.convert yScale y))
                                , SA.r (String.fromFloat cfg.pointRadius)
                                , SA.fill color
                                , SA.opacity "0.8"
                                ]
                                (if cfg.tooltips then
                                    [ Svg.node "title"
                                        []
                                        [ Svg.text
                                            ("("
                                                ++ String.fromFloat x
                                                ++ ", "
                                                ++ String.fromFloat y
                                                ++ ")"
                                            )
                                        ]
                                    ]

                                 else
                                    []
                                )
                        )
                        series.data
                )
                (List.indexedMap Tuple.pair cfg.series)

        legendItems =
            if List.length cfg.series > 1 then
                List.indexedMap
                    (\idx series ->
                        let
                            color =
                                Theme.seriesColor idx cfg.theme

                            xOff =
                                idx * 110
                        in
                        Svg.g
                            [ SA.transform ("translate(" ++ String.fromInt xOff ++ ",0)") ]
                            [ Svg.circle
                                [ SA.cx "6"
                                , SA.cy "6"
                                , SA.r "5"
                                , SA.fill color
                                ]
                                []
                            , Svg.text_
                                [ SA.x "14"
                                , SA.y "10"
                                , SA.fontSize "11"
                                , SA.fill labelColor
                                ]
                                [ Svg.text series.label ]
                            ]
                    )
                    cfg.series

            else
                []

        legendX =
            padLeft + max 0 (innerW // 2 - List.length cfg.series * 55)
    in
    Html.div
        [ HA.style "display" "inline-block"
        , HA.style "font-family" font
        ]
        [ Svg.svg
            [ SA.width (String.fromInt cfg.width)
            , SA.height (String.fromInt cfg.height)
            , SA.viewBox
                ("0 0 "
                    ++ String.fromInt cfg.width
                    ++ " "
                    ++ String.fromInt cfg.height
                )
            , SA.style
                ("font-family: "
                    ++ font
                    ++ "; font-size: 12px; fill: "
                    ++ labelColor
                    ++ ";"
                )
            ]
            [ if cfg.title /= "" then
                Svg.text_
                    [ SA.x (String.fromInt (cfg.width // 2))
                    , SA.y "20"
                    , SA.textAnchor "middle"
                    , SA.fontSize "14"
                    , SA.fontWeight "600"
                    , SA.fill labelColor
                    ]
                    [ Svg.text cfg.title ]

              else
                Svg.text ""
            , Svg.g
                [ SA.transform
                    ("translate("
                        ++ String.fromInt padLeft
                        ++ ","
                        ++ String.fromInt padTop
                        ++ ")"
                    )
                ]
                (gridLines
                    ++ points
                    ++ [ Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [ Axis.tickCount 6 ] xScale ]
                       , Svg.g [] [ Axis.left [ Axis.tickCount 5 ] yScale ]
                       ]
                )
            , if cfg.xLabel /= "" then
                Svg.text_
                    [ SA.x (String.fromInt (padLeft + innerW // 2))
                    , SA.y (String.fromInt (cfg.height - (if hasLegend then 30 else 8)))
                    , SA.textAnchor "middle"
                    , SA.fontSize "12"
                    , SA.fill labelColor
                    ]
                    [ Svg.text cfg.xLabel ]

              else
                Svg.text ""
            , if cfg.yLabel /= "" then
                Svg.text_
                    [ SA.transform
                        ("rotate(-90) translate(-"
                            ++ String.fromInt (padTop + innerH // 2)
                            ++ ",14)"
                        )
                    , SA.textAnchor "middle"
                    , SA.fontSize "12"
                    , SA.fill labelColor
                    ]
                    [ Svg.text cfg.yLabel ]

              else
                Svg.text ""
            , if not (List.isEmpty legendItems) then
                Svg.g
                    [ SA.transform
                        ("translate("
                            ++ String.fromInt legendX
                            ++ ","
                            ++ String.fromInt (cfg.height - 12)
                            ++ ")"
                        )
                    ]
                    legendItems

              else
                Svg.text ""
            ]
        ]
