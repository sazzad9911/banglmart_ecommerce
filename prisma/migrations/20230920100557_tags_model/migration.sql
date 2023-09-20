-- AlterTable
ALTER TABLE `messages` ADD COLUMN `receiverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
