/*
  Warnings:

  - Made the column `visitorId` on table `product_visitors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `product_visitors` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product_visitors` DROP FOREIGN KEY `product_visitors_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_visitors` DROP FOREIGN KEY `product_visitors_visitorId_fkey`;

-- AlterTable
ALTER TABLE `product_visitors` MODIFY `visitorId` VARCHAR(191) NOT NULL,
    MODIFY `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `product_visitors` ADD CONSTRAINT `product_visitors_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `visitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_visitors` ADD CONSTRAINT `product_visitors_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
