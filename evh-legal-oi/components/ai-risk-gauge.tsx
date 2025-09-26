"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface AIRiskGaugeProps {
  title: string
  value: number
  max?: number
  unit?: string
  color?: string
  size?: "sm" | "md" | "lg"
}

export function AIRiskGauge({ title, value, max = 100, unit = "%", color = "#8b5cf6", size = "md" }: AIRiskGaugeProps) {
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
          series: [
            {
              name: title,
              type: "gauge",
              startAngle: 180,
              endAngle: 0,
              center: ["50%", "75%"],
              radius: size === "sm" ? "60%" : size === "lg" ? "90%" : "75%",
              min: 0,
              max: max,
              splitNumber: 8,
              axisLine: {
                lineStyle: {
                  width: 6,
                  color: [
                    [0.3, "#10b981"],
                    [0.7, "#f59e0b"],
                    [1, "#ef4444"],
                  ],
                },
              },
              pointer: {
                icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
                length: "12%",
                width: 20,
                offsetCenter: [0, "-60%"],
                itemStyle: {
                  color: color,
                },
              },
              axisTick: {
                length: 12,
                lineStyle: {
                  color: "auto",
                  width: 2,
                },
              },
              splitLine: {
                length: 20,
                lineStyle: {
                  color: "auto",
                  width: 5,
                },
              },
              axisLabel: {
                color: "#ffffff",
                fontSize: 12,
                distance: -60,
                rotate: "tangential",
                formatter: (value: number) => {
                  if (value === 0) return "0"
                  if (value === max) return max.toString()
                  return ""
                },
              },
              title: {
                offsetCenter: [0, "-10%"],
                fontSize: 14,
                color: "#ffffff",
              },
              detail: {
                fontSize: size === "sm" ? 24 : size === "lg" ? 36 : 30,
                offsetCenter: [0, "-35%"],
                valueAnimation: true,
                formatter: (value: number) => Math.round(value) + unit,
                color: color,
              },
              data: [
                {
                  value: value,
                  name: title,
                },
              ],
            },
          ],
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
        console.error("Error initializing gauge chart:", error)
      }
    }

    initChart()

    return () => {
      if (chartInstanceRef.current && !chartInstanceRef.current.isDisposed()) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = null
      }
    }
  }, [title, value, max, unit, color, size])

  const height = size === "sm" ? "200px" : size === "lg" ? "400px" : "300px"

  return <div ref={chartRef} style={{ width: "100%", height }} className="bg-card rounded-lg" />
}
