import type { AppProps } from 'next/app';
import Layout from '../components/design/layout';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CustomThemeProvider } from '../components/themeContext';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <CustomThemeProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </CustomThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
