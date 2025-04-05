/*
  Warnings:

  - You are about to alter the column `duration` on the `Training` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Measurement` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `duration` on table `Training` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `Training` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pulse` on table `Training` required. This step will fail if there are existing NULL values in that column.
  - Made the column `temperature` on table `Training` required. This step will fail if there are existing NULL values in that column.
  - Made the column `oxygen` on table `Training` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Measurement" DROP CONSTRAINT "Measurement_userId_fkey";

-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE INTEGER,
ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "pulse" SET NOT NULL,
ALTER COLUMN "temperature" SET NOT NULL,
ALTER COLUMN "oxygen" SET NOT NULL;

-- DropTable
DROP TABLE "Measurement";

-- CreateTable
CREATE TABLE "measurement" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "steps" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "pulse" INTEGER NOT NULL,
    "sleep" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "oxygen" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measurement" ADD CONSTRAINT "measurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
