import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { UserRole } from "@prisma/client";

async function main() {
  const passwordHash = await hash("Password@123", 10);
  await prisma.user.createMany({
    data: [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: passwordHash,
        role: UserRole.USER,
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: passwordHash,
        role: UserRole.USER,
      },
      {
        name: "Charlie Davis",
        email: "charlie@example.com",
        password: passwordHash,
        role: UserRole.USER,
      },
      {
        name: "Diana Prince",
        email: "diana@example.com",
        password: passwordHash,
        role: UserRole.MANAGER,
      },
    ],
    skipDuplicates: true,
  });
}
