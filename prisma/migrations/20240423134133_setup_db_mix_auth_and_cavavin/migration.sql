/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `accounts` table. All the data in the column will be lost.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sessions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - The primary key for the `verification_request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `verification_request` table. All the data in the column will be lost.
  - The required column `account_id` was added to the `accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `session_id` was added to the `sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `user_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `verification_request_id` was added to the `verification_request` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "id",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id");

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
DROP COLUMN "id",
ADD COLUMN     "session_id" TEXT NOT NULL,
ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "verification_request" DROP CONSTRAINT "verification_request_pkey",
DROP COLUMN "id",
ADD COLUMN     "verification_request_id" TEXT NOT NULL,
ADD CONSTRAINT "verification_request_pkey" PRIMARY KEY ("verification_request_id");

-- CreateTable
CREATE TABLE "cellars" (
    "cellar_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "cellars_pkey" PRIMARY KEY ("cellar_id")
);

-- CreateTable
CREATE TABLE "bottles" (
    "bottle_id" TEXT NOT NULL,
    "cellar_id" TEXT,
    "bottle_name" VARCHAR NOT NULL,
    "millesime" INTEGER NOT NULL,
    "type_of_wine" VARCHAR NOT NULL,
    "size" VARCHAR NOT NULL,
    "grape_varieties" JSON NOT NULL,
    "region" VARCHAR NOT NULL,
    "eye_description" TEXT,
    "nose_description" JSON,
    "mouth_description" JSON,
    "carafage" INTEGER,
    "temperature" INTEGER,
    "degree" INTEGER,
    "accompaniment" JSON,
    "media" TEXT,
    "price" INTEGER,
    "price_visibility" INTEGER,
    "global_description" TEXT,
    "entry_date" TIMESTAMP(6) NOT NULL,
    "potential_date" TIMESTAMP(6),
    "quantity" INTEGER NOT NULL,
    "global_visibility" INTEGER NOT NULL,

    CONSTRAINT "bottles_pkey" PRIMARY KEY ("bottle_id")
);

-- CreateTable
CREATE TABLE "users_cellars" (
    "user_cellar_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cellar_id" TEXT NOT NULL,

    CONSTRAINT "users_cellars_pkey" PRIMARY KEY ("user_cellar_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "customer_id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "image_url" VARCHAR(255),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "invoice_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "amount" INTEGER,
    "status" VARCHAR(255),
    "date" TIMESTAMP(6),

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "month" VARCHAR(20) NOT NULL,
    "revenue" INTEGER,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("month")
);

-- AddForeignKey
ALTER TABLE "bottles" ADD CONSTRAINT "bottles_cellar_id_fkey" FOREIGN KEY ("cellar_id") REFERENCES "cellars"("cellar_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_cellars" ADD CONSTRAINT "users_cellars_cellar_id_fkey" FOREIGN KEY ("cellar_id") REFERENCES "cellars"("cellar_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_cellars" ADD CONSTRAINT "users_cellars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
