import { z } from "zod";
import { IncidentStatus, IncidentType, IncidentSeverity } from "@/types";

export const IncidentCreateSchema = z.object({
  carId: z.number().int().positive(),
  reportedById: z.number().int().positive(),
  assignedToId: z.number().int().positive().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  severity: z.nativeEnum(IncidentSeverity).default(IncidentSeverity.LOW),
  status: z.nativeEnum(IncidentStatus).default(IncidentStatus.OPEN),
  type: z.nativeEnum(IncidentType),

  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  occurredAt: z.coerce.date(),
  carReadingId: z.number().int().positive().optional(),
  images: z.array(z.string()).optional(),
});

export const IncidentUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  severity: z.nativeEnum(IncidentSeverity).optional(),
  status: z.nativeEnum(IncidentStatus).optional(),
  assignedToId: z.number().int().positive().optional(),
  resolutionNotes: z.string().optional(),
  estimatedCost: z.number().positive().optional(),
  actualCost: z.number().positive().optional(),
  resolvedAt: z.coerce.date().optional(),
});
