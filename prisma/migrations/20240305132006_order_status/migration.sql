-- AlterTable
ALTER TABLE `Order` ADD COLUMN `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'DELIVERED') NOT NULL DEFAULT 'PENDING';
