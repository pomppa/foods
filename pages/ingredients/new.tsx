import { useState } from 'react';
import IngredientForm from '../../components/forms/ingredientForm';
import { Grid, Typography } from '@mui/material';
import StickyFabs from '../../components/stickyFabs';
import { useRouter } from 'next/router';

export default function Ingredients() {
  const router = useRouter();

  const [primaryFabDisabled, setPrimaryFabDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [kcal, setKcal] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProteins] = useState(0);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/createIngredient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          kcal,
          fat,
          carbs,
          protein,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save ingredient');
      }
      const data = await response.json();
      router.push(`/ingredients/list?openAccordion=${data.ingredient.id}`);
    } catch (error) {
      router.push(`/ingredients/list`);
    }
  };

  const isAnyValueNonZero =
    kcal !== 0 || fat !== 0 || carbs !== 0 || protein !== 0;

  const handlePrimaryClick = async () => {
    handleSubmit();
  };

  const handleSecondaryClick = () => {
    router.back();
  };

  /* recursive, not mandatory but edit functionality requires this */
  const handleStateChange = () => {
    setPrimaryFabDisabled(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" mt={2}>
          New food item
        </Typography>
        <IngredientForm
          name={name}
          setName={setName}
          kcal={kcal}
          setKcal={setKcal}
          fat={fat}
          setFat={setFat}
          carbs={carbs}
          setCarbs={setCarbs}
          protein={protein}
          setProteins={setProteins}
          onStateChange={handleStateChange}
        />
      </Grid>
      <Grid item xs={12}>
        <StickyFabs
          primaryFabVisible={true}
          primaryFabDisabled={
            !isAnyValueNonZero ||
            !name.trim() ||
            primaryFabDisabled ||
            isLoading
          }
          secondaryFabVisible={true}
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
          isLoading={isLoading}
          secondaryFabDisabled={isLoading}
        />
      </Grid>
    </Grid>
  );
}
