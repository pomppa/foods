import { useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import IngredientAutocomplete from './ingredientAutocomplete';
import { FormValues } from '../../interfaces';
import { Option } from '../../interfaces';
import { Ingredient } from '@prisma/client';
/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function PlanForm(props) {
  const { data, onChange } = props;
  const options: Option[] = data.map((element: Ingredient) => {
    return { label: element.name, id: element.id };
  });

  const [ingredients, setIngredients] = useState<FormValues[]>(
    props.formValues || [{ ingredient: 0, weight: undefined }],
  );

  const disabledOptions: number[] = Object.values(ingredients).map(
    (item) => item.ingredient,
  );

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: 0, weight: undefined }]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleIngredientChange = (index, ingredient) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredient = ingredient;
    setIngredients(updatedIngredients);
  };

  const handleWeightChange = (index, weight) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].weight = weight;
    setIngredients(updatedIngredients);
  };

  onChange(ingredients);

  return (
    <>
      <Grid>
        <div>
          {ingredients.map((ingredient, index) => (
            <IngredientAutocomplete
              key={index}
              value={ingredient.ingredient}
              weight={ingredient.weight}
              options={options}
              onIngredientChange={(ingredient) =>
                handleIngredientChange(index, ingredient)
              }
              onWeightChange={(weight) => handleWeightChange(index, weight)}
              disabledOptions={disabledOptions}
            />
          ))}
          {ingredients.length > 0 && (
            <button onClick={() => removeIngredient(ingredients.length - 1)}>
              Remove Last Ingredient
            </button>
          )}
        </div>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={addIngredient}>
            Add more
          </Button>
        </Box>
        {/* {!displayMealSave && props.displaySaveOption && (
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            onClick={() => {
              setDisplayMealSave(true);
            }}
          >
            Save as a meal?
          </Button>
        )}
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Meal saved!
          </Alert>
        </Snackbar>
      </Grid>
      {displayMealSave && (
        <MealFromPlan
          {...{
            setDisplayMealSave: setDisplayMealSave,
            setMealName: setMealName,
            saveMealFromPlan: saveMealFromPlan,
          }}
        ></MealFromPlan>
      )} */}
      </Grid>
    </>
  );
}
