/*
  Warnings:

  - A unique constraint covering the columns `[socketId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `socketId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_socketId_key` ON `users`(`socketId`);
