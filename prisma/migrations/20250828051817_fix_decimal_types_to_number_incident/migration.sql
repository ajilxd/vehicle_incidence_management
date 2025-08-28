/*
  Warnings:

  - You are about to alter the column `estimatedCost` on the `incidents` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `actualCost` on the `incidents` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - Changed the type of `action` on the `audit_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `entityType` on the `audit_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."audit_logs" DROP COLUMN "action",
ADD COLUMN     "action" "public"."audit_action_type" NOT NULL,
DROP COLUMN "entityType",
ADD COLUMN     "entityType" "public"."audit_entity_type" NOT NULL;

-- AlterTable
ALTER TABLE "public"."incidents" ALTER COLUMN "estimatedCost" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "actualCost" SET DATA TYPE DOUBLE PRECISION;
