/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

/**
 * Ingredient autocomplete, contains ingredient dropdown + weight input
 * @param props
 * @returns
 */
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
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => (
          <TextField {...params} label={'Search for an ingredient'} />
        )}
      />
      <TextField
        label="Weight (g)"
        variant="outlined"
        name="weight"
        sx={{ width: 300, mt: 2 }}
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
