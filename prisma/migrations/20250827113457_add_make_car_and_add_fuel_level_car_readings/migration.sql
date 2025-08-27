/*
  Warnings:

  - Added the required column `make` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."cars" ADD COLUMN     "make" TEXT NOT NULL;
