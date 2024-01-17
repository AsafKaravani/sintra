/*
  Warnings:

  - You are about to drop the column `quality` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "quality",
ADD COLUMN     "quantity" DOUBLE PRECISION;
