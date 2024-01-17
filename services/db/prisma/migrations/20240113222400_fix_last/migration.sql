/*
  Warnings:

  - You are about to drop the column `offer_type` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "offer_type",
DROP COLUMN "start_date",
ADD COLUMN     "harvest_date" TIMESTAMP(3),
ADD COLUMN     "packaging" DOUBLE PRECISION,
ADD COLUMN     "quality" DOUBLE PRECISION;
