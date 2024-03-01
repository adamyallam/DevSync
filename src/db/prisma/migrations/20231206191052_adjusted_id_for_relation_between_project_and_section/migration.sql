/*
  Warnings:

  - You are about to drop the column `sectionID` on the `section` table. All the data in the column will be lost.
  - Added the required column `projectID` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_sectionID_fkey`;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `sectionID`,
    ADD COLUMN `projectID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
