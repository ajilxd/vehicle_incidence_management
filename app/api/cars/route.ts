import prisma from "@/lib/prisma";
import { carResponse } from "@/schemas/response/car";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cars: carResponse = await prisma.car.findMany({
    select: { id: true, make: true, model: true, licensePlate: true },
  });
  return NextResponse.json(cars);
}
