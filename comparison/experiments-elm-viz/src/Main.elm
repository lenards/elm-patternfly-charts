module Main exposing (main)

{-| PatternFly v6 Charts — elm-visualization Experiments

A gallery of PatternFly-styled charts using gampleman/elm-visualization.
This is the "D3-style" library: low-level primitives (Scale, Shape, Axis)
that give you complete control at the cost of more boilerplate.

Contrast with experiments-elm-charts which uses terezka/elm-charts for
a higher-level API.
-}

import AreaChart
import BarChart
import Browser
import DonutChart
import Html exposing (Html, div, h1, p, text)
import Html.Attributes as HA
import Html.Events as HE


-- MODEL


type ActiveChart
    = AreaChartView
    | BarChartView
    | DonutChartView


type alias Model =
    { active : ActiveChart }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { active = AreaChartView }, Cmd.none )


-- UPDATE


type Msg
    = ShowChart ActiveChart


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ShowChart chart ->
            ( { model | active = chart }, Cmd.none )


-- VIEW


view : Model -> Html Msg
view model =
    div
        [ HA.style "font-family" "'Red Hat Text', Helvetica, Arial, sans-serif"
        , HA.style "background" "#f2f2f2"
        , HA.style "min-height" "100vh"
        , HA.style "margin" "0"
        ]
        [ header
        , nav model.active
        , mainContent model
        , footerView
        ]


header : Html msg
header =
    div
        [ HA.style "background" "#1f1f1f"
        , HA.style "color" "#ffffff"
        , HA.style "padding" "16px 32px"
        ]
        [ h1
            [ HA.style "margin" "0"
            , HA.style "font-size" "20px"
            , HA.style "font-weight" "400"
            ]
            [ text "PF v6 Charts · elm-visualization experiment" ]
        , p
            [ HA.style "margin" "4px 0 0 0"
            , HA.style "font-size" "13px"
            , HA.style "color" "#a3a3a3"
            ]
            [ text "gampleman/elm-visualization · Scale + Shape + Axis primitives" ]
        ]


nav : ActiveChart -> Html Msg
nav active =
    div
        [ HA.style "background" "#ffffff"
        , HA.style "border-bottom" "1px solid #c7c7c7"
        , HA.style "padding" "0 32px"
        , HA.style "display" "flex"
        , HA.style "gap" "0"
        ]
        [ navTab "Area Chart" AreaChartView active
        , navTab "Bar Chart" BarChartView active
        , navTab "Donut Chart" DonutChartView active
        ]


navTab : String -> ActiveChart -> ActiveChart -> Html Msg
navTab label target active =
    let
        isActive =
            target == active

        borderColor =
            if isActive then
                "#0066cc"
            else
                "transparent"

        textColor =
            if isActive then
                "#0066cc"
            else
                "#383838"
    in
    div
        [ HA.style "padding" "12px 20px"
        , HA.style "border-bottom" ("3px solid " ++ borderColor)
        , HA.style "color" textColor
        , HA.style "font-size" "14px"
        , HA.style "cursor" "pointer"
        , HA.style "user-select" "none"
        , HE.onClick (ShowChart target)
        ]
        [ text label ]


mainContent : Model -> Html Msg
mainContent model =
    div
        [ HA.style "padding" "32px"
        , HA.style "max-width" "900px"
        ]
        [ div
            [ HA.style "background" "#ffffff"
            , HA.style "border" "1px solid #c7c7c7"
            , HA.style "border-radius" "4px"
            ]
            [ case model.active of
                AreaChartView ->
                    AreaChart.view

                BarChartView ->
                    BarChart.view

                DonutChartView ->
                    DonutChart.view
            ]
        , chartDescription model.active
        ]


chartDescription : ActiveChart -> Html msg
chartDescription active =
    div
        [ HA.style "margin-top" "16px"
        , HA.style "font-size" "13px"
        , HA.style "color" "#4d4d4d"
        , HA.style "line-height" "1.6"
        ]
        (case active of
            AreaChartView ->
                [ p [] [ text "elm-visualization area chart: Scale.linear maps data → SVG coordinates. Shape.area + Shape.line generate SVG path strings. Axis.bottom/left render tick marks. Every element is under your control — useful when you need custom behavior beyond what higher-level libraries support." ] ]

            BarChartView ->
                [ p [] [ text "Scale.band maps categorical strings to pixel offsets with configurable padding. Each bar is a manual rect element. Rounded tops use a trick: a 4px rx/ry rect on top of a square-bottom rect." ] ]

            DonutChartView ->
                [ p [] [ text "Shape.pie computes start/end angles from values. Shape.arc renders each slice as a path. The hollow center (innerRadius = 60% of outer) is the donut shape. Central text is a PF pattern for showing the aggregate metric — total count, percentage used, etc." ] ]
        )


footerView : Html msg
footerView =
    div
        [ HA.style "padding" "24px 32px"
        , HA.style "font-size" "12px"
        , HA.style "color" "#8c8c8c"
        , HA.style "border-top" "1px solid #c7c7c7"
        , HA.style "margin-top" "32px"
        ]
        [ text "PatternFly v6 design system · gampleman/elm-visualization · Elm 0.19.1" ]


-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
