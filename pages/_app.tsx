import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import { CustomThemeProvider } from '../components/themeContext';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '../components/design/layout';
import createEmotionCache from '../lib/createEmotionCache';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: { session?: Session };
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
