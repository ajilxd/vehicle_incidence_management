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
  type: z.nativeEnum(IncidentType).default(IncidentType.MAINTENANCE_ISSUE),

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

export const IncidentStep1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  occurredAt: z.coerce.date(),
  type: z.nativeEnum(IncidentType),
  severity: z.nativeEnum(IncidentSeverity),
  estimatedCost: z.coerce.number().optional(), // also coerce if coming from <input type="number" />
});

export const IncidentStep2Schema = z.object({
  carId: z.coerce.number().int().positive(),
  images: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "At least one image is required"
    )
    .optional(),
});

export type IncidentStep1Values = z.infer<typeof IncidentStep1Schema>;
export type IncidentStep2Values = z.infer<typeof IncidentStep2Schema>;
