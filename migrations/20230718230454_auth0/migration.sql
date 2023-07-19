/*
  Warnings:

  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropIndex
DROP INDEX `Session_session_token_key` ON `session`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `accessToken`,
    DROP COLUMN `expires`,
    DROP COLUMN `session_token`,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `sessionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`;

-- DropTable
DROP TABLE `accounts`;

-- CreateIndex
CREATE UNIQUE INDEX `Session_sessionId_key` ON `Session`(`sessionId`);
