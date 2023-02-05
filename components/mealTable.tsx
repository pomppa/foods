import { store } from '../lib/redux/store';
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

function createData(data: object, id: number, weight: number) {
  const ingredientObject = data.find((x) => x.id === id);
  if (!ingredientObject) {
    return { name: '', calories: 0.0, fat: 0, carbs: 0, prot: 0 };
  }
  const name = ingredientObject.name ?? '';
  const calories = (ingredientObject.kcal / 100) * weight ?? 0;
  const fat = (ingredientObject.fat / 100) * weight ?? 0;
  const carbs = (ingredientObject.carbs / 100) * weight ?? 0;
  const protein = (ingredientObject.protein / 100) * weight ?? 0;

  return { name, weight, calories, fat, carbs, protein };
}

export default function MealTable({ data }) {
  const props = store.getState().valueUpdated;
  const rows = props.map((x) => {
    return createData(data, x.ingredient, x.weight);
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxWidht: 650 }} aria-label="simple table">
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
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
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
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
}
