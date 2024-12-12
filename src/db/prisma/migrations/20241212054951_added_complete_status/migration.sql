-- AlterTable
ALTER TABLE `project` MODIFY `status` ENUM('SetStatus', 'OnTrack', 'AtRisk', 'OffTrack', 'OnHold', 'Complete') NULL DEFAULT 'SetStatus';

-- AlterTable
ALTER TABLE `section` MODIFY `status` ENUM('SetStatus', 'OnTrack', 'AtRisk', 'OffTrack', 'OnHold', 'Complete') NULL DEFAULT 'SetStatus';

-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('SetStatus', 'OnTrack', 'AtRisk', 'OffTrack', 'OnHold', 'Complete') NULL DEFAULT 'SetStatus';
