import prisma from '../../../lib/prisma';
import IngredientForm from '../../../components/forms/ingredientForm';
import { Grid, Typography } from '@mui/material';
import { NextApiRequest } from 'next';

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
  const ingredient = JSON.parse(props.ingredient);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" mt={2}>
          {ingredient.name}
        </Typography>
        <IngredientForm initialIngredient={ingredient} />
      </Grid>
    </Grid>
  );
}
