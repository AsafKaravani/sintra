-- CreateTable
CREATE TABLE "BusinessWorker" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "BusinessWorker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessWorker" ADD CONSTRAINT "BusinessWorker_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessWorker" ADD CONSTRAINT "BusinessWorker_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
