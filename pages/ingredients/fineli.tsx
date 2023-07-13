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

type Props = {
  ingredientsJson: string;
  totalPages: number;
  currentPage: number;
  searchQuery: string;
};

export async function getServerSideProps({ query }) {
  const page = query.page ? Number(query.page) : 1;
  const searchQuery = query.search !== undefined ? String(query.search) : '';

  const pageSize = 30;

  const ingredients = await prisma.fineli_Ingredient.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
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

  const ingredientsCount = await prisma.fineli_Ingredient.count({
    where: {
      name: {
        contains: searchQuery,
      },
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
    },
  };
}

export default function Ingredients(props: Props) {
  const data: IngredientI[] = JSON.parse(props.ingredientsJson);
  const router = useRouter();
  const { query } = router;

  const openAccordionId = query.openAccordion;

  const [openedAccordion, setOpenedAccordion] = useState<number | null>(
    Number(openAccordionId),
  );

  const handleAccordionChange = (accordionId: number) => {
    setOpenedAccordion(accordionId === openedAccordion ? null : accordionId);
  };

  const [searchQuery, setSearchQuery] = useState(props.searchQuery || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery !== '') {
        router.push(`/ingredients/fineli?search=${searchQuery}`);
      } else {
        router.push('/ingredients/fineli');
      }
      setLoading(false);
    };

    const timerId = setTimeout(handleSearch, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, router]);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      router.push('/ingredients/fineli');
    } else {
      setLoading(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" mt={2} mb={2}>
          Fineli foods
        </Typography>
        <Typography variant="body2" mt={2} mb={2}>
          List of all foods from Fineli.
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
                        disabled={x.fineli_id !== undefined} // true
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
                router.push(`/ingredients/fineli?page=${page}`);
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
          <StickyFabs primaryFabVisible={false} primaryFabIcon={<AddIcon />} />
        </Grid>
      </Grid>
    </Grid>
  );
}
