import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { IngredientI } from '../../types';

type Props = {
  disabledOptions: number[];
  onIngredientChange: (id: number) => void;
  onWeightChange: (weight: number | string) => void;
  options: IngredientI[];
  value: number;
  weight: number;
  isSavingEnabled?: boolean;
};

/**
 * Ingredient autocomplete, contains ingredient dropdown + weight input
 *
 * @param props
 * @returns
 */
export default function IngredientAutocomplete(props: Props) {
  const {
    onIngredientChange,
    onWeightChange,
    isSavingEnabled,
    weight,
    options,
  } = props;

  const [inputValue, setInputValue] = useState('');

  const selected: IngredientI =
    options.find((option) => option.id === props.value) ?? null;

  return (
    <>
      <Autocomplete
        getOptionLabel={(option: { name: string; id: number }) => option.name}
        value={selected ?? null}
        isOptionEqualToValue={(option, value) =>
          option.id == value?.id || value?.id === 0
        }
        onChange={(
          _event: React.ChangeEvent,
          value: { name: string; id: number } | null,
        ) => {
          onIngredientChange(value?.id || null);
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
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        sx={{
          width: { xs: '100%', sm: '75%' },
          mt: 2,
        }}
        renderInput={(params) => <TextField {...params} label={'Food item'} />}
        disabled={isSavingEnabled}
      />
      <TextField
        value={weight ?? ''}
        label="Weight (g)"
        variant="outlined"
        name="weight"
        inputProps={{
          type: 'number',
          inputMode: 'numeric',
        }}
        sx={{
          width: { xs: '100%', sm: '75%' },
          mt: 2,
        }}
        onChange={(event) => {
          const inputValue = parseFloat(event.target.value);
          const value = isNaN(inputValue) ? '' : inputValue;
          if (value === '' || (value >= 0 && value <= 9999)) {
            onWeightChange(value);
          }
        }}
        disabled={isSavingEnabled}
      />
    </>
  );
}
