import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";

export default function IngredientAutocomplete(props) {
  const [value, setValue] = useState<string>(props.options[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          props.ingredientHandler({
            ingredient: newValue,
            index: props.index,
          });
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={props.options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={"Ingredient"} />}
      />
      <TextField
        label="Weight"
        variant="outlined"
        name="weight"
        onChange={(event) => {
          props.weightHandler({
            weight: event.target.value,
            index: props.index,
          });
        }}
      />
      {props.index ? (
        <Button
          variant="contained"
          onClick={() => {
            props.deleteByUniqueKey(props.uniqueKey);
          }}
        >
          Remove
        </Button>
      ) : null}
    </>
  );
}
