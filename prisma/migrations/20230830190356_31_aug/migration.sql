/*
  Warnings:

  - You are about to drop the column `replay` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `coins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[brandName]` on the table `brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shopName]` on the table `seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specificationsId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `coins` DROP FOREIGN KEY `coins_productId_fkey`;

-- DropForeignKey
ALTER TABLE `offers` DROP FOREIGN KEY `offers_productId_fkey`;

-- DropForeignKey
ALTER TABLE `variants` DROP FOREIGN KEY `variants_colorId_fkey`;

-- DropForeignKey
ALTER TABLE `variants` DROP FOREIGN KEY `variants_productId_fkey`;

-- DropForeignKey
ALTER TABLE `variants` DROP FOREIGN KEY `variants_sizeId_fkey`;

-- DropForeignKey
ALTER TABLE `variants` DROP FOREIGN KEY `variants_userId_fkey`;

-- AlterTable
ALTER TABLE `brands` ADD COLUMN `categories` JSON NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL,
    MODIFY `replay` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `colorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `fixedPrice` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `freeCoin` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `freeDelivery` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `images` JSON NULL,
    ADD COLUMN `offer` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `percentage` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sizeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `specificationsId` VARCHAR(191) NOT NULL,
    MODIFY `verified` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `replay`,
    ADD COLUMN `brandId` VARCHAR(191) NULL,
    ADD COLUMN `sellerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `seller` ADD COLUMN `categories` JSON NULL,
    ADD COLUMN `logo` VARCHAR(191) NOT NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `coins`;

-- DropTable
DROP TABLE `offers`;

-- DropTable
DROP TABLE `variants`;

-- CreateTable
CREATE TABLE `specifications` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `specifications_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversations` (
    `id` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `receiverId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `buyerid` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `offerPrice` INTEGER NOT NULL DEFAULT 0,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banner` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `banner_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adds` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `visitorId` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `adds_title_key`(`title`),
    UNIQUE INDEX `adds_visitorId_key`(`visitorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitors` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `deviceName` VARCHAR(191) NOT NULL,
    `randomId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `visitors_randomId_key`(`randomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `brands_brandName_key` ON `brands`(`brandName`);

-- CreateIndex
CREATE UNIQUE INDEX `seller_shopName_key` ON `seller`(`shopName`);

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `size`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_specificationsId_fkey` FOREIGN KEY (`specificationsId`) REFERENCES `specifications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `seller`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_buyerid_fkey` FOREIGN KEY (`buyerid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `banner` ADD CONSTRAINT `banner_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adds` ADD CONSTRAINT `adds_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adds` ADD CONSTRAINT `adds_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `visitors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
