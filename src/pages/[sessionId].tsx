import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QuerySnapshot, collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { BottomNavigation, unstable_createMuiStrictModeTheme } from '@mui/material';

import { firestore } from '@/firebase';

import { Header, Deck, CardSection } from '@/components/game/session-page';
import { Cards } from '@/components/game/Cards';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { gameSessionStore } from '@/store';

// TODO: make clipboard via window.location.href

export const getServerSideProps: GetServerSideProps<{}, { sessionId: string }> = async (ctx) => {
  const querySnapshot = await getDocs(collection(firestore, 'session'));

  return {
    notFound: querySnapshot.docs.findIndex((doc) => doc.id === ctx.query.sessionId) === -1,
    props: {},
  };
};

type SessionData = {};

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

  const [snapshot, loading, error, reload] = useDocumentOnce<SessionData>(
    doc(firestore, 'session', router.query.sessionId as string)
  );
  console.log(snapshot?.data());

  // ?: how to implement user disconection
  // useEffect(() => {
  //   window.addEventListener('unload', alertUser);
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
    <div className="bg-[#f9f9f9]">
      <Header />

      <Deck />
    </div>
  );
}
