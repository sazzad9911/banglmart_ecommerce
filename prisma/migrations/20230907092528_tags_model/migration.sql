/*
  Warnings:

  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contacts` ADD COLUMN `replied` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `status` VARCHAR(191) NOT NULL;
