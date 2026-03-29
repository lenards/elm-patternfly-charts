module PF6.Charts.Stack exposing
    ( StackChart, Series
    , fromSeries
    , withWidth, withHeight
    , withTheme
    , withXLabel, withYLabel
    , withTitle
    , withLoading
    , toSvg
    )

{-| Stacked area chart — multiple series stacked atop each other to show
both individual contributions and their total over time.

Uses the PF6 multi-unordered color scale by default.


# Types

@docs StackChart, Series


# Constructor

@docs fromSeries


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
import PF6.Charts.Internal.Color as IC
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (ContinuousScale)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| A single series: label and one y-value per x step.

All series must have the same number of values. X positions are inferred
as 0, 1, 2, ... (pass your own x values via the first element if needed).

-}
type alias Series =
    { label : String
    , values : List Float
    }


{-| An opaque stacked area chart configuration.
-}
type StackChart
    = StackChart Config


type alias Config =
    { width : Int
    , height : Int
    , xValues : List Float
    , series : List Series
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , loading : Bool
    }


defaultConfig : List Series -> Config
defaultConfig series =
    let
        n =
            series
                |> List.head
                |> Maybe.map (.values >> List.length)
                |> Maybe.withDefault 0
    in
    { width = 500
    , height = 250
    , xValues = List.map toFloat (List.range 0 (n - 1))
    , series = series
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , loading = False
    }


{-| Create a stacked area chart from multiple series.

All series must have the same number of values; x positions are inferred
as 0, 1, 2...

    chart =
        Stack.fromSeries
            [ { label = "Project A", values = [ 10, 12, 15, 18, 16 ] }
            , { label = "Project B", values = [ 8, 9, 11, 13, 12 ] }
            , { label = "Project C", values = [ 5, 6, 7, 9, 8 ] }
            ]

-}
fromSeries : List Series -> StackChart
fromSeries series =
    StackChart (defaultConfig series)


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> StackChart -> StackChart
withWidth w (StackChart cfg) =
    StackChart { cfg | width = w }


{-| Set chart height in pixels. Default: 250.
-}
withHeight : Int -> StackChart -> StackChart
withHeight h (StackChart cfg) =
    StackChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> StackChart -> StackChart
withTheme theme (StackChart cfg) =
    StackChart { cfg | theme = theme }


{-| Set the x-axis label.
-}
withXLabel : String -> StackChart -> StackChart
withXLabel label (StackChart cfg) =
    StackChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> StackChart -> StackChart
withYLabel label (StackChart cfg) =
    StackChart { cfg | yLabel = label }


{-| Set the chart title.
-}
withTitle : String -> StackChart -> StackChart
withTitle t (StackChart cfg) =
    StackChart { cfg | title = t }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> StackChart -> StackChart
withLoading l (StackChart cfg) =
    StackChart { cfg | loading = l }


{-| Render to `Html msg`.
-}
toSvg : StackChart -> Html msg
toSvg (StackChart cfg) =
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

        n =
            cfg.xValues |> List.length

        xMin =
            Maybe.withDefault 0 (List.minimum cfg.xValues)

        xMax =
            Maybe.withDefault (toFloat (n - 1)) (List.maximum cfg.xValues)

        -- Compute stacked totals per x position
        totals : List Float
        totals =
            List.foldl
                (\series acc ->
                    List.map2 (+) acc series.values
                )
                (List.repeat n 0)
                cfg.series

        yMax =
            Maybe.withDefault 1 (List.maximum totals)

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

        -- Compute cumulative baselines for each series
        -- baseline.(i) = sum of all series values below i
        baselines : List (List Float)
        baselines =
            List.foldl
                (\series ( accBaselines, runningSum ) ->
                    let
                        newBaseline =
                            runningSum
                    in
                    ( accBaselines ++ [ newBaseline ]
                    , List.map2 (+) runningSum series.values
                    )
                )
                ( [], List.repeat n 0 )
                cfg.series
                |> Tuple.first

        -- Render each stacked area
        areas =
            List.map3
                (\idx series baseline ->
                    let
                        color =
                            Theme.seriesColor idx cfg.theme

                        fillColor =
                            IC.hexToRgba color 0.7

                        -- Each area goes from baseline to baseline + value
                        points =
                            List.map3
                                (\x baseY val ->
                                    let
                                        y0 =
                                            Scale.convert yScale baseY

                                        y1 =
                                            Scale.convert yScale (baseY + val)

                                        px =
                                            Scale.convert xScale x
                                    in
                                    ( px, y0, y1 )
                                )
                                cfg.xValues
                                baseline
                                series.values

                        -- Build the area path manually as a polygon
                        topPoints =
                            List.map (\( px, _, y1 ) -> ( px, y1 )) points

                        bottomPoints =
                            List.map (\( px, y0, _ ) -> ( px, y0 )) points
                                |> List.reverse

                        allPoly =
                            topPoints ++ bottomPoints

                        polyStr =
                            allPoly
                                |> List.map (\( px, py ) -> String.fromFloat px ++ "," ++ String.fromFloat py)
                                |> String.join " "
                    in
                    Svg.g []
                        [ Svg.polygon
                            [ SA.points polyStr
                            , SA.fill fillColor
                            , SA.stroke "none"
                            ]
                            []
                        , -- Line on top
                          Svg.polyline
                            [ SA.points
                                (topPoints
                                    |> List.map (\( px, py ) -> String.fromFloat px ++ "," ++ String.fromFloat py)
                                    |> String.join " "
                                )
                            , SA.fill "none"
                            , SA.stroke color
                            , SA.strokeWidth "1.5"
                            ]
                            []
                        ]
                )
                (List.range 0 (List.length cfg.series - 1))
                cfg.series
                baselines

        legendItems =
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
                        [ Svg.rect
                            [ SA.x "0"
                            , SA.y "0"
                            , SA.width "12"
                            , SA.height "12"
                            , SA.fill color
                            , SA.rx "2"
                            ]
                            []
                        , Svg.text_
                            [ SA.x "16"
                            , SA.y "10"
                            , SA.fontSize "11"
                            , SA.fill labelColor
                            ]
                            [ Svg.text series.label ]
                        ]
                )
                cfg.series

        legendWidth =
            List.length cfg.series * 110

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
                    ++ areas
                    ++ [ Svg.g
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
            , Svg.g
                [ SA.transform
                    ("translate("
                        ++ String.fromInt legendX
                        ++ ","
                        ++ String.fromInt (cfg.height - 12)
                        ++ ")"
                    )
                ]
                legendItems
            ]
        ]
