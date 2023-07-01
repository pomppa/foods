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
              <ListItemText
                primary="Protein"
                secondary={props.totals.proteinRatio.toFixed() + '%'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BreakfastDiningIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Carbs"
                secondary={props.totals.carbsRatio.toFixed() + '%'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EggIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Fat"
                secondary={props.totals.fatRatio.toFixed() + '%'}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={8} sx={{ mt: '10px' }}>
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
        </Grid>
      </Grid>
    </>
  );
}
