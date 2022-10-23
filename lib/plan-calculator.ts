interface Macros {
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
}

export const planCalculator = (formValues, data) => {
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
  };

  formValues.map((value) => {
    const ingredientObject = data.find((x) => x.id === value.ingredient);

    if (ingredientObject == undefined) {
      return macros;
    }

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
    (macros.kcalPerMacro.protein / macros.kcalPerMacro.total) * 100;
  macros.macroPercentages.carbs =
    (macros.kcalPerMacro.carbs / macros.kcalPerMacro.total) * 100;
  macros.macroPercentages.fat =
    (macros.kcalPerMacro.fat / macros.kcalPerMacro.total) * 100;
  macros.macroPercentages.total =
    macros.macroPercentages.fat +
    macros.macroPercentages.carbs +
    macros.macroPercentages.protein;

  return macros;
};
