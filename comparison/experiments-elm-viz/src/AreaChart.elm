module AreaChart exposing (view)

{-| Network throughput over time — elm-visualization (low-level) implementation.

Demonstrates:
  - Manual scale setup with Scale.linear and Scale.time
  - Shape.area and Shape.line with monotoneInX interpolation
  - Axis.bottom and Axis.left with PF v6 styling
  - Path rendering via folkertdev/one-true-path-experiment

This is the D3-style approach: full control over every SVG element.
Contrast with the elm-charts AreaChart which handles axes/layout automatically.

Scenario: Inbound/outbound network throughput (Mbps) for an OpenStack node.
-}

import Axis
import Path exposing (Path)
import Scale exposing (ContinuousScale)
import Shape
import Svg exposing (Svg, g, rect, svg, text_)
import Svg.Attributes as SA
import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA
import PF.Colors as PF


-- DIMENSIONS


width : Float
width =
    600


height : Float
height =
    300


padding :
    { top : Float
    , right : Float
    , bottom : Float
    , left : Float
    }
padding =
    { top = 20
    , right = 24
    , bottom = 48
    , left = 56
    }


innerWidth : Float
innerWidth =
    width - padding.left - padding.right


innerHeight : Float
innerHeight =
    height - padding.top - padding.bottom


-- DATA


type alias Sample =
    { minuteOffset : Float
    , inbound : Float
    , outbound : Float
    }


networkData : List Sample
networkData =
    [ { minuteOffset = 0, inbound = 210, outbound = 145 }
    , { minuteOffset = 15, inbound = 280, outbound = 190 }
    , { minuteOffset = 30, inbound = 340, outbound = 220 }
    , { minuteOffset = 45, inbound = 310, outbound = 250 }
    , { minuteOffset = 60, inbound = 390, outbound = 275 }
    , { minuteOffset = 75, inbound = 355, outbound = 230 }
    , { minuteOffset = 90, inbound = 420, outbound = 300 }
    ]


-- SCALES


xScale : ContinuousScale Float
xScale =
    Scale.linear ( 0, innerWidth ) ( 0, 90 )


yScale : ContinuousScale Float
yScale =
    Scale.linear ( innerHeight, 0 ) ( 0, 500 )


-- AXES


xAxis : Svg msg
xAxis =
    Axis.bottom
        [ Axis.tickCount 7
        , Axis.tickFormat (\v -> String.fromFloat v ++ "m")
        ]
        xScale


yAxis : Svg msg
yAxis =
    Axis.left
        [ Axis.tickCount 6
        , Axis.tickFormat (\v -> String.fromFloat v ++ " Mbps")
        ]
        yScale


-- PATHS


{-| The area fill under a line — anchored to y=0 (bottom of chart). -}
areaPath : (Sample -> Float) -> Path
areaPath accessor =
    networkData
        |> List.map
            (\d ->
                Just
                    ( ( Scale.convert xScale d.minuteOffset
                      , Scale.convert yScale 0
                      )
                    , ( Scale.convert xScale d.minuteOffset
                      , Scale.convert yScale (accessor d)
                      )
                    )
            )
        |> Shape.area Shape.monotoneInXCurve


{-| The line itself (drawn on top of the fill). -}
linePath : (Sample -> Float) -> Path
linePath accessor =
    networkData
        |> List.map
            (\d ->
                Just
                    ( Scale.convert xScale d.minuteOffset
                    , Scale.convert yScale (accessor d)
                    )
            )
        |> Shape.line Shape.monotoneInXCurve


-- VIEW


view : Html msg
view =
    div
        [ HA.style "font-family" "'Red Hat Text', Helvetica, Arial, sans-serif"
        , HA.style "padding" "24px"
        ]
        [ h2
            [ HA.style "font-size" "18px"
            , HA.style "font-weight" "400"
            , HA.style "margin" "0 0 4px 0"
            , HA.style "color" "#1f1f1f"
            ]
            [ text "Network Throughput" ]
        , p
            [ HA.style "font-size" "12px"
            , HA.style "color" "#707070"
            , HA.style "margin" "0 0 16px 0"
            ]
            [ text "compute-node-01 · last 90 minutes" ]
        , chart
        , legend
        ]


chart : Html msg
chart =
    svg
        [ SA.width (String.fromFloat width)
        , SA.height (String.fromFloat height)
        , SA.style ("font-family: 'Red Hat Text', Helvetica, Arial, sans-serif; font-size: 12px; overflow: visible;")
        ]
        [ -- Translate inner chart group by padding offset
          g [ SA.transform ("translate(" ++ String.fromFloat padding.left ++ "," ++ String.fromFloat padding.top ++ ")") ]
            [ -- Horizontal grid lines
              g [] (gridLines 5)

            -- Inbound fill
            , Path.element (areaPath .inbound)
                [ SA.fill (hexWithAlpha PF.blue300 0.15)
                , SA.stroke "none"
                ]

            -- Outbound fill
            , Path.element (areaPath .outbound)
                [ SA.fill (hexWithAlpha PF.blue500 0.15)
                , SA.stroke "none"
                ]

            -- Inbound line
            , Path.element (linePath .inbound)
                [ SA.fill "none"
                , SA.stroke PF.blue300
                , SA.strokeWidth "2"
                ]

            -- Outbound line
            , Path.element (linePath .outbound)
                [ SA.fill "none"
                , SA.stroke PF.blue500
                , SA.strokeWidth "2"
                ]

            -- X axis (bottom)
            , g [ SA.transform ("translate(0," ++ String.fromFloat innerHeight ++ ")") ]
                [ styledAxis xAxis ]

            -- Y axis (left)
            , styledAxis yAxis
            ]
        ]


{-| Horizontal grid lines — drawn before data series so they're in the background. -}
gridLines : Int -> List (Svg msg)
gridLines count =
    List.range 0 count
        |> List.map
            (\i ->
                let
                    yPos =
                        toFloat i * innerHeight / toFloat count
                in
                Svg.line
                    [ SA.x1 "0"
                    , SA.y1 (String.fromFloat yPos)
                    , SA.x2 (String.fromFloat innerWidth)
                    , SA.y2 (String.fromFloat yPos)
                    , SA.stroke PF.gridLine
                    , SA.strokeWidth "1"
                    ]
                    []
            )


{-| Apply PF v6 text color to axis tick labels via a wrapper group. -}
styledAxis : Svg msg -> Svg msg
styledAxis axisEl =
    g
        [ SA.style ("color: " ++ PF.labelText ++ "; fill: " ++ PF.labelText ++ ";")
        , SA.class "pf-axis"
        ]
        [ axisEl ]


{-| Convert a hex color and alpha (0-1) to rgba(r,g,b,a) string.
This is necessary because SVG fill doesn't support hex+alpha notation. -}
hexWithAlpha : String -> Float -> String
hexWithAlpha hex alpha =
    case String.toList (String.dropLeft 1 hex) of
        [ r1, r2, g1, g2, b1, b2 ] ->
            let
                r =
                    hexPairToInt r1 r2

                g =
                    hexPairToInt g1 g2

                b =
                    hexPairToInt b1 b2
            in
            "rgba("
                ++ String.fromInt r
                ++ ","
                ++ String.fromInt g
                ++ ","
                ++ String.fromInt b
                ++ ","
                ++ String.fromFloat alpha
                ++ ")"

        _ ->
            hex


hexPairToInt : Char -> Char -> Int
hexPairToInt hi lo =
    hexCharToInt hi * 16 + hexCharToInt lo


hexCharToInt : Char -> Int
hexCharToInt c =
    case c of
        '0' -> 0
        '1' -> 1
        '2' -> 2
        '3' -> 3
        '4' -> 4
        '5' -> 5
        '6' -> 6
        '7' -> 7
        '8' -> 8
        '9' -> 9
        'a' -> 10
        'b' -> 11
        'c' -> 12
        'd' -> 13
        'e' -> 14
        'f' -> 15
        'A' -> 10
        'B' -> 11
        'C' -> 12
        'D' -> 13
        'E' -> 14
        'F' -> 15
        _ -> 0


-- LEGEND


legend : Html msg
legend =
    div
        [ HA.style "display" "flex"
        , HA.style "gap" "20px"
        , HA.style "margin-top" "4px"
        , HA.style "padding-left" (String.fromFloat padding.left ++ "px")
        , HA.style "font-size" "12px"
        , HA.style "color" PF.labelText
        ]
        [ legendItem "Inbound" PF.blue300
        , legendItem "Outbound" PF.blue500
        ]


legendItem : String -> String -> Html msg
legendItem label color =
    div
        [ HA.style "display" "flex"
        , HA.style "align-items" "center"
        , HA.style "gap" "6px"
        ]
        [ div
            [ HA.style "width" "12px"
            , HA.style "height" "3px"
            , HA.style "background-color" color
            ]
            []
        , text label
        ]
