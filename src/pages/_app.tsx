import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { RootStoreProvider, rootStore } from '@/store';

import NextNProgress from 'nextjs-progressbar';

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
