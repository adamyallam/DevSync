-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_projectID_fkey`;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
