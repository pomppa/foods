import { blueGrey } from '@mui/material/colors';
import { PieChart } from 'react-minimal-pie-chart';

/**
 *
 * @param props todo
 * @returns
 */
export default function IngredientPie(props) {
  const { protein, carbs, fat, kcal } = props.ingredient;

  const kcalPerProtein = protein * 4;
  const kcalPerCarbs = carbs * 4;
  const kcalPerFat = fat * 9;

  const proteinRatio = (kcalPerProtein / kcal) * 100;
  const carbsRatio = (kcalPerCarbs / kcal) * 100;
  const fatRatio = (kcalPerFat / kcal) * 100;

  const ratios = [
    { title: 'protein', value: proteinRatio, color: blueGrey['300'] },
    { title: 'carbs', value: carbsRatio, color: blueGrey['A100'] },
    { title: 'fat', value: fatRatio, color: blueGrey['700'] },
  ];

  const filtered = ratios
    .filter((ratio) => ratio.value > 0)
    .map((ratio) => ({ ...ratio }));

  return (
    <PieChart
      data={filtered}
      animate
      animationDuration={500}
      animationEasing="ease-out"
      label={({ dataEntry }) => dataEntry.title}
      labelStyle={{
        fontSize: '8px',
      }}
    ></PieChart>
  );
}
