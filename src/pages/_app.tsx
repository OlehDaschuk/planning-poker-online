import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

import store from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
