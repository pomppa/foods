import { useState } from 'react';
import { planCalculator, planTableData } from '../../lib/plan-calculator';
import { Button, Box, Grid, Snackbar, Alert } from '@mui/material';
import { store } from '../../lib/redux/store';
import { incremented } from '../../lib/redux/uniqueKeySlice';
import { valueUpdated, valueAdded } from '../../lib/redux/valuesSlice';
import IngredientAutocomplete from './ingredientAutocomplete';
import MealFromPlan from './mealFromPlan';
import { IngredientInterface, Macros, TableData } from '../../interfaces';

interface Value {
  ingredient?: {
    label: string;
    id: number;
  };
  weight?: number;
  uniqueKey: number;
}

interface Props {
  data: IngredientInterface[];
  macros: Macros;
  setMacros: React.Dispatch<React.SetStateAction<Macros>>;
  setTableData: React.Dispatch<React.SetStateAction<TableData[]>>;
}

/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function Plan(props: Props) {
  const CASE_DELETE = 'DELETE';
  const CASE_UPDATE = 'UPDATE';

  const options = props.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  const [displayMealSave, setDisplayMealSave] = useState(false);
  const [mealName, setMealName] = useState('');
  const [open, setOpen] = useState(false);

  //handle changes on autocomplete fields
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
    props.setTableData(
      planTableData(store.getState().valueUpdated, props.data),
    );
  };

  // delete autocomplete field by its unique key
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

  // delete all autocomplete forms
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

  // initialize default view with forms
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

  // initial default forms to state
  const [forms, setForms] = useState(defaultForms);

  // add new autocomplete fields
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

  // save planned meal
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

  // save selected ingredients after meal was saved
  const saveIngredientsToMeal = async (mealId: number) => {
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
    await fetch(endpoint, options);

    // timer for snackbar to be open
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
