module PF6.Charts.Donut exposing
    ( DonutChart, Slice
    , fromData
    , withSize
    , withTheme
    , withColors
    , withTitle
    , withCenterText
    , withLoading
    , withTooltips
    , toSvg
    )

{-| Donut chart — a ring chart for part-to-whole relationships.

A core PatternFly chart type used for showing categorical proportions
(resource allocation, status breakdowns) with a hollow center that can
display a summary metric.


# Types

@docs DonutChart, Slice


# Constructor

@docs fromData


# Modifiers

@docs withSize
@docs withTheme
@docs withColors
@docs withTitle
@docs withCenterText
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


{-| An opaque donut chart configuration.
-}
type DonutChart
    = DonutChart Config


{-| A single slice: label and numeric value.
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
    , centerValue : String
    , centerLabel : String
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
    , centerValue = ""
    , centerLabel = ""
    , theme = Theme.light
    , loading = False
    , tooltips = False
    }


{-| Create a donut chart from a list of slices.

    chart =
        Donut.fromData
            [ { label = "Running", value = 42 }
            , { label = "Stopped", value = 8 }
            , { label = "Pending", value = 5 }
            ]

-}
fromData : List Slice -> DonutChart
fromData slices =
    DonutChart (defaultConfig slices)


{-| Set the overall SVG size (width = height). Default: 230.
-}
withSize : Int -> DonutChart -> DonutChart
withSize s (DonutChart cfg) =
    DonutChart { cfg | size = s }


{-| Apply a `Theme`.
-}
withTheme : Theme -> DonutChart -> DonutChart
withTheme theme (DonutChart cfg) =
    DonutChart { cfg | theme = theme }


{-| Override the slice color list.
-}
withColors : List String -> DonutChart -> DonutChart
withColors colors (DonutChart cfg) =
    DonutChart { cfg | colors = colors }


{-| Set the chart title rendered below the donut.
-}
withTitle : String -> DonutChart -> DonutChart
withTitle t (DonutChart cfg) =
    DonutChart { cfg | title = t }


{-| Set the text displayed in the hollow center of the donut.

The first argument is the primary metric (e.g. `"42"`), the second is a
sub-label (e.g. `"Running"`).

    Donut.fromData slices
        |> Donut.withCenterText "42" "Running"

-}
withCenterText : String -> String -> DonutChart -> DonutChart
withCenterText value label (DonutChart cfg) =
    DonutChart { cfg | centerValue = value, centerLabel = label }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> DonutChart -> DonutChart
withLoading l (DonutChart cfg) =
    DonutChart { cfg | loading = l }


{-| Enable SVG `<title>` tooltips on each slice. Default: `False`.

When enabled, hovering over a slice shows a browser-native tooltip with the
label, value, and percentage (e.g. `"Running: 42 (76%)"`). No ports required.

-}
withTooltips : Bool -> DonutChart -> DonutChart
withTooltips t (DonutChart cfg) =
    DonutChart { cfg | tooltips = t }


{-| Render to `Html msg`.
-}
toSvg : DonutChart -> Html msg
toSvg (DonutChart cfg) =
    if cfg.loading then
        Skeleton.viewCircle cfg.size

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

        innerRadius =
            outerRadius * 0.65

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
                , innerRadius = innerRadius
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
                                    { innerRadius = innerRadius
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

        -- Legend items to the right of donut
        legendItems =
            List.indexedMap
                (\idx slice ->
                    let
                        color =
                            List.drop idx seriesColors
                                |> List.head
                                |> Maybe.withDefault Colors.primary
                    in
                    Svg.g
                        [ SA.transform ("translate(0," ++ String.fromInt (idx * 20) ++ ")") ]
                        [ Svg.rect
                            [ SA.width "12"
                            , SA.height "12"
                            , SA.fill color
                            , SA.rx "2"
                            , SA.y "-1"
                            ]
                            []
                        , Svg.text_
                            [ SA.x "16"
                            , SA.y "10"
                            , SA.fontSize "12"
                            , SA.fill labelColor
                            ]
                            [ Svg.text slice.label ]
                        ]
                )
                cfg.data
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
            , SA.style
                ("font-family: "
                    ++ font
                    ++ "; font-size: 12px;"
                )
            ]
            (slices
                ++ [ -- Center value
                     if cfg.centerValue /= "" then
                        Svg.text_
                            [ SA.x (String.fromFloat cx)
                            , SA.y (String.fromFloat (cy - 4))
                            , SA.textAnchor "middle"
                            , SA.fontSize "24"
                            , SA.fontWeight "700"
                            , SA.fill labelColor
                            ]
                            [ Svg.text cfg.centerValue ]

                     else
                        Svg.text ""
                   , -- Center sub-label
                     if cfg.centerLabel /= "" then
                        Svg.text_
                            [ SA.x (String.fromFloat cx)
                            , SA.y (String.fromFloat (cy + 18))
                            , SA.textAnchor "middle"
                            , SA.fontSize "12"
                            , SA.fill labelColor
                            ]
                            [ Svg.text cfg.centerLabel ]

                     else
                        Svg.text ""
                   , -- Title below donut
                     if cfg.title /= "" then
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
