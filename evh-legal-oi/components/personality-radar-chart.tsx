"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface PersonalityRadarChartProps {
  data: {
    riskTolerance: number
    trust: number
    optimism: number
    pace: number
    expression: number
    collaboration: number
    dominance: number
  }
  name: string
  color: string
  size?: "sm" | "md" | "lg"
}

export function PersonalityRadarChart({ data, name, color, size = "md" }: PersonalityRadarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Dispose existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
      chartInstanceRef.current = null
    }

    // Wait for element to be ready
    const initChart = () => {
      if (!chartRef.current) return

      const rect = chartRef.current.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(initChart, 100)
        return
      }

      try {
        const chart = echarts.init(chartRef.current, "dark")
        chartInstanceRef.current = chart

        const option = {
          title: {
            text: `${name} Personality Profile`,
            left: "center",
            textStyle: {
              color: "#ffffff",
              fontSize: size === "sm" ? 14 : size === "lg" ? 18 : 16,
            },
          },
          radar: {
            indicator: [
              { name: "Risk Tolerance", max: 10 },
              { name: "Trust", max: 10 },
              { name: "Optimism", max: 10 },
              { name: "Pace", max: 10 },
              { name: "Expression", max: 10 },
              { name: "Collaboration", max: 10 },
              { name: "Dominance", max: 10 },
            ],
            shape: "polygon",
            splitNumber: 5,
            axisName: {
              color: "#ffffff",
              fontSize: size === "sm" ? 10 : size === "lg" ? 14 : 12,
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: [
                  "rgba(255, 255, 255, 0.02)",
                  "rgba(255, 255, 255, 0.05)",
                  "rgba(255, 255, 255, 0.02)",
                  "rgba(255, 255, 255, 0.05)",
                  "rgba(255, 255, 255, 0.02)",
                ],
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
            },
          },
          series: [
            {
              name: "Personality Traits",
              type: "radar",
              data: [
                {
                  value: [
                    data.riskTolerance,
                    data.trust,
                    data.optimism,
                    data.pace,
                    data.expression,
                    data.collaboration,
                    data.dominance,
                  ],
                  name: name,
                  areaStyle: {
                    color: color.replace("bg-", "").replace("-500", ""),
                    opacity: 0.3,
                  },
                  lineStyle: {
                    color: color.replace("bg-", "").replace("-500", ""),
                    width: 2,
                  },
                  itemStyle: {
                    color: color.replace("bg-", "").replace("-500", ""),
                  },
                },
              ],
            },
          ],
          tooltip: {
            trigger: "item",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            textStyle: {
              color: "#ffffff",
            },
          },
        }

        chart.setOption(option)

        const handleResize = () => {
          if (chartInstanceRef.current && !chartInstanceRef.current.isDisposed()) {
            chartInstanceRef.current.resize()
          }
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
        }
      } catch (error) {
        console.error("Error initializing radar chart:", error)
      }
    }

    initChart()

    return () => {
      if (chartInstanceRef.current && !chartInstanceRef.current.isDisposed()) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = null
      }
    }
  }, [data, name, color, size])

  const height = size === "sm" ? "250px" : size === "lg" ? "450px" : "350px"

  return <div ref={chartRef} style={{ width: "100%", height }} className="bg-card rounded-lg" />
}
