import prisma from '../lib/prisma';
import Link from 'next/link';
import { Box } from '@mui/system';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import { MealInterface } from '../interfaces';

type Props = {
  mealsJson: string;
};

export const getServerSideProps = async () => {
  const meals = await prisma.meal.findMany();
  const mealsJson = JSON.stringify(meals);

  return { props: { mealsJson } };
};

export default function Meals(props: Props) {
  const data: MealInterface[] = JSON.parse(props.mealsJson);

  return (
    <>
      <h2>All meals</h2>
      <small>Open a meal to edit</small>
      <Box
        sx={{
          mt: '10px',
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <List>
          {data.map((x) => {
            return (
              <>
                <Link href={'meal/' + x.id}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText key={x.id} primary={x.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            );
          })}
        </List>
      </Box>
    </>
  );
}
