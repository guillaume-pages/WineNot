/*
  Warnings:

  - Made the column `degree` on table `bottles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `bottles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price_visibility` on table `bottles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bottles" ALTER COLUMN "grape_varieties" DROP NOT NULL,
ALTER COLUMN "degree" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price_visibility" SET NOT NULL;
