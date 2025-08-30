import { AuditActionType, AuditEntityType } from "@prisma/client";


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

export interface CarFilters {
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
