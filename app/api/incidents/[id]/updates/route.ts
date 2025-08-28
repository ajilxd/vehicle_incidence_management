import { handleApi } from "@/lib/handleApi";
import prisma from "@/lib/prisma";
import { IncidentCommentSchema } from "@/schemas";
import { IncidentUpdateType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const createComment = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const body = await request.json();
  if (!id || isNaN(id)) {
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
      incidentId: id,
      message: result.comment,
      updateType: IncidentUpdateType.COMMENT,
      userId: result.userId,
      createdAt: new Date(),
    },
  });

  return NextResponse.json({ message: "Incident updated successfully" });
};

export const POST = handleApi(createComment);
