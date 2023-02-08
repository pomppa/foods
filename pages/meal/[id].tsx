import React from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import { findUniqueMealWithId } from '../api/meals/[id]';
import { getMealDataForId } from '../api/meals/[id]/ingredients';

export const getServerSideProps = async (req) => {
  const meal = await findUniqueMealWithId(req.query.id);
  const mealDataForId = await getMealDataForId(req.query.id);
  const mealDataJson = JSON.stringify(mealDataForId);
  const mealsJson = JSON.stringify(meal);

  return { props: { mealsJson, mealDataJson } };
};

export default function Meal(props) {
  const router = useRouter();

  const data = JSON.parse(props.mealsJson);
  const mealData = JSON.parse(props.mealDataJson);

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    weight: number,
  ) {
    return { name, calories, fat, carbs, protein, weight };
  }

  const rows = mealData.map((x) => {
    return createData(
      x.ingredient.name,
      (x.ingredient.kcal / 100) * x.ingredient_weight,
      (x.ingredient.fat / 100) * x.ingredient_weight,
      (x.ingredient.carbs / 100) * x.ingredient_weight,
      (x.ingredient.protein / 100) * x.ingredient_weight,
      x.ingredient_weight,
    );
  });

  const totals = rows.reduce(
    (total, obj) => {
      return {
        weight: parseInt(obj.weight) + total.weight,
        kcal: parseFloat(obj.calories) + total.kcal,
        protein: parseFloat(obj.protein) + total.protein,
        carbs: parseFloat(obj.carbs) + total.carbs,
        fat: parseFloat(obj.fat) + total.fat,
      };
    },
    { weight: 0, kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        Go back
      </Button>
      <h2>{data.name}</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Weight&nbsp;(g)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.calories.toFixed(2)}</TableCell>
                <TableCell align="right">{row.fat.toFixed(2)}</TableCell>
                <TableCell align="right">{row.carbs.toFixed(2)}</TableCell>
                <TableCell align="right">{row.protein.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow
              sx={{
                td: {
                  fontSize: 15,
                },
              }}
            >
              <TableCell>TOTAL</TableCell>
              <TableCell align="right">{totals.weight}</TableCell>
              <TableCell align="right">{totals.kcal.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.fat.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.carbs.toFixed(2)}</TableCell>
              <TableCell align="right">{totals.protein.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}