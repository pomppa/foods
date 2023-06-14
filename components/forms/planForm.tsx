import { useState } from 'react';
import { Button, Box, Grid, Snackbar, Alert } from '@mui/material';
import { store } from '../../lib/redux/store';
import { valueUpdated } from '../../lib/redux/valuesSlice';
import IngredientAutocomplete from './ingredientAutocomplete';
import MealFromPlan from './mealFromPlan';
import { FormValues } from '../../interfaces';

/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function PlanForm(props) {
  const CASE_INSERT = 'INSERT';

  const options = props.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  const [displayMealSave, setDisplayMealSave] = useState(false);
  const [setMealName] = useState('');
  const [open, setOpen] = useState(false);
  const [childCount, setChildCount] = useState(1);
  const [childComponents, setChildComponents] = useState([]);

  /**
   * if there is already value with this unique key in state
   * do not add
   * @param value
   */
  const savePreSelectedToState = (value) => {
    store.dispatch(
      valueUpdated({
        data: {
          ingredient: value.id,
          weight: value.weight,
          uniqueKey: value.uniqueKey,
          mealIngredientId: value.mealIngredientId,
        },
        case: CASE_INSERT,
      }),
    );
  };

  //MAIN handle changes on autocomplete fields
  const handleChange = (value) => {
    props.onIngredientWeightChange(value);
  };

  const preSelectedForms = [];
  if (props.preSelected.length > 0) {
    props.preSelected.map((element) => {
      const value = {
        label: element.label,
        id: element.id,
        weight: element.ingredient_weight,
        uniqueKey: element.uniqueKey,
        mealIngredientId: element.mealIngredientId,
      };
      savePreSelectedToState(value);
      preSelectedForms.push(
        <IngredientAutocomplete
          {...{
            key: value.uniqueKey,
            uniqueKey: value.uniqueKey,
            options: options,
            handleChange: handleChange,
            value: value,
            ingredient_weight: element.ingredient_weight,
          }}
        />,
      );
    });
  }

  const [forms, setForms] = useState(preSelectedForms);

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

  const handleAddChild = () => {
    setChildCount(childCount + 1);
    setChildComponents((prevComponents) => [...prevComponents, childCount]);
  };

  const handleDeleteChild = (id) => {
    setChildComponents((prevComponents) =>
      prevComponents.filter((componentId) => componentId !== id),
    );
  };

  return (
    <>
      <Grid>
        <div>
          {childComponents.map((id) => (
            <IngredientAutocomplete
              key={id}
              uniqueKey={id} // can we remove?
              options={options}
              handleChange={handleChange}
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
