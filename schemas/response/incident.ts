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
  reportedAt: Date;
  estimatedCost: number | null;
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
        updatedStatus: IncidentStatus;
        createdAt: Date;
        user: {
          id: number;
          name: string;
        };
      }[];
    })
  | null;

export type IncidentStatsResponse = {
  closedIncidents: number;
  totalIncidents: number;
  openIncidents: number;
  groupByStatus: {
    status: string;
    _count: {
      id: number;
    };
  }[];
  groupBySeverity: {
    severity: string;
    _count: {
      id: number;
    };
  }[];
  groupByType: {
    type: string;
    _count: {
      id: number;
    };
  }[];
  totalEstimatedCost: {
    _sum: {
      estimatedCost: number;
    };
  };
  totalActualCost: {
    _sum: {
      actualCost: number;
    };
  };
  costBySeverity: {
    severity: string;
    _sum: {
      estimatedCost: number;
    };
  }[];
  incidentsByMonth: {
    month: number;
    incident_count: number;
  }[];
};
