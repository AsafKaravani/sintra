-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BusinessProduct" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Certificate" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CertificateCategory" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CertificateClaim" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TransactionReview" ALTER COLUMN "updated_at" DROP NOT NULL;
