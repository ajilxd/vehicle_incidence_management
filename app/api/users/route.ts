import prisma from "@/lib/prisma";
import { UserResponse } from "@/schemas/response/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users: UserResponse = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  return NextResponse.json(users);
}
