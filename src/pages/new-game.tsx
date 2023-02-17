import Link from 'next/link';
import Head from 'next/head';
import { Container } from '@mui/material';

import { CreateNewGameForm } from '@/components/game/forms/CreateNewGameForm';

export default function NewGame() {
  return (
    <>
      <Head>
        <title>Planning poker online | Create game</title>
      </Head>

      <header className='h-20 min-[920px]"h-[100px] fixed top-0 left-0 right-0 flex'>
        <div className="flex items-center">
          <Link href="/">
            <img className="w-10" src="/logo.svg" alt="logo icon" />
          </Link>
          <h1 className="text-[22.5px] font-bold">Create game</h1>
        </div>
        <div></div>
      </header>

      <Container component="section" maxWidth="sm" className="h-screen flex items-center">
        <div className="w-full">
          <p className="mb-8 text-center text-lg">
            Choose a name and a voting system for your game.
          </p>

          <CreateNewGameForm />
        </div>
      </Container>
    </>
  );
}
