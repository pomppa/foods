import { useState } from "react"; 
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


  const [macros, setMacros] = useState({});

  const handleChange = (value) => {

    if (value.ingredient === null && value.uniqueKey !== 0) {
      deleteByUniqueKey(value)
      return
    }

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
    const uniqueKey = store.getState().uniqueKey.value

    store.dispatch(valueAdded({ ingredient: 0, weight: 0, uniqueKey: uniqueKey }));

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
