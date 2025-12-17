import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PatientTable } from '@/components/dashboard/PatientTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Patient } from '@shared/types';
import { toast } from 'sonner';
export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const data = await api<{ items: Patient[] }>('/api/patients');
        setPatients(data.items);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        toast.error('Failed to load patient roster');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <AppLayout container contentClassName="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Roster</h1>
          <p className="text-muted-foreground mt-1">
            Manage active patients, admissions, and discharges.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Admit Patient
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      <PatientTable patients={filteredPatients} isLoading={isLoading} />
    </AppLayout>
  );
}