/*
  Warnings:

  - You are about to drop the column `colorId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `specificationsId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_colorId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_sizeId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_specificationsId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `colorId`,
    DROP COLUMN `sizeId`,
    DROP COLUMN `specificationsId`,
    ADD COLUMN `colors` JSON NULL,
    ADD COLUMN `sizes` JSON NULL,
    ADD COLUMN `specifications` JSON NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `uid` VARCHAR(191) NULL;
