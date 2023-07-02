import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import IngredientAutocomplete from './ingredientAutocomplete';
import { FormValue, IngredientI } from '../../interfaces';
import { AutocompleteOption } from '../../interfaces';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  data: IngredientI[];
  onChange: (formValues: FormValue[]) => void;
  formValues?: FormValue[];
  hasNullValues?: boolean;
};

/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function PlanForm(props: Props) {
  const { data, onChange, hasNullValues } = props;
  console.log(hasNullValues);
  const options: AutocompleteOption[] = data.map((element: IngredientI) => {
    return { label: element.name, id: element.id };
  });

  const [ingredients, setIngredients] = useState<FormValue[]>(
    props.formValues ?? [{ ingredient_id: null, weight: null }],
  );

  const disabledOptions: number[] = Object.values(ingredients).map(
    (item) => item.ingredient_id,
  );

  const addIngredient = () => {
    const newIngredient: FormValue = { ingredient_id: null, weight: null };
    const updatedIngredients: FormValue[] = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleIngredientChange = (index: number, ingredient: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients[index].ingredient_id = ingredient;
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleWeightChange = (index: number, weight: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients[index].weight = weight;
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {ingredients.map((ingredient, index) => (
          <IngredientAutocomplete
            key={index}
            value={ingredient.ingredient_id}
            weight={ingredient.weight}
            options={options}
            onIngredientChange={(updatedIngredient: number) =>
              handleIngredientChange(index, updatedIngredient)
            }
            onWeightChange={(weight: number) =>
              handleWeightChange(index, weight)
            }
            disabledOptions={disabledOptions}
          />
        ))}
      </Grid>
      {ingredients.length > 1 && (
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => removeIngredient(ingredients.length - 1)}
            startIcon={<RemoveIcon />}
          >
            Remove
          </Button>
        </Grid>
      )}
      <Grid item>
        <Button
          disabled={hasNullValues}
          variant="contained"
          onClick={addIngredient}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
