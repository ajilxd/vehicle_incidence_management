import { UserRole } from "@prisma/client";

type user = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type UserResponse = user[];
