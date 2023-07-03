import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import EggIcon from '@mui/icons-material/Egg';
import EggAltIcon from '@mui/icons-material/EggAlt';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';

import { PieChart } from 'react-minimal-pie-chart';
import { Totals } from '../types';
import { blueGrey } from '@mui/material/colors';

type Props = {
  totals: Totals;
};

/**
 * @param props
 * @returns
 */
export default function MacroPieChart(props: Props) {
  const { totals } = props;

  const proteinRatio = isNaN(totals.proteinRatio) ? 0 : totals.proteinRatio;
  const fatRatio = isNaN(totals.fatRatio) ? 0 : totals.fatRatio;
  const carbsRatio = isNaN(totals.carbsRatio) ? 0 : totals.carbsRatio;

  const formatLabel = (ratio: number) => {
    return ratio > 0 ? `~${ratio.toFixed()}%` : `${ratio}%`;
  };

  const proteinLabel = formatLabel(proteinRatio);
  const carbsLabel = formatLabel(carbsRatio);
  const fatLabel = formatLabel(fatRatio);

  const ratios = [
    { title: 'protein', value: proteinRatio, color: blueGrey['300'] },
    { title: 'carbs', value: carbsRatio, color: blueGrey['A100'] },
    { title: 'fat', value: fatRatio, color: blueGrey['700'] },
  ];

  const data = ratios
    .filter((ratio) => ratio.value > 0)
    .map((ratio) => ({ ...ratio }));

  return (
    <Grid container spacing={2} sx={{ position: 'sticky', top: 50 }}>
      <Grid item xs={12}>
        <h3>Macros</h3>
      </Grid>
      <Grid item xs={6} sm={6}>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EggAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Protein" secondary={proteinLabel} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BreakfastDiningIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Carbs" secondary={carbsLabel} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EggIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Fat" secondary={fatLabel} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6} sm={6} sx={{ maxHeight: '215px' }}>
        {totals.totalKcal > 0 && (
          <PieChart
            data={data}
            animate
            animationDuration={500}
            animationEasing="ease-out"
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: '8px',
            }}
          ></PieChart>
        )}
      </Grid>
    </Grid>
  );
}
