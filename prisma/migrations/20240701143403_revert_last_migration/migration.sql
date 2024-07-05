/*
  Warnings:

  - You are about to drop the column `cellar_id` on the `bottles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bottles" DROP CONSTRAINT "bottles_cellar_id_fkey";

-- AlterTable
ALTER TABLE "bottles" DROP COLUMN "cellar_id";

-- AlterTable
ALTER TABLE "cellars" ADD COLUMN     "bottles" TEXT[];
