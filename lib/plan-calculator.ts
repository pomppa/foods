export const plannerMacroCalculator = (formValues, data) => {
  console.log(formValues);
  console.log(data);
  // initialize with shape
  let macros = {
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
    let ingredientObject = data.find((x) => x.ingredient == value.id);
    console.log(ingredientObject);

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
