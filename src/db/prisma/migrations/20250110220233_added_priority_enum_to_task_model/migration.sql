-- AlterTable
ALTER TABLE `task` ADD COLUMN `priority` ENUM('SetPriority', 'High', 'Medium', 'Low') NULL DEFAULT 'SetPriority';
