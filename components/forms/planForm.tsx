import { useState } from 'react';
import { planCalculator } from '../../lib/plan-calculator';
import { Button, Box, Grid, Snackbar, Alert } from '@mui/material';
import { store } from '../../lib/redux/store';
import { incremented } from '../../lib/redux/uniqueKeySlice';
import { valueUpdated, valueAdded } from '../../lib/redux/valuesSlice';
import IngredientAutocomplete from './ingredientAutocomplete';
import MealFromPlan from './mealFromPlan';

interface Value {
  ingredient?: {
    label: string;
    id: number;
  };
  weight?: number;
  uniqueKey: number;
}

export default function Plan(props) {
  const CASE_DELETE = 'DELETE';
  const CASE_UPDATE = 'UPDATE';

  const options = props.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  // const [macros, setMacros] = useState({});
  const [displayMealSave, setDisplayMealSave] = useState(false);
  const [mealName, setMealName] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (value: Value) => {
    if (value.ingredient === null && value.uniqueKey !== 0) {
      deleteByUniqueKey(value);
      return;
    }

    if (value.ingredient) {
      store.dispatch(
        valueUpdated({
          data: { ingredient: value.ingredient.id, uniqueKey: value.uniqueKey },
          case: CASE_UPDATE,
        }),
      );
    }
    if (value.weight) {
      store.dispatch(
        valueUpdated({
          data: { weight: value.weight, uniqueKey: value.uniqueKey },
          case: CASE_UPDATE,
        }),
      );
    }

    props.setMacros(planCalculator(store.getState().valueUpdated, props.data));
  };

  const deleteByUniqueKey = (value: Value) => {
    store.dispatch(
      valueUpdated({
        data: { uniqueKey: value.uniqueKey },
        case: CASE_DELETE,
      }),
    );

    // todo save to redux for persisting on different pages
    setForms((prevValues) => {
      return prevValues.filter((obj) => {
        return obj.props.uniqueKey !== value.uniqueKey;
      });
    });

    props.setMacros(planCalculator(store.getState().valueUpdated, props.data));
  };

  const deleteAll = () => {
    store.dispatch(
      valueUpdated({
        data: { value: '' },
      }),
    );

    store.dispatch(incremented());
    setForms([
      // eslint-disable-next-line react/jsx-key
      <IngredientAutocomplete
        {...{
          key: store.getState().uniqueKey.value,
          uniqueKey: store.getState().uniqueKey.value,
          options: options,
          deleteByUniqueKey: deleteByUniqueKey,
          handleChange: handleChange,
        }}
      />,
    ]);

    props.setMacros(planCalculator(store.getState().valueUpdated, props.data));
  };

  const defaultForms = [
    // eslint-disable-next-line react/jsx-key
    <IngredientAutocomplete
      {...{
        key: store.getState().uniqueKey.value,
        uniqueKey: store.getState().uniqueKey.value,
        options: options,
        deleteByUniqueKey: deleteByUniqueKey,
        handleChange: handleChange,
      }}
    />,
  ];
  const [forms, setForms] = useState(defaultForms);

  const addIngredientAutoCompletes = () => {
    store.dispatch(incremented());
    const uniqueKey = store.getState().uniqueKey.value;

    store.dispatch(
      valueAdded({ ingredient: 0, weight: 0, uniqueKey: uniqueKey }),
    );

    setForms([
      ...forms,
      // eslint-disable-next-line react/jsx-key
      <IngredientAutocomplete
        {...{
          key: uniqueKey,
          uniqueKey: uniqueKey,
          options: options,
          deleteByUniqueKey: deleteByUniqueKey,
          handleChange: handleChange,
        }}
      />,
    ]);
  };

  const saveMealFromPlan = async () => {
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

  const saveIngredientsToMeal = async (mealId) => {
    const endpoint = '/api/meals/create';

    const ingredients = store.getState().valueUpdated;

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
    const result = await fetch(endpoint, options);

    setTimeout(() => {
      setOpen(false);
    }, 2500);
  };

  return (
    <>
      <Grid>
        {[...forms]}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => addIngredientAutoCompletes()}
          >
            Add more
          </Button>
        </Box>
        {!displayMealSave && (
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
