import { PieChart } from 'react-minimal-pie-chart';
import { MacroPercentages } from '../interfaces';

type Props = {
  macros: MacroPercentages;
};

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

export default function MacroPieChart(props: Props) {
  const macroPercentages: MacroPercentages = props.macros;

  if (!macroPercentages) {
    return <></>;
  }

  return (
    <PieChart
      data={[
        {
          title: 'protein',
          value: macroPercentages.protein,
          color: '#90a4ae',
        },
        {
          title: 'carbs',
          value: macroPercentages.carbs,
          color: '#cfd8dc',
        },
        {
          title: 'fat',
          value: macroPercentages.fat,
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
