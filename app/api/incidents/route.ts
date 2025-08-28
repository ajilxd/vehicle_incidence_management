import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { createAuditLog } from "@/lib/auditLog";
import {
  IncidentFiltersSchema,
  IncidentFilters,
  IncidentCreateSchema,
} from "@/schemas";
import { AuditActionType, AuditEntityType, Prisma } from "@prisma/client";
import { IncidentsResponse } from "@/schemas/response/incident";
import { handleApi } from "@/lib/handleApi";

const getIncidents = async function (request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);

  const result = IncidentFiltersSchema.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const filters: IncidentFilters = result.data;

  const where: Prisma.IncidentWhereInput = {};
  if (filters.status) where.status = filters.status;
  if (filters.severity) where.severity = filters.severity;
  if (filters.query) {
    where.OR = [
      { title: { contains: filters.query, mode: "insensitive" } },
      { description: { contains: filters.query, mode: "insensitive" } },
    ];
  }

  const incidents = await prisma.incident.findMany({
    where,
    take: filters.limit,
    skip: (filters.page - 1) * filters.limit,
    orderBy: { occurredAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      severity: true,
      status: true,
      type: true,
      location: true,
      occurredAt: true,

      car: {
        select: { id: true, make: true, model: true, licensePlate: true },
      },
      reportedBy: { select: { id: true, name: true } },
      assignedTo: { select: { id: true, name: true } },
      carReading: {
        select: { id: true, odometerReading: true, reportedAt: true },
      },
    },
  });

  const total = await prisma.incident.count({ where });
  const payload: IncidentsResponse = {
    data: incidents,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.ceil(total / filters.limit),
    },
  };
  return NextResponse.json(payload);
};

// POST /incidents
const createIncidents = async (request: NextRequest) => {
  const formData = await request.formData();

  const plainData: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (!(value instanceof File)) {
      plainData[key] = value;
    }
  });

  const result = IncidentCreateSchema.safeParse(plainData);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten() },
      { status: 400 }
    );
  }
  const parsedData = result.data;

  // Handle image uploads to Cloudinary
  const uploadedImages: string[] = [];
  const files = formData.getAll("imageFiles");
  for (const file of files) {
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      if (uploadResult?.secure_url) {
        uploadedImages.push(uploadResult.secure_url);
      }
    }
  }

  // Create incident
  const incident = await prisma.incident.create({
    data: {
      ...parsedData,
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
    },
    include: {
      car: {
        select: { id: true, make: true, model: true, licensePlate: true },
      },
      reportedBy: { select: { id: true, name: true } },
      assignedTo: { select: { id: true, name: true } },
      carReading: {
        select: { id: true, odometerReading: true, reportedAt: true },
      },
    },
  });

  await createAuditLog({
    action: AuditActionType.CREATE,
    entityId: incident.id,
    entityType: AuditEntityType.INCIDENT,
    userId: parsedData.reportedById,
    details: `Created incident: ${incident.title}`,
  });

  return NextResponse.json(incident, { status: 201 });
};

export const GET = handleApi(getIncidents);
export const POST = handleApi(createIncidents);
