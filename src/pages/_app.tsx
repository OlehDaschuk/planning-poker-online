import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import NextNProgress from 'nextjs-progressbar';
import { RootStoreProvider, rootStore } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <RootStoreProvider value={rootStore}>
        <Component {...pageProps} />
      </RootStoreProvider>
    </>
  );
}
