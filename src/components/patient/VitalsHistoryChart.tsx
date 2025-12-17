import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Thermometer, Droplets } from "lucide-react";
import { format, subHours } from "date-fns";
interface VitalsHistoryChartProps {
  patientId: string;
}
// Mock data generator since backend only stores current vitals
const generateHistoryData = () => {
  const now = new Date();
  const data = [];
  for (let i = 24; i >= 0; i--) {
    const time = subHours(now, i);
    data.push({
      time: time.toISOString(),
      displayTime: format(time, "HH:mm"),
      hr: 65 + Math.floor(Math.random() * 20), // 65-85
      bpSystolic: 110 + Math.floor(Math.random() * 30), // 110-140
      bpDiastolic: 70 + Math.floor(Math.random() * 15), // 70-85
      temp: 36.5 + Math.random() * 1.5, // 36.5-38.0
      o2: 95 + Math.floor(Math.random() * 5), // 95-100
    });
  }
  return data;
};
export function VitalsHistoryChart({ patientId }: VitalsHistoryChartProps) {
  const [activeTab, setActiveTab] = useState("hr");
  // Fixed: Removed patientId from dependency array as generateHistoryData is static
  const data = useMemo(() => generateHistoryData(), []);
  const config = {
    hr: {
      color: "#E11D48", // rose-600
      label: "Heart Rate",
      unit: "bpm",
      domain: [50, 120],
      icon: Activity
    },
    bp: {
      color: "#0F766E", // teal-700
      label: "Blood Pressure",
      unit: "mmHg",
      domain: [60, 160],
      icon: Droplets
    },
    temp: {
      color: "#F59E0B", // amber-500
      label: "Temperature",
      unit: "°C",
      domain: [35, 40],
      icon: Thermometer
    }
  };
  const currentConfig = config[activeTab as keyof typeof config];
  const Icon = currentConfig.icon;
  return (
    <Card className="col-span-2 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              Vitals History
            </CardTitle>
            <CardDescription>24-hour trend analysis</CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hr">HR</TabsTrigger>
              <TabsTrigger value="bp">BP</TabsTrigger>
              <TabsTrigger value="temp">Temp</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="displayTime"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis
                domain={currentConfig.domain}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              />
              {activeTab === "bp" ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="bpSystolic"
                    stroke={currentConfig.color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorGradient)"
                    name="Systolic"
                  />
                  <Area
                    type="monotone"
                    dataKey="bpDiastolic"
                    stroke={currentConfig.color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="none"
                    name="Diastolic"
                  />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey={activeTab === "temp" ? "temp" : "hr"}
                  stroke={currentConfig.color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGradient)"
                  name={currentConfig.label}
                  unit={currentConfig.unit}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}