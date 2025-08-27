import { IncidentSeverity, IncidentStatus, IncidentType } from "@prisma/client";

export type Car = {
  id: number;
  make: string;
  model: string;
  licensePlate: string;
};

export type User = {
  id: number;
  name: string;
};

export type CarReading = {
  id: number;
  odometerReading: number;
  reportedAt: Date;
};

export type Incident = {
  id: number;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  type: IncidentType;
  location: string | null;
  occurredAt: Date;
  car: Car;
  reportedBy: User;
  assignedTo: User | null;
  carReading: CarReading | null;
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type IncidentsResponse = {
  data: Incident[];
  meta: Meta;
};
