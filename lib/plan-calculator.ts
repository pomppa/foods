import { IngredientInterface, FormValues, TableData } from '../interfaces';
import { Macros } from '../interfaces';

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
export const planCalculator = (
  formValues: FormValues[],
  data: IngredientInterface[],
) => {
  const macros: Macros = defaultMacros;

  formValues.map((value) => {
    const ingredientObject: IngredientInterface = data.find(
      (x: IngredientInterface) => x.id === value.ingredient,
    );

    if (!ingredientObject) {
      return macros;
    }

    macros.ingredientId = ingredientObject.id;
    macros.ingredientName = ingredientObject.name;
    macros.kcal = (ingredientObject.kcal / 100) * value.weight + macros.kcal;
    macros.protein =
      (ingredientObject.protein / 100) * value.weight + macros.protein;
    macros.carbs = (ingredientObject.carbs / 100) * value.weight + macros.carbs;
    macros.fat = (ingredientObject.fat / 100) * value.weight + macros.fat;
    macros.totalWeight = value.weight + macros.totalWeight;
  });

  // calculate total macro calories
  const kcalPerMacro = {
    protein: macros.protein * 4,
    carbs: macros.carbs * 4,
    fat: macros.fat * 9,
    total: 0,
  };

  kcalPerMacro.total =
    kcalPerMacro.fat + kcalPerMacro.carbs + kcalPerMacro.protein;

  // calculate macro ratio
  macros.macroPercentages.protein =
    (kcalPerMacro.protein / kcalPerMacro.total) * 100 || 0;
  macros.macroPercentages.carbs =
    (kcalPerMacro.carbs / kcalPerMacro.total) * 100 || 0;
  macros.macroPercentages.fat =
    (kcalPerMacro.fat / kcalPerMacro.total) * 100 || 0;
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
    const ingredientObject = data.find((x) => x.id === value.ingredient);
    if (!ingredientObject) {
      return tableData;
    }
    const rowData = {
      ingredientName: ingredientObject.name,
      kcal: ingredientObject.kcal,
      fat: ingredientObject.fat,
      carbs: ingredientObject.carbs,
      protein: ingredientObject.protein,
      weight: value.weight,
    };
    tableData.push(rowData);
  });
  return tableData;
}
