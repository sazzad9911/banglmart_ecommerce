/*
  Warnings:

  - You are about to alter the column `vat` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `vat` DOUBLE NOT NULL DEFAULT 0;
