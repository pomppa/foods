import type { Decimal } from '@prisma/client/runtime';

export type CombinedIngredient = {
  id: string;
  fineli_id?: string | null;
  created_at: Date;
  updated_at: Date;
  name: string;
  kcal: Decimal;
  protein: Decimal;
  carbs: Decimal;
  fat: Decimal;
  userId?: string | null;
};

export type MealI = {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  formValues: string; //JSON?
};

export type IngredientI = {
  id: string;
  name: string;
  kcal?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fineli_id?: string;
  user_id?: string;
};

export type FormValue = {
  weight: number | null;
  ingredient_id: string | null;
};

export interface Totals {
  totalKcal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalWeight: number;
  kcalPerProtein: number;
  kcalPerCarbs: number;
  kcalPerFat: number;
  proteinRatio: number;
  carbsRatio: number;
  fatRatio: number;
  tableData: TableData[];
}

export type TableData = {
  ingredient: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type AutocompleteOption = {
  label: string;
  id: string;
};
