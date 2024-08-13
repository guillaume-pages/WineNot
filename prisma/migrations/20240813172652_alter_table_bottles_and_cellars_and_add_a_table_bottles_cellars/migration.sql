/*
  Warnings:

  - You are about to drop the column `cellar_id` on the `bottles` table. All the data in the column will be lost.
  - You are about to drop the column `bottles` on the `cellars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bottles" DROP COLUMN "cellar_id";

-- AlterTable
ALTER TABLE "cellars" DROP COLUMN "bottles";

-- CreateTable
CREATE TABLE "bottles_cellars" (
    "bottle_cellar_id" TEXT NOT NULL,
    "bottle_id" TEXT NOT NULL,
    "cellar_id" TEXT NOT NULL,

    CONSTRAINT "bottles_cellars_pkey" PRIMARY KEY ("bottle_cellar_id")
);

-- AddForeignKey
ALTER TABLE "bottles_cellars" ADD CONSTRAINT "bottles_cellars_bottle_id_fkey" FOREIGN KEY ("bottle_id") REFERENCES "bottles"("bottle_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bottles_cellars" ADD CONSTRAINT "bottles_cellars_cellar_id_fkey" FOREIGN KEY ("cellar_id") REFERENCES "cellars"("cellar_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
