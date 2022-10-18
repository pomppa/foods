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

  const [values, setValues] = useState([{ ingredient: "0", weight: "0" }]);

  const handleChange = (value) => {
    let newValues = [...values, { ingredient: "0", weight: "0" }];

    // nice...
    if (value.ingredient) {
      //rename ingredient -> id?
      newValues[value.index]["ingredient"] = value.ingredient.id;
    } else {
      newValues[value.index]["weight"] = value.weight;
    }
    setValues(newValues);
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
        deleteByUniqueKey: deleteByUniqueKey,
        handleChange: handleChange,
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
          deleteByUniqueKey: deleteByUniqueKey,
          handleChange: handleChange,
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
