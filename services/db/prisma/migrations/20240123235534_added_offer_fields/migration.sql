-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "appearance" TEXT,
ADD COLUMN     "delivery_due_date" TIMESTAMP(3),
ADD COLUMN     "destination_country" TEXT,
ADD COLUMN     "offer_type" "OfferType",
ADD COLUMN     "origin_country" TEXT,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "payment_terms" TEXT,
ADD COLUMN     "texture" TEXT;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
