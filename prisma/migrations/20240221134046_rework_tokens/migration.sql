/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VerificationToken` DROP FOREIGN KEY `VerificationToken_userId_fkey`;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('VERIFICATION', 'PASSWORD_RESET') NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Token_token_key`(`token`),
    UNIQUE INDEX `Token_userId_token_type_key`(`userId`, `token`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
