import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, MoreHorizontal, Video } from "lucide-react";
import { cn } from "@/lib/utils";
export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  duration: string;
  type: "In-Person" | "Video" | "Emergency";
  reason: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  room?: string;
}
interface AppointmentCardProps {
  appointment: Appointment;
  className?: string;
}
export function AppointmentCard({ appointment, className }: AppointmentCardProps) {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Cancelled":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
      case "Completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  const getTypeIcon = (type: Appointment["type"]) => {
    switch (type) {
      case "Video":
        return <Video className="h-3 w-3" />;
      default:
        return <MapPin className="h-3 w-3" />;
    }
  };
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <Card className={cn("hover:shadow-md transition-all duration-200 border-l-4", className, {
      "border-l-emerald-500": appointment.status === "Confirmed",
      "border-l-amber-500": appointment.status === "Pending",
      "border-l-slate-300": appointment.status === "Cancelled",
      "border-l-blue-500": appointment.status === "Completed",
    })}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center justify-center min-w-[3rem] p-2 bg-muted/30 rounded-md text-center">
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {appointment.time.split(" ")[1]}
              </span>
              <span className="text-lg font-bold text-foreground">
                {appointment.time.split(" ")[0]}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{appointment.patientName}</h3>
                <Badge variant="secondary" className={cn("text-[10px] h-5 px-1.5 font-medium border-0", getStatusColor(appointment.status))}>
                  {appointment.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{appointment.reason}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {appointment.duration}
                </span>
                <span className="flex items-center gap-1">
                  {getTypeIcon(appointment.type)}
                  {appointment.type === "Video" ? "Telehealth" : appointment.room || "Room TBD"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.patientId}`} />
              <AvatarFallback>{getInitials(appointment.patientName)}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}