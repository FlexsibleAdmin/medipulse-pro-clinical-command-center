/**
 * MediPulse Pro Entities
 * Defines the PatientEntity and other core data structures for the medical dashboard.
 */
import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Patient } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS } from "@shared/mock-data";
// --- EXISTING ENTITIES (Preserved for compatibility) ---
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
// --- NEW MEDICAL ENTITIES ---
const SEED_PATIENTS: Patient[] = [
  {
    id: "p-101",
    name: "Eleanor Rigby",
    age: 72,
    gender: "Female",
    condition: "Hypertension",
    status: "Stable",
    roomNumber: "304-A",
    admissionDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastVisit: new Date(Date.now() - 3600000 * 4).toISOString(),
    vitals: { heartRate: 78, bloodPressure: "135/85", o2Saturation: 98, temperature: 36.8 }
  },
  {
    id: "p-102",
    name: "Desmond Jones",
    age: 45,
    gender: "Male",
    condition: "Arrhythmia",
    status: "Critical",
    roomNumber: "ICU-02",
    admissionDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    lastVisit: new Date(Date.now() - 1800000).toISOString(),
    vitals: { heartRate: 115, bloodPressure: "150/95", o2Saturation: 94, temperature: 37.5 }
  },
  {
    id: "p-103",
    name: "Molly Singer",
    age: 28,
    gender: "Female",
    condition: "Post-op Recovery",
    status: "Observation",
    roomNumber: "201-B",
    admissionDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    lastVisit: new Date(Date.now() - 3600000 * 12).toISOString(),
    vitals: { heartRate: 82, bloodPressure: "118/75", o2Saturation: 99, temperature: 37.0 }
  },
  {
    id: "p-104",
    name: "Jude Lawton",
    age: 55,
    gender: "Male",
    condition: "Type 2 Diabetes",
    status: "Stable",
    roomNumber: "105-C",
    admissionDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    lastVisit: new Date(Date.now() - 86400000 * 1).toISOString(),
    vitals: { heartRate: 72, bloodPressure: "130/82", o2Saturation: 97, temperature: 36.6 }
  },
  {
    id: "p-105",
    name: "Prudence Miller",
    age: 64,
    gender: "Female",
    condition: "Pneumonia",
    status: "Observation",
    roomNumber: "205-A",
    admissionDate: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    lastVisit: new Date(Date.now() - 3600000 * 2).toISOString(),
    vitals: { heartRate: 95, bloodPressure: "125/80", o2Saturation: 92, temperature: 38.2 }
  },
  {
    id: "p-106",
    name: "Maxwell Edison",
    age: 33,
    gender: "Male",
    condition: "Fractured Tibia",
    status: "Waiting",
    roomNumber: "ER-04",
    admissionDate: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    vitals: { heartRate: 88, bloodPressure: "132/84", o2Saturation: 99, temperature: 37.1 }
  }
];
export class PatientEntity extends IndexedEntity<Patient> {
  static readonly entityName = "patient";
  static readonly indexName = "patients";
  static readonly initialState: Patient = {
    id: "",
    name: "",
    age: 0,
    gender: "Other",
    condition: "",
    status: "Stable",
    roomNumber: "",
    admissionDate: "",
    lastVisit: "",
    vitals: { heartRate: 0, bloodPressure: "", o2Saturation: 0, temperature: 0 }
  };
  static seedData = SEED_PATIENTS;
}