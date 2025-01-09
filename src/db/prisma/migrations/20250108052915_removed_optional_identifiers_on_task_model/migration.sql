/*
  Warnings:

  - Made the column `projectID` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sectionID` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectID_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_sectionID_fkey`;

-- AlterTable
ALTER TABLE `task` MODIFY `projectID` INTEGER NOT NULL,
    MODIFY `sectionID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_sectionID_fkey` FOREIGN KEY (`sectionID`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
