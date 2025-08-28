import { z } from "zod";
import { IncidentType } from "@prisma/client";
import { IncidentStatus, IncidentSeverity } from "@prisma/client";

export const IncidentCreateSchema = z.object({
  carId: z.coerce.number().int().positive(),
  reportedById: z.coerce.number().int().positive(),
  assignedToId: z.coerce.number().int().positive().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  severity: z.nativeEnum(IncidentSeverity).default(IncidentSeverity.LOW),
  status: z.nativeEnum(IncidentStatus).default(IncidentStatus.PENDING),
  type: z.nativeEnum(IncidentType),

  location: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  occurredAt: z.coerce.date(),
  reportedAt: z.coerce.date().default(new Date()),
  estimatedCost: z.coerce.number().positive().optional(),
  carReadingId: z.number().int().positive().optional(),
  images: z.array(z.string()).optional(),
});

export const IncidentUpdateSchema = z.object({
  status: z.nativeEnum(IncidentStatus).optional(),
  assignedToId: z.number().int().positive().optional(),
  resolutionNotes: z.string().optional(),
});

export const IncidentFiltersSchema = z.object({
  status: z.nativeEnum(IncidentStatus).optional(),
  severity: z.nativeEnum(IncidentSeverity).optional(),
  query: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  carId: z.coerce.number().int().positive().optional(),
  assignedToId: z.coerce.number().int().positive().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type IncidentFilters = z.infer<typeof IncidentFiltersSchema>;

export const IncidentCommentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  userId: z.coerce.number().int().positive(),
});
