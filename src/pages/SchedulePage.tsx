import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppointmentCard, type Appointment } from '@/components/dashboard/AppointmentCard';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
// Mock Data
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    patientName: "Eleanor Rigby",
    patientId: "p-101",
    time: "09:00 AM",
    duration: "30 min",
    type: "In-Person",
    reason: "Hypertension Follow-up",
    status: "Confirmed",
    room: "304-A"
  },
  {
    id: "apt-2",
    patientName: "Jude Lawton",
    patientId: "p-104",
    time: "10:30 AM",
    duration: "45 min",
    type: "In-Person",
    reason: "Diabetes Management Review",
    status: "Confirmed",
    room: "105-C"
  },
  {
    id: "apt-3",
    patientName: "Maxwell Edison",
    patientId: "p-106",
    time: "01:00 PM",
    duration: "15 min",
    type: "Video",
    reason: "Post-op Check-in",
    status: "Pending"
  },
  {
    id: "apt-4",
    patientName: "Molly Singer",
    patientId: "p-103",
    time: "02:15 PM",
    duration: "30 min",
    type: "In-Person",
    reason: "Routine Physical",
    status: "Cancelled",
    room: "201-B"
  }
];
const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
  "04:00 PM", "05:00 PM"
];
export function SchedulePage() {
  const [date, setDate] = useState<Date>(new Date());
  const handlePrevDay = () => setDate(subDays(date, 1));
  const handleNextDay = () => setDate(addDays(date, 1));
  // In a real app, we would filter by actual date. 
  // For demo, we just show the same mock data for "today" and empty for others to simulate behavior
  const isToday = isSameDay(date, new Date());
  const dailyAppointments = isToday ? MOCK_APPOINTMENTS : [];
  const getAppointmentsForSlot = (slotTime: string) => {
    // Simple string matching for demo purposes
    // Real implementation would compare Date objects
    const slotHour = parseInt(slotTime.split(":")[0]);
    const slotPeriod = slotTime.split(" ")[1];
    return dailyAppointments.filter(apt => {
      const aptHour = parseInt(apt.time.split(":")[0]);
      const aptPeriod = apt.time.split(" ")[1];
      // Very basic grouping logic for visual demo
      if (slotPeriod !== aptPeriod) return false;
      if (slotHour === 12) return aptHour === 12;
      return aptHour === slotHour;
    });
  };
  return (
    <AppLayout container contentClassName="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage appointments and clinical hours.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>
      {/* Calendar Controls */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[300px] space-y-4">
          <Card className="border-border shadow-sm">
            <CardContent className="p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>
          <Card className="border-border shadow-sm p-4 bg-muted/20">
            <h3 className="font-semibold mb-2 text-sm">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Appointments</span>
                <span className="font-medium">{dailyAppointments.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confirmed</span>
                <span className="font-medium text-emerald-600">
                  {dailyAppointments.filter(a => a.status === "Confirmed").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium text-amber-600">
                  {dailyAppointments.filter(a => a.status === "Pending").length}
                </span>
              </div>
            </div>
          </Card>
        </div>
        {/* Daily View */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handlePrevDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {isToday ? "Today" : format(date, "EEEE")}
            </div>
          </div>
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden min-h-[600px]">
            {TIME_SLOTS.map((slot, index) => {
              const slotAppointments = getAppointmentsForSlot(slot);
              return (
                <div key={slot} className="flex border-b last:border-0 min-h-[100px] group">
                  <div className="w-24 p-4 border-r bg-muted/5 text-xs font-medium text-muted-foreground">
                    {slot}
                  </div>
                  <div className="flex-1 p-2 relative">
                    {/* Grid lines for visual guidance */}
                    <div className="absolute inset-0 pointer-events-none border-b border-dashed border-border/30 top-1/2 left-24" />
                    {slotAppointments.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2">
                        {slotAppointments.map(apt => (
                          <AppointmentCard key={apt.id} appointment={apt} />
                        ))}
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-6">
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}