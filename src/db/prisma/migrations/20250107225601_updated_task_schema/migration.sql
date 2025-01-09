-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectID_fkey`;

-- AlterTable
ALTER TABLE `task` MODIFY `projectID` INTEGER NULL,
    MODIFY `name` VARCHAR(60) NULL DEFAULT '',
    MODIFY `description` VARCHAR(300) NULL DEFAULT 'New task';

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
