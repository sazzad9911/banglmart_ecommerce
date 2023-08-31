/*
  Warnings:

  - You are about to drop the column `visitorId` on the `adds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `adds` DROP FOREIGN KEY `adds_visitorId_fkey`;

-- AlterTable
ALTER TABLE `adds` DROP COLUMN `visitorId`;

-- CreateTable
CREATE TABLE `adds_visitors` (
    `id` VARCHAR(191) NOT NULL,
    `visitorId` VARCHAR(191) NULL,
    `addsId` VARCHAR(191) NULL,

    UNIQUE INDEX `adds_visitors_visitorId_key`(`visitorId`),
    UNIQUE INDEX `adds_visitors_addsId_key`(`addsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `adds_visitors` ADD CONSTRAINT `adds_visitors_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `visitors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adds_visitors` ADD CONSTRAINT `adds_visitors_addsId_fkey` FOREIGN KEY (`addsId`) REFERENCES `adds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
