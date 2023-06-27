import { useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import IngredientAutocomplete from './ingredientAutocomplete';
import { FormValue, IngredientI } from '../../interfaces';
import { Option } from '../../interfaces';

type Props = {
  data: IngredientI[];
  onChange: (formValues: FormValue[]) => void;
  formValues?: FormValue[];
};

/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function PlanForm(props: Props) {
  const { data, onChange } = props;

  const options: Option[] = data.map((element: IngredientI) => {
    return { label: element.name, id: element.id };
  });

  const [ingredients, setIngredients] = useState<FormValue[]>(
    props.formValues || [{ ingredient: 0, weight: 0 }],
  );

  const disabledOptions: number[] = Object.values(ingredients).map(
    (item) => item.ingredient,
  );

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: 0, weight: 0 }]);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleIngredientChange = (index: number, ingredient: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients[index].ingredient = ingredient;
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleWeightChange = (index: number, weight: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients[index].weight = weight;
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

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
              onIngredientChange={(updatedIngredient: number) =>
                handleIngredientChange(index, updatedIngredient)
              }
              onWeightChange={(weight: number) =>
                handleWeightChange(index, weight)
              }
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
