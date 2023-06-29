import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Option } from '../../interfaces';

/**
 * Ingredient autocomplete, contains ingredient dropdown + weight input
 * todo type props
 * @param props
 * @returns
 */
export default function IngredientAutocomplete(props) {
  const { onIngredientChange, onWeightChange } = props;
  const [inputValue, setInputValue] = useState('');

  const options: Option[] = props.options;

  const selected: Option =
    options.find((option) => option.id === props.value) ?? undefined;

  const weight: number = props.weight;

  /* from plan this should be undefined, from edit we should have as controlled */
  // console.log(selected);
  return (
    <>
      <>
        <Autocomplete
          value={selected}
          isOptionEqualToValue={(option, value) =>
            option.id == value?.id || value?.id === 0
          }
          onChange={(
            _event: React.ChangeEvent,
            newValue: { label: string; id: number } | null,
          ) => {
            onIngredientChange(newValue?.id || null);
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
          options={options}
          sx={{ width: 300, mt: 2 }}
          renderInput={(params) => (
            <TextField {...params} label={'Ingredients'} />
          )}
        />
        <TextField
          value={weight}
          label="Weight (g)"
          variant="outlined"
          name="weight"
          inputProps={{
            type: 'number',
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          sx={{ width: 300, mt: 2 }}
          onChange={(event) => {
            onWeightChange(parseFloat(event.target.value));
          }}
        />
      </>
    </>
  );
}
