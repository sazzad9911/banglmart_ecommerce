/*
  Warnings:

  - You are about to drop the column `visitorId` on the `adds_visitors` table. All the data in the column will be lost.
  - Added the required column `visitorsId` to the `adds_visitors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `adds_visitors` DROP FOREIGN KEY `adds_visitors_visitorId_fkey`;

-- AlterTable
ALTER TABLE `adds_visitors` DROP COLUMN `visitorId`,
    ADD COLUMN `visitorsId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `adds_visitors` ADD CONSTRAINT `adds_visitors_visitorsId_fkey` FOREIGN KEY (`visitorsId`) REFERENCES `visitors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
