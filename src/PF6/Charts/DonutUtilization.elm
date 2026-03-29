module PF6.Charts.DonutUtilization exposing
    ( DonutUtilization
    , fromData
    , withSize
    , withTheme
    , withTitle
    , withWarningThreshold
    , withDangerThreshold
    , withLoading
    , toSvg
    )

{-| Donut utilization chart — a single-metric donut showing used vs available.

A specialized PatternFly donut variant for capacity/quota displays. Shows one
arc for the "used" portion; the rest is unfilled background. Colors shift to
warning/danger as thresholds are crossed.


# Type

@docs DonutUtilization


# Constructor

@docs fromData


# Modifiers

@docs withSize
@docs withTheme
@docs withTitle
@docs withWarningThreshold
@docs withDangerThreshold
@docs withLoading


# Renderer

@docs toSvg

-}

import Html exposing (Html)
import Html.Attributes as HA
import Path
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| An opaque donut utilization chart configuration.
-}
type DonutUtilization
    = DonutUtilization Config


type alias Config =
    { size : Int
    , used : Float
    , total : Float
    , unit : String
    , title : String
    , theme : Theme
    , warningThreshold : Float
    , dangerThreshold : Float
    , loading : Bool
    }


defaultConfig : Float -> Float -> Config
defaultConfig used total =
    { size = 230
    , used = used
    , total = total
    , unit = ""
    , title = ""
    , theme = Theme.light
    , warningThreshold = 75
    , dangerThreshold = 90
    , loading = False
    }


{-| Create a donut utilization chart.

    chart =
        DonutUtilization.fromData 48 100

This shows 48 out of 100 (48%) utilization.

-}
fromData : Float -> Float -> DonutUtilization
fromData used total =
    DonutUtilization (defaultConfig used total)


{-| Set the overall SVG size. Default: 230.
-}
withSize : Int -> DonutUtilization -> DonutUtilization
withSize s (DonutUtilization cfg) =
    DonutUtilization { cfg | size = s }


{-| Apply a `Theme`.
-}
withTheme : Theme -> DonutUtilization -> DonutUtilization
withTheme theme (DonutUtilization cfg) =
    DonutUtilization { cfg | theme = theme }


{-| Set the chart title rendered below the donut.
-}
withTitle : String -> DonutUtilization -> DonutUtilization
withTitle t (DonutUtilization cfg) =
    DonutUtilization { cfg | title = t }


{-| Set the warning threshold percentage. Default: 75.

Above this percentage, the arc turns gold/yellow.

-}
withWarningThreshold : Float -> DonutUtilization -> DonutUtilization
withWarningThreshold t (DonutUtilization cfg) =
    DonutUtilization { cfg | warningThreshold = t }


{-| Set the danger threshold percentage. Default: 90.

Above this percentage, the arc turns red/orange.

-}
withDangerThreshold : Float -> DonutUtilization -> DonutUtilization
withDangerThreshold t (DonutUtilization cfg) =
    DonutUtilization { cfg | dangerThreshold = t }


{-| Show a skeleton placeholder instead of the chart while data is loading.
-}
withLoading : Bool -> DonutUtilization -> DonutUtilization
withLoading l (DonutUtilization cfg) =
    DonutUtilization { cfg | loading = l }


{-| Render to `Html msg`.
-}
toSvg : DonutUtilization -> Html msg
toSvg (DonutUtilization cfg) =
    if cfg.loading then
        Skeleton.viewCircle cfg.size

    else
    let
        percent =
            if cfg.total > 0 then
                cfg.used / cfg.total * 100

            else
                0

        arcColor =
            if percent >= cfg.dangerThreshold then
                "#c9190b"

            else if percent >= cfg.warningThreshold then
                "#f0ab00"

            else
                Theme.primaryColor cfg.theme

        trackColor =
            "#d2d2d2"

        svgSize =
            cfg.size

        titleHeight =
            if cfg.title /= "" then
                30

            else
                0

        totalHeight =
            svgSize + titleHeight

        cx =
            toFloat svgSize / 2

        cy =
            toFloat svgSize / 2

        outerRadius =
            toFloat svgSize / 2 - 10

        innerRadius =
            outerRadius * 0.82

        fullAngle =
            2 * pi

        usedAngle =
            (percent / 100) * fullAngle

        -- Track arc (full ring)
        trackPath =
            Shape.arc
                { innerRadius = innerRadius
                , outerRadius = outerRadius
                , cornerRadius = 2
                , startAngle = 0
                , endAngle = fullAngle - 0.001
                , padAngle = 0
                , padRadius = 0
                }

        -- Used arc
        usedPath =
            Shape.arc
                { innerRadius = innerRadius
                , outerRadius = outerRadius
                , cornerRadius = 2
                , startAngle = 0
                , endAngle = max 0.001 usedAngle
                , padAngle = 0
                , padRadius = 0
                }

        labelColor =
            Theme.labelColor cfg.theme

        font =
            Theme.fontFamily cfg.theme

        percentStr =
            String.fromInt (round percent) ++ "%"
    in
    Html.div
        [ HA.style "display" "inline-block"
        , HA.style "font-family" font
        ]
        [ Svg.svg
            [ SA.width (String.fromInt svgSize)
            , SA.height (String.fromInt totalHeight)
            , SA.viewBox
                ("0 0 "
                    ++ String.fromInt svgSize
                    ++ " "
                    ++ String.fromInt totalHeight
                )
            , SA.style ("font-family: " ++ font ++ "; font-size: 12px;")
            ]
            [ -- Track (background ring)
              Path.element trackPath
                [ SA.fill trackColor
                , SA.transform
                    ("translate("
                        ++ String.fromFloat cx
                        ++ ","
                        ++ String.fromFloat cy
                        ++ ")"
                    )
                ]

            -- Used arc
            , Path.element usedPath
                [ SA.fill arcColor
                , SA.transform
                    ("translate("
                        ++ String.fromFloat cx
                        ++ ","
                        ++ String.fromFloat cy
                        ++ ")"
                    )
                ]

            -- Center: percentage
            , Svg.text_
                [ SA.x (String.fromFloat cx)
                , SA.y (String.fromFloat (cy - 4))
                , SA.textAnchor "middle"
                , SA.fontSize "24"
                , SA.fontWeight "700"
                , SA.fill labelColor
                ]
                [ Svg.text percentStr ]

            -- Center: used/total
            , Svg.text_
                [ SA.x (String.fromFloat cx)
                , SA.y (String.fromFloat (cy + 18))
                , SA.textAnchor "middle"
                , SA.fontSize "11"
                , SA.fill labelColor
                ]
                [ Svg.text
                    (String.fromFloat cfg.used
                        ++ " of "
                        ++ String.fromFloat cfg.total
                        ++ (if cfg.unit /= "" then
                                " " ++ cfg.unit

                            else
                                ""
                           )
                    )
                ]

            -- Title
            , if cfg.title /= "" then
                Svg.text_
                    [ SA.x (String.fromFloat cx)
                    , SA.y (String.fromInt (svgSize + 20))
                    , SA.textAnchor "middle"
                    , SA.fontSize "13"
                    , SA.fill labelColor
                    ]
                    [ Svg.text cfg.title ]

              else
                Svg.text ""
            ]
        ]
