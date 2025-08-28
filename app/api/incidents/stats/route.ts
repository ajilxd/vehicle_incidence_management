import prisma from "@/lib/prisma";
import { IncidentStatus } from "@prisma/client";
import { serializePrisma } from "@/lib/serializePrisma";
import { NextResponse } from "next/server";
import { handleApi } from "@/lib/handleApi";

const getStats = async () => {
  const totalIncidents = await prisma.incident.count();
  const openIncidents = await prisma.incident.count({
    where: {
      status: { in: [IncidentStatus.PENDING, IncidentStatus.IN_PROGRESS] },
    },
  });
  const closedIncidents = await prisma.incident.count({
    where: {
      status: { in: [IncidentStatus.RESOLVED, IncidentStatus.CLOSED] },
    },
  });
  const groupByStatus = await prisma.incident.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });
  const groupBySeverity = await prisma.incident.groupBy({
    by: ["severity"],
    _count: {
      id: true,
    },
  });
  const groupByType = await prisma.incident.groupBy({
    by: ["type"],
    _count: {
      id: true,
    },
  });
  //   cost based
  const totalEstimatedCost = await prisma.incident.aggregate({
    _sum: {
      estimatedCost: true,
    },
  });

  const totalActualCost = await prisma.incident.aggregate({
    _sum: {
      actualCost: true,
    },
  });

  const costBySeverity = await prisma.incident.groupBy({
    by: ["severity"],
    _sum: {
      estimatedCost: true,
      actualCost: true,
    },
  });

  // Fetch all incidents and group by month in JS
  const incidents = await prisma.incident.findMany({
    select: {
      occurredAt: true,
      id: true,
    },
  });

  // Group by month in JS
  const incidentsByMonth = incidents.reduce((acc, incident) => {
    const month = incident.occurredAt.getMonth() + 1; // JS months 0-11, so +1
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Convert to array sorted by month
  const incidentsByMonthArray = Object.entries(incidentsByMonth)
    .map(([month, count]) => ({ month: Number(month), incident_count: count }))
    .sort((a, b) => a.month - b.month);

  const payload = {
    closedIncidents,
    totalIncidents,
    openIncidents,
    groupByStatus,
    groupBySeverity,
    groupByType,
    totalEstimatedCost,
    totalActualCost,
    costBySeverity,
    incidentsByMonth: incidentsByMonthArray,
  };

  return NextResponse.json(payload);
};

export const GET = handleApi(getStats);
