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
import { Totals } from '../interfaces';

type Props = {
  totals: Totals;
};

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

/**
 * @todo display as disabled?
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
    { title: 'protein', value: proteinRatio, color: '#90a4ae' },
    { title: 'carbs', value: carbsRatio, color: '#cfd8dc' },
    { title: 'fat', value: fatRatio, color: '#455a64' },
  ];

  const data = ratios
    .filter((ratio) => ratio.value > 0)
    .map((ratio) => ({ ...ratio }));

  return (
    <>
      <h3>Macros</h3>
      <Grid container>
        <Grid item xs={8}>
          <List
            sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' }}
          >
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
        <Grid item xs={8} sx={{ mt: '10px' }}>
          {totals.totalKcal > 0 && (
            <PieChart
              data={data}
              animate={true}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                ...defaultLabelStyle,
              }}
            ></PieChart>
          )}
        </Grid>
      </Grid>
    </>
  );
}
