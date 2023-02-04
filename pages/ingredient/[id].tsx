import React from 'react';
import Head from 'next/head';
import { findUniqueIngredient } from '../api/ingredients/[id]';
import {
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

export const getServerSideProps = async (req) => {
  const ingredient = await findUniqueIngredient(req.query.id);
  const ingredientJson = JSON.stringify(ingredient);

  return { props: { ingredientJson } };
};

export default function Ingredient(props) {
  const data = JSON.parse(props.ingredientJson);
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
              <TableCell align="right">{data.kcal}</TableCell>
              <TableCell align="right">{data.fat}</TableCell>
              <TableCell align="right">{data.carbs}</TableCell>
              <TableCell align="right">{data.protein}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
