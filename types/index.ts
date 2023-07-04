export type MealI = {
  id: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  formValues: string;
};

export type IngredientI = {
  id: number;
  name: string;
  kcal?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fineli_id?: number;
};

export type FormValue = {
  weight: number | null;
  ingredient_id: number | null;
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
  id: number;
};
