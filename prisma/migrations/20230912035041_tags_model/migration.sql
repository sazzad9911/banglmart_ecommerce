-- CreateTable
CREATE TABLE `product_visitors` (
    `id` VARCHAR(191) NOT NULL,
    `visitorId` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NULL,

    UNIQUE INDEX `product_visitors_visitorId_key`(`visitorId`),
    UNIQUE INDEX `product_visitors_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_visitors` ADD CONSTRAINT `product_visitors_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `visitors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_visitors` ADD CONSTRAINT `product_visitors_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
