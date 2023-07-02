import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { AutocompleteOption } from '../../interfaces';

type Props = {
  disabledOptions: number[];
  onIngredientChange: (id: number) => void;
  onWeightChange: (weight: number) => void;
  options: AutocompleteOption[];
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
  const { onIngredientChange, onWeightChange, isSavingEnabled } = props;

  const weight: number = props.weight;

  const [inputValue, setInputValue] = useState('');

  const options: AutocompleteOption[] = props.options;

  const selected: AutocompleteOption =
    options.find((option) => option.id === props.value) ?? null;

  return (
    <>
      <>
        <Autocomplete
          value={selected ?? null}
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
            <TextField {...params} label={'Select ingredient'} />
          )}
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
          sx={{ width: 300, mt: 2 }}
          onChange={(event) => {
            const inputValue = parseFloat(event.target.value);
            if (isNaN(inputValue) || (inputValue >= 0 && inputValue <= 9999)) {
              onWeightChange(inputValue);
            }
          }}
          disabled={isSavingEnabled}
        />
      </>
    </>
  );
}
