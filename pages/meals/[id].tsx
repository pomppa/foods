import { Fab, Grid } from '@mui/material';
import { getMeal } from '../api/getMeal/[id]';
import { FormValue, IngredientI, Totals } from '../../types';
import { NextApiRequest } from 'next';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macros';
import { getIngredientDataForIds } from './getIngredientDataForIds';
import { calculateTotals } from '../../components/totalsCalculator';
import { Meal } from '@prisma/client';
import EditIcon from '@mui/icons-material/Edit';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  id: number;
  ingredients: IngredientI[];
  formValues: FormValue[];
};

/**
 *
 * @param req
 * @returns
 */
export const getServerSideProps = async (req: NextApiRequest) => {
  const meal: Omit<Meal, 'created_at' | 'updated_at'> = await getMeal(
    req.query.id,
  );

  const { name, id } = meal;

  const formValues: FormValue[] = meal.formValues as FormValue[];

  const ingredients: IngredientI[] = await getIngredientDataForIds(
    formValues.map((value) => value.ingredient_id),
  );

  return {
    props: { name, id, formValues, ingredients },
  };
};

/**
 * Meal page component.
 *
 * @param props
 * @returns
 */
export default function MealPage(props: Props) {
  const router = useRouter();

  const { name, id, formValues, ingredients } = props;

  const totals: Totals = calculateTotals(formValues, ingredients);

  const handleFabClick = () => {
    router.push(`/meals/${id}/edit`);
  };

  const handleBack = () => {
    router.push(`/meals/`);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>{name}</h2>
        <MealTable totals={totals}></MealTable>
      </Grid>
      <Grid item xs={12}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
      <Fab
        aria-label="Edit"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: '80px',
          right: '16px',
        }}
        onClick={handleFabClick}
      >
        <EditIcon />
      </Fab>
      <Fab
        aria-label="Back"
        color="secondary"
        onClick={handleBack}
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
      >
        <BackIcon />
      </Fab>
    </Grid>
  );
}
