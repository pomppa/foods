import { IngredientInterface, MacroPercentages } from '../interfaces';

export default function IngredientMacroCalculator(props: IngredientInterface) {
  const ingredient = props;
  const macros: MacroPercentages = {
    protein: ingredient.protein * 4,
    fat: ingredient.fat * 9,
    carbs: ingredient.carbs * 4,
    total: 100,
  };
  return macros;
}
