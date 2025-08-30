/*
  Warnings:

  - The `updatedStatus` column on the `incident_updates` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."incident_updates" DROP COLUMN "updatedStatus",
ADD COLUMN     "updatedStatus" "public"."incident_statuses";
