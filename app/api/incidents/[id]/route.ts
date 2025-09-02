import { handleApi } from "@/lib/handleApi";
import prisma from "@/lib/prisma";
import { IncidentUpdateSchema } from "@/schemas";
import { IncidentDetailsResponse } from "@/schemas/response/incident";
import {
  AuditActionType,
  AuditEntityType,
  IncidentStatus,
  IncidentUpdateType,
} from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const getIncidentDetails = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const incidentId = Number(id);
  if (!incidentId || isNaN(incidentId)) {
    return NextResponse.json(
      { error: "Invalid or missing id" },
      { status: 400 }
    );
  }

  const payload: IncidentDetailsResponse = await prisma.incident.findUnique({
    where: { id: incidentId },
    include: {
      updates: {
        select: {
          id: true,
          message: true,
          updateType: true,
          createdAt: true,
          updatedStatus: true,
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
};

const updateIncident = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const incidentId = Number(id);
  const body = await request.json();
  if (!incidentId || isNaN(incidentId)) {
    return NextResponse.json(
      { error: "Invalid or missing id" },
      { status: 400 }
    );
  }

  if (!body.userId || isNaN(body.userId)) {
    return NextResponse.json(
      { error: "Invalid or missing user id" },
      { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: body.userId },
  });

  console.log("user at patch", user);
  if (!user || user.role !== "MANAGER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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
  console.log("body from updation", body);
  if ("status" in result) {
    if (result.status === IncidentStatus.RESOLVED) {
      payload = await prisma.incident.update({
        where: { id: incidentId },
        data: { status: result.status, resolvedAt: new Date() },
      });
    } else {
      payload = await prisma.incident.update({
        where: { id: incidentId },
        data: { status: result.status },
      });
    }
    updateType = IncidentUpdateType.STATUS_CHANGE;
    message = `Updated status to ${result.status}`;
  } else if ("assignedToId" in result) {
    const user = await prisma.user.findUnique({
      where: { id: result.assignedToId },
      select: { name: true },
    });
    payload = await prisma.incident.update({
      where: { id: incidentId },
      data: { assignedToId: result.assignedToId },
    });
    updateType = IncidentUpdateType.ASSIGNMENT;
    message = `Assigned incident to ${user?.name}`;
  } else if ("resolutionNotes" in result) {
    payload = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolutionNotes: result.resolutionNotes },
    });
    updateType = IncidentUpdateType.RESOLUTION;
    message = `Updated resolution notes`;
  } else {
    return NextResponse.json({ error: "Invalid update type" }, { status: 400 });
  }
  // Create incident update
  await prisma.incidentUpdate.create({
    data: {
      incidentId,
      message,
      updateType,
      userId: body.userId,
      updatedStatus: body.status,
    },
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      action,
      entityType,
      userId: body.userId,
      entityId: incidentId,
      details: message,
    },
  });
  return NextResponse.json(message);
};

export const GET = handleApi(getIncidentDetails);
export const PATCH = handleApi(updateIncident);
