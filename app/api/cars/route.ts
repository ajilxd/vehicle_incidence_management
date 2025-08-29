import prisma from "@/lib/prisma";
import { CarResponse } from "@/schemas/response/car";
import { NextRequest, NextResponse } from "next/server";
import { handleApi } from "@/lib/handleApi";
import { CarFilterSchema } from "@/schemas";
import { Prisma } from "@prisma/client";

const getCars = async (request: NextRequest) => {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);

  const result = CarFilterSchema.safeParse(searchParams);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const filters = result.data;

  const where: Prisma.CarWhereInput = {};
  if (filters.query) {
    if (filters.query) {
      where.OR = [
        { make: { contains: filters.query, mode: "insensitive" } },
        { model: { contains: filters.query, mode: "insensitive" } },
        { licensePlate: { contains: filters.query, mode: "insensitive" } },
      ];
    }
  }
  const cars = await prisma.car.findMany({
    where,
    take: filters.limit,
    skip: (filters.page - 1) * filters.limit,
    select: { id: true, make: true, model: true, licensePlate: true },
  });
  const total = await prisma.car.count({ where });
  const payload: CarResponse = {
    data: cars,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.ceil(total / filters.limit),
    },
  };
  return NextResponse.json(payload);
};

export const GET = handleApi(getCars);
