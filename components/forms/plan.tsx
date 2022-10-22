import { useState, useEffect } from "react";
import { plannerMacroCalculator } from "../../lib/plan-calculator";
import { Button, Box } from "@mui/material";
import IngredientAutocomplete from "./ingredientAutocomplete";
import { store } from '../../lib/store';
import { incremented } from "../../lib/uniqueKeySlice";
import { valueUpdated, valueAdded } from "../../lib/valuesSlice";

export default function Plan(data) {

  const CASE_DELETE = "DELETE";
  const CASE_UPDATE = "UPDATE";

  const options = data.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  options.unshift({ label: "", id: 0 });

  const [macros, setMacros] = useState({});

  const [values, setValues] = useState([{ ingredient: 0, weight: 0, uniqueKey: 0 }]);

  const handleChange = (value) => {
    // nice...
    if (value.ingredient) {
      store.dispatch(valueUpdated({ data: { ingredient: value.ingredient.id, uniqueKey: value.uniqueKey }, case: CASE_UPDATE }));
    } else {
      store.dispatch(valueUpdated({ data: { weight: value.weight, uniqueKey: value.uniqueKey }, case: CASE_UPDATE }));
    }
    setMacros(plannerMacroCalculator(store.getState().valueUpdated, data.data));
  };

  const deleteByUniqueKey = (values) => {
    store.dispatch(valueUpdated({ data: { uniqueKey: values.uniqueKey }, case: CASE_DELETE }));

    setMacros(plannerMacroCalculator(store.getState().valueUpdated, data.data));

    setForms((prevValues) => {
      return prevValues.filter((obj) => {
        return obj.props.uniqueKey !== values.uniqueKey;
      });
    });
  };

  const [forms, setForms] = useState([
    <IngredientAutocomplete
      {...{
        key: 0,
        uniqueKey: 0,
        options: options,
        index: 0,
        deleteByUniqueKey: deleteByUniqueKey,
        handleChange: handleChange,
        values: values
      }}
    />,
  ]);

  const addIngredientAutoCompletes = () => {
    store.dispatch(incremented());
    const uniqueKey = store.getState().uniqueKey.value

    store.dispatch(valueAdded({ ingredient: 0, weight: 0, uniqueKey: uniqueKey }));
    console.log(store.getState())

    setForms([
      ...forms,
      <IngredientAutocomplete
        {...{
          key: uniqueKey,
          uniqueKey: uniqueKey,
          options: options,
          index: forms.length,
          deleteByUniqueKey: deleteByUniqueKey,
          handleChange: handleChange,
          values: [...values, { ingredient: 0, weight: 0, uniqueKey: uniqueKey }],
        }}
      />,
    ]);
  };
  return (
    <>
      {[...forms]}
      <Box>
        <Button
          variant="contained"
          onClick={() => addIngredientAutoCompletes()}
        >
          Add more
        </Button>
      </Box>
      <pre>{JSON.stringify(macros, null, 2)}</pre>
    </>
  );
}
