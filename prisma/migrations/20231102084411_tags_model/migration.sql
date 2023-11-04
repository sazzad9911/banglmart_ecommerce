-- CreateTable
CREATE TABLE `camapign` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `durationMonth` INTEGER NOT NULL,
    `startAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaignOffer` (
    `id` VARCHAR(191) NOT NULL,
    `offer` INTEGER NOT NULL,
    `percentage` BOOLEAN NOT NULL DEFAULT false,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` VARCHAR(191) NOT NULL,
    `sale` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 1,
    `camapignId` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `campaignOffer_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campaignOffer` ADD CONSTRAINT `campaignOffer_camapignId_fkey` FOREIGN KEY (`camapignId`) REFERENCES `camapign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaignOffer` ADD CONSTRAINT `campaignOffer_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
