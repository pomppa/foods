import { useState } from 'react';
import { planCalculator } from '../../lib/plan-calculator';
import { Button, Box, Grid } from '@mui/material';
import { store } from '../../lib/redux/store';
import { incremented } from '../../lib/redux/uniqueKeySlice';
import { valueUpdated, valueAdded } from '../../lib/redux/valuesSlice';
import IngredientAutocomplete from './ingredientAutocomplete';

interface Value {
  ingredient?: {
    label: string;
    id: number;
  };
  weight?: number;
  uniqueKey: number;
}

export default function Plan(data) {
  const CASE_DELETE = 'DELETE';
  const CASE_UPDATE = 'UPDATE';

  const options = data.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  const [macros, setMacros] = useState({});

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

    setMacros(planCalculator(store.getState().valueUpdated, data.data));
  };

  const deleteByUniqueKey = (value: Value) => {
    store.dispatch(
      valueUpdated({
        data: { uniqueKey: value.uniqueKey },
        case: CASE_DELETE,
      }),
    );

    setForms((prevValues) => {
      return prevValues.filter((obj) => {
        return obj.props.uniqueKey !== value.uniqueKey;
      });
    });

    setMacros(planCalculator(store.getState().valueUpdated, data.data));
  };

  const [forms, setForms] = useState([
    // eslint-disable-next-line react/jsx-key
    <IngredientAutocomplete
      {...{
        key: 0,
        uniqueKey: 0,
        options: options,
        deleteByUniqueKey: deleteByUniqueKey,
        handleChange: handleChange,
      }}
    />,
  ]);

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
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          {[...forms]}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => addIngredientAutoCompletes()}
            >
              Add more
            </Button>
            <Button sx={{ ml: 1 }} variant="contained">
              Save as a meal?
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <pre>{JSON.stringify(macros, null, 2)}</pre>
        </Grid>
      </Grid>
    </>
  );
}
