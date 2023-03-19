import { IngredientInterface, FormValues, TableData } from '../interfaces';

export interface Macros {
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
  totalWeight: number;
  kcalPerMacro: {
    protein: number;
    carbs: number;
    fat: number;
    total: number;
  };
  macroPercentages: {
    protein: number;
    carbs: number;
    fat: number;
    total: number;
  };
  ingredientId: number;
  ingredientName: string;
}

export const defaultMacros: Macros = {
  kcal: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  totalWeight: 0,
  kcalPerMacro: {
    protein: 0,
    carbs: 0,
    fat: 0,
    total: 0,
  },
  macroPercentages: {
    protein: 0,
    carbs: 0,
    fat: 0,
    total: 0,
  },
  ingredientId: 0,
  ingredientName: '',
};

/**
 * Calculator for planner, accepts ingredients and constructs macros
 * @param formValues
 * @param data
 * @returns
 */
export const planCalculator = (formValues: FormValues[], data) => {
  // initialize with default values
  const macros: Macros = {
    kcal: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    totalWeight: 0,
    kcalPerMacro: {
      protein: 0,
      carbs: 0,
      fat: 0,
      total: 0,
    },
    macroPercentages: {
      protein: 0,
      carbs: 0,
      fat: 0,
      total: 0,
    },
    ingredientId: data.ingredient,
    ingredientName: '',
  };

  formValues.map((value) => {
    const ingredientObject = data.find((x) => x.id === value.ingredient);

    if (ingredientObject == undefined) {
      return macros;
    }

    macros.ingredientId = value.ingredient;
    macros.ingredientName = ingredientObject.name;
    macros.kcal =
      (parseInt(ingredientObject.kcal) / 100) * parseInt(value.weight) +
      macros.kcal;
    macros.protein =
      (parseInt(ingredientObject.protein) / 100) * parseInt(value.weight) +
      macros.protein;
    macros.carbs =
      (parseInt(ingredientObject.carbs) / 100) * parseInt(value.weight) +
      macros.carbs;
    macros.fat =
      (parseInt(ingredientObject.fat) / 100) * parseInt(value.weight) +
      macros.fat;
    macros.totalWeight = parseInt(value.weight) + macros.totalWeight;
  });

  // calculate total macro calories
  macros.kcalPerMacro.protein = macros.protein * 4;
  macros.kcalPerMacro.carbs = macros.carbs * 4;
  macros.kcalPerMacro.fat = macros.fat * 9;
  macros.kcalPerMacro.total =
    macros.kcalPerMacro.fat +
    macros.kcalPerMacro.carbs +
    macros.kcalPerMacro.protein;

  // calculate macro ratio
  macros.macroPercentages.protein =
    (macros.kcalPerMacro.protein / macros.kcalPerMacro.total) * 100 || 0;
  macros.macroPercentages.carbs =
    (macros.kcalPerMacro.carbs / macros.kcalPerMacro.total) * 100 || 0;
  macros.macroPercentages.fat =
    (macros.kcalPerMacro.fat / macros.kcalPerMacro.total) * 100 || 0;
  macros.macroPercentages.total =
    macros.macroPercentages.fat +
    macros.macroPercentages.carbs +
    macros.macroPercentages.protein;

  return macros;
};

/**
 *
 * @param formValues
 * @param data
 * @returns
 */
export function planTableData(
  formValues: FormValues[],
  data: IngredientInterface[],
) {
  const tableData: TableData[] = [];
  formValues.map((value) => {
    console.log(data);
    const ingredientObject = data.find((x) => x.id === value.ingredient);
    const rowData = {
      ingredientName: ingredientObject.name,
      kcal: (Number(ingredientObject.kcal) / 100) * value.weight,
      fat: (Number(ingredientObject.fat) / 100) * value.weight,
      carbs: (Number(ingredientObject.carbs) / 100) * value.weight,
      protein: (Number(ingredientObject.protein) / 100) * value.weight,
      weight: value.weight,
    };
    tableData.push(rowData);
  });
  return tableData;
}
