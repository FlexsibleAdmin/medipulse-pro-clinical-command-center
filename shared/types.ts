export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type PatientStatus = 'Stable' | 'Critical' | 'Observation' | 'Discharged' | 'Waiting';
export interface PatientVitals {
  heartRate: number;
  bloodPressure: string;
  o2Saturation: number;
  temperature: number;
}
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: PatientStatus;
  roomNumber: string;
  admissionDate: string;
  lastVisit: string;
  vitals: PatientVitals;
}
export interface DashboardStats {
  totalPatients: number;
  criticalAlerts: number;
  appointmentsToday: number;
  averageWaitTime: string;
}
// Keeping existing types for backward compatibility if needed, though we are shifting focus
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}