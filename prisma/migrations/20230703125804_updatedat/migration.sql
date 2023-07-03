-- AlterTable
ALTER TABLE `fineli_ingredient` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `ingredient` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `meal` ALTER COLUMN `updated_at` DROP DEFAULT;
