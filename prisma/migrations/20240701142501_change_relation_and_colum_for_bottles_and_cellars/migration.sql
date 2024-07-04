/*
  Warnings:

  - You are about to drop the column `bottles` on the `cellars` table. All the data in the column will be lost.
  - Added the required column `cellar_id` to the `bottles` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bottles" ADD COLUMN     "cellar_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cellars" DROP COLUMN "bottles";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "bottles" ADD CONSTRAINT "bottles_cellar_id_fkey" FOREIGN KEY ("cellar_id") REFERENCES "cellars"("cellar_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
