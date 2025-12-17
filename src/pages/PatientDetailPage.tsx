import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { VitalsHistoryChart } from '@/components/patient/VitalsHistoryChart';
import { PatientTimeline } from '@/components/patient/PatientTimeline';
import { ClinicalNotes } from '@/components/patient/ClinicalNotes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MoreVertical, Activity, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Patient } from '@shared/types';
import { toast } from 'sonner';
import { format } from 'date-fns';
export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      try {
        setIsLoading(true);
        const data = await api<Patient>(`/api/patients/${id}`);
        setPatient(data);
      } catch (err) {
        console.error('Failed to fetch patient:', err);
        setError('Patient not found or access denied.');
        toast.error('Could not load patient details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatient();
  }, [id]);
  if (isLoading) {
    return (
      <AppLayout container>
        <div className="space-y-8 animate-pulse">
          <div className="h-20 bg-muted/20 rounded-lg w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-muted/20 rounded-lg" />
            <div className="h-96 bg-muted/20 rounded-lg" />
          </div>
        </div>
      </AppLayout>
    );
  }
  if (error || !patient) {
    return (
      <AppLayout container>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-bold">Patient Not Found</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => navigate('/patients')}>Return to Roster</Button>
        </div>
      </AppLayout>
    );
  }
  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <AppLayout container contentClassName="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
          <Button variant="ghost" size="sm" className="gap-1 pl-0" onClick={() => navigate('/patients')}>
            <ArrowLeft className="h-4 w-4" />
            Back to Roster
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 p-6 bg-card border rounded-xl shadow-sm">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`} />
              <AvatarFallback className="text-lg">{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
                <Badge variant={patient.status === 'Critical' ? 'destructive' : 'secondary'}>
                  {patient.status}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {patient.age} yrs, {patient.gender}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Room {patient.roomNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" />
                  Admitted {format(new Date(patient.admissionDate), "MMM d")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Edit Details</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Discharge</Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Vitals & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            <VitalsHistoryChart patientId={patient.id} />
            <PatientTimeline />
          </div>
          {/* Right Column: Notes & Info */}
          <div className="space-y-8">
            <div className="h-[500px]">
              <ClinicalNotes />
            </div>
            <div className="p-6 bg-card border rounded-xl shadow-sm space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                Current Vitals
              </h3>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">Heart Rate</span>
                  <p className="text-xl font-bold">{patient.vitals.heartRate} <span className="text-xs font-normal text-muted-foreground">bpm</span></p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Blood Pressure</span>
                  <p className="text-xl font-bold">{patient.vitals.bloodPressure}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">O2 Saturation</span>
                  <p className="text-xl font-bold">{patient.vitals.o2Saturation}<span className="text-xs font-normal text-muted-foreground">%</span></p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Temperature</span>
                  <p className="text-xl font-bold">{patient.vitals.temperature}<span className="text-xs font-normal text-muted-foreground">°C</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}