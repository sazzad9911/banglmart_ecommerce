/*
  Warnings:

  - You are about to drop the column `image` on the `campaignOffer` table. All the data in the column will be lost.
  - Added the required column `image` to the `campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `campaignOffer` DROP COLUMN `image`;
