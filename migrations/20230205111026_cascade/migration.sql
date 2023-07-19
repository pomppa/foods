-- DropForeignKey
ALTER TABLE `meal_ingredient` DROP FOREIGN KEY `Meal_Ingredient_meal_id_fkey`;

-- AddForeignKey
ALTER TABLE `Meal_Ingredient` ADD CONSTRAINT `Meal_Ingredient_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
