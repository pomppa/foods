import { Meal } from '@prisma/client';
import { getAllMeals } from '../api/getMeals';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type Props = {
  meals: Omit<Meal, 'created_at' | 'updated_at'>[];
};

export const getServerSideProps = async () => {
  const meals = await getAllMeals();
  return { props: { meals } };
};

export default function Meals(props: Props) {
  const data: Omit<Meal, 'created_at' | 'updated_at'>[] = props.meals;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" mt={2}>
          All meals
        </Typography>
        <Typography variant="body2" mt={2}>
          Open a meal to edit
        </Typography>
        <List>
          {data.map((x) => (
            <ListItem key={x.id} button component="a" href={`/meals/${x.id}`}>
              <ListItemText primary={x.name} />
              <ListItemIcon>
                <ArrowCircleRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}