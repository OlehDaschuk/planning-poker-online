import { useState, useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QuerySnapshot, collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { firestore, auth } from '@/firebase';
import useBeforeUnload from '@/hooks/useBeforeUnload';

import { Header, Deck, CardSection } from '@/components/game/session-page';

import { PricingModal } from '@/components/payment/PricingModal';
import { LoginModal } from '@/components/auth/modals/LoginModal';
import { SignUpModal } from '@/components/auth/modals/SignUpModal';
import Head from 'next/head';

// TODO: make clipboard via window.location.href

export const getServerSideProps: GetServerSideProps<{}, { sessionId: string }> = async (ctx) => {
  const sessionSnap = await getDoc(doc(firestore, 'session', ctx.query.sessionId as string));

  return {
    notFound: !sessionSnap.exists(),
    props: {},
  };
};

async function hendleWindowClose() {
  try {
    const docRef = await addDoc(collection(firestore, 'tasting'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export default function GameRoom() {
  const router = useRouter();

  // const [snapshot, loading, error] = useDocument<SessionData>(
  //   doc(firestore, 'session', router.query.sessionId as string)
  // );
  // console.log(snapshot?.data());

  useEffect(() => {
    if (!auth.currentUser) {
    }

    return () => {};
  }, []);

  // ?: how to implement user disconection
  // useEffect(() => {
  //   window.addEventListener('unload', alertUser, {capture: });
  //   return () => {
  //     window.removeEventListener('unload', alertUser);
  //     gameSessionStore.onLeavingSesion();
  //   };
  // }, []);

  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  // };

  return (
    <>
      <Head>
        <title>Planning poker online | </title>
      </Head>

      <div className="bg-[#f9f9f9]">
        <Header />

        <Deck />
      </div>

      <PricingModal />
      <LoginModal />
      <SignUpModal />
    </>
  );
}
