/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('USER', 'ADMIN', 'EMPLOYEE') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Employee`;
