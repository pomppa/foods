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
import StickyFabs from '../../components/stickyFabs';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

type Props = {
  meals: Omit<Meal, 'created_at' | 'updated_at'>[];
};

export const getServerSideProps = async () => {
  const meals = await getAllMeals();
  return { props: { meals } };
};

export default function Meals(props: Props) {
  const router = useRouter();

  const data: Omit<Meal, 'created_at' | 'updated_at'>[] = props.meals;

  const handleFabClick = () => {
    router.push('/plan');
  };

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
            <ListItem key={x.id} component="a" href={`/meals/${x.id}`}>
              <ListItemText primary={x.name} />
              <ListItemIcon>
                <ArrowCircleRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        sx={{
          position: 'sticky',
          zIndex: 1,
          bottom: '16px',
          maxWidth: 'calc(100% - 16px)',
          margin: '0 auto',
          left: 0,
          right: 0,
        }}
      >
        <Grid item xs={12}>
          <StickyFabs
            primaryFabVisible={true}
            primaryFabIcon={<AddIcon />}
            onPrimaryClick={handleFabClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
