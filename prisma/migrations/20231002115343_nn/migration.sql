/*
  Warnings:

  - You are about to alter the column `offerPrice` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `cartId` on the `orders` table. All the data in the column will be lost.
  - Made the column `deliveryCharge` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_productId_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `offerPrice` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `cartId`,
    ADD COLUMN `colors` JSON NULL,
    ADD COLUMN `couponId` VARCHAR(191) NULL,
    ADD COLUMN `offerPrice` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `sizes` JSON NULL,
    ADD COLUMN `specifications` JSON NULL,
    MODIFY `productId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `deliveryCharge` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `coupon_code`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
