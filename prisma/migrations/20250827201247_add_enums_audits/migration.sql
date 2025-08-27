-- CreateEnum
CREATE TYPE "public"."audit_entity_type" AS ENUM ('USER', 'INCIDENT', 'CAR', 'CAR_READING', 'ASSIGNMENT', 'AUTH');

-- CreateEnum
CREATE TYPE "public"."audit_action_type" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'ASSIGN', 'STATUS_CHANGE');
