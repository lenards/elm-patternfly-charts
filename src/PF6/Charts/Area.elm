module PF6.Charts.Area exposing
    ( AreaChart
    , fromData
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

Ideal for showing a single metric over time (CPU utilization, bandwidth).


# Type

@docs AreaChart


# Constructor

@docs fromData


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


{-| An opaque area chart configuration.
-}
type AreaChart
    = AreaChart Config


type alias Config =
    { width : Int
    , height : Int
    , data : List ( Float, Float )
    , color : String
    , fillOpacity : Float
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , loading : Bool
    , tooltips : Bool
    }


defaultConfig : List ( Float, Float ) -> Config
defaultConfig data =
    { width = 500
    , height = 250
    , data = data
    , color = Colors.primary
    , fillOpacity = 0.20
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , loading = False
    , tooltips = False
    }


{-| Create an area chart from a list of `(x, y)` pairs.

The x-axis is treated as a continuous numeric scale (use index 0, 1, 2... for
evenly-spaced time steps, or real timestamps as epoch seconds).

    chart =
        Area.fromData
            [ ( 0, 42 ), ( 1, 55 ), ( 2, 48 ), ( 3, 72 ), ( 4, 63 ) ]

-}
fromData : List ( Float, Float ) -> AreaChart
fromData data =
    AreaChart (defaultConfig data)


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


{-| Override the series color with a hex string. Default: PF6 primary blue.
-}
withColor : String -> AreaChart -> AreaChart
withColor c (AreaChart cfg) =
    AreaChart { cfg | color = c }


{-| Apply a `Theme`, setting axis, grid, label, and primary series colors.
-}
withTheme : Theme -> AreaChart -> AreaChart
withTheme theme (AreaChart cfg) =
    AreaChart { cfg | theme = theme, color = Theme.primaryColor theme }


{-| Set the fill opacity under the line. Default: 0.15.
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
        padTop =
            if cfg.title /= "" then
                40

            else
                20

        padRight =
            30

        padBottom =
            if cfg.xLabel /= "" then
                55

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

        xs =
            List.map Tuple.first cfg.data

        ys =
            List.map Tuple.second cfg.data

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

        toLinePoint ( x, y ) =
            Just ( Scale.convert xScale x, Scale.convert yScale y )

        toAreaPoint ( x, y ) =
            Just
                ( ( Scale.convert xScale x, Scale.convert yScale 0 )
                , ( Scale.convert xScale x, Scale.convert yScale y )
                )

        areaPath =
            Shape.area Shape.monotoneInXCurve (List.map toAreaPoint cfg.data)

        linePath =
            Shape.line Shape.monotoneInXCurve (List.map toLinePoint cfg.data)

        fillColor =
            IC.hexToRgba cfg.color cfg.fillOpacity

        axisColor =
            Theme.axisColor cfg.theme

        gridColor =
            Theme.gridColor cfg.theme

        labelColor =
            Theme.labelColor cfg.theme

        font =
            Theme.fontFamily cfg.theme

        -- Horizontal grid lines at each y-tick position
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
                    ++ [ -- Area fill
                         Path.element areaPath
                            [ SA.fill fillColor
                            , SA.stroke "none"
                            ]

                       -- Line on top
                       , Path.element linePath
                            [ SA.fill "none"
                            , SA.stroke cfg.color
                            , SA.strokeWidth "1.5"
                            , SA.strokeLinejoin "round"
                            ]

                       -- X axis
                       , Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [ Axis.tickCount 6 ] xScale ]

                       -- Y axis
                       , Svg.g [] [ Axis.left [ Axis.tickCount 5 ] yScale ]
                       ]
                    ++ (if cfg.tooltips then
                            List.map
                                (\( x, y ) ->
                                    Svg.g []
                                        [ Svg.circle
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
                                        ]
                                )
                                cfg.data

                        else
                            []
                       )
                )

             -- X label
             , if cfg.xLabel /= "" then
                Svg.text_
                    [ SA.x (String.fromInt (padLeft + innerW // 2))
                    , SA.y (String.fromInt (cfg.height - 8))
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
             ]
            )
        ]
