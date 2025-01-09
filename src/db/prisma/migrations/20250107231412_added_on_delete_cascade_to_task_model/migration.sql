-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectID_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_sectionID_fkey`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_sectionID_fkey` FOREIGN KEY (`sectionID`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
