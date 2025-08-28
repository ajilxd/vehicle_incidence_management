import { AuditActionType, AuditEntityType } from "@prisma/client";

export enum IncidentType {
  ACCIDENT = "ACCIDENT",
  THEFT = "THEFT",
  VANDALISM = "VANDALISM",
  MAINTENANCE = "MAINTENANCE",
  TRAFFIC_VIOLATION = "TRAFFIC_VIOLATION",
  FUEL_ISSUE = "FUEL_ISSUE",
  OTHER = "OTHER",
}

export enum IncidentStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
}

export enum IncidentUpdateType {
  STATUS_CHANGE = "STATUS_CHANGE",
  COMMENT = "COMMENT",
  ASSIGNMENT = "ASSIGNMENT",
  RESOLUTION = "RESOLUTION",
  COST_UPDATE = "COST_UPDATE",
}

export enum IncidentSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface IncidentFilters {
  status?: string;
  severity?: string;
  carId?: number;
  assignedToId?: number;
  startDate?: string;
  endDate?: string;
  query?: string;
  page?: number;
  limit?: number;
}

export type CreateAuditLog = {
  action: AuditActionType;
  entityId: number;
  entityType: AuditEntityType;
  userId: number;
  details: string;
};
