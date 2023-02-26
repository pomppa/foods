import { Decimal } from '@prisma/client/runtime';

export type IngredientInterface = {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  kcal: Decimal;
  protein: Decimal;
  carbs: Decimal;
  fat: Decimal;
};

export type IngredientsInterface = {
  ingredients: IngredientInterface[];
};

export type MealIngredientInterface = {
  id: number;
  meal_id: number;
  ingredient_id: number;
  ingredient_weight: string;
  ingredient: IngredientInterface;
};

export type MealIngredientsInterface = {
  mealIngredient: MealIngredientInterface[];
};

export type MealInterface = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
};

export type MealsInterface = {
  meals: MealInterface[];
};
