import { PieChart } from 'react-minimal-pie-chart';
import { Totals } from '../interfaces';

type Props = {
  totals: Totals;
};

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

export default function MacroPieChart(props: Props) {
  if (!props.totals.totalWeight) {
    return <></>;
  }

  return (
    <PieChart
      data={[
        {
          title: 'protein',
          value: props.totals.proteinRatio,
          color: '#90a4ae',
        },
        {
          title: 'carbs',
          value: props.totals.carbsRatio,
          color: '#cfd8dc',
        },
        {
          title: 'fat',
          value: props.totals.fatRatio,
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
