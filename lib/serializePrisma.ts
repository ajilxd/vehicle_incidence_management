import { Decimal } from "@prisma/client/runtime/library";

export function serializePrisma(obj: any): any {
  if (obj instanceof Decimal) return Number(obj); // or obj.toString() if you want exact
  if (typeof obj === "bigint") return Number(obj);
  if (Array.isArray(obj)) return obj.map(serializePrisma);
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, serializePrisma(v)])
    );
  }
  return obj;
}
