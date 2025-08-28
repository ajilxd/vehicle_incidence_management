import prisma from "@/lib/prisma";
import { IncidentUpdateSchema } from "@/schemas";
import { IncidentDetailsResponse } from "@/schemas/response/incident";
import {
  AuditActionType,
  AuditEntityType,
  IncidentUpdateType,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (!id || isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid or missing id" },
      { status: 400 }
    );
  }

  const payload: IncidentDetailsResponse = await prisma.incident.findUnique({
    where: { id },
    include: {
      updates: {
        select: {
          id: true,
          message: true,
          updateType: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      reportedBy: {
        select: {
          id: true,
          name: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
      car: {
        select: {
          id: true,
          licensePlate: true,
          make: true,
          model: true,
        },
      },
      carReading: {
        select: {
          id: true,
          odometerReading: true,
          reportedAt: true,
        },
      },
    },
  });
  return NextResponse.json(payload);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await request.json();
  if (!id || isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid or missing id" },
      { status: 400 }
    );
  }

  if (!body.userId) {
    return NextResponse.json(
      { error: "Invalid or missing user id" },
      { status: 400 }
    );
  }
  const parsedData = IncidentUpdateSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json(
      { errors: parsedData.error.flatten() },
      { status: 400 }
    );
  }

  const result = parsedData.data;
  let payload;
  let updateType: IncidentUpdateType;
  let message: string;
  let action: AuditActionType = AuditActionType.UPDATE;
  let entityType: AuditEntityType = AuditEntityType.INCIDENT;
  if ("status" in result) {
    payload = await prisma.incident.update({
      where: { id },
      data: { status: result.status },
    });
    updateType = IncidentUpdateType.STATUS_CHANGE;
    message = `Updated status to ${result.status}`;
  } else if ("assignedToId" in result) {
    payload = await prisma.incident.update({
      where: { id },
      data: { assignedToId: result.assignedToId },
    });
    updateType = IncidentUpdateType.ASSIGNMENT;
    message = `Assigned incident to ${result.assignedToId}`;
  } else if ("resolutionNotes" in result) {
    payload = await prisma.incident.update({
      where: { id },
      data: { resolutionNotes: result.resolutionNotes },
    });
    updateType = IncidentUpdateType.RESOLUTION;
    message = `Updated resolution notes`;
  } else {
    return NextResponse.json({ error: "Invalid update type" }, { status: 400 });
  }
  // Create incident update
  await prisma.incidentUpdate.create({
    data: { incidentId: id, message, updateType, userId: body.userId },
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      action,
      entityType,
      userId: body.userId,
      entityId: id,
      details: message,
    },
  });
  return NextResponse.json(message);
}
