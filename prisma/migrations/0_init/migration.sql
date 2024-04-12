-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "image_url" VARCHAR(255),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "amount" INTEGER,
    "status" VARCHAR(255),
    "date" DATE,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "month" VARCHAR(4) NOT NULL,
    "revenue" INTEGER,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("month")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR,
    "mail" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "created_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "bottles" (
    "bottle_id" INTEGER NOT NULL,
    "cellar_id" INTEGER,
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
CREATE TABLE "cellars" (
    "cellar_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "cellars_pkey" PRIMARY KEY ("cellar_id")
);

-- CreateTable
CREATE TABLE "users_cellars" (
    "user_cellar_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "cellar_id" INTEGER,

    CONSTRAINT "users_cellars_pkey" PRIMARY KEY ("user_cellar_id")
);

-- AddForeignKey
ALTER TABLE "bottles" ADD CONSTRAINT "bottles_cellar_id_fkey" FOREIGN KEY ("cellar_id") REFERENCES "cellars"("cellar_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_cellars" ADD CONSTRAINT "users_cellars_cellar_id_fkey" FOREIGN KEY ("cellar_id") REFERENCES "cellars"("cellar_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_cellars" ADD CONSTRAINT "users_cellars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

