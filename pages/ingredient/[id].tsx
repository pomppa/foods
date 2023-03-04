import React from 'react';
import Head from 'next/head';
import { findUniqueIngredient } from '../api/ingredients/[id]';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import router from 'next/router';
import { NextApiRequest } from 'next';
import { IngredientInterface, MacroPercentages } from '../../interfaces';
import MacroPieChart from '../../components/macroPieChart';
import IngredientMacroCalculator from '../../lib/ingredientMacroCalculator';

type Props = {
  ingredientJson: string;
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const ingredient = await findUniqueIngredient(req.query.id);
  const ingredientJson = JSON.stringify(ingredient);

  return { props: { ingredientJson } };
};

export default function Ingredient(props: Props) {
  const data: IngredientInterface = JSON.parse(props.ingredientJson);
  const macros: MacroPercentages = IngredientMacroCalculator(data);

  console.log(data);
  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <Head>
        <title>Food - Ingredient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>View ingredient</h1>
      </div>
      <TableContainer sx={{ minWidth: 650, maxWidth: 650 }} component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="right">{String(data.kcal)}</TableCell>
              <TableCell align="right">{String(data.fat)}</TableCell>
              <TableCell align="right">{String(data.carbs)}</TableCell>
              <TableCell align="right">{String(data.protein)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ width: 1 / 3, py: 5, ml: 5 }}>
        <MacroPieChart macros={macros}></MacroPieChart>
      </Box>
    </>
  );
}
