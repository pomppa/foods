import prisma from '../../../lib/prisma';
import IngredientForm from '../../../components/forms/ingredientForm';
import { Grid, Typography } from '@mui/material';
import { Ingredient } from '@prisma/client';
import StickyFabs from '../../../components/stickyFabs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';

export const getServerSideProps = async function ({ req, res, query }) {
  const { id } = query;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/ingredients',
        permanent: false,
      },
    };
  }
  const ingredient = await prisma.ingredient.findFirst({
    where: {
      id: Number(id),
      userId: session.user.email,
    },
  });

  if (!ingredient) {
    return {
      redirect: {
        destination: '/ingredients/list',
        permanent: false,
      },
    };
  }

  const ingredientData = JSON.stringify(ingredient);

  return { props: { ingredientData } };
};

export default function EditIngredient(props) {
  const ingredient: Ingredient = JSON.parse(props.ingredientData);

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
          userId: ingredient.userId,
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
    router.push('/ingredients/list');
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
