import { CreateAuditLog } from "@/types";
import prisma from "./prisma";

export const createAuditLog = async (data: CreateAuditLog) => {
  const { action, entityId, entityType, userId, details } = data;
  await prisma.auditLog.create({
    data: {
      action,
      entityId,
      entityType,
      userId,
      details,
    },
  });
};
