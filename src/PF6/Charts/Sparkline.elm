module PF6.Charts.Sparkline exposing
    ( Sparkline
    , fromData
    , withWidth, withHeight
    , withColor, withTheme
    , withFill
    , withLoading
    , toSvg
    )

{-| Sparkline — a miniature, axis-free line chart for inline use.

Typically embedded in tables, cards, or list items to show a metric's trend
without the overhead of a full chart.


# Type

@docs Sparkline


# Constructor

@docs fromData


# Modifiers

@docs withWidth, withHeight
@docs withColor, withTheme
@docs withFill
@docs withLoading


# Renderer

@docs toSvg

-}

import Html exposing (Html)
import Html.Attributes as HA
import Path
import PF6.Charts.Colors as Colors
import PF6.Charts.Internal.Color as IC
import PF6.Charts.Internal.Skeleton as Skeleton
import PF6.Charts.Theme as Theme exposing (Theme)
import Scale exposing (ContinuousScale)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA


{-| An opaque sparkline configuration.
-}
type Sparkline
    = Sparkline Config


type alias Config =
    { width : Int
    , height : Int
    , data : List Float
    , color : String
    , fill : Bool
    , theme : Theme
    , loading : Bool
    }


defaultConfig : List Float -> Config
defaultConfig data =
    { width = 150
    , height = 40
    , data = data
    , color = Colors.primary
    , fill = True
    , theme = Theme.light
    , loading = False
    }


{-| Create a sparkline from a list of y values (x is implicit index).

    sparkline =
        Sparkline.fromData [ 42, 55, 48, 72, 63, 58, 70 ]

-}
fromData : List Float -> Sparkline
fromData data =
    Sparkline (defaultConfig data)


{-| Set sparkline width in pixels. Default: 150.
-}
withWidth : Int -> Sparkline -> Sparkline
withWidth w (Sparkline cfg) =
    Sparkline { cfg | width = w }


{-| Set sparkline height in pixels. Default: 40.
-}
withHeight : Int -> Sparkline -> Sparkline
withHeight h (Sparkline cfg) =
    Sparkline { cfg | height = h }


{-| Override the line color.
-}
withColor : String -> Sparkline -> Sparkline
withColor c (Sparkline cfg) =
    Sparkline { cfg | color = c }


{-| Apply a `Theme`.
-}
withTheme : Theme -> Sparkline -> Sparkline
withTheme theme (Sparkline cfg) =
    Sparkline { cfg | theme = theme, color = Theme.primaryColor theme }


{-| Whether to fill the area under the line. Default: `True`.
-}
withFill : Bool -> Sparkline -> Sparkline
withFill f (Sparkline cfg) =
    Sparkline { cfg | fill = f }


{-| Show a skeleton placeholder instead of the sparkline while data is loading.
-}
withLoading : Bool -> Sparkline -> Sparkline
withLoading l (Sparkline cfg) =
    Sparkline { cfg | loading = l }


{-| Render to `Html msg`.
-}
toSvg : Sparkline -> Html msg
toSvg (Sparkline cfg) =
    if cfg.loading then
        Skeleton.viewSparkline cfg.width cfg.height

    else
    let
        pad =
            2

        innerW =
            cfg.width - (pad * 2)

        innerH =
            cfg.height - (pad * 2)

        n =
            List.length cfg.data

        indexedData =
            List.indexedMap (\i y -> ( toFloat i, y )) cfg.data

        ys =
            List.map Tuple.second indexedData

        yMin =
            Maybe.withDefault 0 (List.minimum ys)

        yMax =
            Maybe.withDefault 1 (List.maximum ys)

        xScale : ContinuousScale Float
        xScale =
            Scale.linear ( 0, toFloat innerW ) ( 0, toFloat (max 1 (n - 1)) )

        yScale : ContinuousScale Float
        yScale =
            Scale.linear ( toFloat innerH, 0 ) ( yMin, yMax )

        toLinePoint ( x, y ) =
            Just ( Scale.convert xScale x, Scale.convert yScale y )

        toAreaPoint ( x, y ) =
            Just
                ( ( Scale.convert xScale x, Scale.convert yScale yMin )
                , ( Scale.convert xScale x, Scale.convert yScale y )
                )

        linePath =
            Shape.line Shape.monotoneInXCurve (List.map toLinePoint indexedData)

        areaPath =
            Shape.area Shape.monotoneInXCurve (List.map toAreaPoint indexedData)

        fillColor =
            IC.hexToRgba cfg.color 0.15
    in
    Html.div
        [ HA.style "display" "inline-block" ]
        [ Svg.svg
            [ SA.width (String.fromInt cfg.width)
            , SA.height (String.fromInt cfg.height)
            , SA.viewBox
                ("0 0 "
                    ++ String.fromInt cfg.width
                    ++ " "
                    ++ String.fromInt cfg.height
                )
            ]
            [ Svg.g
                [ SA.transform ("translate(" ++ String.fromInt pad ++ "," ++ String.fromInt pad ++ ")") ]
                [ if cfg.fill then
                    Path.element areaPath
                        [ SA.fill fillColor
                        , SA.stroke "none"
                        ]

                  else
                    Svg.text ""
                , Path.element linePath
                    [ SA.fill "none"
                    , SA.stroke cfg.color
                    , SA.strokeWidth "1.5"
                    , SA.strokeLinejoin "round"
                    ]
                ]
            ]
        ]
