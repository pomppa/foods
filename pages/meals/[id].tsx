import { Grid, Typography } from '@mui/material';
import { getMeal } from '../api/getMeal/[id]';
import { FormValue, IngredientI, Totals } from '../../types';
import MealTable from '../../components/mealTable';
import MacroPieChart from '../../components/macros';
import { getIngredientDataForIds } from '../../lib/getIngredientDataForIds';
import { calculateTotals } from '../../components/totalsCalculator';
import { Meal } from '@prisma/client';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import StickyFabs from '../../components/stickyFabs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  name: string;
  id: number;
  ingredients: IngredientI[];
  formValues: FormValue[];
};

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const meal: Omit<Meal, 'created_at' | 'updated_at'> = await getMeal(
      query.id,
      session.user.email,
    );
    const { name, id } = meal;

    const formValues: FormValue[] = meal.formValues as FormValue[];
    const ingredients: IngredientI[] = await getIngredientDataForIds(
      formValues.map((value) => value.ingredient_id),
    );

    return {
      props: { name, id, formValues, ingredients },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/meals/list',
        permanent: false,
      },
    };
  }
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
    router.push('/meals/list');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mt={2}>
          {name}
        </Typography>
        <MealTable totals={totals}></MealTable>
      </Grid>
      <Grid item xs={12}>
        <MacroPieChart totals={totals}></MacroPieChart>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'sticky',
          zIndex: 1,
          bottom: '16px',
          maxWidth: 'calc(100% - 16px)',
          margin: '0 auto',
        }}
      >
        <Grid item xs={12}>
          <StickyFabs
            primaryFabVisible={true}
            primaryFabIcon={<EditIcon />}
            secondaryFabVisible={true}
            onSecondaryClick={handleBack}
            onPrimaryClick={handleFabClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
