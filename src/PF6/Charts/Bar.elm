module PF6.Charts.Bar exposing
    ( BarChart, SeriesData
    , fromData
    , withWidth, withHeight
    , withTheme
    , withColors
    , withXLabel, withYLabel
    , withTitle
    , withGrouped
    , toSvg
    )

{-| Bar chart — vertical bars for categorical comparison.

Supports single-series and grouped multi-series bars with automatic
color assignment from the theme's multi-ordered color scale.


# Types

@docs BarChart, SeriesData


# Constructor

@docs fromData


# Modifiers

@docs withWidth, withHeight
@docs withTheme
@docs withColors
@docs withXLabel, withYLabel
@docs withTitle
@docs withGrouped


# Renderer

@docs toSvg

-}

import Axis
import Html exposing (Html)
import Html.Attributes as HA
import PF6.Charts.Colors as Colors
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (BandScale, ContinuousScale)
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| An opaque bar chart configuration.
-}
type BarChart
    = BarChart Config


{-| Multi-series data: each series has a label and a value per category.
-}
type alias SeriesData =
    { label : String
    , values : List Float
    }


type alias Config =
    { width : Int
    , height : Int
    , categories : List String
    , series : List SeriesData
    , colors : List String
    , xLabel : String
    , yLabel : String
    , title : String
    , theme : Theme
    , grouped : Bool
    }


defaultConfig : List String -> List SeriesData -> Config
defaultConfig categories series =
    { width = 500
    , height = 300
    , categories = categories
    , series = series
    , colors = Colors.multiOrdered
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , grouped = True
    }


{-| Create a bar chart from category labels and one or more value series.

For a single series, pass a list with one `SeriesData`.

    chart =
        Bar.fromData
            [ "Memory", "CPU", "Disk" ]
            [ { label = "Used", values = [ 70, 45, 82 ] } ]

For grouped bars:

    chart =
        Bar.fromData
            [ "Node 1", "Node 2", "Node 3" ]
            [ { label = "Used (GiB)", values = [ 8, 12, 6 ] }
            , { label = "Cached (GiB)", values = [ 3, 4, 2 ] }
            ]

-}
fromData : List String -> List SeriesData -> BarChart
fromData categories series =
    BarChart (defaultConfig categories series)


{-| Set chart width in pixels. Default: 500.
-}
withWidth : Int -> BarChart -> BarChart
withWidth w (BarChart cfg) =
    BarChart { cfg | width = w }


{-| Set chart height in pixels. Default: 300.
-}
withHeight : Int -> BarChart -> BarChart
withHeight h (BarChart cfg) =
    BarChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> BarChart -> BarChart
withTheme theme (BarChart cfg) =
    BarChart { cfg | theme = theme }


{-| Override the color list for bars (one color per series).
-}
withColors : List String -> BarChart -> BarChart
withColors colors (BarChart cfg) =
    BarChart { cfg | colors = colors }


{-| Set the x-axis label.
-}
withXLabel : String -> BarChart -> BarChart
withXLabel label (BarChart cfg) =
    BarChart { cfg | xLabel = label }


{-| Set the y-axis label.
-}
withYLabel : String -> BarChart -> BarChart
withYLabel label (BarChart cfg) =
    BarChart { cfg | yLabel = label }


{-| Set the chart title.
-}
withTitle : String -> BarChart -> BarChart
withTitle t (BarChart cfg) =
    BarChart { cfg | title = t }


{-| When `True` (default), multiple series render as side-by-side grouped
bars. When `False`, series are stacked (use `Stack` for stacked area).
-}
withGrouped : Bool -> BarChart -> BarChart
withGrouped g (BarChart cfg) =
    BarChart { cfg | grouped = g }


{-| Render to `Html msg`.
-}
toSvg : BarChart -> Html msg
toSvg (BarChart cfg) =
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
                60
            else
                50

        padLeft =
            if cfg.yLabel /= "" then
                65
            else
                50

        innerW =
            cfg.width - padLeft - padRight

        innerH =
            cfg.height - padTop - padBottom

        numSeries =
            List.length cfg.series

        -- Y scale: 0 to max value (+ 10% headroom)
        allValues =
            List.concatMap .values cfg.series

        yMax =
            Maybe.withDefault 1 (List.maximum allValues)

        yScale : ContinuousScale Float
        yScale =
            Scale.linear ( toFloat innerH, 0 ) ( 0, yMax * 1.1 )

        -- Outer band scale for categories
        outerScale : BandScale String
        outerScale =
            Scale.band
                { paddingInner = 0.15
                , paddingOuter = 0.1
                , align = 0.5
                }
                ( 0, toFloat innerW )
                cfg.categories

        outerBandwidth =
            Scale.bandwidth outerScale

        -- Inner band scale for series within each category (grouped)
        innerScale : BandScale Int
        innerScale =
            Scale.band
                { paddingInner = 0.05
                , paddingOuter = 0
                , align = 0.5
                }
                ( 0, outerBandwidth )
                (List.range 0 (numSeries - 1))

        innerBandwidth =
            Scale.bandwidth innerScale

        seriesColors =
            cfg.colors ++ List.repeat 20 Colors.primary

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

        bars =
            List.concatMap
                (\cat ->
                    let
                        catX =
                            Scale.convert outerScale cat
                    in
                    List.indexedMap
                        (\si series ->
                            let
                                color =
                                    List.drop si seriesColors
                                        |> List.head
                                        |> Maybe.withDefault Colors.primary

                                val =
                                    List.drop (indexOf cat cfg.categories) series.values
                                        |> List.head
                                        |> Maybe.withDefault 0

                                barX =
                                    catX + Scale.convert innerScale si

                                barH =
                                    toFloat innerH - Scale.convert yScale val

                                barY =
                                    Scale.convert yScale val

                                -- Rounded top: clip-path via rx on top edge
                                rx =
                                    min 2 (innerBandwidth / 4)
                            in
                            Svg.g []
                                [ -- Main rect (full height, no rounding on bottom)
                                  Svg.rect
                                    [ SA.x (String.fromFloat barX)
                                    , SA.y (String.fromFloat barY)
                                    , SA.width (String.fromFloat innerBandwidth)
                                    , SA.height (String.fromFloat barH)
                                    , SA.fill color
                                    , SA.rx (String.fromFloat rx)
                                    , SA.ry (String.fromFloat rx)
                                    ]
                                    []
                                  -- Cover bottom corners to make only top rounded
                                , Svg.rect
                                    [ SA.x (String.fromFloat barX)
                                    , SA.y (String.fromFloat (barY + rx))
                                    , SA.width (String.fromFloat innerBandwidth)
                                    , SA.height (String.fromFloat (max 0 (barH - rx)))
                                    , SA.fill color
                                    ]
                                    []
                                ]
                        )
                        cfg.series
                )
                cfg.categories

        legendItems =
            if numSeries > 1 then
                List.indexedMap
                    (\idx series ->
                        let
                            color =
                                List.drop idx seriesColors
                                    |> List.head
                                    |> Maybe.withDefault Colors.primary

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

            else
                []

        legendWidth =
            numSeries * 110

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
                    ++ bars
                    ++ [ Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [] (Scale.toRenderable identity outerScale) ]
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


indexOf : a -> List a -> Int
indexOf target list =
    list
        |> List.indexedMap Tuple.pair
        |> List.filter (\( _, v ) -> v == target)
        |> List.head
        |> Maybe.map Tuple.first
        |> Maybe.withDefault 0
