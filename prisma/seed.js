const dotenv = require("dotenv");
dotenv.config();

const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Password@123", 10);

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: passwordHash,
        role: "USER",
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: passwordHash,
        role: "USER",
      },
      {
        name: "Charlie Davis",
        email: "charlie@example.com",
        password: passwordHash,
        role: "USER",
      },
      {
        name: "Diana Prince",
        email: "diana@example.com",
        password: passwordHash,
        role: "MANAGER",
      },
    ],
    skipDuplicates: true,
  });

  // Seed Cars
  await prisma.car.createMany({
    data: [
      {
        licensePlate: "ABC123",
        make: "Toyota",
        model: "Camry",
      },
      {
        licensePlate: "XYZ789",
        make: "Honda",
        model: "Civic",
      },
      {
        licensePlate: "DEF456",
        make: "Ford",
        model: "Mustang",
      },
    ],
    skipDuplicates: true,
  });

  // Seed Car Readings
  await prisma.carReading.createMany({
    data: [
      {
        odometerReading: 50000,
        reportedAt: new Date("2025-01-15T10:00:00Z"),
        carId: 1,
      },
      {
        odometerReading: 75000,
        reportedAt: new Date("2025-02-20T14:30:00Z"),
        carId: 1,
      },
      {
        odometerReading: 30000,
        reportedAt: new Date("2025-03-10T09:15:00Z"),
        carId: 2,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Incidents
  await prisma.incident.createMany({
    data: [
      {
        carId: 1,
        reportedById: 1,
        assignedToId: 4,
        title: "Minor Collision",
        description: "Rear-end collision at parking lot",
        severity: "LOW",
        status: "PENDING",
        type: "ACCIDENT",
        location: "Main Street Parking",
        latitude: 40.7128,
        longitude: -74.006,
        occurredAt: new Date("2025-01-10T08:00:00Z"),
        reportedAt: new Date("2025-01-10T08:30:00Z"),
        carReadingId: 1,
        images: ["image1.jpg", "image2.jpg"],
        documents: ["report.pdf"],
        estimatedCost: 500.0,
      },
      {
        carId: 2,
        reportedById: 2,
        assignedToId: null,
        title: "Flat Tire",
        description: "Front left tire punctured on highway",
        severity: "MEDIUM",
        status: "IN_PROGRESS",
        type: "BREAKDOWN",
        location: "Highway 101",
        latitude: 34.0522,
        longitude: -118.2437,
        occurredAt: new Date("2025-02-15T12:00:00Z"),
        reportedAt: new Date("2025-02-15T12:30:00Z"),
        carReadingId: 2,
        images: ["tire.jpg"],
        documents: [],
        estimatedCost: 150.0,
      },
      {
        carId: 3,
        reportedById: 3,
        assignedToId: 4,
        title: "Vandalism Incident",
        description: "Car scratched on driver side door",
        severity: "HIGH",
        status: "PENDING",
        type: "VANDALISM",
        location: "Downtown Garage",
        latitude: 51.5074,
        longitude: -0.1278,
        occurredAt: new Date("2025-03-05T18:00:00Z"),
        reportedAt: new Date("2025-03-05T18:30:00Z"),
        carReadingId: 3,
        images: ["scratch1.jpg", "scratch2.jpg"],
        documents: ["police_report.pdf"],
        estimatedCost: 800.0,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Incident Updates
  await prisma.incidentUpdate.createMany({
    data: [
      {
        incidentId: 1,
        userId: 4,
        message: "Assigned to manager for review",
        updateType: "ASSIGNMENT",
        createdAt: new Date("2025-01-10T09:00:00Z"),
      },
      {
        incidentId: 1,
        userId: 1,
        message: "Waiting for insurance assessment",
        updateType: "COMMENT",
        createdAt: new Date("2025-01-11T10:00:00Z"),
      },
      {
        incidentId: 2,
        userId: 2,
        message: "Tire replacement in progress",
        updateType: "STATUS_CHANGE",
        createdAt: new Date("2025-02-15T13:00:00Z"),
      },
      {
        incidentId: 3,
        userId: 4,
        message: "Police report received, assessing damage",
        updateType: "COMMENT",
        createdAt: new Date("2025-03-06T09:00:00Z"),
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
