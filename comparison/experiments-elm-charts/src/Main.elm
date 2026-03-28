module Main exposing (main)

{-| PatternFly v6 Charts — elm-charts Experiments

A gallery of PatternFly-styled charts using terezka/elm-charts.
Demonstrates area, bar, and stacked area charts aligned with
PF v6 design guidelines.

Target use case: OpenStack / Exosphere infrastructure dashboards.
-}

import AreaChart
import BarChart
import Browser
import Html exposing (Html, a, div, footer, h1, h3, hr, li, p, text, ul)
import Html.Attributes as HA
import Html.Events as HE
import StackedAreaChart


-- MODEL


type ActiveChart
    = AreaChartView
    | BarChartView
    | StackedAreaView


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
            [ text "PF v6 Charts · elm-charts experiment" ]
        , p
            [ HA.style "margin" "4px 0 0 0"
            , HA.style "font-size" "13px"
            , HA.style "color" "#a3a3a3"
            ]
            [ text "terezka/elm-charts · PatternFly v6 design tokens" ]
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
        , navTab "Stacked Area" StackedAreaView active
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

                StackedAreaView ->
                    StackedAreaChart.view
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
                [ p [] [ text "Area charts show trends over continuous time. The fill (opacity 0.15) emphasizes the magnitude of the metric while the 2px line preserves readability. PF v6 uses monotone interpolation for smooth server metric curves." ]
                ]

            BarChartView ->
                [ p [] [ text "Bar charts compare discrete categories. PF v6 multi-ordered color scale maximizes contrast between adjacent bars. Rounded tops (2px radius) match the contemporary PatternFly aesthetic." ]
                ]

            StackedAreaView ->
                [ p [] [ text "Stacked area charts show part-to-whole relationships over time. PF v6 uses the multi-unordered scale so each series remains visually distinct across the full time axis." ]
                ]
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
        [ text "PatternFly v6 design system · terezka/elm-charts · Elm 0.19.1" ]


-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
