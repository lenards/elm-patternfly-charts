module PF6.Charts.Threshold exposing
    ( ThresholdChart
    , fromData
    , withWidth, withHeight
    , withTheme
    , withColor
    , withXLabel, withYLabel
    , withTitle
    , withThresholdLabel
    , withLoading
    , toSvg
    )

{-| Threshold chart — a line chart with one or more horizontal threshold lines.

Common in infrastructure dashboards to show warning/danger levels
(e.g. CPU at 80% warning, 95% critical).


# Type

@docs ThresholdChart


# Constructor

@docs fromData


# Modifiers

@docs withWidth, withHeight
@docs withTheme
@docs withColor
@docs withXLabel, withYLabel
@docs withTitle
@docs withThresholdLabel
@docs withLoading


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


{-| A threshold level with value and optional label.
-}
type alias ThresholdLine =
    { value : Float
    , color : String
    , label : String
    }


{-| An opaque threshold chart configuration.
-}
type ThresholdChart
    = ThresholdChart Config


type alias Config =
    { width : Int
    , height : Int
    , data : List ( Float, Float )
    , color : String
    , fillOpacity : Float
    , thresholds : List ThresholdLine
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , loading : Bool
    }


defaultConfig : List ( Float, Float ) -> Config
defaultConfig data =
    { width = 500
    , height = 250
    , data = data
    , color = Colors.primary
    , fillOpacity = 0.15
    , thresholds = []
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , loading = False
    }


{-| Create a threshold chart from `(x, y)` data pairs.

Add thresholds using `withThresholdLabel`.

    chart =
        Threshold.fromData cpuData
            |> Threshold.withThresholdLabel 80 "#f0ab00" "Warning"
            |> Threshold.withThresholdLabel 95 "#c9190b" "Critical"

-}
fromData : List ( Float, Float ) -> ThresholdChart
fromData data =
    ThresholdChart (defaultConfig data)


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> ThresholdChart -> ThresholdChart
withWidth w (ThresholdChart cfg) =
    ThresholdChart { cfg | width = w }


{-| Set chart height in pixels. Default: 250.
-}
withHeight : Int -> ThresholdChart -> ThresholdChart
withHeight h (ThresholdChart cfg) =
    ThresholdChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> ThresholdChart -> ThresholdChart
withTheme theme (ThresholdChart cfg) =
    ThresholdChart { cfg | theme = theme, color = Theme.primaryColor theme }


{-| Override the main series color.
-}
withColor : String -> ThresholdChart -> ThresholdChart
withColor c (ThresholdChart cfg) =
    ThresholdChart { cfg | color = c }


{-| Set the x-axis label.
-}
withXLabel : String -> ThresholdChart -> ThresholdChart
withXLabel label (ThresholdChart cfg) =
    ThresholdChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> ThresholdChart -> ThresholdChart
withYLabel label (ThresholdChart cfg) =
    ThresholdChart { cfg | yLabel = label }


{-| Set the chart title.
-}
withTitle : String -> ThresholdChart -> ThresholdChart
withTitle t (ThresholdChart cfg) =
    ThresholdChart { cfg | title = t }


{-| Add a horizontal threshold line.

    chart
        |> Threshold.withThresholdLabel 80 "#f0ab00" "Warning (80%)"

-}
withThresholdLabel : Float -> String -> String -> ThresholdChart -> ThresholdChart
withThresholdLabel value color label (ThresholdChart cfg) =
    ThresholdChart
        { cfg
            | thresholds =
                cfg.thresholds
                    ++ [ { value = value, color = color, label = label } ]
        }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> ThresholdChart -> ThresholdChart
withLoading l (ThresholdChart cfg) =
    ThresholdChart { cfg | loading = l }


{-| Render to `Html msg`.
-}
toSvg : ThresholdChart -> Html msg
toSvg (ThresholdChart cfg) =
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
            if List.any (\t -> t.label /= "") cfg.thresholds then
                80
            else
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

        allYValues =
            ys ++ List.map .value cfg.thresholds

        yMax =
            Maybe.withDefault 100 (List.maximum allYValues)

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

        thresholdLines =
            List.map
                (\t ->
                    let
                        ty =
                            Scale.convert yScale t.value
                    in
                    Svg.g []
                        [ Svg.line
                            [ SA.x1 "0"
                            , SA.x2 (String.fromInt innerW)
                            , SA.y1 (String.fromFloat ty)
                            , SA.y2 (String.fromFloat ty)
                            , SA.stroke t.color
                            , SA.strokeWidth "2"
                            , SA.strokeDasharray "6,3"
                            ]
                            []
                        , if t.label /= "" then
                            Svg.text_
                                [ SA.x (String.fromInt (innerW + 4))
                                , SA.y (String.fromFloat (ty + 4))
                                , SA.fontSize "10"
                                , SA.fill t.color
                                ]
                                [ Svg.text t.label ]

                          else
                            Svg.text ""
                        ]
                )
                cfg.thresholds
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
                    ++ thresholdLines
                    ++ [ Path.element areaPath
                            [ SA.fill fillColor
                            , SA.stroke "none"
                            ]
                       , Path.element linePath
                            [ SA.fill "none"
                            , SA.stroke cfg.color
                            , SA.strokeWidth "2"
                            , SA.strokeLinejoin "round"
                            ]
                       , Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [ Axis.tickCount 6 ] xScale ]
                       , Svg.g [] [ Axis.left [ Axis.tickCount 5 ] yScale ]
                       ]
                )
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
        ]
