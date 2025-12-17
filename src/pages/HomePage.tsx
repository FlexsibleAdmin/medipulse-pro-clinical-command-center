import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { PatientTable } from '@/components/dashboard/PatientTable';
import { VitalsChart } from '@/components/dashboard/VitalsChart';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster, toast } from 'sonner';
import { 
  Users, 
  AlertCircle, 
  Calendar, 
  Clock, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api-client';
import type { Patient, DashboardStats } from '@shared/types';
export function HomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, patientsData] = await Promise.all([
          api<DashboardStats>('/api/dashboard/stats'),
          api<{ items: Patient[] }>('/api/patients')
        ]);
        setStats(statsData);
        setPatients(patientsData.items);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        toast.error('Connection Error', {
          description: 'Could not connect to the medical database.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <AppLayout container contentClassName="space-y-8">
      <div className="flex flex-col space-y-8 animate-fade-in">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, Dr. Chen. You have <span className="font-medium text-foreground">{stats?.criticalAlerts ?? 0} critical alerts</span> today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle className="relative top-0 right-0" />
            <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm gap-2">
              <Plus className="h-4 w-4" />
              Admit Patient
            </Button>
          </div>
        </header>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Patients"
            value={stats?.totalPatients ?? 0}
            icon={Users}
            trend="up"
            trendValue="12%"
            description="from last month"
          />
          <StatCard
            title="Critical Alerts"
            value={stats?.criticalAlerts ?? 0}
            icon={AlertCircle}
            alert={true}
            trend="down"
            trendValue="2"
            description="active alerts"
          />
          <StatCard
            title="Appointments"
            value={stats?.appointmentsToday ?? 0}
            icon={Calendar}
            trend="neutral"
            description="scheduled today"
          />
          <StatCard
            title="Avg. Wait Time"
            value={stats?.averageWaitTime ?? "--"}
            icon={Clock}
            trend="down"
            trendValue="4m"
            description="improved efficiency"
          />
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Patient Roster */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Patient Roster</h2>
              <div className="flex items-center gap-2">
                <div className="relative w-40 md:w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search patients..." 
                    className="pl-9 h-9 bg-background" 
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
            {error ? (
              <div className="p-8 text-center border rounded-md bg-destructive/5 text-destructive">
                <p>{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : (
              <PatientTable patients={patients} isLoading={isLoading} />
            )}
          </div>
          {/* Right Column: Vitals & Quick Actions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Live Monitoring</h2>
              <div className="h-[300px]">
                <VitalsChart />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 dark:hover:bg-teal-900/20 dark:hover:text-teal-400">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Prescribe</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors closeButton />
    </AppLayout>
  );
}