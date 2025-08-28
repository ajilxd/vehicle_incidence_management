import prisma from "@/lib/prisma";
import { carResponse } from "@/schemas/response/car";
import { NextRequest, NextResponse } from "next/server";
import { handleApi } from "@/lib/handleApi";

const getCars = async (request: NextRequest) => {
  const cars: carResponse = await prisma.car.findMany({
    select: { id: true, make: true, model: true, licensePlate: true },
  });
  return NextResponse.json(cars);
};

export const GET = handleApi(getCars);
