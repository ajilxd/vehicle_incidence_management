import { z } from "zod";
import { IncidentSeverity, IncidentStatus, IncidentType } from "@prisma/client";

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

export type IncidentCreateInput = z.infer<typeof IncidentCreateSchema>;

export const IncidentStep1Schema = IncidentCreateSchema.pick({
  title: true,
  type: true,
  severity: true,
  description: true,
  occurredAt: true,
  estimatedCost: true,
  location: true,
});

export const IncidentStep2Schema = IncidentCreateSchema.pick({
  carId: true,
  images: true,
});

export const IncidentStep3Schema = IncidentCreateSchema.pick({
  assignedToId: true,
});
