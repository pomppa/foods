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

export interface KcalPerMacro {
  protein: number;
  carbs: number;
  fat: number;
  total: number;
}

export interface MacroPercentages {
  carbs: number;
  fat: number;
  protein: number;
  total: number;
}

export interface Macros {
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
  totalWeight: number;
  kcalPerMacro: KcalPerMacro;
  macroPercentages: MacroPercentages;
}

export interface TableTotalsRow {
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}
