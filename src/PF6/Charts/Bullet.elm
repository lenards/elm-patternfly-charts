module PF6.Charts.Bullet exposing
    ( BulletChart
    , fromData
    , withWidth, withHeight
    , withTheme
    , withTitle
    , withUnit
    , toSvg
    )

{-| Bullet chart — a horizontal bar showing actual vs target with
qualitative range bands (poor / needs improvement / good).

A compact alternative to gauge charts for showing progress against a goal.


# Type

@docs BulletChart


# Constructor

@docs fromData


# Modifiers

@docs withWidth, withHeight
@docs withTheme
@docs withTitle
@docs withUnit


# Renderer

@docs toSvg

-}

import Html exposing (Html)
import Html.Attributes as HA
import PF6.Charts.Colors as Colors
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (ContinuousScale)
import Svg exposing (Svg)
import Svg.Attributes as SA
import Axis


{-| An opaque bullet chart configuration.
-}
type BulletChart
    = BulletChart Config


type alias Config =
    { width : Int
    , height : Int
    , actual : Float
    , target : Float
    , max : Float
    , title : String
    , subtitle : String
    , unit : String
    , theme : Theme
    }


defaultConfig : Float -> Float -> Float -> Config
defaultConfig actual target max =
    { width = 450
    , height = 120
    , actual = actual
    , target = target
    , max = max
    , title = ""
    , subtitle = ""
    , unit = ""
    , theme = Theme.light
    }


{-| Create a bullet chart.

Arguments: actual value, target value, maximum value (axis extent).

    chart =
        Bullet.fromData 62 75 100

This shows an actual value of 62, a target of 75, on a 0–100 scale.

-}
fromData : Float -> Float -> Float -> BulletChart
fromData actual target max =
    BulletChart (defaultConfig actual target max)


{-| Set chart width in pixels. Default: 450.
-}
withWidth : Int -> BulletChart -> BulletChart
withWidth w (BulletChart cfg) =
    BulletChart { cfg | width = w }


{-| Set chart height in pixels. Default: 120.
-}
withHeight : Int -> BulletChart -> BulletChart
withHeight h (BulletChart cfg) =
    BulletChart { cfg | height = h }


{-| Apply a `Theme`.
-}
withTheme : Theme -> BulletChart -> BulletChart
withTheme theme (BulletChart cfg) =
    BulletChart { cfg | theme = theme }


{-| Set the chart title (rendered left of the bar).
-}
withTitle : String -> BulletChart -> BulletChart
withTitle t (BulletChart cfg) =
    BulletChart { cfg | title = t }


{-| Set the unit label appended to axis tick values.
-}
withUnit : String -> BulletChart -> BulletChart
withUnit u (BulletChart cfg) =
    BulletChart { cfg | unit = u }


{-| Render to `Html msg`.
-}
toSvg : BulletChart -> Html msg
toSvg (BulletChart cfg) =
    let
        titleWidth =
            if cfg.title /= "" then
                90
            else
                0

        padTop =
            20

        padBottom =
            35

        padLeft =
            titleWidth + 10

        padRight =
            20

        innerW =
            cfg.width - padLeft - padRight

        innerH =
            cfg.height - padTop - padBottom

        barH =
            toFloat innerH * 0.45

        barY =
            toFloat innerH / 2 - barH / 2

        rangeH =
            toFloat innerH * 0.8

        rangeY =
            toFloat innerH / 2 - rangeH / 2

        scale : ContinuousScale Float
        scale =
            Scale.linear ( 0, toFloat innerW ) ( 0, cfg.max )

        actualW =
            Scale.convert scale cfg.actual

        targetX =
            Scale.convert scale cfg.target

        labelColor =
            Theme.labelColor cfg.theme

        font =
            Theme.fontFamily cfg.theme

        -- Qualitative ranges: poor (0-50%), needs improvement (50-75%), good (75-100%)
        range1End =
            cfg.max * 0.5

        range2End =
            cfg.max * 0.75

        range1W =
            Scale.convert scale range1End

        range2W =
            Scale.convert scale range2End

        range3W =
            toFloat innerW

        rangeAlpha1 =
            0.15

        rangeAlpha2 =
            0.25

        rangeAlpha3 =
            0.35
    in
    Html.div
        [ HA.style "display" "inline-block"
        , HA.style "font-family" font
        ]
        [ Svg.svg
            [ SA.width (String.fromInt cfg.width)
            , SA.height (String.fromInt cfg.height)
            , SA.viewBox
                ("0 0 "
                    ++ String.fromInt cfg.width
                    ++ " "
                    ++ String.fromInt cfg.height
                )
            , SA.style
                ("font-family: "
                    ++ font
                    ++ "; font-size: 12px; fill: "
                    ++ labelColor
                    ++ ";"
                )
            ]
            [ -- Title label on the left
              if cfg.title /= "" then
                Svg.text_
                    [ SA.x (String.fromInt (titleWidth // 2))
                    , SA.y (String.fromInt (cfg.height // 2 - 4))
                    , SA.textAnchor "middle"
                    , SA.fontSize "13"
                    , SA.fontWeight "600"
                    , SA.fill labelColor
                    ]
                    [ Svg.text cfg.title ]

              else
                Svg.text ""
            , Svg.g
                [ SA.transform
                    ("translate("
                        ++ String.fromInt padLeft
                        ++ ","
                        ++ String.fromInt padTop
                        ++ ")"
                    )
                ]
                [ -- Range band 1: poor (lightest)
                  Svg.rect
                    [ SA.x "0"
                    , SA.y (String.fromFloat rangeY)
                    , SA.width (String.fromFloat range1W)
                    , SA.height (String.fromFloat rangeH)
                    , SA.fill Colors.primary
                    , SA.opacity (String.fromFloat rangeAlpha1)
                    , SA.rx "2"
                    ]
                    []

                -- Range band 2: needs improvement
                , Svg.rect
                    [ SA.x (String.fromFloat range1W)
                    , SA.y (String.fromFloat rangeY)
                    , SA.width (String.fromFloat (range2W - range1W))
                    , SA.height (String.fromFloat rangeH)
                    , SA.fill Colors.primary
                    , SA.opacity (String.fromFloat rangeAlpha2)
                    ]
                    []

                -- Range band 3: good (darkest)
                , Svg.rect
                    [ SA.x (String.fromFloat range2W)
                    , SA.y (String.fromFloat rangeY)
                    , SA.width (String.fromFloat (range3W - range2W))
                    , SA.height (String.fromFloat rangeH)
                    , SA.fill Colors.primary
                    , SA.opacity (String.fromFloat rangeAlpha3)
                    , SA.rx "2"
                    ]
                    []

                -- Actual bar
                , Svg.rect
                    [ SA.x "0"
                    , SA.y (String.fromFloat barY)
                    , SA.width (String.fromFloat actualW)
                    , SA.height (String.fromFloat barH)
                    , SA.fill Colors.primary
                    , SA.rx "2"
                    ]
                    []

                -- Target marker (vertical line)
                , Svg.line
                    [ SA.x1 (String.fromFloat targetX)
                    , SA.x2 (String.fromFloat targetX)
                    , SA.y1 (String.fromFloat (rangeY - 4))
                    , SA.y2 (String.fromFloat (rangeY + rangeH + 4))
                    , SA.stroke labelColor
                    , SA.strokeWidth "3"
                    ]
                    []

                -- X axis
                , Svg.g
                    [ SA.transform ("translate(0," ++ String.fromInt innerH ++ ")") ]
                    [ Axis.bottom
                        [ Axis.tickCount 5
                        , Axis.tickFormat (\v -> String.fromFloat v ++ cfg.unit)
                        ]
                        scale
                    ]
                ]
            ]
        ]
