module PF6.Charts.Internal.Skeleton exposing (view, viewCircle, viewPie, viewSparkline, shimmerStyle)

{-| Internal skeleton/loading placeholder rendering. Not part of the public API.
-}

import Html exposing (Html)
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| CSS keyframes + class for the shimmer animation. Inject once per SVG.
-}
shimmerStyle : Svg msg
shimmerStyle =
    Svg.node "style"
        []
        [ Svg.text
            """
            @keyframes pf-shimmer {
              0%   { opacity: 0.35; }
              50%  { opacity: 0.65; }
              100% { opacity: 0.35; }
            }
            .pf-skeleton { animation: pf-shimmer 1.4s ease-in-out infinite; }
            """
        ]


{-| Render a generic Cartesian chart skeleton (axes + area fill placeholder).
Used by Area, Line, Bar, Scatter, Stack, Threshold, Bullet.
-}
view : Int -> Int -> Html msg
view w h =
    let
        padTop =
            20

        padRight =
            20

        padBottom =
            40

        padLeft =
            50

        innerW =
            w - padLeft - padRight

        innerH =
            h - padTop - padBottom

        barColor =
            "#d2d2d2"

        axisColor =
            "#e8e8e8"
    in
    Svg.svg
        [ SA.width (String.fromInt w)
        , SA.height (String.fromInt h)
        , SA.viewBox ("0 0 " ++ String.fromInt w ++ " " ++ String.fromInt h)
        ]
        [ shimmerStyle

        -- Y-axis line
        , Svg.rect
            [ SA.x (String.fromInt (padLeft - 1))
            , SA.y (String.fromInt padTop)
            , SA.width "2"
            , SA.height (String.fromInt innerH)
            , SA.fill axisColor
            , SA.class "pf-skeleton"
            ]
            []

        -- X-axis line
        , Svg.rect
            [ SA.x (String.fromInt padLeft)
            , SA.y (String.fromInt (padTop + innerH))
            , SA.width (String.fromInt innerW)
            , SA.height "2"
            , SA.fill axisColor
            , SA.class "pf-skeleton"
            ]
            []

        -- Main content area placeholder
        , Svg.rect
            [ SA.x (String.fromInt (padLeft + 4))
            , SA.y (String.fromInt (padTop + round (toFloat innerH * 0.2)))
            , SA.width (String.fromInt (innerW - 8))
            , SA.height (String.fromInt (round (toFloat innerH * 0.7)))
            , SA.fill barColor
            , SA.rx "4"
            , SA.class "pf-skeleton"
            ]
            []

        -- Y-axis tick placeholders
        , Svg.g [] (yTickPlaceholders padLeft padTop innerH axisColor)

        -- X-axis tick placeholders
        , Svg.g [] (xTickPlaceholders padLeft padTop padBottom innerW innerH axisColor)
        ]


yTickPlaceholders : Int -> Int -> Int -> String -> List (Svg msg)
yTickPlaceholders padLeft padTop innerH color =
    List.map
        (\i ->
            let
                y =
                    padTop + round (toFloat innerH * (toFloat i / 5))
            in
            Svg.rect
                [ SA.x (String.fromInt (padLeft - 28))
                , SA.y (String.fromInt (y - 4))
                , SA.width "24"
                , SA.height "8"
                , SA.fill color
                , SA.rx "3"
                , SA.class "pf-skeleton"
                ]
                []
        )
        (List.range 0 5)


xTickPlaceholders : Int -> Int -> Int -> Int -> Int -> String -> List (Svg msg)
xTickPlaceholders padLeft padTop padBottom innerW innerH color =
    List.map
        (\i ->
            let
                x =
                    padLeft + round (toFloat innerW * (toFloat i / 5))
            in
            Svg.rect
                [ SA.x (String.fromInt (x - 12))
                , SA.y (String.fromInt (padTop + innerH + 10))
                , SA.width "24"
                , SA.height "8"
                , SA.fill color
                , SA.rx "3"
                , SA.class "pf-skeleton"
                ]
                []
        )
        (List.range 0 5)


{-| Circular/donut chart skeleton.
-}
viewCircle : Int -> Html msg
viewCircle size =
    let
        cx =
            toFloat size / 2

        cy =
            toFloat size / 2

        r =
            cx - 10

        innerR =
            r * 0.65
    in
    Svg.svg
        [ SA.width (String.fromInt size)
        , SA.height (String.fromInt size)
        , SA.viewBox ("0 0 " ++ String.fromInt size ++ " " ++ String.fromInt size)
        ]
        [ shimmerStyle
        , Svg.circle
            [ SA.cx (String.fromFloat cx)
            , SA.cy (String.fromFloat cy)
            , SA.r (String.fromFloat r)
            , SA.fill "#d2d2d2"
            , SA.class "pf-skeleton"
            ]
            []
        , Svg.circle
            [ SA.cx (String.fromFloat cx)
            , SA.cy (String.fromFloat cy)
            , SA.r (String.fromFloat innerR)
            , SA.fill "#ffffff"
            ]
            []
        ]


{-| Pie chart skeleton (solid circle).
-}
viewPie : Int -> Html msg
viewPie size =
    let
        cx =
            toFloat size / 2

        cy =
            toFloat size / 2

        r =
            cx - 10
    in
    Svg.svg
        [ SA.width (String.fromInt size)
        , SA.height (String.fromInt size)
        , SA.viewBox ("0 0 " ++ String.fromInt size ++ " " ++ String.fromInt size)
        ]
        [ shimmerStyle
        , Svg.circle
            [ SA.cx (String.fromFloat cx)
            , SA.cy (String.fromFloat cy)
            , SA.r (String.fromFloat r)
            , SA.fill "#d2d2d2"
            , SA.class "pf-skeleton"
            ]
            []
        ]


{-| Sparkline skeleton (tiny inline line).
-}
viewSparkline : Int -> Int -> Html msg
viewSparkline w h =
    Svg.svg
        [ SA.width (String.fromInt w)
        , SA.height (String.fromInt h)
        , SA.viewBox ("0 0 " ++ String.fromInt w ++ " " ++ String.fromInt h)
        ]
        [ shimmerStyle
        , Svg.rect
            [ SA.x "2"
            , SA.y "2"
            , SA.width (String.fromInt (w - 4))
            , SA.height (String.fromInt (h - 4))
            , SA.fill "#d2d2d2"
            , SA.rx "3"
            , SA.class "pf-skeleton"
            ]
            []
        ]
