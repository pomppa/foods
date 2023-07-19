-- DropForeignKey
ALTER TABLE `ingredient` DROP FOREIGN KEY `Ingredient_userId_fkey`;

-- DropForeignKey
ALTER TABLE `meal` DROP FOREIGN KEY `Meal_userId_fkey`;

-- AlterTable
ALTER TABLE `ingredient` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `meal` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
