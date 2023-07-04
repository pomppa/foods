import prisma from '../../lib/prisma';
import { IngredientI } from '../../types';
import {
  Box,
  Grid,
  IconButton,
  Link,
  List,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import IngredientPie from '../../components/ingredientPie';
import StickyFabs from '../../components/stickyFabs';

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
  const data: IngredientI[] = JSON.parse(props.ingredientsJson);

  const router = useRouter();
  const { query } = router;
  const openAccordionId = query.openAccordion;

  const handleFabClick = () => {
    router.push('/ingredients/new');
  };

  const [openedAccordion, setOpenedAccordion] = useState<number | null>(
    Number(openAccordionId),
  );

  const handleAccordionChange = (accordionId: number) => {
    setOpenedAccordion(accordionId === openedAccordion ? null : accordionId);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" mt={2}>
          Food items
        </Typography>
        <Typography variant="body2" mt={2} mb={2}>
          List of all, sorted by creation date
        </Typography>
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
                      <Link href={`/ingredients/${x.id}/edit`}>
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
            // onSecondaryClick={handleSecondaryClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
