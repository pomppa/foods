import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

/**
 * Ingredient autocomplete, contains ingredient dropdown + weight input
 * @param props
 * @returns
 */
export default function IngredientAutocomplete(props) {
  const [value, setValue] = useState(props.value ?? null);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Autocomplete
        value={value}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event: React.ChangeEvent, newValue: string | null) => {
          setValue(newValue);
          props.handleChange({
            ingredient: newValue,
            uniqueKey: props.uniqueKey,
          });
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
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
        value={props.ingredient_weight}
        inputProps={{
          type: 'number',
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
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
