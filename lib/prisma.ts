import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

// Initialize Neon client
const sql = neon(connectionString);
// Create Prisma adapter for Neon
const adapter = new PrismaNeon({ connectionString });
// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
