/*
  Warnings:

  - You are about to drop the column `seen` on the `conversations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `conversations` DROP COLUMN `seen`,
    ADD COLUMN `unread` INTEGER NOT NULL DEFAULT 0;
