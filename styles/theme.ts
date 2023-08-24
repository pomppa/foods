import { ThemeOptions } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: blueGrey[400],
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: blueGrey[900],
    },
  },
};
