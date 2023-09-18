/*
  Warnings:

  - You are about to drop the column `productId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `productId` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_productId_fkey`;

-- DropIndex
DROP INDEX `conversations_senderId_fkey` ON `conversations`;

-- AlterTable
ALTER TABLE `conversations` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `productId`;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
