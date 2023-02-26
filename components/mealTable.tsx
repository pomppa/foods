import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from '@mui/material';
import { MealIngredientInterface } from '../interfaces';

type Props = {
  data: MealIngredientInterface[];
  plan: boolean;
};

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
/**
 * Meal table component, takes meal data as a parameter and returns a table
 * @param param0
 * @returns
 */
export default function MealTable(props: Props) {
  console.log(props);
  if (props.plan) {
    return;
  }
  console.log(props.data);
  const data: MealIngredientInterface[] = props.data;

  // create data for table rows
  // todo casting to number?
  const rows = data.map((x) => {
    return createData(
      x.ingredient.name,
      (Number(x.ingredient.kcal) / 100) * Number(x.ingredient_weight),
      (Number(x.ingredient.fat) / 100) * Number(x.ingredient_weight),
      (Number(x.ingredient.carbs) / 100) * Number(x.ingredient_weight),
      (Number(x.ingredient.protein) / 100) * Number(x.ingredient_weight),
      Number(x.ingredient_weight),
    );
  });

  // create data for table's total row
  // todo casting
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
  );
}
