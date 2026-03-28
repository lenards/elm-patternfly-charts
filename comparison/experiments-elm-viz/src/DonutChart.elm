module DonutChart exposing (view)

{-| vCPU allocation donut chart — elm-visualization (low-level) implementation.

Demonstrates:
  - Shape.pie for computing arc angles from data
  - Shape.arc for rendering individual slices
  - Hollow center (innerRadius) for the donut shape
  - Central title text (PF pattern: show total or key metric in center)
  - PF v6 multi-ordered color scale for categorical segments

This is the chart type NOT available in elm-charts (which focuses on Cartesian
charts). elm-visualization's Shape module handles it directly.

Scenario: vCPU allocation breakdown across OpenStack project flavors.
-}

import Path
import Shape exposing (Arc, defaultPieConfig)
import Svg exposing (Svg, g, svg, text_)
import Svg.Attributes as SA
import Html exposing (Html, div, h2, p, text)
import Html.Attributes as HA
import PF.Colors as PF


-- DIMENSIONS


size : Float
size =
    280


radius : Float
radius =
    min size size / 2 - 10


innerRadius : Float
innerRadius =
    radius * 0.6


-- DATA


type alias Segment =
    { label : String
    , vcpus : Float
    }


allocationData : List Segment
allocationData =
    [ { label = "m1.large", vcpus = 480 }
    , { label = "m1.medium", vcpus = 320 }
    , { label = "m1.xlarge", vcpus = 240 }
    , { label = "m1.small", vcpus = 160 }
    , { label = "Reserved", vcpus = 100 }
    ]


totalVcpus : Float
totalVcpus =
    List.foldl (\s acc -> acc + s.vcpus) 0 allocationData


-- VIEW


view : Html msg
view =
    div
        [ HA.style "font-family" "'Red Hat Text', Helvetica, Arial, sans-serif"
        , HA.style "padding" "24px"
        , HA.style "display" "flex"
        , HA.style "gap" "32px"
        , HA.style "align-items" "center"
        ]
        [ chart
        , legend
        ]


chart : Html msg
chart =
    svg
        [ SA.width (String.fromFloat size)
        , SA.height (String.fromFloat size)
        , SA.style "font-family: 'Red Hat Text', Helvetica, Arial, sans-serif; overflow: visible;"
        ]
        [ g [ SA.transform ("translate(" ++ String.fromFloat (size / 2) ++ "," ++ String.fromFloat (size / 2) ++ ")") ]
            (slices ++ [ centerText ])
        ]


slices : List (Svg msg)
slices =
    let
        values =
            List.map .vcpus allocationData

        pieConfig =
            { defaultPieConfig
                | outerRadius = radius
                , innerRadius = innerRadius
                , padAngle = 0.02
                , sortingFn = \_ _ -> EQ  -- preserve data order
            }

        arcs =
            Shape.pie pieConfig values
    in
    List.indexedMap renderSlice arcs


renderSlice : Int -> Arc -> Svg msg
renderSlice idx arc =
    Path.element (Shape.arc arc)
        [ SA.fill (pfColor idx)
        , SA.stroke "#ffffff"
        , SA.strokeWidth "2"
        ]


{-| Central text showing total vCPUs — a classic PatternFly donut pattern
for showing the key metric (remaining capacity, percentage used, etc.). -}
centerText : Svg msg
centerText =
    g []
        [ text_
            [ SA.textAnchor "middle"
            , SA.dominantBaseline "middle"
            , SA.y "-10"
            , SA.fontSize "28"
            , SA.fontWeight "600"
            , SA.fill "#1f1f1f"
            ]
            [ Svg.text (String.fromFloat totalVcpus) ]
        , text_
            [ SA.textAnchor "middle"
            , SA.dominantBaseline "middle"
            , SA.y "14"
            , SA.fontSize "12"
            , SA.fill "#707070"
            ]
            [ Svg.text "vCPUs allocated" ]
        ]


-- LEGEND


legend : Html msg
legend =
    div
        [ HA.style "font-size" "13px"
        , HA.style "color" PF.labelText
        , HA.style "display" "flex"
        , HA.style "flex-direction" "column"
        , HA.style "gap" "10px"
        ]
        (List.indexedMap legendRow allocationData)


legendRow : Int -> Segment -> Html msg
legendRow idx segment =
    div
        [ HA.style "display" "flex"
        , HA.style "align-items" "center"
        , HA.style "gap" "8px"
        ]
        [ div
            [ HA.style "width" "12px"
            , HA.style "height" "12px"
            , HA.style "border-radius" "2px"
            , HA.style "background-color" (pfColor idx)
            , HA.style "flex-shrink" "0"
            ]
            []
        , div []
            [ div [] [ text segment.label ]
            , div
                [ HA.style "color" "#8c8c8c"
                , HA.style "font-size" "12px"
                ]
                [ text (String.fromFloat segment.vcpus ++ " vCPUs") ]
            ]
        ]


-- HELPERS


pfColor : Int -> String
pfColor idx =
    PF.multiOrdered
        |> List.drop (modBy (List.length PF.multiOrdered) idx)
        |> List.head
        |> Maybe.withDefault PF.primary
