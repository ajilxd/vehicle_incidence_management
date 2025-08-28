import { handleApi } from "@/lib/handleApi";
import prisma from "@/lib/prisma";
import { UserResponse } from "@/schemas/response/user";
import { NextRequest, NextResponse } from "next/server";

const getUsers = async (request: NextRequest) => {
  const users: UserResponse = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  return NextResponse.json(users);
};

export const GET = handleApi(getUsers);
