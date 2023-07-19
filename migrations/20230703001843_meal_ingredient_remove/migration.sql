/*
  Warnings:

  - You are about to drop the `meal_ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `meal_ingredient` DROP FOREIGN KEY `Meal_Ingredient_ingredient_id_fkey`;

-- DropForeignKey
ALTER TABLE `meal_ingredient` DROP FOREIGN KEY `Meal_Ingredient_meal_id_fkey`;

-- DropTable
DROP TABLE `meal_ingredient`;
