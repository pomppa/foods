import prisma from '../../lib/prisma';
import { IngredientI } from '../../types';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItemText,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import IngredientPie from '../../components/ingredientPie';
import StickyFabs from '../../components/stickyFabs';
import SearchIcon from '@mui/icons-material/Search';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import type { Session } from 'next-auth';

type Props = {
  ingredientsJson: string;
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  hasIngredients: number;
  session: Session;
};

export async function getServerSideProps({ req, res, query }) {
  const searchQuery = query.search !== undefined ? String(query.search) : '';
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const page = query.page ? Number(query.page) : 1;
  const pageSize = 30;

  const ingredients = await prisma.ingredient.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      userId: session.user.id,
      name: {
        contains: searchQuery,
      },
    },
    orderBy: [
      {
        updated_at: 'desc',
      },
    ],
  });

  const ingredientsCount = await prisma.ingredient.count({
    where: {
      userId: session.user.id,
      name: {
        contains: searchQuery,
      },
    },
  });
  const hasIngredients = await prisma.ingredient.count({
    where: {
      userId: session.user.id,
    },
  });

  const totalPages = Math.ceil(ingredientsCount / pageSize);

  const ingredientsJson = JSON.stringify(ingredients);

  return {
    props: {
      ingredientsJson,
      totalPages,
      currentPage: page,
      searchQuery,
      hasIngredients,
      session,
    },
  };
}

export default function Ingredients(props: Props) {
  const data: IngredientI[] = JSON.parse(props.ingredientsJson);
  const router = useRouter();
  const { query } = router;
  const openAccordionId = query.openAccordion;
  const { hasIngredients, session } = props;

  const handleFabClick = () => {
    router.push('/ingredients/new');
  };

  const [openedAccordion, setOpenedAccordion] = useState<string | null>(
    openAccordionId as string,
  );

  const handleAccordionChange = (accordionId: string) => {
    setOpenedAccordion(accordionId === openedAccordion ? null : accordionId);
  };

  const handleEditButtonClick = (id) => {
    router.push(`/ingredients/${id}/edit`);
  };

  const [searchQuery, setSearchQuery] = useState(props.searchQuery || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery !== '' && query.search !== searchQuery) {
        router.push(`/ingredients/list?search=${searchQuery}`);
      } else {
        if (router.pathname !== '/ingredients/list') {
          router.push('/ingredients/list');
        }
      }
      setLoading(false);
    };

    const timerId = setTimeout(handleSearch, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, router, query.search]);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      router.push('/ingredients/list');
    } else {
      setLoading(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" mt={2}>
          Food items
        </Typography>
        {hasIngredients > 0 ? (
          <>
            <Typography variant="body2" mt={2} mb={2}>
              List of all, sorted by creation date
            </Typography>
            <TextField
              label="Search"
              value={searchQuery}
              onChange={handleChange}
              type="search"
              fullWidth
              sx={{
                marginTop: 1,
                marginBottom: 2,
              }}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '8px',
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SearchIcon fontSize="small" />
                    )}
                  </Box>
                ),
              }}
            />
          </>
        ) : (
          <Typography variant="body2" mt={2} mb={2}>
            No food items, create a new one
          </Typography>
        )}

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
                        disabled={x.fineli_id !== undefined} // false
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
            primaryFabVisible={session}
            primaryFabIcon={<AddIcon />}
            onPrimaryClick={handleFabClick}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
