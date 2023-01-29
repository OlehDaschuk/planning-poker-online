import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { doc } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

import { firestore } from '@/firebase';

import { Header } from '@/components/shared/session-page';

type Data = {};

export const getServerSideProps: GetServerSideProps<Data, { sessionId: string }> = async (ctx) => {
  // console.log(ctx);

  console.log(ctx.query.sessionId);

  // TODO: write logic to notFound via firebase
  if (true) return { notFound: true };

  return { props: {} };
};

export default function GameRoom({}) {
  // const router = useRouter();
  // console.log(router.query.sessionId);
  // console.log(1234);

  // const [value, loading, error] = useDocumentOnce(
  //   doc(firestore, 'session', router.query.sessionId as string)
  // );

  return (
    <>
      <Header />
      fadsfafa
    </>
  );
}
