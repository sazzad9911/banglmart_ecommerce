-- DropForeignKey
ALTER TABLE `banner` DROP FOREIGN KEY `banner_productId_fkey`;

-- AddForeignKey
ALTER TABLE `banner` ADD CONSTRAINT `banner_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
