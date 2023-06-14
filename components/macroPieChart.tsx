import { PieChart } from 'react-minimal-pie-chart';
import { Totals } from '../interfaces';

type Props = {
  macros: Totals;
};

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

export default function MacroPieChart(props: Props) {
  if (!props.macros.totalWeight) {
    return <></>;
  }

  return (
    <PieChart
      data={[
        {
          title: 'protein',
          value: props.macros.proteinRatio,
          color: '#90a4ae',
        },
        {
          title: 'carbs',
          value: props.macros.carbsRatio,
          color: '#cfd8dc',
        },
        {
          title: 'fat',
          value: props.macros.fatRatio,
          color: '#455a64',
        },
      ]}
      label={({ dataEntry }) => dataEntry.title}
      labelStyle={{
        ...defaultLabelStyle,
      }}
    ></PieChart>
  );
}
