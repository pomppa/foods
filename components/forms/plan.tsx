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

  const [macros, setMacros] = useState({});
  
  const [values, setValues] = useState([{ ingredient: 0, weight: 0, uniqueKey: 0 }]);

  const handleChange = (value) => {
    let newValues = [...value.values];
    const element = newValues.find(element => element.uniqueKey == value.uniqueKey);
    
    // nice...
    if (value.ingredient) {
      element.ingredient = value.ingredient.id 
    } else {
      element.weight = value.weight
    }
  
    setValues(newValues);
  };

  const deleteByUniqueKey = (values) => {
    setForms((prevValues) => {
      return prevValues.filter((obj) => {
        return obj.props.uniqueKey !== values.uniqueKey;
      });
    });

    setValues((oldValues) => {
      return oldValues.filter((obj) => {
        return obj.uniqueKey !== values.uniqueKey;
      });
    });
  };

  const incrementedUniqueKey = () => {
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
        deleteByUniqueKey: deleteByUniqueKey,
        handleChange: handleChange,
        values: values
      }}
    />,
  ]);

  const addIngredientAutoCompletes = () => {
    const key = incrementedUniqueKey();
    setForms([
      ...forms,
      <IngredientAutocomplete
        {...{
          key: key,
          uniqueKey: key,
          options: options,
          index: forms.length,
          deleteByUniqueKey: deleteByUniqueKey,
          handleChange: handleChange,
          values: [...values, { ingredient: 0, weight: 0, uniqueKey: key }],
        }}
      />,
    ]);
  };

  useEffect(() => {
    setMacros(plannerMacroCalculator(values, data.data));
  }, [values, forms]);

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
