import { useState, useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QuerySnapshot, collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { firestore, auth } from '@/firebase';
import useBeforeUnload from '@/hooks/useBeforeUnload';

import { Header, Deck, CardSection } from '@/components/game/session-page';
import { StyledModal } from '@/components/shared/StyledModal';

// TODO: make clipboard via window.location.href

export const getServerSideProps: GetServerSideProps<{}, { sessionId: string }> = async (ctx) => {
  const sessionSnap = await getDoc(doc(firestore, 'session', ctx.query.sessionId as string));

  return {
    notFound: !sessionSnap.exists(),
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
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [snapshot, loading, error] = useDocument<SessionData>(
    doc(firestore, 'session', router.query.sessionId as string)
  );
  console.log(snapshot?.data());

  useEffect(() => {
    if (!auth.currentUser) {
      setOpen(true);
    }
  }, []);

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
    <>
      <div className="bg-[#f9f9f9]">
        <Header />

        <Deck />
      </div>

      <StyledModal
        title="Choose your display name"
        open={open}
        hideModal={() => setOpen(false)}></StyledModal>
    </>
  );
}
