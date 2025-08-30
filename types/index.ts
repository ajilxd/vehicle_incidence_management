import { AuditActionType, AuditEntityType } from "@prisma/client";

export interface IncidentFilters {
  status?: string;
  severity?: string;
  carId?: string;
  assignedToId?: string;
  startDate?: string;
  endDate?: string;
  query?: string;
  page?: string;
  limit?: string;
}

export interface CarFilters {
  query?: string;
  page?: string;
  limit?: string;
}

export type CreateAuditLog = {
  action: AuditActionType;
  entityId: number;
  entityType: AuditEntityType;
  userId: number;
  details: string;
};
