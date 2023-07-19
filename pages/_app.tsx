import { AppProps } from 'next/app';
import Layout from '../components/design/layout';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CustomThemeProvider } from '../components/themeContext';
import { SessionProvider } from 'next-auth/react';

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
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </SessionProvider>
      </CustomThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
