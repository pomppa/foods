import { useState } from 'react';
import { Button, Box, Grid, Snackbar, Alert } from '@mui/material';
import { store } from '../../lib/redux/store';
import IngredientAutocomplete from './ingredientAutocomplete';
import MealFromPlan from './mealFromPlan';
import { FormValues } from '../../interfaces';

/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function PlanForm(props) {
  const options = props.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  const [displayMealSave, setDisplayMealSave] = useState(false);
  const [setMealName] = useState('');
  const [open, setOpen] = useState(false);

  // const [childCount, setChildCount] = useState(0);
  // const [childComponents, setChildComponents] = useState([]);
  const { childComponents } = props;

  // save planned meal
  const saveMealFromPlan = async (mealName) => {
    alert('save meal from plan');
    const endpoint = '/api/meals/';

    const data = {
      name: mealName,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    const mealId = result.data.id;
    saveIngredientsToMeal(mealId);
    deleteAll();
  };

  // save selected ingredients after meal was saved
  const saveIngredientsToMeal = async (mealId: number) => {
    const endpoint = '/api/meals/create';

    const ingredients: FormValues[] = store.getState().valueUpdated.ingredients;
    const data = {
      meal_id: mealId,
      ingredients: ingredients,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    setOpen(true);

    //todo add error handling, success message on 200 and reset values
    await fetch(endpoint, options);

    // timer for snackbar to be open
    setTimeout(() => {
      setOpen(false);
    }, 2500);
  };

  const handleChange = (value, id) => {
    props.onIngredientWeightChange({ ...value, uniqueKey: id });
  };

  const handleAddChild = () => {
    props.onAddChild();
  };

  const handleDeleteChild = (id) => {
    props.onDeleteChild(id);
  };

  return (
    <>
      <Grid>
        <div>
          {childComponents.map((id) => (
            <IngredientAutocomplete
              key={id}
              options={options}
              ingredientWeightValues={props.dataMap}
              handleChange={(value) => handleChange(value, id)}
              disabledOptions={props.disabledOptions}
              ingredientWeightValues={props.ingredientWeightValues}
              onDeleteChild={() => handleDeleteChild(id)}
            />
          ))}
        </div>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleAddChild}>
            Add more
          </Button>
        </Box>
        {!displayMealSave && props.displaySaveOption && (
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
      )}
    </>
  );
}
