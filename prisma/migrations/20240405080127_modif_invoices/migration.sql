/*
  Warnings:

  - Changed the type of `customer_id` on the `invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;
