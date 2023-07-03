import { Meal } from '@prisma/client';
import { getAllMeals } from './api/meals';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  meals: Omit<Meal, 'created_at' | 'updated_at'>[];
};

export const getServerSideProps = async () => {
  const meals = await getAllMeals();
  return { props: { meals } };
};

export default function Meals(props: Props) {
  const data: Omit<Meal, 'created_at' | 'updated_at'>[] = props.meals;

  const router = useRouter();

  const handleEditClick = (id: number) => {
    router.push(`/meals/${id}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <h2>All meals</h2>
        <small>Open a meal to edit</small>
        <List>
          {data.map((x) => (
            <Accordion key={x.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText primary={x.name} />
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {/* prisma-json-types-generator */}
                  {x.formValues.map((value, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${value.ingredient_id}`}
                        secondary={`Weight: ${value.weight}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  width="100%"
                  marginTop="auto"
                >
                  <IconButton
                    aria-label="Edit"
                    color="primary"
                    onClick={() => handleEditClick(x.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
