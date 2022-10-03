export const calculateMacros = (data) => {
  interface macros {
    meal: number;
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

  // initialize with shape
  let macros: macros = {
    meal: 0,
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

  //parse data and add meal id
  data = JSON.parse(data);
  macros.meal = data[0].meal_id;

  // calculate macro gram amounts from ingredients
  data.map((value) => {
    macros.kcal =
      (parseInt(value.ingredient.kcal) / 100) *
        parseInt(value.ingredient_weight) +
      macros.kcal;
    macros.protein =
      (parseInt(value.ingredient.protein) / 100) *
        parseInt(value.ingredient_weight) +
      macros.protein;
    macros.carbs =
      (parseInt(value.ingredient.carbs) / 100) *
        parseInt(value.ingredient_weight) +
      macros.carbs;
    macros.fat =
      (parseInt(value.ingredient.fat) / 100) *
        parseInt(value.ingredient_weight) +
      macros.fat;
    macros.totalWeight = parseInt(value.ingredient_weight) + macros.totalWeight;
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
