import {
  IncidentSeverity,
  IncidentStatus,
  IncidentType,
  IncidentUpdateType,
} from "@prisma/client";

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

export type IncidentDetailsResponse =
  | (Incident & {
      occurredAt: Date;
      reportedAt: Date;
      resolvedAt: Date | null;
      images: string[];
      documents: string[];
      latitude: number | null;
      longitude: number | null;
      actualCost: number | null;
      estimatedCost: number | null;
      resolutionNotes: string | null;
      updates: {
        id: number;
        message: string;
        updateType: IncidentUpdateType;
        createdAt: Date;
        user: {
          id: number;
          name: string;
        };
      }[];
    })
  | null;
