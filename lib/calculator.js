export const calculateMacros = (data) => {
    // initialize with shape
    let macros = {
        meal: 0,
        kcal: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        totalWeight: 0,
        kcalPerMacro: {},
        macroPercentages: {}
    }

    //parse data and add meal id
    data = JSON.parse(data)
    macros.meal = data[0].meal_id

    // calculate macro gram amounts from ingredients
    data.map((value) => {
        macros.kcal = parseInt(value.ingredient.kcal) / 100 * parseInt(value.ingredient_weight) + parseInt(macros.kcal);
        macros.protein = parseInt(value.ingredient.protein) / 100 * parseInt(value.ingredient_weight) + parseInt(macros.protein);
        macros.carbs = parseInt(value.ingredient.carbs) / 100 * parseInt(value.ingredient_weight) + parseInt(macros.carbs);
        macros.fat = parseInt(value.ingredient.fat) / 100 * parseInt(value.ingredient_weight) + parseInt(macros.fat);
        macros.totalWeight = parseInt(value.ingredient_weight) + parseInt(macros.totalWeight)
        console.log(macros);
    })

    // calculate total macro calories
    macros.kcalPerMacro.protein = macros.protein * 4;
    macros.kcalPerMacro.carbs = macros.carbs * 4;
    macros.kcalPerMacro.fat = macros.fat * 9;
    macros.kcalPerMacro.total = macros.kcalPerMacro.fat + macros.kcalPerMacro.carbs + macros.kcalPerMacro.protein;

    // calculate macro ratio
    macros.macroPercentages.protein = parseInt(macros.kcalPerMacro.protein / macros.kcalPerMacro.total * 100);
    macros.macroPercentages.carbs = parseInt(macros.kcalPerMacro.carbs / macros.kcalPerMacro.total * 100);
    macros.macroPercentages.fat = parseInt(macros.kcalPerMacro.fat / macros.kcalPerMacro.total * 100);
    macros.macroPercentages.total = parseInt(macros.macroPercentages.fat) + parseInt(macros.macroPercentages.carbs) + parseInt(macros.macroPercentages.protein)

    return macros;
}
