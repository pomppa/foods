/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';

export default function IngredientAutocomplete(props) {
  const [value, setValue] = useState<string>(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          props.handleChange({
            ingredient: newValue,
            uniqueKey: props.uniqueKey,
          });
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={props.options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={'Ingredient'} />}
      />
      <TextField
        label="Weight"
        variant="outlined"
        name="weight"
        onChange={(event) => {
          props.handleChange({
            weight: event.target.value,
            uniqueKey: props.uniqueKey,
          });
        }}
      />
    </>
  );
}
