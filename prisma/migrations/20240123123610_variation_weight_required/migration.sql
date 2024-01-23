/*
  Warnings:

  - Made the column `weight` on table `ProductVariations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductVariations" ALTER COLUMN "weight" SET NOT NULL;
