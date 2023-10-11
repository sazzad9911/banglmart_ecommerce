/*
  Warnings:

  - You are about to drop the column `productId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `couponId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `promoId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `specialCodeId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `productIds` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_couponId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_promoId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_specialCodeId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `productId`,
    ADD COLUMN `productIds` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `couponId`,
    DROP COLUMN `promoId`,
    DROP COLUMN `specialCodeId`,
    ADD COLUMN `couponDiscount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `deliveryFee` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `freeCoin` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `specialMemberOffer` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `specialPromoOffer` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `token` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_productIds_fkey` FOREIGN KEY (`productIds`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
