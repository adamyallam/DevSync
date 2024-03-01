/*
  Warnings:

  - You are about to drop the column `projectDescription` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `project` table. All the data in the column will be lost.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_sectionID_fkey`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `projectDescription`,
    DROP COLUMN `projectName`,
    ADD COLUMN `description` VARCHAR(300) NOT NULL,
    ADD COLUMN `name` VARCHAR(60) NOT NULL,
    MODIFY `status` ENUM('NOTSTARTED', 'INPROGRESS', 'COMPLETE') NULL DEFAULT 'NOTSTARTED';

-- AlterTable
ALTER TABLE `task` MODIFY `sectionID` INTEGER NULL;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `postedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_sectionID_fkey` FOREIGN KEY (`sectionID`) REFERENCES `Section`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
