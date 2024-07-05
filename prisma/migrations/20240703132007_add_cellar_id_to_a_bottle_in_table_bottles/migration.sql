/*
  Warnings:

  - Added the required column `cellar_id` to the `bottles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bottles" ADD COLUMN     "cellar_id" TEXT NOT NULL;
