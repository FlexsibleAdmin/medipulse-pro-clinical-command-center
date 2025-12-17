import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Activity, Clock } from "lucide-react";
import type { Patient } from "@shared/types";
import { cn } from "@/lib/utils";
interface PatientTableProps {
  patients: Patient[];
  isLoading?: boolean;
}
export function PatientTable({ patients, isLoading }: PatientTableProps) {
  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full bg-muted/20 animate-pulse rounded-md" />
        ))}
      </div>
    );
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stable":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Critical":
        return "bg-rose-100 text-rose-700 hover:bg-rose-100/80 dark:bg-rose-900/30 dark:text-rose-400 animate-pulse";
      case "Observation":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400";
      case "Waiting":
        return "bg-slate-100 text-slate-700 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-400";
      default:
        return "bg-slate-100 text-slate-700";
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
    <div className="rounded-md border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[250px]">Patient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Room</TableHead>
            <TableHead className="text-right">Vitals (HR/BP)</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No patients found.
              </TableCell>
            </TableRow>
          ) : (
            patients.map((patient) => (
              <TableRow key={patient.id} className="group cursor-pointer hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`} />
                      <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-foreground">{patient.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {patient.age} yrs • {patient.gender}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("font-medium border-0", getStatusColor(patient.status))}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground font-medium">{patient.condition}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{patient.roomNumber}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <Activity className="h-3 w-3 text-rose-500" />
                      {patient.vitals.heartRate} <span className="text-xs text-muted-foreground font-normal">bpm</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {patient.vitals.bloodPressure}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}