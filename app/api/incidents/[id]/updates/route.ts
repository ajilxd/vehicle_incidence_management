import { handleApi } from "@/lib/handleApi";
import prisma from "@/lib/prisma";
import { IncidentCommentSchema } from "@/schemas";
import { IncidentUpdateType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const createComment = async (
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

  const parsedData = IncidentCommentSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json(
      { errors: parsedData.error.flatten() },
      { status: 400 }
    );
  }
  const result = parsedData.data;

  await prisma.incidentUpdate.create({
    data: {
      incidentId,
      message: result.comment,
      updateType: IncidentUpdateType.COMMENT,
      userId: result.userId,
      createdAt: new Date(),
    },
  });

  return NextResponse.json(
    { message: "Incident updated successfully" },
    {
      status: 201,
    }
  );
};

export const POST = handleApi(createComment);
