import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  alert?: boolean;
}
export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  className,
  alert = false,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-full", alert ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-primary/10 text-primary")}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trendValue) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {trendValue && (
              <span
                className={cn(
                  "font-medium",
                  trend === "up" && "text-green-600 dark:text-green-400",
                  trend === "down" && "text-red-600 dark:text-red-400",
                  trend === "neutral" && "text-yellow-600 dark:text-yellow-400"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trendValue}
              </span>
            )}
            <span className="opacity-80">{description}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}