import prisma from '../../lib/prisma';
import { IngredientI } from '../../types';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItemText,
  Pagination,
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
import { withSessionSsr } from '../../lib/withSession';
import { GetServerSideProps } from 'next';
import useUser from '../../lib/useUser';

type Props = {
  ingredientsJson: string;
  totalPages: number;
  currentPage: number;
};

export const getServerSideProps: GetServerSideProps<Props> = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    req.session.user;

    const page = query.page ? Number(query.page) : 1;
    const pageSize = 30;

    let ingredients;
    let ingredientsCount;

    if (!req.session.user) {
      ingredients = await prisma.fineli_Ingredient.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: [
          {
            updated_at: 'desc',
          },
        ],
      });
      ingredientsCount = await prisma.fineli_Ingredient.count();
    } else {
      ingredients = await prisma.ingredient.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: [
          {
            updated_at: 'desc',
          },
        ],
      });
      ingredientsCount = await prisma.ingredient.count();
    }

    const totalPages = Math.ceil(ingredientsCount / pageSize);

    const ingredientsJson = JSON.stringify(ingredients);

    return {
      props: {
        ingredientsJson,
        totalPages,
        currentPage: page,
      },
    };
  },
);

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

  const handleEditButtonClick = (id) => {
    router.push(`/ingredients/${id}/edit`);
  };

  const { user } = useUser();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" mt={2}>
          Food items
        </Typography>
        <Typography variant="body2" mt={2} mb={2}>
          {data.length > 0
            ? 'List of all, sorted by creation date'
            : ' No food items, create a new one'}
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
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleEditButtonClick(x.id)}
                        disabled={x.fineli_id !== undefined}
                      >
                        <EditIcon />
                      </IconButton>
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
        <Grid item mt={2} xs={12} display="flex" justifyContent="center">
          {props.totalPages > 1 && (
            <Pagination
              count={props.totalPages}
              page={props.currentPage}
              onChange={(_event, page) => {
                router.push(`/ingredients/list?page=${page}`);
              }}
              color="primary"
            />
          )}
        </Grid>
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
            primaryFabVisible={user?.isLoggedIn}
            primaryFabIcon={<AddIcon />}
            onPrimaryClick={handleFabClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
