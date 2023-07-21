import { Meal } from '@prisma/client';
import { getAllMeals } from '../api/getMeals';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StickyFabs from '../../components/stickyFabs';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

type Props = {
  meals: Omit<Meal, 'created_at' | 'updated_at'>[];
};

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const meals = await getAllMeals(session.user.id);
  return { props: { meals } };
}

export default function Meals(props: Props) {
  const router = useRouter();

  const data: Omit<Meal, 'created_at' | 'updated_at'>[] = props.meals;
  const handleFabClick = () => {
    router.push('/plan');
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" mt={2}>
          All meals
        </Typography>
        <Typography variant="body2" mt={2}>
          {data.length > 0 ? 'Open a meal to view & edit' : 'No meals'}
        </Typography>
        <List>
          <Paper>
            {data.map((x, index) => (
              <React.Fragment key={x.id}>
                {index !== 0 && <Divider />}
                <ListItem>
                  <ListItemButton component="a" href={`/meals/${x.id}`}>
                    <ListItemText primary={x.name} />
                    <ListItemIcon>
                      <ArrowForwardIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </Paper>
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
