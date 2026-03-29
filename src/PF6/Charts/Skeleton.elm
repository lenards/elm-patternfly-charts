module PF6.Charts.Skeleton exposing
    ( area, line, bar, scatter, stack, threshold, bullet, boxPlot
    , donut, donutUtilization, pie
    , sparkline
    )

{-| Loading skeleton placeholders for every PF6.Charts chart type.

Use these in place of a real chart while data is loading. They match the
chart's dimensions and show a shimmer animation consistent with PatternFly's
skeleton component.

    -- In your view:
    if model.loading then
        Skeleton.area 560 250

    else
        Area.fromData model.data
            |> Area.withWidth 560
            |> Area.toSvg


# Cartesian skeletons

@docs area, line, bar, scatter, stack, threshold, bullet, boxPlot


# Circular skeletons

@docs donut, donutUtilization, pie


# Inline skeletons

@docs sparkline

-}

import Html exposing (Html)
import PF6.Charts.Internal.Skeleton as S


{-| Area chart skeleton. Pass the same `width` and `height` you use on the real chart.
-}
area : Int -> Int -> Html msg
area =
    S.view


{-| Line chart skeleton.
-}
line : Int -> Int -> Html msg
line =
    S.view


{-| Bar chart skeleton.
-}
bar : Int -> Int -> Html msg
bar =
    S.view


{-| Scatter chart skeleton.
-}
scatter : Int -> Int -> Html msg
scatter =
    S.view


{-| Stack chart skeleton.
-}
stack : Int -> Int -> Html msg
stack =
    S.view


{-| Threshold chart skeleton.
-}
threshold : Int -> Int -> Html msg
threshold =
    S.view


{-| Bullet chart skeleton.
-}
bullet : Int -> Int -> Html msg
bullet =
    S.view


{-| Box plot skeleton.
-}
boxPlot : Int -> Int -> Html msg
boxPlot =
    S.view


{-| Donut chart skeleton. Pass `size` (the same value as `Donut.withSize`).
-}
donut : Int -> Html msg
donut size =
    S.viewCircle size


{-| Donut utilization chart skeleton.
-}
donutUtilization : Int -> Html msg
donutUtilization size =
    S.viewCircle size


{-| Pie chart skeleton.
-}
pie : Int -> Html msg
pie size =
    S.viewPie size


{-| Sparkline skeleton. Pass the same `width` and `height` as `Sparkline.withWidth`/`withHeight`.
-}
sparkline : Int -> Int -> Html msg
sparkline =
    S.viewSparkline
