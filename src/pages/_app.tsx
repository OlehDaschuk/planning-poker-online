import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { RootStoreProvider, rootStore } from '@/store';
import { modalsHandlerStore } from '@/store/ModalsHandlerStore';

import NextNProgress from 'nextjs-progressbar';
import { PricingModal } from '@/components/payment/PricingModal';
import { SignUpModal } from '@/components/auth/modals/SignUpModal';
import { LoginModal } from '@/components/auth/modals/LoginModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <RootStoreProvider value={rootStore}>
        <Component {...pageProps} />
      </RootStoreProvider>

      <PricingModal />
      <LoginModal />
      <SignUpModal />
    </>
  );
}
