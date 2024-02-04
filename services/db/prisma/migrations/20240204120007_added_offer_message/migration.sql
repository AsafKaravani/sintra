-- CreateTable
CREATE TABLE "OfferMessage" (
    "id" SERIAL NOT NULL,
    "offer_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "OfferMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferMessage" ADD CONSTRAINT "OfferMessage_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferMessage" ADD CONSTRAINT "OfferMessage_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
