module AreaChart exposing (view)

{-| CPU utilization over time — elm-charts implementation.

Demonstrates:
  - Single-series area chart with PF v6 blue color scale
  - PatternFly axis styling (light gray grid lines, no border)
  - Monotone interpolation for smooth server metric curves
  - Tooltip on hover

This mirrors the PatternFly "Area chart" example at
https://www.patternfly.org/charts/area-chart/
-}

import Chart as C
import Chart.Attributes as CA
import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA
import PF.Colors as PF


-- DATA


{-| Simulated CPU utilization (%) for a single OpenStack compute node,
sampled every 10 minutes over a 2-hour window.
-}
type alias Sample =
    { minuteOffset : Float
    , cpuPercent : Float
    }


cpuData : List Sample
cpuData =
    [ { minuteOffset = 0, cpuPercent = 34 }
    , { minuteOffset = 10, cpuPercent = 42 }
    , { minuteOffset = 20, cpuPercent = 58 }
    , { minuteOffset = 30, cpuPercent = 71 }
    , { minuteOffset = 40, cpuPercent = 65 }
    , { minuteOffset = 50, cpuPercent = 53 }
    , { minuteOffset = 60, cpuPercent = 48 }
    , { minuteOffset = 70, cpuPercent = 62 }
    , { minuteOffset = 80, cpuPercent = 78 }
    , { minuteOffset = 90, cpuPercent = 85 }
    , { minuteOffset = 100, cpuPercent = 74 }
    , { minuteOffset = 110, cpuPercent = 61 }
    , { minuteOffset = 120, cpuPercent = 55 }
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
            [ text "CPU Utilization" ]
        , p
            [ HA.style "font-size" "12px"
            , HA.style "color" "#707070"
            , HA.style "margin" "0 0 16px 0"
            ]
            [ text "compute-node-01 · last 2 hours" ]
        , chart
        ]


chart : Html msg
chart =
    C.chart
        [ CA.width 600
        , CA.height 300
        , CA.margin { top = 10, bottom = 40, left = 50, right = 20 }
        , CA.htmlAttrs
            [ HA.style "overflow" "visible" ]
        ]
        [ -- Horizontal grid lines in PF gray
          C.grid
            [ CA.color PF.gridLine
            , CA.width 1
            ]

        -- X axis: time labels (minutes)
        , C.xAxis
            [ CA.color PF.axisLine ]
        , C.xLabels
            [ CA.color PF.labelText
            , CA.fontSize 12
            , CA.format (\t -> String.fromFloat t ++ "m")
            , CA.amount 7
            ]

        -- Y axis: percentage
        , C.yAxis
            [ CA.color PF.axisLine ]
        , C.yLabels
            [ CA.color PF.labelText
            , CA.fontSize 12
            , CA.format (\v -> String.fromFloat v ++ "%")
            , CA.amount 6
            ]

        -- CPU series: filled area + line on top.
        -- CA.opacity sets the fill-under-line opacity (0 = line only, 1 = solid fill).
        , C.series .minuteOffset
            [ C.interpolated .cpuPercent
                [ CA.color PF.primary
                , CA.width 2
                , CA.monotone
                , CA.opacity 0.15
                ]
                []
            ]
            cpuData
        ]
