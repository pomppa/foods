import prisma from '../../../lib/prisma';
import IngredientForm from '../../../components/forms/ingredientForm';
import { Grid, Typography } from '@mui/material';
import { NextApiRequest } from 'next';
import { IngredientI } from '../../../types';
import StickyFabs from '../../../components/stickyFabs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getServerSideProps = async (req: NextApiRequest) => {
  const ingredientRaw = await prisma.ingredient.findFirst({
    where: {
      id: Number(req.query.id),
    },
  });

  const ingredient = JSON.stringify(ingredientRaw);

  return { props: { ingredient } };
};

export default function EditIngredient(props) {
  const ingredient: IngredientI = JSON.parse(props.ingredient);

  const router = useRouter();

  const [primaryFabDisabled, setPrimaryFabDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(ingredient.name);
  const [kcal, setKcal] = useState(Number(ingredient.kcal));
  const [fat, setFat] = useState(Number(ingredient.fat));
  const [carbs, setCarbs] = useState(Number(ingredient.carbs));
  const [protein, setProteins] = useState(Number(ingredient.protein));

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/updateIngredient', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ingredient.id,
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

  const handlePrimaryClick = async () => {
    handleSubmit();
  };

  const handleSecondaryClick = () => {
    router.back();
  };

  const handleChildStateChange = () => {
    setPrimaryFabDisabled(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" mt={2}>
          {ingredient.name}
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
          onStateChange={handleChildStateChange}
        />
      </Grid>
      <Grid item xs={12}>
        <StickyFabs
          primaryFabVisible={true}
          primaryFabDisabled={isLoading || primaryFabDisabled || !name.trim()}
          secondaryFabVisible={true}
          secondaryFabDisabled={isLoading}
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}
