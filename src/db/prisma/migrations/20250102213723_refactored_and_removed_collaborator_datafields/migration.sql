/*
  Warnings:

  - You are about to drop the column `userID` on the `section` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_projectmembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tasktouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projectmembers` DROP FOREIGN KEY `_ProjectMembers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projectmembers` DROP FOREIGN KEY `_ProjectMembers_B_fkey`;

-- DropForeignKey
ALTER TABLE `_tasktouser` DROP FOREIGN KEY `_TaskToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_tasktouser` DROP FOREIGN KEY `_TaskToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_userID_fkey`;

-- AlterTable
ALTER TABLE `section` DROP COLUMN `userID`,
    MODIFY `name` VARCHAR(60) NOT NULL DEFAULT 'Untitled Section';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- DropTable
DROP TABLE `_projectmembers`;

-- DropTable
DROP TABLE `_tasktouser`;

-- DropTable
DROP TABLE `comment`;
