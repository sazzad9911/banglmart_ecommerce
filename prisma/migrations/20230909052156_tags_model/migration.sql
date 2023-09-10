/*
  Warnings:

  - You are about to drop the column `buyerid` on the `orders` table. All the data in the column will be lost.
  - Added the required column `buyerId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_buyerid_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `buyerid`,
    ADD COLUMN `buyerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
