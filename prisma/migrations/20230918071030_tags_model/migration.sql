/*
  Warnings:

  - You are about to drop the column `addsId` on the `adds_visitors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `adds_visitors` DROP FOREIGN KEY `adds_visitors_addsId_fkey`;

-- AlterTable
ALTER TABLE `adds_visitors` DROP COLUMN `addsId`,
    ADD COLUMN `addId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `adds_visitors` ADD CONSTRAINT `adds_visitors_addId_fkey` FOREIGN KEY (`addId`) REFERENCES `adds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
