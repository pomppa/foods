import {
  CombinedIngredientMeal,
  FormValues,
  IngredientI,
  Totals,
} from '../interfaces';

/**
 * Calculator for planner, accepts ingredients and constructs macros
 * @param formValues
 * @param data
 * @returns totals including table data
 */
export function calculateTotals(
  formValues: FormValues[],
  data: CombinedIngredientMeal[] | IngredientI[],
): Totals {
  let totalKcal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalWeight = 0;

  const tableData = formValues
    .map((value) => {
      const ingredient = data.find((item) => {
        return item.id === value.ingredient;
      });
      if (ingredient) {
        const weight = value.weight;

        const kcal = (ingredient.kcal * weight) / 100;
        const protein = (ingredient.protein * weight) / 100;
        const carbs = (ingredient.carbs * weight) / 100;
        const fat = (ingredient.fat * weight) / 100;

        totalKcal += kcal;
        totalProtein += protein;
        totalCarbs += carbs;
        totalFat += fat;
        totalWeight += weight;

        return {
          ingredient: ingredient.name,
          weight,
          kcal,
          protein,
          carbs,
          fat,
        };
      }

      return null;
    })
    .filter(Boolean);

  const kcalPerProtein = totalProtein * 4;
  const kcalPerCarbs = totalCarbs * 4;
  const kcalPerFat = totalFat * 9;

  const proteinRatio = (kcalPerProtein / totalKcal) * 100;
  const carbsRatio = (kcalPerCarbs / totalKcal) * 100;
  const fatRatio = (kcalPerFat / totalKcal) * 100;
  return {
    totalKcal,
    totalProtein,
    totalCarbs,
    totalFat,
    totalWeight,
    kcalPerProtein,
    kcalPerCarbs,
    kcalPerFat,
    proteinRatio,
    carbsRatio,
    fatRatio,
    tableData,
  };
}
