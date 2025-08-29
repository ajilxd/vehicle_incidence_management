import { NextRequest, NextResponse } from "next/server";

export function handleApi(fn: Function) {
  return async (req: NextRequest, ctx: any) => {
    try {
      return await fn(req, ctx);
    } catch (error: any) {
      console.error("Error handling API request:", error);
      return NextResponse.json(
        { error: error?.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
