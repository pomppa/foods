export type IngredientInterface = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fineli_id?: number;
};

export type IngredientsInterface = {
  ingredients: IngredientInterface[];
};

export type MealIngredientInterface = {
  id: number;
  meal_id: number;
  ingredient_id: number;
  ingredient_weight: number;
  ingredient?: IngredientInterface;
};

export type MealIngredientsInterface = {
  mealIngredient: MealIngredientInterface[];
};

export type MealInterface = {
  id: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
};

export type IngredientI = {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealsInterface = {
  meals: MealInterface[];
};

export interface KcalPerMacro {
  protein: number;
  carbs: number;
  fat: number;
  total?: number;
}

export interface MacroPercentages {
  carbs: number;
  fat: number;
  protein: number;
  total?: number;
}

export interface TableTotalsRow {
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FormValues {
  ingredient: number;
  weight: number;
  uniqueKey?: number;
  mealIngredientId?: number;
}

export type CombinedIngredientMeal = {
  id: number;
  meal_id: number;
  ingredient_id: number;
  ingredient_weight: number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  mealIngredientId?: number;
};

export interface FormValue {
  ingredient: number;
  weight: number;
  uniqueKey?: number;
}

export interface TableData {
  ingredient: string;
  weight: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Macros {
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
  totalWeight: number;
  kcalPerMacro: KcalPerMacro;
  macroPercentages: MacroPercentages;
  ingredientId: number;
  ingredientName: string;
}

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

export interface AutocompleteOptions {
  label: string;
  id: number;
  uniqueKey: number;
  ingredient_weight?: number;
  mealIngredientId?: number;
}

export interface MealEditInterface {
  id: number;
  name: string;
  ingredients: FormValues[];
  deletedMealIngredientIds: number[];
}

export type IngredientFormData = {
  name: string;
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
};

export type MealI = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
};

export type DataMap = {
  [key: number]: {
    weight: number;
    ingredient: number;
  };
};
