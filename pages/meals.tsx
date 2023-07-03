import prisma from '../lib/prisma';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Grid, List } from '@mui/material';
import { MealInterface } from '../types';

type Props = {
  mealsJson: string;
};

export const getServerSideProps = async () => {
  const meals = await prisma.meal.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  });
  const mealsJson = JSON.stringify(meals);

  return { props: { mealsJson } };
};

export default function Meals(props: Props) {
  const data: MealInterface[] = JSON.parse(props.mealsJson);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <h2>All meals</h2>
        <small>Open a meal to edit</small>
        <List>
          {data.map((x) => {
            return (
              <Link key={x.id} href={'meal/' + x.id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={x.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
