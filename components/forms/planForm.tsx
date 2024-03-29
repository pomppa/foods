import { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup, Grid } from '@mui/material';
import IngredientAutocomplete from './ingredientAutocomplete';
import { FormValue } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
  onChange: (formValues: FormValue[]) => void;
  formValues?: FormValue[];
  hasNullValues?: boolean;
  isSavingEnabled?: boolean;
};

/**
 * Planner view, inputs for selecting ingredients and saving as a meal
 * @param props
 * @returns
 */
export default function PlanForm(props: Props) {
  const [ingredientIdsAndNames, setIngredientIdsAndNames] = useState([]);

  useEffect(() => {
    const fetchIngredientIdsAndNames = async () => {
      try {
        const response = await fetch('/api/getIngredientIdsAndNames');
        const data = await response.json();
        setIngredientIdsAndNames(data);
      } catch (error) {
        console.error('Error fetching ingredientIdsAndNames:', error);
      }
    };

    fetchIngredientIdsAndNames();
  }, []);

  const { onChange, hasNullValues, isSavingEnabled } = props;

  const [ingredients, setIngredients] = useState<FormValue[]>(
    props.formValues ?? [{ ingredient_id: null, weight: null }],
  );

  const disabledOptions: string[] = Object.values(ingredients).map(
    (item) => item.ingredient_id,
  );

  const ingredientRef = useRef<HTMLDivElement>(null);

  const addIngredient = () => {
    const newIngredient: FormValue = { ingredient_id: null, weight: null };
    const updatedIngredients: FormValue[] = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
    setTimeout(() => {
      if (ingredientRef.current) {
        const drawerHeight = 55;
        const scrollPosition = ingredientRef.current.offsetTop - drawerHeight;

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients: FormValue[] = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleIngredientChange = (index: number, ingredient: string) => {
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
      {ingredients.map((ingredient, index) => (
        <Grid item xs={12} key={index} ref={ingredientRef}>
          <IngredientAutocomplete
            key={index}
            value={ingredient.ingredient_id}
            weight={ingredient.weight}
            options={ingredientIdsAndNames}
            onIngredientChange={(updatedIngredient: string) =>
              handleIngredientChange(index, updatedIngredient)
            }
            onWeightChange={(weight: number) =>
              handleWeightChange(index, weight)
            }
            disabledOptions={disabledOptions}
            isSavingEnabled={isSavingEnabled}
          />
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        sx={{
          display: { xs: 'flex', sm: 'initial' },
          justifyContent: 'center',
        }}
      >
        <ButtonGroup>
          <Button
            variant="contained"
            disabled={isSavingEnabled || ingredients.length <= 1}
            color="secondary"
            onClick={() => removeIngredient(ingredients.length - 1)}
            startIcon={<RemoveIcon />}
          >
            Remove
          </Button>
          <Button
            color="success"
            disabled={isSavingEnabled || hasNullValues}
            variant="contained"
            onClick={addIngredient}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
