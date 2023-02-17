import { useEffect } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getDoc, doc } from 'firebase/firestore';
import Head from 'next/head';

import { firestore, auth } from '@/firebase';
import useBeforeUnload from '@/hooks/useBeforeUnload';

import { Header, Table, CardSection } from '@/components/game/session-page';

import { PricingModal } from '@/components/payment/PricingModal';
import { LoginModal } from '@/components/auth/modals/LoginModal';
import { SignUpModal } from '@/components/auth/modals/SignUpModal';
import { useStore } from '@/hooks/useStore';

export const getServerSideProps: GetServerSideProps<
  { sessionName: string },
  { sessionId: string }
> = async (ctx) => {
  const sessionSnap = await getDoc(doc(firestore, 'sessions', ctx.query.sessionId as string));
  return {
    notFound: !sessionSnap.exists(),
    props: { sessionName: sessionSnap?.get('name') },
  };
};

export default function GameRoom({
  sessionName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const gameSessionStore = useStore<'gameSessionStore'>((s) => s.gameSessionStore);

  useEffect(() => {
    gameSessionStore.onSessionConnection(router.query.sessionId as string);

    console.log(gameSessionStore.currentSession);
    return () => {
      gameSessionStore.onLeavingSesion();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Planning poker online | {sessionName}</title>
      </Head>

      <div className="bg-[#f9f9f9]">
        <Header />
        <Table />
        <CardSection />
      </div>

      <PricingModal />
      <LoginModal />
      <SignUpModal />
    </>
  );
}
