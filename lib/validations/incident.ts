import { z } from "zod";
import { IncidentSeverity, IncidentStatus, IncidentType } from "@prisma/client";
import { IncidentCreateSchema } from "@/schemas";

export type IncidentCreateInput = z.infer<typeof IncidentCreateSchema>;

export const IncidentStep1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  occurredAt: z
    .string("Date is required")
    .min(1, "Date is required")
    .transform((val) => new Date(val))
    .refine((d) => d <= new Date(), {
      message: "Date cannot be in the future",
    })
    .refine(
      (d) =>
        d >= new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      { message: "Date cannot be older than 1 year" }
    ),
  type: z.nativeEnum(IncidentType),
  severity: z.nativeEnum(IncidentSeverity),
  estimatedCost: z.coerce
    .number()
    .gt(0, "Estimated cost must be greater than 0"),
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
