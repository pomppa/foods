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
};

/**
 * Ingredient autocomplete, contains ingredient dropdown + weight input
 *
 * @param props
 * @returns
 */
export default function IngredientAutocomplete(props: Props) {
  const { onIngredientChange, onWeightChange } = props;

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
        />
        <TextField
          value={weight ?? ''}
          label="Weight (g)"
          variant="outlined"
          name="weight"
          inputProps={{
            type: 'number',
            inputMode: 'numeric',
            pattern: '[1-9]*',
            min: '1',
            required: true,
          }}
          sx={{ width: 300, mt: 2 }}
          onChange={(event) => {
            const inputValue = parseFloat(event.target.value);
            onWeightChange(inputValue);
          }}
        />
      </>
    </>
  );
}
