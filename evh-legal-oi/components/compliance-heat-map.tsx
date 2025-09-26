"use client"

import { useEffect, useRef } from "react"

export function ComplianceHeatMap() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) {
      console.log("[v0] Chart ref is null, skipping initialization")
      return
    }

    const initChart = async () => {
      try {
        // Dynamically import ECharts to avoid SSR issues
        const echarts = await import("echarts")

        if (!chartRef.current) {
          console.log("[v0] Chart ref became null during async import")
          return
        }

        const rect = chartRef.current.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          console.log("[v0] Chart element has no dimensions, retrying...")
          // Retry after a short delay
          setTimeout(() => initChart(), 100)
          return
        }

        const chart = echarts.init(chartRef.current, "dark")

        if (!chart) {
          console.log("[v0] Failed to initialize ECharts")
          return
        }

        const entities = ["EVH Legal", "Entity A Corp", "Entity B LLC", "Entity C Partners"]
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        // Data format: [x, y, value] where x is month index, y is entity index
        const data = [
          // EVH Legal (y=0) - monthly compliance scores
          [0, 0, 95],
          [1, 0, 97],
          [2, 0, 94],
          [3, 0, 96],
          [4, 0, 98],
          [5, 0, 99],
          [6, 0, 97],
          [7, 0, 95],
          [8, 0, 93],
          [9, 0, 96],
          [10, 0, 98],
          [11, 0, 99],
          // Entity A Corp (y=1)
          [0, 1, 88],
          [1, 1, 90],
          [2, 1, 87],
          [3, 1, 89],
          [4, 1, 91],
          [5, 1, 93],
          [6, 1, 90],
          [7, 1, 88],
          [8, 1, 85],
          [9, 1, 87],
          [10, 1, 89],
          [11, 1, 92],
          // Entity B LLC (y=2)
          [0, 2, 76],
          [1, 2, 78],
          [2, 2, 74],
          [3, 2, 80],
          [4, 2, 82],
          [5, 2, 85],
          [6, 2, 83],
          [7, 2, 81],
          [8, 2, 79],
          [9, 2, 77],
          [10, 2, 80],
          [11, 2, 84],
          // Entity C Partners (y=3)
          [0, 3, 65],
          [1, 3, 68],
          [2, 3, 62],
          [3, 3, 70],
          [4, 3, 73],
          [5, 3, 75],
          [6, 3, 72],
          [7, 3, 69],
          [8, 3, 66],
          [9, 3, 71],
          [10, 3, 74],
          [11, 3, 76],
        ]

        const option = {
          backgroundColor: "transparent",
          tooltip: {
            position: "top",
            formatter: (params: any) => {
              const month = months[params.data[0]]
              const entity = params.data[1]
              const score = params.data[2]
              const risk = score >= 90 ? "Low" : score >= 75 ? "Medium" : "High"
              return `${entities[entity]}<br/>${month}: ${score}%<br/>Risk Level: ${risk}`
            },
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderColor: "oklch(0.7 0.15 160)",
            textStyle: {
              color: "#fff",
            },
          },
          grid: {
            height: "60%",
            top: "10%",
            left: "15%",
            right: "5%",
          },
          xAxis: {
            type: "category",
            data: months,
            splitArea: {
              show: true,
            },
            axisLabel: {
              color: "oklch(0.8 0.02 160)",
              fontSize: 11,
            },
            axisLine: {
              lineStyle: {
                color: "oklch(0.4 0.02 160)",
              },
            },
          },
          yAxis: {
            type: "category",
            data: entities,
            splitArea: {
              show: true,
            },
            axisLabel: {
              color: "oklch(0.8 0.02 160)",
              fontSize: 11,
            },
            axisLine: {
              lineStyle: {
                color: "oklch(0.4 0.02 160)",
              },
            },
          },
          visualMap: {
            min: 50,
            max: 100,
            calculable: true,
            orient: "horizontal",
            left: "center",
            bottom: "15%",
            inRange: {
              color: [
                "#dc2626", // Red for low compliance
                "#f59e0b", // Amber for medium compliance
                "#10b981", // Emerald for high compliance
                "oklch(0.7 0.15 160)", // Custom emerald for excellent
              ],
            },
            textStyle: {
              color: "oklch(0.8 0.02 160)",
            },
          },
          series: [
            {
              name: "Compliance Score",
              type: "heatmap",
              data: data,
              label: {
                show: true,
                color: "#fff",
                fontSize: 10,
                formatter: (params: any) => params.data[2] + "%",
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "oklch(0.7 0.15 160)",
                },
              },
              coordinateSystem: "cartesian2d",
            },
          ],
        }

        chart.setOption(option)

        // Handle resize
        const handleResize = () => {
          if (chart && !chart.isDisposed()) {
            chart.resize()
          }
        }
        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          if (chart && !chart.isDisposed()) {
            chart.dispose()
          }
        }
      } catch (error) {
        console.error("[v0] Error initializing ECharts:", error)
      }
    }

    const timeoutId = setTimeout(() => {
      initChart()
    }, 50)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="h-[400px] w-full">
      <div ref={chartRef} className="h-full w-full" />
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>High Compliance (85%+)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Medium (70-85%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Low (&lt;70%)</span>
          </div>
        </div>
        <span>Updated 5 min ago</span>
      </div>
    </div>
  )
}
