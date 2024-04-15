/*
  Warnings:

  - The primary key for the `revenue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[mail]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE bottles_bottle_id_seq;
ALTER TABLE "bottles" ADD COLUMN     "degree" INTEGER,
ALTER COLUMN "bottle_id" SET DEFAULT nextval('bottles_bottle_id_seq');
ALTER SEQUENCE bottles_bottle_id_seq OWNED BY "bottles"."bottle_id";

-- AlterTable
CREATE SEQUENCE cellars_cellar_id_seq;
ALTER TABLE "cellars" ALTER COLUMN "cellar_id" SET DEFAULT nextval('cellars_cellar_id_seq');
ALTER SEQUENCE cellars_cellar_id_seq OWNED BY "cellars"."cellar_id";

-- AlterTable
ALTER TABLE "revenue" DROP CONSTRAINT "revenue_pkey",
ALTER COLUMN "month" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "revenue_pkey" PRIMARY KEY ("month");

-- AlterTable
CREATE SEQUENCE users_user_id_seq;
ALTER TABLE "users" ALTER COLUMN "user_id" SET DEFAULT nextval('users_user_id_seq');
ALTER SEQUENCE users_user_id_seq OWNED BY "users"."user_id";

-- AlterTable
CREATE SEQUENCE users_cellars_user_cellar_id_seq;
ALTER TABLE "users_cellars" ALTER COLUMN "user_cellar_id" SET DEFAULT nextval('users_cellars_user_cellar_id_seq');
ALTER SEQUENCE users_cellars_user_cellar_id_seq OWNED BY "users_cellars"."user_cellar_id";

-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "users"("mail");
