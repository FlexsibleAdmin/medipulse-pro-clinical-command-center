import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Activity, Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Patient } from '@shared/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
export function AlertsPage() {
  const [criticalPatients, setCriticalPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const data = await api<{ items: Patient[] }>('/api/patients');
        // Filter for Critical or Observation status for the alerts view
        const alerts = data.items.filter(p => p.status === 'Critical' || p.status === 'Observation');
        setCriticalPatients(alerts);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
        toast.error('Failed to load alerts');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, []);
  return (
    <AppLayout container contentClassName="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bell className="h-8 w-8 text-rose-500" />
            Active Alerts
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of critical patient events and system notifications.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Status
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 w-full bg-muted/20 animate-pulse rounded-lg border border-border/50" />
          ))}
        </div>
      ) : criticalPatients.length === 0 ? (
        <Card className="border-dashed flex flex-col items-center justify-center p-12 text-center bg-muted/5">
          <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-semibold text-xl">All Clear</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            There are no active critical alerts at this time. All monitored patients are within stable parameters.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {criticalPatients.map((patient) => (
            <Card key={patient.id} className="border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5 text-rose-500" />
                      {patient.status === 'Critical' ? 'Critical Vitals Alert' : 'Observation Required'}
                    </CardTitle>
                    <CardDescription>
                      Patient: <span className="font-medium text-foreground">{patient.name}</span> • Room {patient.roomNumber}
                    </CardDescription>
                  </div>
                  <Badge variant={patient.status === 'Critical' ? 'destructive' : 'outline'} className="uppercase">
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Heart Rate:</span>
                    <span className="font-bold">{patient.vitals.heartRate} bpm</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">BP:</span>
                    <span className="font-bold">{patient.vitals.bloodPressure}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="ghost" className="gap-1" onClick={() => navigate(`/patients/${patient.id}`)}>
                      View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
}