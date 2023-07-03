import prisma from '../../lib/prisma';
import { IngredientInterface } from '../../types';
import {
  Box,
  Fab,
  Grid,
  IconButton,
  Link,
  List,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import IngredientPie from '../../components/ingredientPie';

type Props = {
  ingredientsJson: string;
};

export const getServerSideProps = async () => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: [
      {
        updated_at: 'desc',
      },
    ],
  });
  const ingredientsJson = JSON.stringify(ingredients);

  return { props: { ingredientsJson } };
};

export default function Ingredients(props: Props) {
  const data: IngredientInterface[] = JSON.parse(props.ingredientsJson);

  const router = useRouter();
  const { query } = router;
  const openAccordionId = query.openAccordion;

  const handleFabClick = () => {
    router.push('/ingredient/new');
  };

  const [openedAccordion, setOpenedAccordion] = useState<number | null>(
    Number(openAccordionId),
  );

  const handleAccordionChange = (accordionId: number) => {
    setOpenedAccordion(accordionId === openedAccordion ? null : accordionId);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <h2>Food items</h2>
        <small>List of all, sorted by creation date</small>
        <List>
          {data.map((x) => (
            <Accordion
              key={x.id}
              expanded={openedAccordion === x.id}
              onChange={() => handleAccordionChange(x.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText primary={x.name} />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Calories:</TableCell>
                          <TableCell>{x.kcal}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Protein:</TableCell>
                          <TableCell>{x.protein}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Carbs:</TableCell>
                          <TableCell>{x.carbs}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Fat:</TableCell>
                          <TableCell>{x.fat}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                      }}
                    >
                      <Link href={`/ingredient/${x.id}/edit`}>
                        <IconButton aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    {openedAccordion === x.id && (
                      <IngredientPie ingredient={x} />
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Grid>
      <Fab
        aria-label="Save"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
}
