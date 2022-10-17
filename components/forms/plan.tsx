import { useState, useEffect } from "react";
import { plannerMacroCalculator } from "../../lib/plan-calculator";
import { Button, Box } from "@mui/material";
import IngredientAutocomplete from "./ingredientAutocomplete";

export default function Plan(data) {
  const options = data.data.map((element) => {
    return { label: element.name, id: element.id };
  });

  options.unshift({ label: "", id: 0 });

  const [uniqueKey, setUniqueKey] = useState(0);

  const [ingredientValues, setIngredientValues] = useState([]);

  const [weightValues, setWeightValues] = useState([]);

  const [values, setValues] = useState([]);

  const [macros, setMacros] = useState({});

  const ingredientHandler = (value) => {
    setIngredientValues([...ingredientValues, value]);
    console.log(ingredientValues);
  };

  const weightHandler = (value) => {
    setWeightValues([...weightValues, value]);
    console.log(weightValues);
    console.log(ingredientValues);
  };

  const deleteByUniqueKey = (uniqueKey) => {
    setForms((oldValues) => {
      return oldValues.filter((obj) => {
        return obj.props.uniqueKey !== uniqueKey;
      });
    });
  };

  const incrementListKey = () => {
    const incrementedUniqueKey = uniqueKey + 1;
    setUniqueKey(incrementedUniqueKey);
    return incrementedUniqueKey;
  };

  const [forms, setForms] = useState([
    <IngredientAutocomplete
      {...{
        key: 0,
        uniqueKey: 0,
        options: options,
        index: 0,
        ingredientHandler: ingredientHandler,
        weightHandler: weightHandler,
        deleteByUniqueKey: deleteByUniqueKey,
      }}
    />,
  ]);

  const addIngredientAutoCompletes = () => {
    const listKey = incrementListKey();
    setForms([
      ...forms,
      <IngredientAutocomplete
        {...{
          key: listKey,
          uniqueKey: listKey,
          options: options,
          index: forms.length,
          ingredientHandler: ingredientHandler,
          weightHandler: weightHandler,
          deleteByUniqueKey: deleteByUniqueKey,
        }}
      />,
    ]);
  };

  const merge = (ingredients, weights) => {
    const values = ingredients.map((element, index) => {
      return {
        id: element.id,
        weight: weights[index]?.weight,
      };
    });
    return values;
  };

  useEffect(() => {
    console.log(ingredientValues);
    console.log(weightValues);
  });

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
