import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";
// Mock data for the visual preview
const data = [
  { time: "08:00", hr: 72 },
  { time: "08:05", hr: 75 },
  { time: "08:10", hr: 71 },
  { time: "08:15", hr: 73 },
  { time: "08:20", hr: 78 },
  { time: "08:25", hr: 82 },
  { time: "08:30", hr: 79 },
  { time: "08:35", hr: 75 },
  { time: "08:40", hr: 74 },
  { time: "08:45", hr: 72 },
  { time: "08:50", hr: 70 },
  { time: "08:55", hr: 72 },
];
export function VitalsChart() {
  return (
    <Card className="h-full flex flex-col shadow-sm border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-rose-500" />
              Live Heart Rate Monitor
            </CardTitle>
            <CardDescription className="text-xs">
              Patient: <span className="font-medium text-foreground">Desmond Jones (ICU-02)</span>
            </CardDescription>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">72</span>
            <span className="text-xs text-muted-foreground font-medium">bpm</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-[200px] p-0 pb-4">
        <div className="h-full w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E11D48" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis 
                domain={[60, 100]} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="hr"
                stroke="#E11D48"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHr)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}