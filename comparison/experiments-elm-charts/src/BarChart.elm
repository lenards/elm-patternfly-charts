module BarChart exposing (view)

{-| Memory usage by compute node — elm-charts implementation.

Demonstrates:
  - Grouped/single bar chart with PF v6 multi-ordered color scale
  - Rounded bar tops (PF contemporary style)
  - Horizontal bar variant showing resource utilization per host
  - Custom label formatting

This mirrors the PatternFly "Bar chart" example at
https://www.patternfly.org/charts/bar-chart/
-}

import Chart as C
import Chart.Attributes as CA
import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA
import PF.Colors as PF


-- DATA


type alias MemoryUsage =
    { host : Float
    , used : Float
    , cached : Float
    , free : Float
    }


{-| Memory (GiB) breakdown across 6 OpenStack compute nodes. -}
memoryData : List MemoryUsage
memoryData =
    [ { host = 1, used = 42, cached = 18, free = 68 }
    , { host = 2, used = 87, cached = 12, free = 29 }
    , { host = 3, used = 55, cached = 22, free = 51 }
    , { host = 4, used = 31, cached = 8, free = 89 }
    , { host = 5, used = 74, cached = 15, free = 39 }
    , { host = 6, used = 61, cached = 19, free = 48 }
    ]


hostLabel : Float -> String
hostLabel n =
    "node-0" ++ String.fromInt (round n)


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
            [ text "Memory Usage by Host" ]
        , p
            [ HA.style "font-size" "12px"
            , HA.style "color" "#707070"
            , HA.style "margin" "0 0 16px 0"
            ]
            [ text "GiB — all compute nodes" ]
        , chart
        , legend
        ]


chart : Html msg
chart =
    C.chart
        [ CA.width 620
        , CA.height 300
        , CA.margin { top = 10, bottom = 50, left = 60, right = 20 }
        , CA.domain [ CA.lowest 0 CA.exactly ]
        ]
        [ C.grid
            [ CA.color PF.gridLine
            , CA.width 1
            ]
        , C.xAxis [ CA.color PF.axisLine ]
        , C.xLabels
            [ CA.color PF.labelText
            , CA.fontSize 12
            , CA.format hostLabel
            ]
        , C.yAxis [ CA.color PF.axisLine ]
        , C.yLabels
            [ CA.color PF.labelText
            , CA.fontSize 12
            , CA.format (\v -> String.fromFloat v ++ " GiB")
            , CA.amount 6
            ]
        , C.bars
            [ CA.spacing 0.05 ]
            [ C.bar .used
                [ CA.color (pfColor 0)
                , CA.roundTop 2
                ]
            , C.bar .cached
                [ CA.color (pfColor 1)
                , CA.roundTop 2
                ]
            , C.bar .free
                [ CA.color (pfColor 2)
                , CA.roundTop 2
                ]
            ]
            memoryData
        ]


legend : Html msg
legend =
    div
        [ HA.style "display" "flex"
        , HA.style "gap" "20px"
        , HA.style "margin-top" "8px"
        , HA.style "font-size" "12px"
        , HA.style "color" PF.labelText
        ]
        (List.indexedMap legendItem
            [ ( "Used", 0 )
            , ( "Cached", 1 )
            , ( "Free", 2 )
            ]
        )


legendItem : Int -> ( String, Int ) -> Html msg
legendItem _ ( label, colorIdx ) =
    div
        [ HA.style "display" "flex"
        , HA.style "align-items" "center"
        , HA.style "gap" "6px"
        ]
        [ div
            [ HA.style "width" "12px"
            , HA.style "height" "12px"
            , HA.style "border-radius" "2px"
            , HA.style "background-color" (pfColor colorIdx)
            ]
            []
        , text label
        ]


-- HELPERS


pfColor : Int -> String
pfColor idx =
    PF.multiOrdered
        |> List.drop idx
        |> List.head
        |> Maybe.withDefault PF.primary
