module PF6.Charts.Bar exposing
    ( BarChart, SeriesData, Orientation(..)
    , fromData
    , withWidth, withHeight
    , withTheme
    , withColors
    , withXLabel, withYLabel
    , withTitle
    , withGrouped
    , withOrientation
    , withLoading
    , withTooltips
    , toSvg
    )

{-| Bar chart — vertical or horizontal bars for categorical comparison.

Supports single-series and grouped multi-series bars with automatic
color assignment from the theme's multi-ordered color scale.


# Types

@docs BarChart, SeriesData, Orientation


# Constructor

@docs fromData


# Modifiers

@docs withWidth, withHeight
@docs withTheme
@docs withColors
@docs withXLabel, withYLabel
@docs withTitle
@docs withGrouped
@docs withOrientation
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


{-| Bar orientation — vertical (default) or horizontal.

Use `Horizontal` when category labels are long or when you want to show
nominal data with more space for labeling (categories on the y-axis).

-}
type Orientation
    = Vertical
    | Horizontal


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
    , orientation : Orientation
    , loading : Bool
    , tooltips : Bool
    }


defaultConfig : List String -> List SeriesData -> Config
defaultConfig categories series =
    { width = 500
    , height = 300
    , categories = categories
    , series = series
    , colors = Colors.blueFamily
    , xLabel = ""
    , yLabel = ""
    , title = ""
    , theme = Theme.light
    , grouped = True
    , orientation = Vertical
    , loading = False
    , tooltips = False
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


{-| Set the bar orientation. Default: `Vertical` (categories on x-axis).

Use `Horizontal` when category labels are long or for nominal variables —
bars extend left-to-right, categories are listed on the y-axis.

    Bar.fromData categories series
        |> Bar.withOrientation Bar.Horizontal
        |> Bar.toSvg

-}
withOrientation : Orientation -> BarChart -> BarChart
withOrientation o (BarChart cfg) =
    BarChart { cfg | orientation = o }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> BarChart -> BarChart
withLoading l (BarChart cfg) =
    BarChart { cfg | loading = l }


{-| Enable SVG `<title>` tooltips on each bar. Default: `False`.

When enabled, hovering over a bar shows a browser-native tooltip with the
category and value (e.g. `"Memory · Used: 70"`). No ports or state required.

-}
withTooltips : Bool -> BarChart -> BarChart
withTooltips t (BarChart cfg) =
    BarChart { cfg | tooltips = t }


{-| Render to `Html msg`.
-}
toSvg : BarChart -> Html msg
toSvg (BarChart cfg) =
    if cfg.loading then
        Skeleton.view cfg.width cfg.height

    else
        case cfg.orientation of
            Vertical ->
                toSvgVertical cfg

            Horizontal ->
                toSvgHorizontal cfg


toSvgVertical : Config -> Html msg
toSvgVertical cfg =
    let
        numSeries =
            List.length cfg.series

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

        allValues =
            List.concatMap .values cfg.series

        yMax =
            Maybe.withDefault 1 (List.maximum allValues)

        yScale : ContinuousScale Float
        yScale =
            Scale.linear ( toFloat innerH, 0 ) ( 0, yMax * 1.1 )

        outerScale : BandScale String
        outerScale =
            Scale.band
                { paddingInner = 0.6
                , paddingOuter = 0.15
                , align = 0.5
                }
                ( 0, toFloat innerW )
                cfg.categories

        outerBandwidth =
            Scale.bandwidth outerScale

        innerScale : BandScale Int
        innerScale =
            Scale.band
                { paddingInner = 0.1
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

                                rx =
                                    min 2 (innerBandwidth / 4)
                            in
                            Svg.g []
                                [ Svg.rect
                                    [ SA.x (String.fromFloat barX)
                                    , SA.y (String.fromFloat barY)
                                    , SA.width (String.fromFloat innerBandwidth)
                                    , SA.height (String.fromFloat barH)
                                    , SA.fill color
                                    , SA.rx (String.fromFloat rx)
                                    , SA.ry (String.fromFloat rx)
                                    ]
                                    (if cfg.tooltips then
                                        [ Svg.node "title"
                                            []
                                            [ Svg.text
                                                (cat
                                                    ++ " \u{00B7} "
                                                    ++ series.label
                                                    ++ ": "
                                                    ++ String.fromFloat val
                                                )
                                            ]
                                        ]

                                     else
                                        []
                                    )
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


toSvgHorizontal : Config -> Html msg
toSvgHorizontal cfg =
    let
        numSeries =
            List.length cfg.series

        padTop =
            if cfg.title /= "" then
                40
            else
                20

        -- Right side: needs room for x-axis values
        padRight =
            20

        padBottom =
            if cfg.xLabel /= "" then
                50
            else
                30

        -- Left side: needs room for category labels
        longestLabel =
            cfg.categories
                |> List.map String.length
                |> List.maximum
                |> Maybe.withDefault 5

        padLeft =
            max 60 (longestLabel * 7 + 12)

        innerW =
            cfg.width - padLeft - padRight

        innerH =
            cfg.height - padTop - padBottom

        allValues =
            List.concatMap .values cfg.series

        xMax =
            Maybe.withDefault 1 (List.maximum allValues)

        xScale : ContinuousScale Float
        xScale =
            Scale.linear ( 0, toFloat innerW ) ( 0, xMax * 1.1 )

        -- Category band scale on y-axis
        outerScale : BandScale String
        outerScale =
            Scale.band
                { paddingInner = 0.4
                , paddingOuter = 0.2
                , align = 0.5
                }
                ( 0, toFloat innerH )
                cfg.categories

        outerBandwidth =
            Scale.bandwidth outerScale

        -- Inner band scale for series
        innerScale : BandScale Int
        innerScale =
            Scale.band
                { paddingInner = 0.1
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

        -- Vertical grid lines at x-tick positions
        gridLines =
            Scale.ticks xScale 5
                |> List.map
                    (\tick ->
                        let
                            x =
                                Scale.convert xScale tick
                        in
                        Svg.line
                            [ SA.x1 (String.fromFloat x)
                            , SA.x2 (String.fromFloat x)
                            , SA.y1 "0"
                            , SA.y2 (String.fromInt innerH)
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
                        catY =
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

                                barY =
                                    catY + Scale.convert innerScale si

                                barW =
                                    Scale.convert xScale val

                                ry =
                                    min 2 (innerBandwidth / 4)
                            in
                            Svg.g []
                                [ Svg.rect
                                    [ SA.x "0"
                                    , SA.y (String.fromFloat barY)
                                    , SA.width (String.fromFloat barW)
                                    , SA.height (String.fromFloat innerBandwidth)
                                    , SA.fill color
                                    , SA.rx (String.fromFloat ry)
                                    , SA.ry (String.fromFloat ry)
                                    ]
                                    (if cfg.tooltips then
                                        [ Svg.node "title"
                                            []
                                            [ Svg.text
                                                (cat
                                                    ++ " \u{00B7} "
                                                    ++ series.label
                                                    ++ ": "
                                                    ++ String.fromFloat val
                                                )
                                            ]
                                        ]

                                     else
                                        []
                                    )
                                -- Cover right corners so only right edge rounds
                                , Svg.rect
                                    [ SA.x "0"
                                    , SA.y (String.fromFloat barY)
                                    , SA.width (String.fromFloat (max 0 (barW - ry)))
                                    , SA.height (String.fromFloat innerBandwidth)
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
                    ++ [ -- X axis (bottom)
                         Svg.g
                            [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                            [ Axis.bottom [ Axis.tickCount 5 ] xScale ]
                       -- Y axis (categories, left)
                       , Svg.g [] [ Axis.left [] (Scale.toRenderable identity outerScale) ]
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
