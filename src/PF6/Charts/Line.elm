module PF6.Charts.Line exposing
    ( LineChart, Series
    , fromSeries, fromData
    , withWidth, withHeight
    , withTheme
    , withXLabel, withYLabel
    , withTitle
    , withLoading
    , toSvg
    )

{-| Line chart — one or more series of connected data points.

Supports multiple series with automatic color assignment from the theme's
multi-unordered color scale.


# Types

@docs LineChart, Series


# Constructors

@docs fromSeries, fromData


# Modifiers

@docs withWidth, withHeight
@docs withTheme
@docs withXLabel, withYLabel
@docs withTitle
@docs withLoading


# Renderer

@docs toSvg

-}

import Axis
import Html exposing (Html)
import Html.Attributes as HA
import Path
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (ContinuousScale)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| A single named series of `(x, y)` data points.
-}
type alias Series =
    { label : String
    , data : List ( Float, Float )
    }


{-| An opaque line chart configuration.
-}
type LineChart
    = LineChart Config


type alias Config =
    { width : Int
    , height : Int
    , series : List Series
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , loading : Bool
    }


defaultConfig : List Series -> Config
defaultConfig series =
    { width = 500
    , height = 250
    , series = series
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , loading = False
    }


{-| Create a line chart from multiple named series.

    chart =
        Line.fromSeries
            [ { label = "inbound", data = [ ( 0, 10 ), ( 1, 20 ) ] }
            , { label = "outbound", data = [ ( 0, 8 ), ( 1, 18 ) ] }
            ]

-}
fromSeries : List Series -> LineChart
fromSeries series =
    LineChart (defaultConfig series)


{-| Create a single-series line chart from `(x, y)` pairs.
-}
fromData : List ( Float, Float ) -> LineChart
fromData data =
    fromSeries [ { label = "", data = data } ]


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> LineChart -> LineChart
withWidth w (LineChart cfg) =
    LineChart { cfg | width = w }


{-| Set chart height in pixels. Default: 250.
-}
withHeight : Int -> LineChart -> LineChart
withHeight h (LineChart cfg) =
    LineChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> LineChart -> LineChart
withTheme theme (LineChart cfg) =
    LineChart { cfg | theme = theme }


{-| Set the x-axis label.
-}
withXLabel : String -> LineChart -> LineChart
withXLabel label (LineChart cfg) =
    LineChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> LineChart -> LineChart
withYLabel label (LineChart cfg) =
    LineChart { cfg | yLabel = label }


{-| Set the chart title.
-}
withTitle : String -> LineChart -> LineChart
withTitle t (LineChart cfg) =
    LineChart { cfg | title = t }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> LineChart -> LineChart
withLoading l (LineChart cfg) =
    LineChart { cfg | loading = l }


{-| Render to `Html msg`.
-}
toSvg : LineChart -> Html msg
toSvg (LineChart cfg) =
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

        yMax =
            Maybe.withDefault 1 (List.maximum ys)

        xScale : ContinuousScale Float
        xScale =
            Scale.linear ( 0, toFloat innerW ) ( xMin, xMax )

        yScale : ContinuousScale Float
        yScale =
            Scale.linear ( toFloat innerH, 0 ) ( 0, yMax * 1.1 )

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

        seriesLines =
            List.indexedMap
                (\idx series ->
                    let
                        color =
                            Theme.seriesColor idx cfg.theme

                        path =
                            Shape.line Shape.monotoneInXCurve
                                (List.map
                                    (\( x, y ) ->
                                        Just
                                            ( Scale.convert xScale x
                                            , Scale.convert yScale y
                                            )
                                    )
                                    series.data
                                )
                    in
                    Path.element path
                        [ SA.fill "none"
                        , SA.stroke color
                        , SA.strokeWidth "1.5"
                        , SA.strokeLinejoin "round"
                        ]
                )
                cfg.series

        legendItems =
            if List.length cfg.series > 1 then
                cfg.series
                    |> List.indexedMap
                        (\idx series ->
                            let
                                color =
                                    Theme.seriesColor idx cfg.theme

                                xOff =
                                    idx * 120
                            in
                            Svg.g
                                [ SA.transform
                                    ("translate("
                                        ++ String.fromInt xOff
                                        ++ ",0)"
                                    )
                                ]
                                [ Svg.line
                                    [ SA.x1 "0"
                                    , SA.y1 "6"
                                    , SA.x2 "16"
                                    , SA.y2 "6"
                                    , SA.stroke color
                                    , SA.strokeWidth "1.5"
                                    ]
                                    []
                                , Svg.text_
                                    [ SA.x "20"
                                    , SA.y "10"
                                    , SA.fontSize "11"
                                    , SA.fill labelColor
                                    ]
                                    [ Svg.text series.label ]
                                ]
                        )

            else
                []

        legendWidth =
            List.length cfg.series * 120

        legendX =
            padLeft + max 0 (innerW // 2 - legendWidth // 2)
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
                    ++ seriesLines
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
                            ++ String.fromInt (cfg.height - 14)
                            ++ ")"
                        )
                    ]
                    legendItems

              else
                Svg.text ""
            ]
        ]
