-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veggie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "pricePerKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Veggie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropYieldPrediction" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "predictedDate" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "totalYieldKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CropYieldPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropYieldPredictionDetail" (
    "id" SERIAL NOT NULL,
    "predictionId" INTEGER NOT NULL,
    "veggieId" INTEGER NOT NULL,
    "predictedYieldKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CropYieldPredictionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropOrder" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "CropOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropOrderDetail" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "veggieId" INTEGER NOT NULL,
    "quantityKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CropOrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropReturned" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "reason" TEXT,

    CONSTRAINT "CropReturned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropReturnedDetail" (
    "id" SERIAL NOT NULL,
    "returnId" INTEGER NOT NULL,
    "veggieId" INTEGER NOT NULL,
    "returnedKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CropReturnedDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropHarvest" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "harvestDate" TIMESTAMP(3) NOT NULL,
    "totalHarvestKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CropHarvest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropHarvestDetail" (
    "id" SERIAL NOT NULL,
    "harvestId" INTEGER NOT NULL,
    "veggieId" INTEGER NOT NULL,
    "harvestedKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CropHarvestDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_email_key" ON "Farmer"("email");

-- AddForeignKey
ALTER TABLE "CropYieldPrediction" ADD CONSTRAINT "CropYieldPrediction_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropYieldPredictionDetail" ADD CONSTRAINT "CropYieldPredictionDetail_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "CropYieldPrediction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropYieldPredictionDetail" ADD CONSTRAINT "CropYieldPredictionDetail_veggieId_fkey" FOREIGN KEY ("veggieId") REFERENCES "Veggie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropOrder" ADD CONSTRAINT "CropOrder_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropOrderDetail" ADD CONSTRAINT "CropOrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "CropOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropOrderDetail" ADD CONSTRAINT "CropOrderDetail_veggieId_fkey" FOREIGN KEY ("veggieId") REFERENCES "Veggie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropReturned" ADD CONSTRAINT "CropReturned_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "CropOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropReturnedDetail" ADD CONSTRAINT "CropReturnedDetail_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "CropReturned"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropReturnedDetail" ADD CONSTRAINT "CropReturnedDetail_veggieId_fkey" FOREIGN KEY ("veggieId") REFERENCES "Veggie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropHarvest" ADD CONSTRAINT "CropHarvest_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropHarvestDetail" ADD CONSTRAINT "CropHarvestDetail_harvestId_fkey" FOREIGN KEY ("harvestId") REFERENCES "CropHarvest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropHarvestDetail" ADD CONSTRAINT "CropHarvestDetail_veggieId_fkey" FOREIGN KEY ("veggieId") REFERENCES "Veggie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
