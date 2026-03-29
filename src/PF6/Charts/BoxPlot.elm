module PF6.Charts.BoxPlot exposing
    ( BoxPlotChart, BoxData
    , fromData
    , withWidth, withHeight
    , withTheme
    , withXLabel, withYLabel
    , withTitle
    , withLoading
    , toSvg
    )

{-| Box plot chart — shows the statistical distribution of one or more datasets.

Each box displays:
- Whiskers from min to max
- Box from Q1 to Q3
- Median line
- Mean dot (optional)


# Types

@docs BoxPlotChart, BoxData


# Constructor

@docs fromData


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
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (BandScale, ContinuousScale)
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| Statistical summary for a single box.
-}
type alias BoxData =
    { label : String
    , min : Float
    , q1 : Float
    , median : Float
    , q3 : Float
    , max : Float
    }


{-| An opaque box plot configuration.
-}
type BoxPlotChart
    = BoxPlotChart Config


type alias Config =
    { width : Int
    , height : Int
    , data : List BoxData
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , loading : Bool
    }


defaultConfig : List BoxData -> Config
defaultConfig data =
    { width = 500
    , height = 300
    , data = data
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , loading = False
    }


{-| Create a box plot from a list of statistical summaries.

    chart =
        BoxPlot.fromData
            [ { label = "Jan", min = 10, q1 = 25, median = 40, q3 = 60, max = 80 }
            , { label = "Feb", min = 15, q1 = 30, median = 45, q3 = 65, max = 85 }
            ]

-}
fromData : List BoxData -> BoxPlotChart
fromData data =
    BoxPlotChart (defaultConfig data)


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> BoxPlotChart -> BoxPlotChart
withWidth w (BoxPlotChart cfg) =
    BoxPlotChart { cfg | width = w }


{-| Set chart height in pixels. Default: 300.
-}
withHeight : Int -> BoxPlotChart -> BoxPlotChart
withHeight h (BoxPlotChart cfg) =
    BoxPlotChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> BoxPlotChart -> BoxPlotChart
withTheme theme (BoxPlotChart cfg) =
    BoxPlotChart { cfg | theme = theme }


{-| Set the x-axis label.
-}
withXLabel : String -> BoxPlotChart -> BoxPlotChart
withXLabel label (BoxPlotChart cfg) =
    BoxPlotChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> BoxPlotChart -> BoxPlotChart
withYLabel label (BoxPlotChart cfg) =
    BoxPlotChart { cfg | yLabel = label }


{-| Set the chart title.
-}
withTitle : String -> BoxPlotChart -> BoxPlotChart
withTitle t (BoxPlotChart cfg) =
    BoxPlotChart { cfg | title = t }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> BoxPlotChart -> BoxPlotChart
withLoading l (BoxPlotChart cfg) =
    BoxPlotChart { cfg | loading = l }


{-| Render to `Html msg`.
-}
toSvg : BoxPlotChart -> Html msg
toSvg (BoxPlotChart cfg) =
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
            20

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

        allValues =
            List.concatMap
                (\d -> [ d.min, d.q1, d.median, d.q3, d.max ])
                cfg.data

        yMin =
            Maybe.withDefault 0 (List.minimum allValues)

        yMax =
            Maybe.withDefault 100 (List.maximum allValues)

        yPad =
            (yMax - yMin) * 0.1

        yScale : ContinuousScale Float
        yScale =
            Scale.linear ( toFloat innerH, 0 ) ( yMin - yPad, yMax + yPad )

        labels =
            List.map .label cfg.data

        xScale : BandScale String
        xScale =
            Scale.band
                { paddingInner = 0.78
                , paddingOuter = 0.2
                , align = 0.5
                }
                ( 0, toFloat innerW )
                labels

        bw =
            Scale.bandwidth xScale

        labelColor =
            Theme.labelColor cfg.theme

        gridColor =
            Theme.gridColor cfg.theme

        font =
            Theme.fontFamily cfg.theme

        primaryColor =
            Theme.primaryColor cfg.theme

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

        boxes =
            List.indexedMap
                (\idx d ->
                    let
                        cx =
                            Scale.convert xScale d.label + bw / 2

                        whiskerW =
                            bw * 0.4

                        yMin_ =
                            Scale.convert yScale d.min

                        yMax_ =
                            Scale.convert yScale d.max

                        yQ1 =
                            Scale.convert yScale d.q1

                        yQ3 =
                            Scale.convert yScale d.q3

                        yMed =
                            Scale.convert yScale d.median

                        color =
                            Theme.seriesColor idx cfg.theme
                    in
                    Svg.g []
                        [ -- Vertical whisker line (min to max)
                          Svg.line
                            [ SA.x1 (String.fromFloat cx)
                            , SA.x2 (String.fromFloat cx)
                            , SA.y1 (String.fromFloat yMax_)
                            , SA.y2 (String.fromFloat yMin_)
                            , SA.stroke color
                            , SA.strokeWidth "1.5"
                            ]
                            []

                        -- Min cap
                        , Svg.line
                            [ SA.x1 (String.fromFloat (cx - whiskerW / 2))
                            , SA.x2 (String.fromFloat (cx + whiskerW / 2))
                            , SA.y1 (String.fromFloat yMin_)
                            , SA.y2 (String.fromFloat yMin_)
                            , SA.stroke color
                            , SA.strokeWidth "1.5"
                            ]
                            []

                        -- Max cap
                        , Svg.line
                            [ SA.x1 (String.fromFloat (cx - whiskerW / 2))
                            , SA.x2 (String.fromFloat (cx + whiskerW / 2))
                            , SA.y1 (String.fromFloat yMax_)
                            , SA.y2 (String.fromFloat yMax_)
                            , SA.stroke color
                            , SA.strokeWidth "1.5"
                            ]
                            []

                        -- IQR box
                        , Svg.rect
                            [ SA.x (String.fromFloat (cx - bw / 2))
                            , SA.y (String.fromFloat yQ3)
                            , SA.width (String.fromFloat bw)
                            , SA.height (String.fromFloat (yQ1 - yQ3))
                            , SA.fill color
                            , SA.fillOpacity "0.2"
                            , SA.stroke color
                            , SA.strokeWidth "1.5"
                            , SA.rx "2"
                            ]
                            []

                        -- Median line
                        , Svg.line
                            [ SA.x1 (String.fromFloat (cx - bw / 2))
                            , SA.x2 (String.fromFloat (cx + bw / 2))
                            , SA.y1 (String.fromFloat yMed)
                            , SA.y2 (String.fromFloat yMed)
                            , SA.stroke color
                            , SA.strokeWidth "2.5"
                            ]
                            []
                        ]
                )
                cfg.data
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
                    ++ boxes
                    ++ [ Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [] (Scale.toRenderable identity xScale) ]
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
