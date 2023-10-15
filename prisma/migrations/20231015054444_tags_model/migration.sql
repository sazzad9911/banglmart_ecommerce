-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_productId_fkey`;

-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `orderId` VARCHAR(191) NULL,
    MODIFY `commentId` VARCHAR(191) NULL,
    MODIFY `reviewId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
