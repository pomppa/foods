import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

/**
 * Ingredient autocomplete, contains ingredient dropdown + weight input
 * todo type props
 * @param props
 * @returns
 */
export default function IngredientAutocomplete(props) {
  console.log(props.ingredientWeightValues);

  const [value, setValue] = useState(props.value ?? null);
  const [inputValue, setInputValue] = useState('');

  const [weight, setWeight] = useState(props.ingredient_weight ?? '');

  return (
    <>
      <Autocomplete
        value={value}
        isOptionEqualToValue={(option, value) => option.id == value.id}
        onChange={(
          _event: React.ChangeEvent,
          newValue: { label: string; id: number } | null,
        ) => {
          setValue(newValue);
          props.handleChange({
            ingredient: newValue.id,
            uniqueKey: props.uniqueKey, // redundant?
          });
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionDisabled={(option) =>
          props.disabledOptions.some(
            (selectedOption) => selectedOption === option.id,
          )
        }
        options={props.options}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => (
          <TextField {...params} label={'Ingredients'} />
        )}
      />
      <TextField
        label="Weight (g)"
        variant="outlined"
        name="weight"
        value={weight ?? props.ingredient_weight}
        inputProps={{
          type: 'number',
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
        sx={{ width: 300, mt: 2 }}
        onChange={(event) => {
          setWeight(event.target.value);
          props.handleChange({
            weight: parseFloat(event.target.value),
            uniqueKey: props.uniqueKey,
          });
        }}
      />
      <button onClick={props.onDeleteChild}>Delete</button>
    </>
  );
}
