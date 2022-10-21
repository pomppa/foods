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

  const [values, setValues] = useState([{ ingredient: "0", weight: "0", uniqueKey: 0 }]);

  const handleChange = (value) => {
    let newValues = [...values];
    const obj = newValues.find(element => element.uniqueKey == value.uniqueKey);
    console.log(obj)
    console.log(newValues)

    // nice...
    if (value.ingredient) {
      //rename ingredient -> id?
      // newValues[value.index]["ingredient"] = value.ingredient.id;
      obj["ingredient"] = value.ingredient.id;
      console.log(obj)

    } else {
      obj["weight"] = value.weight;

      // newValues[value.index]["weight"] = value.weight;
    }
    // newValues[value.index]["uniqueKey"] = value.uniqueKey
    console.log(newValues)

    setValues(newValues);
  };

  const deleteByUniqueKey = (uniqueKey) => {

    console.log(uniqueKey);
    
    setForms((oldValues) => {
      return oldValues.filter((obj) => {
        return obj.props.uniqueKey !== uniqueKey;
      });
    });
    setValues((oldValues) => {
      return oldValues.filter((obj) => {
        return obj.uniqueKey !== uniqueKey;
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

    setValues([...values, { ingredient: "0", weight: "0", uniqueKey: listKey }])

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
    console.log(values);
    
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
