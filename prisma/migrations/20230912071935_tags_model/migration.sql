/*
  Warnings:

  - You are about to drop the column `productId` on the `product_visitors` table. All the data in the column will be lost.
  - You are about to drop the column `visitorId` on the `product_visitors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_visitors` DROP FOREIGN KEY `product_visitors_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_visitors` DROP FOREIGN KEY `product_visitors_visitorId_fkey`;

-- AlterTable
ALTER TABLE `product_visitors` DROP COLUMN `productId`,
    DROP COLUMN `visitorId`,
    ADD COLUMN `productsId` VARCHAR(191) NULL,
    ADD COLUMN `visitorsId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `product_visitors` ADD CONSTRAINT `product_visitors_visitorsId_fkey` FOREIGN KEY (`visitorsId`) REFERENCES `visitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_visitors` ADD CONSTRAINT `product_visitors_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
