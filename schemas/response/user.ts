import { UserRole } from "@prisma/client";
import { z } from "zod";

const user = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(UserRole),
});

export type UserResponse = z.infer<typeof user>[];
