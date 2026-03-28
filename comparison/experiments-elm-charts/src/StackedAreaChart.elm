module StackedAreaChart exposing (view)

{-| Multi-tenant network throughput — stacked area chart.

Demonstrates:
  - Multiple stacked series with PF v6 multi-unordered colors
  - Great for showing component breakdown of a total (e.g. per-project bandwidth)
  - PF design guideline: area + line charts use multi-UNORDERED scale

Scenario: Outbound bandwidth (Mbps) across 3 OpenStack projects over 90 min.

This mirrors PatternFly's multi-series area chart pattern at
https://www.patternfly.org/charts/area-chart/
-}

import Chart as C
import Chart.Attributes as CA
import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA
import PF.Colors as PF


-- DATA


type alias BandwidthSample =
    { minuteOffset : Float
    , projectA : Float
    , projectB : Float
    , projectC : Float
    }


bandwidthData : List BandwidthSample
bandwidthData =
    [ { minuteOffset = 0, projectA = 120, projectB = 80, projectC = 40 }
    , { minuteOffset = 15, projectA = 145, projectB = 95, projectC = 55 }
    , { minuteOffset = 30, projectA = 180, projectB = 110, projectC = 48 }
    , { minuteOffset = 45, projectA = 155, projectB = 130, projectC = 72 }
    , { minuteOffset = 60, projectA = 200, projectB = 115, projectC = 61 }
    , { minuteOffset = 75, projectA = 175, projectB = 140, projectC = 83 }
    , { minuteOffset = 90, projectA = 210, projectB = 125, projectC = 70 }
    ]


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
            [ text "Outbound Bandwidth" ]
        , p
            [ HA.style "font-size" "12px"
            , HA.style "color" "#707070"
            , HA.style "margin" "0 0 16px 0"
            ]
            [ text "Mbps per project · last 90 minutes" ]
        , chart
        , legend
        ]


chart : Html msg
chart =
    C.chart
        [ CA.width 620
        , CA.height 300
        , CA.margin { top = 10, bottom = 40, left = 60, right = 20 }
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
            , CA.format (\t -> String.fromFloat t ++ "m")
            ]
        , C.yAxis [ CA.color PF.axisLine ]
        , C.yLabels
            [ CA.color PF.labelText
            , CA.fontSize 12
            , CA.format (\v -> String.fromFloat v ++ " Mbps")
            , CA.amount 6
            ]
        , C.series .minuteOffset
            [ C.interpolated .projectA
                [ CA.color (pfUnorderedColor 0)
                , CA.width 2
                , CA.monotone
                , CA.opacity 0.12
                ]
                []
            , C.interpolated .projectB
                [ CA.color (pfUnorderedColor 1)
                , CA.width 2
                , CA.monotone
                , CA.opacity 0.12
                ]
                []
            , C.interpolated .projectC
                [ CA.color (pfUnorderedColor 2)
                , CA.width 2
                , CA.monotone
                , CA.opacity 0.12
                ]
                []
            ]
            bandwidthData
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
        (List.indexedMap (\_ item -> legendItem item)
            [ ( "project-alpha", 0 )
            , ( "project-beta", 1 )
            , ( "project-gamma", 2 )
            ]
        )


legendItem : ( String, Int ) -> Html msg
legendItem ( label, colorIdx ) =
    div
        [ HA.style "display" "flex"
        , HA.style "align-items" "center"
        , HA.style "gap" "6px"
        ]
        [ div
            [ HA.style "width" "12px"
            , HA.style "height" "3px"
            , HA.style "background-color" (pfUnorderedColor colorIdx)
            ]
            []
        , text label
        ]


-- HELPERS


pfUnorderedColor : Int -> String
pfUnorderedColor idx =
    PF.multiUnordered
        |> List.drop idx
        |> List.head
        |> Maybe.withDefault PF.primary
