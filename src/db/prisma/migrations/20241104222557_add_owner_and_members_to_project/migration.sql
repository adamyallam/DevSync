/*
  Warnings:

  - You are about to drop the `_projecttouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerID` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_B_fkey`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `ownerID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_projecttouser`;

-- CreateTable
CREATE TABLE `_ProjectMembers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectMembers_AB_unique`(`A`, `B`),
    INDEX `_ProjectMembers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectMembers` ADD CONSTRAINT `_ProjectMembers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectMembers` ADD CONSTRAINT `_ProjectMembers_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
