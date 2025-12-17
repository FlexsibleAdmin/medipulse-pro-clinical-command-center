import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Pill, Stethoscope, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
interface TimelineEvent {
  id: string;
  type: "medication" | "checkup" | "note" | "alert";
  title: string;
  description: string;
  time: string;
  doctor: string;
}
const MOCK_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    type: "medication",
    title: "Medication Administered",
    description: "Amoxicillin 500mg IV",
    time: "10:30 AM",
    doctor: "Nurse Joy"
  },
  {
    id: "2",
    type: "checkup",
    title: "Vitals Check",
    description: "BP 120/80, HR 72, Temp 37.1°C",
    time: "09:15 AM",
    doctor: "Dr. Sarah Chen"
  },
  {
    id: "3",
    type: "alert",
    title: "High Heart Rate Alert",
    description: "HR spiked to 115 bpm",
    time: "08:45 AM",
    doctor: "System"
  },
  {
    id: "4",
    type: "note",
    title: "Morning Rounds",
    description: "Patient reports feeling better. Appetite improved.",
    time: "08:00 AM",
    doctor: "Dr. Sarah Chen"
  }
];
export function PatientTimeline() {
  const getIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "medication": return Pill;
      case "checkup": return Stethoscope;
      case "note": return FileText;
      case "alert": return AlertCircle;
      default: return Clock;
    }
  };
  const getColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "medication": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "checkup": return "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400";
      case "alert": return "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400";
      default: return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };
  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Today's Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 pl-2">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />
          {MOCK_EVENTS.map((event) => {
            const Icon = getIcon(event.type);
            return (
              <div key={event.id} className="relative flex gap-4 group">
                <div className={cn(
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-background shadow-sm",
                  getColor(event.type)
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col pt-1.5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{event.title}</span>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
                  <span className="text-xs text-muted-foreground/70 mt-1">by {event.doctor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}