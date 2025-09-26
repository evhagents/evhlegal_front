"use client"

import { useEffect, useRef } from "react"

export function EntityNodeTree() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const initChart = async () => {
      try {
        const element = chartRef.current
        if (!element) {
          console.warn("[v0] EntityNodeTree: Chart element not found")
          return
        }

        // Check if element has dimensions
        const rect = element.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          console.warn("[v0] EntityNodeTree: Chart element has no dimensions, retrying...")
          // Retry after a short delay to allow for layout
          setTimeout(() => {
            if (chartRef.current) {
              initChart()
            }
          }, 100)
          return
        }

        // Dynamically import ECharts to avoid SSR issues
        const echarts = await import("echarts")

        const chart = echarts.init(element, "dark")
        if (!chart) {
          console.error("[v0] EntityNodeTree: Failed to initialize chart")
          return
        }

        const treeData = {
          name: "EVH Legal",
          value: 150,
          itemStyle: {
            color: "oklch(0.7 0.15 160)",
          },
          children: [
            {
              name: "Entity A Corp",
              value: 45,
              itemStyle: {
                color: "oklch(0.65 0.2 200)",
              },
              children: [
                {
                  name: "Entity C Partners",
                  value: 23,
                  itemStyle: {
                    color: "oklch(0.6 0.25 280)",
                  },
                },
              ],
            },
            {
              name: "Entity B LLC",
              value: 32,
              itemStyle: {
                color: "oklch(0.65 0.2 200)",
              },
            },
          ],
        }

        const option = {
          backgroundColor: "transparent",
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
            formatter: (params: any) => {
              return `${params.data.name}<br/>Documents: ${params.data.value || 0}`
            },
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderColor: "oklch(0.7 0.15 160)",
            textStyle: {
              color: "#fff",
            },
          },
          series: [
            {
              type: "tree",
              data: [treeData],
              top: "10%",
              left: "10%",
              bottom: "10%",
              right: "20%",
              symbolSize: (value: number) => Math.max(20, Math.min(60, value / 3)),
              label: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 12,
                color: "#fff",
              },
              leaves: {
                label: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                },
              },
              emphasis: {
                focus: "descendant",
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
              lineStyle: {
                color: "oklch(0.7 0.15 160)",
                width: 2,
              },
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
        console.error("[v0] EntityNodeTree: Error initializing chart:", error)
      }
    }

    initChart()
  }, [])

  return (
    <div className="h-[400px] w-full">
      <div ref={chartRef} className="h-full w-full" />
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>3 entities connected</span>
        <span>Last updated: 2 min ago</span>
      </div>
    </div>
  )
}
