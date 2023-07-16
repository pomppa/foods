import { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { lightThemeOptions, darkThemeOptions } from '../styles/theme';
import { createTheme } from '@mui/material';
import { getCookie, setCookie } from '../lib/cookie';

export const CustomThemeContext = createContext(null);

export const CustomThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(null);

  useEffect(() => {
    const storedThemePreference = getCookie('themePreference');

    if (storedThemePreference !== null) {
      setIsDarkTheme(JSON.parse(storedThemePreference));
    } else {
      setIsDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme !== null) {
      setCookie('themePreference', JSON.stringify(isDarkTheme));
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
  };

  if (isDarkTheme === null) {
    return null;
  }

  const theme = createTheme(isDarkTheme ? darkThemeOptions : lightThemeOptions);

  return (
    <CustomThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
