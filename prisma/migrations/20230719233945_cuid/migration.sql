/*
  Warnings:

  - The primary key for the `fineli_ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `meal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `fineli_ingredient` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ingredient` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `meal` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
