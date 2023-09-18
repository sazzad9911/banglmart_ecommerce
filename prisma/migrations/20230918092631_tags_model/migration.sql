-- DropForeignKey
ALTER TABLE `conversations` DROP FOREIGN KEY `conversations_senderId_fkey`;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
