import prisma from '../lib/prisma';
import Link from 'next/link';
import { Box } from '@mui/system';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';

export const getServerSideProps = async () => {
  const meals = await prisma.meal.findMany();
  const mealsJson = JSON.stringify(meals);

  const rows = [];
  return { props: { mealsJson, rows } };
};

export default function Meals(props) {
  const data = JSON.parse(props.mealsJson);

  return (
    <>
      <h1>Meals</h1>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          {data.map((x, i) => {
            return (
              <>
                <Link key={x.id} href={'meal/' + x.id}>
                  <ListItem disablePadding key={i}>
                    <ListItemButton>
                      <ListItemText primary={x.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            );
          })}
        </List>
      </Box>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
