import { Macros } from '../interfaces';
import {
  IngredientInterface,
  MacroPercentages,
  MealIngredientsInterface,
} from '../interfaces';
import { defaultMacros } from './plan-calculator';

export function ingredientsMacroPercentagesCalculator(
  props: MealIngredientsInterface,
) {
  console.log(props);
  const macros: Macros = defaultMacros;
  props.map((x) => {
    macros.kcal =
      Number((x.ingredient.kcal / 100) * x.ingredient_weight) + macros.kcal;
    macros.protein =
      Number((x.ingredient.protein / 100) * x.ingredient_weight) +
      macros.protein;
    macros.fat =
      Number((x.ingredient.fat / 100) * x.ingredient_weight) + macros.fat;
    macros.carbs =
      Number((x.ingredient.carbs / 100) * x.ingredient_weight) + macros.carbs;
  });

  // calculate total macro calories
  macros.kcalPerMacro.protein = macros.protein * 4;
  macros.kcalPerMacro.carbs = macros.carbs * 4;
  macros.kcalPerMacro.fat = macros.fat * 9;
  macros.kcalPerMacro.total =
    macros.kcalPerMacro.fat +
    macros.kcalPerMacro.carbs +
    macros.kcalPerMacro.protein;

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
}
