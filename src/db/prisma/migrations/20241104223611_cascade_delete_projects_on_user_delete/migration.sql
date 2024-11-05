-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_ownerID_fkey`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
