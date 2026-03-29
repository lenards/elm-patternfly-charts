module PF6.Charts.Area exposing
    ( AreaChart, Series
    , fromData, fromSeries
    , withWidth, withHeight
    , withColor, withTheme
    , withFillOpacity
    , withXLabel, withYLabel
    , withTitle
    , withLoading
    , withTooltips
    , toSvg
    )

{-| Area chart — a line chart with the region below the line filled.

Supports a single series (`fromData`) or multiple overlapping series
(`fromSeries`), each with its own fill and stroke color drawn from the theme's
multi-ordered scale.


# Types

@docs AreaChart, Series


# Constructors

@docs fromData, fromSeries


# Modifiers

@docs withWidth, withHeight
@docs withColor, withTheme
@docs withFillOpacity
@docs withXLabel, withYLabel
@docs withTitle
@docs withLoading
@docs withTooltips


# Renderer

@docs toSvg

-}

import Axis
import Html exposing (Html)
import Html.Attributes as HA
import Path
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Color as IC
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (ContinuousScale)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| A named series of `(x, y)` data points for a multi-series area chart.
-}
type alias Series =
    { label : String
    , data : List ( Float, Float )
    }


{-| An opaque area chart configuration.
-}
type AreaChart
    = AreaChart Config


type alias Config =
    { width : Int
    , height : Int
    , series : List Series
    , colorOverride : Maybe String
    , fillOpacity : Float
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , loading : Bool
    , tooltips : Bool
    }


defaultConfig : List Series -> Config
defaultConfig series =
    { width = 500
    , height = 250
    , series = series
    , colorOverride = Nothing
    , fillOpacity = 0.20
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , loading = False
    , tooltips = False
    }


{-| Create a single-series area chart from a list of `(x, y)` pairs.

The x-axis is treated as a continuous numeric scale (use index 0, 1, 2... for
evenly-spaced time steps, or real timestamps as epoch seconds).

    chart =
        Area.fromData
            [ ( 0, 42 ), ( 1, 55 ), ( 2, 48 ), ( 3, 72 ), ( 4, 63 ) ]

-}
fromData : List ( Float, Float ) -> AreaChart
fromData data =
    AreaChart (defaultConfig [ { label = "", data = data } ])


{-| Create a multi-series area chart from named series.

Each series is drawn with a distinct color from the theme's multi-ordered
scale. Series are drawn back-to-front so later series appear on top.

    chart =
        Area.fromSeries
            [ { label = "Cats", data = catData }
            , { label = "Dogs", data = dogData }
            ]

-}
fromSeries : List Series -> AreaChart
fromSeries series =
    AreaChart (defaultConfig series)


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> AreaChart -> AreaChart
withWidth w (AreaChart cfg) =
    AreaChart { cfg | width = w }


{-| Set chart height in pixels. Default: 250.
-}
withHeight : Int -> AreaChart -> AreaChart
withHeight h (AreaChart cfg) =
    AreaChart { cfg | height = h }


{-| Override the color for a single-series chart with a hex string. Default: PF6 primary blue.

Has no effect on multi-series charts (use `withTheme` to customise series colors).

-}
withColor : String -> AreaChart -> AreaChart
withColor c (AreaChart cfg) =
    AreaChart { cfg | colorOverride = Just c }


{-| Apply a `Theme`, setting axis, grid, label, and series colors.
-}
withTheme : Theme -> AreaChart -> AreaChart
withTheme theme (AreaChart cfg) =
    AreaChart { cfg | theme = theme, colorOverride = Nothing }


{-| Set the fill opacity under each area line. Default: 0.20.
-}
withFillOpacity : Float -> AreaChart -> AreaChart
withFillOpacity op (AreaChart cfg) =
    AreaChart { cfg | fillOpacity = op }


{-| Set the x-axis label.
-}
withXLabel : String -> AreaChart -> AreaChart
withXLabel label (AreaChart cfg) =
    AreaChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> AreaChart -> AreaChart
withYLabel label (AreaChart cfg) =
    AreaChart { cfg | yLabel = label }


{-| Set the chart title rendered above the chart.
-}
withTitle : String -> AreaChart -> AreaChart
withTitle t (AreaChart cfg) =
    AreaChart { cfg | title = t }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> AreaChart -> AreaChart
withLoading l (AreaChart cfg) =
    AreaChart { cfg | loading = l }


{-| Enable SVG `<title>` tooltips on each data point. Default: `False`.

When enabled, hovering over a data point shows a browser-native tooltip with
the x and y values (e.g. `"x: 3, y: 72"`). No ports or state required.

-}
withTooltips : Bool -> AreaChart -> AreaChart
withTooltips t (AreaChart cfg) =
    AreaChart { cfg | tooltips = t }


{-| Render the chart to an `Html msg` node.
-}
toSvg : AreaChart -> Html msg
toSvg (AreaChart cfg) =
    if cfg.loading then
        Skeleton.view cfg.width cfg.height

    else
    let
        isMulti =
            List.length cfg.series > 1

        padTop =
            if cfg.title /= "" then
                40

            else
                20

        padRight =
            30

        padBottom =
            if cfg.xLabel /= "" && isMulti then
                75
            else if cfg.xLabel /= "" then
                55
            else if isMulti then
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

        seriesColor idx =
            case ( idx, cfg.colorOverride ) of
                ( 0, Just c ) ->
                    c

                _ ->
                    Theme.seriesColor idx cfg.theme

        toLinePoint ( x, y ) =
            Just ( Scale.convert xScale x, Scale.convert yScale y )

        toAreaPoint ( x, y ) =
            Just
                ( ( Scale.convert xScale x, Scale.convert yScale 0 )
                , ( Scale.convert xScale x, Scale.convert yScale y )
                )

        axisColor =
            Theme.axisColor cfg.theme

        gridColor =
            Theme.gridColor cfg.theme

        labelColor =
            Theme.labelColor cfg.theme

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

        -- Render each series: fill area then stroke line
        seriesElements =
            List.indexedMap
                (\idx series ->
                    let
                        color =
                            seriesColor idx

                        fillColor =
                            IC.hexToRgba color cfg.fillOpacity

                        areaPath =
                            Shape.area Shape.monotoneInXCurve
                                (List.map toAreaPoint series.data)

                        linePath =
                            Shape.line Shape.monotoneInXCurve
                                (List.map toLinePoint series.data)

                        tooltipDots =
                            if cfg.tooltips then
                                List.map
                                    (\( x, y ) ->
                                        Svg.circle
                                            [ SA.cx (String.fromFloat (Scale.convert xScale x))
                                            , SA.cy (String.fromFloat (Scale.convert yScale y))
                                            , SA.r "6"
                                            , SA.fill "transparent"
                                            , SA.stroke "none"
                                            ]
                                            [ Svg.node "title"
                                                []
                                                [ Svg.text
                                                    ("x: "
                                                        ++ String.fromFloat x
                                                        ++ ", y: "
                                                        ++ String.fromFloat y
                                                    )
                                                ]
                                            ]
                                    )
                                    series.data

                            else
                                []
                    in
                    Svg.g []
                        ([ Path.element areaPath
                            [ SA.fill fillColor
                            , SA.stroke "none"
                            ]
                         , Path.element linePath
                            [ SA.fill "none"
                            , SA.stroke color
                            , SA.strokeWidth "1.5"
                            , SA.strokeLinejoin "round"
                            ]
                         ]
                            ++ tooltipDots
                        )
                )
                cfg.series

        legendItems =
            if isMulti then
                List.indexedMap
                    (\idx series ->
                        let
                            color =
                                seriesColor idx

                            xOff =
                                idx * 120
                        in
                        Svg.g
                            [ SA.transform ("translate(" ++ String.fromInt xOff ++ ",0)") ]
                            [ Svg.line
                                [ SA.x1 "0"
                                , SA.y1 "6"
                                , SA.x2 "16"
                                , SA.y2 "6"
                                , SA.stroke color
                                , SA.strokeWidth "2"
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
                    cfg.series

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
            ([ -- Title
               if cfg.title /= "" then
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
                    ++ seriesElements
                    ++ [ -- X axis
                         Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [ Axis.tickCount 6 ] xScale ]

                       -- Y axis
                       , Svg.g [] [ Axis.left [ Axis.tickCount 5 ] yScale ]
                       ]
                )

             -- X label
             , if cfg.xLabel /= "" then
                Svg.text_
                    [ SA.x (String.fromInt (padLeft + innerW // 2))
                    , SA.y (String.fromInt (cfg.height - (if isMulti then 30 else 8)))
                    , SA.textAnchor "middle"
                    , SA.fontSize "12"
                    , SA.fill labelColor
                    ]
                    [ Svg.text cfg.xLabel ]

               else
                Svg.text ""

             -- Y label (rotated)
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

             -- Legend (multi-series only)
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
            )
        ]
