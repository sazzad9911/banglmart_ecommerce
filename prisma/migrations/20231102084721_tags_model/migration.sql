/*
  Warnings:

  - You are about to drop the column `camapignId` on the `campaignOffer` table. All the data in the column will be lost.
  - You are about to drop the `camapign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `campaignOffer` DROP FOREIGN KEY `campaignOffer_camapignId_fkey`;

-- AlterTable
ALTER TABLE `campaignOffer` DROP COLUMN `camapignId`,
    ADD COLUMN `campaignId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `camapign`;

-- CreateTable
CREATE TABLE `campaign` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `durationMonth` INTEGER NOT NULL,
    `startAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campaignOffer` ADD CONSTRAINT `campaignOffer_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campaign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
