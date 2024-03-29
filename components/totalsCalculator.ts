import { FormValue, IngredientI, Totals } from '../types';

/**
 * Calculator for macros and for table data
 *
 * @param formValues
 * @param data
 * @returns totals including table data
 */
export function calculateTotals(
  formValues: FormValue[],
  data: IngredientI[],
): Totals {
  let totalKcal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalWeight = 0;

  const tableData = formValues
    .map((value) => {
      const ingredient = data.find((item) => {
        return item.id === value.ingredient_id;
      });

      if (ingredient) {
        const weight = value.weight;

        const factor =
          weight === null && formValues.length === 1 ? 1 : weight / 100;

        const kcal = ingredient.kcal * factor;
        const protein = ingredient.protein * factor;
        const carbs = ingredient.carbs * factor;
        const fat = ingredient.fat * factor;

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
