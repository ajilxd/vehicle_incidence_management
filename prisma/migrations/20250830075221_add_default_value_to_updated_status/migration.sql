/*
  Warnings:

  - Made the column `updatedStatus` on table `incident_updates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."incident_updates" ALTER COLUMN "updatedStatus" SET NOT NULL,
ALTER COLUMN "updatedStatus" SET DEFAULT 'IN_PROGRESS';
