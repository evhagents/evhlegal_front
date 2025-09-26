import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPIWidgetProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: LucideIcon
}

export function KPIWidget({ title, value, change, trend, icon: Icon }: KPIWidgetProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-primary" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-primary" />
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-primary"
      case "down":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={cn("text-xs font-medium", getTrendColor())}>{change}</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
      </CardContent>
    </Card>
  )
}
