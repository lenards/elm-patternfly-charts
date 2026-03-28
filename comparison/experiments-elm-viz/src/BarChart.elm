module BarChart exposing (view)

{-| Instance count by OpenStack region — elm-visualization bar chart.

Demonstrates:
  - Scale.band for categorical x axis
  - Manual rect elements with PF v6 multi-ordered colors
  - Rounded top corners (via rx/ry attributes)
  - Axis.bottom and Axis.left

This is the low-level D3-equivalent approach — compare to elm-charts BarChart
which handles grouping, spacing, and colors more automatically.

Scenario: Active VM instance count per cloud region.
-}

import Axis
import Scale exposing (BandScale, ContinuousScale)
import Svg exposing (Svg, g, rect, svg, text_)
import Svg.Attributes as SA
import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA
import PF.Colors as PF


-- DIMENSIONS


width : Float
width =
    580


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
    , left = 60
    }


innerWidth : Float
innerWidth =
    width - padding.left - padding.right


innerHeight : Float
innerHeight =
    height - padding.top - padding.bottom


-- DATA


type alias Region =
    { name : String
    , count : Int
    }


regions : List Region
regions =
    [ { name = "us-east-1", count = 142 }
    , { name = "us-west-2", count = 98 }
    , { name = "eu-central", count = 187 }
    , { name = "eu-west-1", count = 74 }
    , { name = "ap-south", count = 115 }
    , { name = "ap-east", count = 53 }
    ]


-- SCALES


xScale : BandScale String
xScale =
    Scale.band
        { paddingInner = 0.2
        , paddingOuter = 0.15
        , align = 0.5
        }
        ( 0, innerWidth )
        (List.map .name regions)


yScale : ContinuousScale Float
yScale =
    Scale.linear ( innerHeight, 0 ) ( 0, 220 )


-- AXES


xAxis : Svg msg
xAxis =
    Axis.bottom [] (Scale.toRenderable identity xScale)


yAxis : Svg msg
yAxis =
    Axis.left
        [ Axis.tickCount 5
        , Axis.tickFormat (\v -> String.fromFloat v)
        ]
        yScale


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
            [ text "Active Instances by Region" ]
        , p
            [ HA.style "font-size" "12px"
            , HA.style "color" "#707070"
            , HA.style "margin" "0 0 16px 0"
            ]
            [ text "Virtual machine count · all regions" ]
        , chart
        ]


chart : Html msg
chart =
    svg
        [ SA.width (String.fromFloat width)
        , SA.height (String.fromFloat height)
        , SA.style "font-family: 'Red Hat Text', Helvetica, Arial, sans-serif; font-size: 12px; overflow: visible;"
        ]
        [ g [ SA.transform ("translate(" ++ String.fromFloat padding.left ++ "," ++ String.fromFloat padding.top ++ ")") ]
            [ -- Grid lines
              g [] (gridLines 5)

            -- Bars
            , g [] (List.indexedMap bar regions)

            -- X axis
            , g [ SA.transform ("translate(0," ++ String.fromFloat innerHeight ++ ")") ]
                [ styledAxis xAxis ]

            -- Y axis
            , styledAxis yAxis
            ]
        ]


bar : Int -> Region -> Svg msg
bar idx region =
    let
        barX =
            Scale.convert xScale region.name

        barWidth =
            Scale.bandwidth xScale

        barHeight =
            innerHeight - Scale.convert yScale (toFloat region.count)

        barY =
            Scale.convert yScale (toFloat region.count)

        color =
            pfColor idx
    in
    g []
        [ -- Main bar (full height, square bottom)
          rect
            [ SA.x (String.fromFloat barX)
            , SA.y (String.fromFloat (barY + 2))
            , SA.width (String.fromFloat barWidth)
            , SA.height (String.fromFloat (barHeight - 2))
            , SA.fill color
            ]
            []
        -- Rounded top cap (2px tall, 2px radius)
        , rect
            [ SA.x (String.fromFloat barX)
            , SA.y (String.fromFloat barY)
            , SA.width (String.fromFloat barWidth)
            , SA.height "4"
            , SA.rx "2"
            , SA.ry "2"
            , SA.fill color
            ]
            []
        ]


{-| Horizontal grid lines at tick positions. -}
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


styledAxis : Svg msg -> Svg msg
styledAxis axisEl =
    g
        [ SA.style ("color: " ++ PF.labelText ++ "; fill: " ++ PF.labelText ++ ";")
        ]
        [ axisEl ]


-- HELPERS


pfColor : Int -> String
pfColor idx =
    PF.multiOrdered
        |> List.drop (modBy (List.length PF.multiOrdered) idx)
        |> List.head
        |> Maybe.withDefault PF.primary
