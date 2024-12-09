/*
  Warnings:

  - You are about to alter the column `status` on the `project` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(3))`.
  - You are about to alter the column `status` on the `section` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(3))`.
  - You are about to alter the column `status` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `status` ENUM('NotStarted', 'OnTrack', 'AtRisk', 'OffTrack', 'OnHold') NULL DEFAULT 'NotStarted';

-- AlterTable
ALTER TABLE `section` MODIFY `status` ENUM('NotStarted', 'OnTrack', 'AtRisk', 'OffTrack', 'OnHold') NULL DEFAULT 'NotStarted';

-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('NotStarted', 'OnTrack', 'AtRisk', 'OffTrack', 'OnHold') NULL DEFAULT 'NotStarted';
