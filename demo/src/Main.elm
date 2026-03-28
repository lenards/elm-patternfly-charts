module Main exposing (main)

{-| PF6.Charts gallery — shows all 13 chart types with PatternFly v6 styling.

Layout mirrors patternfly.org/charts/about-charts: a sticky sidebar nav on
the left, chart panels on the right.

-}

import Browser
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import PF6.Charts.Area as Area
import PF6.Charts.Bar as Bar
import PF6.Charts.BoxPlot as BoxPlot
import PF6.Charts.Bullet as Bullet
import PF6.Charts.Colors as Colors
import PF6.Charts.Donut as Donut
import PF6.Charts.DonutUtilization as DonutUtil
import PF6.Charts.Line as Line
import PF6.Charts.Pie as Pie
import PF6.Charts.Scatter as Scatter
import PF6.Charts.Sparkline as Sparkline
import PF6.Charts.Stack as Stack
import PF6.Charts.Theme as Theme
import PF6.Charts.Threshold as Threshold


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( initialModel, Cmd.none )
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- MODEL


type alias Model =
    { activeSection : String
    }


initialModel : Model
initialModel =
    { activeSection = "area" }


type Msg
    = SetSection String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetSection id ->
            ( { model | activeSection = id }, Cmd.none )



-- VIEW


navItems : List ( String, String )
navItems =
    [ ( "area", "Area Chart" )
    , ( "bar", "Bar Chart" )
    , ( "boxplot", "Box Plot" )
    , ( "bullet", "Bullet Chart" )
    , ( "donut", "Donut Chart" )
    , ( "donut-util", "Donut Utilization" )
    , ( "line", "Line Chart" )
    , ( "pie", "Pie Chart" )
    , ( "scatter", "Scatter Chart" )
    , ( "sparkline", "Sparkline" )
    , ( "stack", "Stack Chart" )
    , ( "threshold", "Threshold Chart" )
    ]


view : Model -> Html Msg
view model =
    Html.div
        [ HA.class "pf-gallery"
        , HA.style "display" "flex"
        , HA.style "min-height" "100vh"
        , HA.style "font-family" "Red Hat Text, RedHatText, sans-serif"
        , HA.style "background" "#f0f0f0"
        ]
        [ -- Sidebar nav
          Html.nav
            [ HA.style "width" "220px"
            , HA.style "min-width" "220px"
            , HA.style "background" "#212427"
            , HA.style "padding" "24px 0"
            , HA.style "position" "sticky"
            , HA.style "top" "0"
            , HA.style "height" "100vh"
            , HA.style "overflow-y" "auto"
            ]
            [ Html.div
                [ HA.style "padding" "0 16px 20px 16px"
                , HA.style "border-bottom" "1px solid #3c3f42"
                , HA.style "margin-bottom" "12px"
                ]
                [ Html.a
                    [ HA.href "#"
                    , HA.style "text-decoration" "none"
                    ]
                    [ Html.span
                        [ HA.style "color" "#73bcf7"
                        , HA.style "font-size" "18px"
                        , HA.style "font-weight" "700"
                        , HA.style "display" "block"
                        ]
                        [ Html.text "PF6.Charts" ]
                    , Html.span
                        [ HA.style "color" "#8a8d90"
                        , HA.style "font-size" "12px"
                        ]
                        [ Html.text "PatternFly v6 for Elm" ]
                    ]
                ]
            , Html.ul
                [ HA.style "list-style" "none"
                , HA.style "margin" "0"
                , HA.style "padding" "0 8px"
                ]
                (List.map (viewNavItem model.activeSection) navItems)
            ]

        -- Main content
        , Html.main_
            [ HA.style "flex" "1"
            , HA.style "padding" "32px 40px"
            , HA.style "max-width" "1000px"
            ]
            [ Html.h1
                [ HA.style "font-size" "28px"
                , HA.style "font-weight" "700"
                , HA.style "color" "#151515"
                , HA.style "margin" "0 0 8px 0"
                ]
                [ Html.text "Charts" ]
            , Html.p
                [ HA.style "color" "#6a6e73"
                , HA.style "font-size" "16px"
                , HA.style "margin" "0 0 40px 0"
                , HA.style "max-width" "640px"
                ]
                [ Html.text
                    """PatternFly v6 chart components for Elm, built on
                    gampleman/elm-visualization. All charts support light and
                    dark themes, PF6 color tokens, and the builder pattern."""
                ]
            , Html.div []
                (List.map viewChartPanel allChartPanels)
            ]
        ]


viewNavItem : String -> ( String, String ) -> Html Msg
viewNavItem active ( id, label ) =
    let
        isActive =
            active == id

        bg =
            if isActive then
                "#0066cc"

            else
                "transparent"

        color =
            if isActive then
                "#ffffff"

            else
                "#e0e0e0"
    in
    Html.li []
        [ Html.a
            [ HA.href ("#" ++ id)
            , HE.onClick (SetSection id)
            , HA.style "display" "block"
            , HA.style "padding" "8px 12px"
            , HA.style "border-radius" "4px"
            , HA.style "text-decoration" "none"
            , HA.style "color" color
            , HA.style "background" bg
            , HA.style "font-size" "14px"
            , HA.style "margin-bottom" "2px"
            , HA.style "transition" "background 0.1s"
            ]
            [ Html.text label ]
        ]


type alias ChartPanel =
    { id : String
    , title : String
    , description : String
    , chart : Html Msg
    , code : String
    }


viewChartPanel : ChartPanel -> Html Msg
viewChartPanel panel =
    Html.section
        [ HA.id panel.id
        , HA.style "margin-bottom" "56px"
        , HA.style "scroll-margin-top" "24px"
        ]
        [ Html.h2
            [ HA.style "font-size" "20px"
            , HA.style "font-weight" "700"
            , HA.style "color" "#151515"
            , HA.style "margin" "0 0 8px 0"
            ]
            [ Html.text panel.title ]
        , Html.p
            [ HA.style "color" "#6a6e73"
            , HA.style "font-size" "14px"
            , HA.style "margin" "0 0 20px 0"
            ]
            [ Html.text panel.description ]
        , Html.div
            [ HA.style "background" "#ffffff"
            , HA.style "border" "1px solid #d2d2d2"
            , HA.style "border-radius" "8px"
            , HA.style "padding" "32px 24px"
            , HA.style "margin-bottom" "16px"
            , HA.style "display" "flex"
            , HA.style "justify-content" "center"
            ]
            [ panel.chart ]
        , Html.details
            [ HA.style "background" "#f8f8f8"
            , HA.style "border" "1px solid #d2d2d2"
            , HA.style "border-radius" "6px"
            , HA.style "padding" "0"
            ]
            [ Html.summary
                [ HA.style "padding" "10px 16px"
                , HA.style "cursor" "pointer"
                , HA.style "font-size" "13px"
                , HA.style "color" "#0066cc"
                , HA.style "font-weight" "600"
                , HA.style "user-select" "none"
                ]
                [ Html.text "Show Elm code" ]
            , Html.pre
                [ HA.style "margin" "0"
                , HA.style "padding" "16px"
                , HA.style "font-size" "13px"
                , HA.style "line-height" "1.6"
                , HA.style "overflow-x" "auto"
                , HA.style "background" "#212427"
                , HA.style "color" "#e0e0e0"
                , HA.style "border-radius" "0 0 6px 6px"
                ]
                [ Html.code [] [ Html.text panel.code ] ]
            ]
        ]



-- SAMPLE DATA


cpuData : List ( Float, Float )
cpuData =
    List.indexedMap (\i v -> ( toFloat i, v ))
        [ 42, 55, 48, 72, 63, 58, 70, 65, 80, 73, 68, 75 ]


networkSeriesData : List Line.Series
networkSeriesData =
    [ { label = "Inbound"
      , data = List.indexedMap (\i v -> ( toFloat i, v )) [ 10, 25, 18, 42, 35, 28, 45, 38, 52, 44, 36, 50 ]
      }
    , { label = "Outbound"
      , data = List.indexedMap (\i v -> ( toFloat i, v )) [ 8, 20, 14, 30, 25, 20, 32, 27, 40, 34, 28, 38 ]
      }
    ]


memoryCategories : List String
memoryCategories =
    [ "Node 1", "Node 2", "Node 3", "Node 4", "Node 5" ]


memoryData : List Bar.SeriesData
memoryData =
    [ { label = "Used (GiB)", values = [ 12.4, 18.7, 8.2, 15.1, 22.0 ] }
    , { label = "Cached (GiB)", values = [ 4.2, 6.1, 3.5, 5.8, 7.3 ] }
    ]


boxData : List BoxPlot.BoxData
boxData =
    [ { label = "Jan", min = 12, q1 = 28, median = 42, q3 = 58, max = 78 }
    , { label = "Feb", min = 18, q1 = 32, median = 47, q3 = 63, max = 82 }
    , { label = "Mar", min = 15, q1 = 35, median = 50, q3 = 68, max = 88 }
    , { label = "Apr", min = 22, q1 = 40, median = 55, q3 = 72, max = 90 }
    ]


donutSlices : List Donut.Slice
donutSlices =
    [ { label = "Running", value = 42 }
    , { label = "Stopped", value = 8 }
    , { label = "Pending", value = 5 }
    , { label = "Failed", value = 3 }
    ]


pieSlices : List Pie.Slice
pieSlices =
    [ { label = "US East", value = 35 }
    , { label = "US West", value = 28 }
    , { label = "EU", value = 22 }
    , { label = "APAC", value = 15 }
    ]


scatterSeriesData : List Scatter.Series
scatterSeriesData =
    [ { label = "Cluster A"
      , data =
            [ ( 10, 22 ), ( 15, 35 ), ( 20, 28 ), ( 25, 42 ), ( 30, 38 )
            , ( 35, 55 ), ( 40, 48 ), ( 45, 65 ), ( 50, 58 ), ( 55, 72 )
            ]
      }
    , { label = "Cluster B"
      , data =
            [ ( 12, 8 ), ( 18, 15 ), ( 22, 12 ), ( 28, 20 ), ( 32, 18 )
            , ( 38, 25 ), ( 42, 22 ), ( 48, 30 ), ( 52, 28 ), ( 58, 35 )
            ]
      }
    ]


sparklineValues : List Float
sparklineValues =
    [ 42, 55, 48, 72, 63, 58, 70, 65, 80, 73, 68, 75 ]


stackSeriesData : List Stack.Series
stackSeriesData =
    [ { label = "Project A", values = [ 10, 14, 18, 22, 20, 25, 28, 24 ] }
    , { label = "Project B", values = [ 8, 10, 12, 15, 13, 16, 18, 15 ] }
    , { label = "Project C", values = [ 5, 7, 9, 11, 10, 12, 14, 12 ] }
    ]


thresholdData : List ( Float, Float )
thresholdData =
    List.indexedMap (\i v -> ( toFloat i, v ))
        [ 35, 42, 55, 68, 58, 72, 80, 75, 88, 82, 78, 90 ]



-- CHART PANELS


allChartPanels : List ChartPanel
allChartPanels =
    [ { id = "area"
      , title = "Area Chart"
      , description = "Area charts show a metric over time with a filled region under the line. Best for continuous data like CPU utilization, memory usage, or bandwidth."
      , chart =
            Area.fromData cpuData
                |> Area.withWidth 560
                |> Area.withXLabel "Time (minutes)"
                |> Area.withYLabel "CPU %"
                |> Area.withTitle "CPU Utilization"
                |> Area.toSvg
      , code = """Area.fromData cpuData
    |> Area.withWidth 560
    |> Area.withXLabel "Time (minutes)"
    |> Area.withYLabel "CPU %"
    |> Area.withTitle "CPU Utilization"
    |> Area.toSvg"""
      }
    , { id = "bar"
      , title = "Bar Chart"
      , description = "Bar charts compare values across categories. Grouped bars let you compare multiple series side-by-side per category."
      , chart =
            Bar.fromData memoryCategories memoryData
                |> Bar.withWidth 560
                |> Bar.withYLabel "GiB"
                |> Bar.withTitle "Memory Usage by Node"
                |> Bar.toSvg
      , code = """Bar.fromData
    [ "Node 1", "Node 2", "Node 3", "Node 4", "Node 5" ]
    [ { label = "Used (GiB)", values = [ 12.4, 18.7, 8.2, 15.1, 22.0 ] }
    , { label = "Cached (GiB)", values = [ 4.2, 6.1, 3.5, 5.8, 7.3 ] }
    ]
    |> Bar.withWidth 560
    |> Bar.withYLabel "GiB"
    |> Bar.withTitle "Memory Usage by Node"
    |> Bar.toSvg"""
      }
    , { id = "boxplot"
      , title = "Box Plot"
      , description = "Box plots show the statistical distribution of data: median, interquartile range, and whiskers for min/max. Useful for comparing distributions across categories."
      , chart =
            BoxPlot.fromData boxData
                |> BoxPlot.withWidth 560
                |> BoxPlot.withYLabel "Latency (ms)"
                |> BoxPlot.withTitle "API Response Latency by Month"
                |> BoxPlot.toSvg
      , code = """BoxPlot.fromData
    [ { label = "Jan", min = 12, q1 = 28, median = 42, q3 = 58, max = 78 }
    , { label = "Feb", min = 18, q1 = 32, median = 47, q3 = 63, max = 82 }
    ]
    |> BoxPlot.withWidth 560
    |> BoxPlot.withYLabel "Latency (ms)"
    |> BoxPlot.withTitle "API Response Latency by Month"
    |> BoxPlot.toSvg"""
      }
    , { id = "bullet"
      , title = "Bullet Chart"
      , description = "Bullet charts show a primary measure against a qualitative range (poor / needs improvement / good) and a target marker. A compact alternative to gauge charts."
      , chart =
            Html.div []
                [ Html.div
                    [ HA.style "margin-bottom" "16px" ]
                    [ Bullet.fromData 62 75 100
                        |> Bullet.withWidth 560
                        |> Bullet.withTitle "CPU"
                        |> Bullet.withUnit "%"
                        |> Bullet.toSvg
                    ]
                , Html.div
                    [ HA.style "margin-bottom" "16px" ]
                    [ Bullet.fromData 80 90 128
                        |> Bullet.withWidth 560
                        |> Bullet.withTitle "Memory"
                        |> Bullet.withUnit " GiB"
                        |> Bullet.toSvg
                    ]
                , Bullet.fromData 45 60 100
                    |> Bullet.withWidth 560
                    |> Bullet.withTitle "Disk"
                    |> Bullet.withUnit "%"
                    |> Bullet.toSvg
                ]
      , code = """Bullet.fromData 62 75 100
    |> Bullet.withWidth 560
    |> Bullet.withTitle "CPU"
    |> Bullet.withUnit "%"
    |> Bullet.toSvg"""
      }
    , { id = "donut"
      , title = "Donut Chart"
      , description = "Donut charts show part-to-whole relationships with a hollow center that can display a summary metric. A core PatternFly pattern for resource allocation and status breakdowns."
      , chart =
            Html.div
                [ HA.style "display" "flex"
                , HA.style "gap" "48px"
                , HA.style "justify-content" "center"
                , HA.style "align-items" "center"
                ]
                [ Donut.fromData donutSlices
                    |> Donut.withCenterText "58" "Instances"
                    |> Donut.withTitle "Instance Status"
                    |> Donut.toSvg
                , Donut.fromData donutSlices
                    |> Donut.withSize 200
                    |> Donut.withColors Colors.multiOrdered
                    |> Donut.withCenterText "58" "Instances"
                    |> Donut.withTitle "Smaller variant"
                    |> Donut.toSvg
                ]
      , code = """Donut.fromData
    [ { label = "Running", value = 42 }
    , { label = "Stopped", value = 8 }
    , { label = "Pending", value = 5 }
    , { label = "Failed", value = 3 }
    ]
    |> Donut.withCenterText "58" "Instances"
    |> Donut.withTitle "Instance Status"
    |> Donut.toSvg"""
      }
    , { id = "donut-util"
      , title = "Donut Utilization"
      , description = "Donut utilization charts show a single metric's utilization against its total. The arc color shifts to warning (gold) or danger (red) as configurable thresholds are crossed."
      , chart =
            Html.div
                [ HA.style "display" "flex"
                , HA.style "gap" "48px"
                , HA.style "justify-content" "center"
                , HA.style "align-items" "center"
                ]
                [ DonutUtil.fromData 48 100
                    |> DonutUtil.withTitle "vCPU Quota"
                    |> DonutUtil.toSvg
                , DonutUtil.fromData 78 100
                    |> DonutUtil.withTitle "Memory Quota"
                    |> DonutUtil.withWarningThreshold 75
                    |> DonutUtil.toSvg
                , DonutUtil.fromData 92 100
                    |> DonutUtil.withTitle "Storage Quota"
                    |> DonutUtil.withDangerThreshold 90
                    |> DonutUtil.toSvg
                ]
      , code = """-- Normal (48%)
DonutUtil.fromData 48 100
    |> DonutUtil.withTitle "vCPU Quota"
    |> DonutUtil.toSvg

-- Warning (78%, threshold at 75%)
DonutUtil.fromData 78 100
    |> DonutUtil.withTitle "Memory Quota"
    |> DonutUtil.withWarningThreshold 75
    |> DonutUtil.toSvg"""
      }
    , { id = "line"
      , title = "Line Chart"
      , description = "Line charts show one or more continuous metrics over time. Multiple series use the multi-unordered color scale and are automatically labeled in a legend."
      , chart =
            Line.fromSeries networkSeriesData
                |> Line.withWidth 560
                |> Line.withXLabel "Time (minutes)"
                |> Line.withYLabel "Mbps"
                |> Line.withTitle "Network Throughput"
                |> Line.toSvg
      , code = """Line.fromSeries
    [ { label = "Inbound",  data = inboundData }
    , { label = "Outbound", data = outboundData }
    ]
    |> Line.withWidth 560
    |> Line.withXLabel "Time (minutes)"
    |> Line.withYLabel "Mbps"
    |> Line.withTitle "Network Throughput"
    |> Line.toSvg"""
      }
    , { id = "pie"
      , title = "Pie Chart"
      , description = "Pie charts show part-to-whole relationships as solid circular slices. Use Donut when you need a center metric label."
      , chart =
            Pie.fromData pieSlices
                |> Pie.withSize 250
                |> Pie.withTitle "Instances by Region"
                |> Pie.toSvg
      , code = """Pie.fromData
    [ { label = "US East", value = 35 }
    , { label = "US West", value = 28 }
    , { label = "EU",      value = 22 }
    , { label = "APAC",    value = 15 }
    ]
    |> Pie.withSize 250
    |> Pie.withTitle "Instances by Region"
    |> Pie.toSvg"""
      }
    , { id = "scatter"
      , title = "Scatter Chart"
      , description = "Scatter charts plot individual data points on a 2D plane to reveal correlations or clusters. Multiple series use distinct colors."
      , chart =
            Scatter.fromSeries scatterSeriesData
                |> Scatter.withWidth 560
                |> Scatter.withXLabel "CPU Cores"
                |> Scatter.withYLabel "Memory (GiB)"
                |> Scatter.withTitle "Cluster Resource Distribution"
                |> Scatter.toSvg
      , code = """Scatter.fromSeries
    [ { label = "Cluster A", data = clusterAPoints }
    , { label = "Cluster B", data = clusterBPoints }
    ]
    |> Scatter.withWidth 560
    |> Scatter.withXLabel "CPU Cores"
    |> Scatter.withYLabel "Memory (GiB)"
    |> Scatter.withTitle "Cluster Resource Distribution"
    |> Scatter.toSvg"""
      }
    , { id = "sparkline"
      , title = "Sparkline"
      , description = "Sparklines are miniature, axis-free line charts for embedding in tables, cards, or list items to show a metric's trend without the overhead of a full chart."
      , chart =
            Html.div
                [ HA.style "display" "flex"
                , HA.style "flex-direction" "column"
                , HA.style "gap" "16px"
                , HA.style "width" "100%"
                ]
                [ Html.div
                    [ HA.style "display" "flex"
                    , HA.style "align-items" "center"
                    , HA.style "gap" "16px"
                    , HA.style "background" "#f0f0f0"
                    , HA.style "padding" "12px 16px"
                    , HA.style "border-radius" "6px"
                    ]
                    [ Html.span
                        [ HA.style "width" "120px"
                        , HA.style "font-size" "14px"
                        , HA.style "color" "#151515"
                        ]
                        [ Html.text "CPU" ]
                    , Sparkline.fromData sparklineValues
                        |> Sparkline.withWidth 180
                        |> Sparkline.withHeight 40
                        |> Sparkline.toSvg
                    , Html.span
                        [ HA.style "font-size" "14px"
                        , HA.style "color" "#6a6e73"
                        ]
                        [ Html.text "75%" ]
                    ]
                , Html.div
                    [ HA.style "display" "flex"
                    , HA.style "align-items" "center"
                    , HA.style "gap" "16px"
                    , HA.style "background" "#f0f0f0"
                    , HA.style "padding" "12px 16px"
                    , HA.style "border-radius" "6px"
                    ]
                    [ Html.span
                        [ HA.style "width" "120px"
                        , HA.style "font-size" "14px"
                        , HA.style "color" "#151515"
                        ]
                        [ Html.text "Memory" ]
                    , Sparkline.fromData [ 60, 62, 65, 68, 72, 70, 75, 80, 78, 82, 85, 88 ]
                        |> Sparkline.withWidth 180
                        |> Sparkline.withHeight 40
                        |> Sparkline.withColor Colors.green300
                        |> Sparkline.toSvg
                    , Html.span
                        [ HA.style "font-size" "14px"
                        , HA.style "color" "#6a6e73"
                        ]
                        [ Html.text "88%" ]
                    ]
                , Html.div
                    [ HA.style "display" "flex"
                    , HA.style "align-items" "center"
                    , HA.style "gap" "16px"
                    , HA.style "background" "#f0f0f0"
                    , HA.style "padding" "12px 16px"
                    , HA.style "border-radius" "6px"
                    ]
                    [ Html.span
                        [ HA.style "width" "120px"
                        , HA.style "font-size" "14px"
                        , HA.style "color" "#151515"
                        ]
                        [ Html.text "Disk I/O" ]
                    , Sparkline.fromData [ 20, 25, 22, 28, 30, 35, 28, 32, 38, 35, 40, 42 ]
                        |> Sparkline.withWidth 180
                        |> Sparkline.withHeight 40
                        |> Sparkline.withColor Colors.teal300
                        |> Sparkline.withFill False
                        |> Sparkline.toSvg
                    , Html.span
                        [ HA.style "font-size" "14px"
                        , HA.style "color" "#6a6e73"
                        ]
                        [ Html.text "42 MB/s" ]
                    ]
                ]
      , code = """-- Embed in a table/card row:
Html.div [ HA.style "display" "flex", HA.style "align-items" "center" ]
    [ Html.span [] [ Html.text "CPU" ]
    , Sparkline.fromData [ 42, 55, 48, 72, 63, 75 ]
        |> Sparkline.withWidth 180
        |> Sparkline.withHeight 40
        |> Sparkline.toSvg
    , Html.span [] [ Html.text "75%" ]
    ]"""
      }
    , { id = "stack"
      , title = "Stack Chart"
      , description = "Stacked area charts show multiple series stacked atop each other, making it easy to see both individual series contributions and the total over time."
      , chart =
            Stack.fromSeries stackSeriesData
                |> Stack.withWidth 560
                |> Stack.withXLabel "Week"
                |> Stack.withYLabel "Bandwidth (GB)"
                |> Stack.withTitle "Bandwidth by Project"
                |> Stack.toSvg
      , code = """Stack.fromSeries
    [ { label = "Project A", values = [ 10, 14, 18, 22, 20, 25, 28, 24 ] }
    , { label = "Project B", values = [ 8, 10, 12, 15, 13, 16, 18, 15 ] }
    , { label = "Project C", values = [ 5, 7, 9, 11, 10, 12, 14, 12 ] }
    ]
    |> Stack.withWidth 560
    |> Stack.withXLabel "Week"
    |> Stack.withYLabel "Bandwidth (GB)"
    |> Stack.withTitle "Bandwidth by Project"
    |> Stack.toSvg"""
      }
    , { id = "threshold"
      , title = "Threshold Chart"
      , description = "Threshold charts add horizontal warning/danger lines to a line chart. Essential for infrastructure dashboards showing SLA boundaries or capacity limits."
      , chart =
            Threshold.fromData thresholdData
                |> Threshold.withWidth 560
                |> Threshold.withXLabel "Time (minutes)"
                |> Threshold.withYLabel "CPU %"
                |> Threshold.withTitle "CPU with Warning Thresholds"
                |> Threshold.withThresholdLabel 75 "#f0ab00" "Warning (75%)"
                |> Threshold.withThresholdLabel 90 "#c9190b" "Critical (90%)"
                |> Threshold.toSvg
      , code = """Threshold.fromData cpuData
    |> Threshold.withWidth 560
    |> Threshold.withXLabel "Time (minutes)"
    |> Threshold.withYLabel "CPU %"
    |> Threshold.withTitle "CPU with Warning Thresholds"
    |> Threshold.withThresholdLabel 75 "#f0ab00" "Warning (75%)"
    |> Threshold.withThresholdLabel 90 "#c9190b" "Critical (90%)"
    |> Threshold.toSvg"""
      }
    ]
