import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/hooks/useStore';
import { Button } from '@mui/material';

interface IProps {}

function renderGameStatus() {}

export const Table: React.FC<IProps> = observer(({}) => {
  const gameSessionStore = useStore<'gameSessionStore'>((s) => s.gameSessionStore);

  return (
    <section className="w-screen h-screen flex items-center">
      <div className="mx-auto w-1/3 inline-flex flex-col gap-2">
        <div className="">
          {false ? (
            <></>
          ) : (
            <>
              <p>Feeling lonely? 😴</p>
              <button>Invite players</button>
            </>
          )}
        </div>

        <div className="bg-[#d7e9ff] rounded-[28px] w-[340px] h-[150px] flex justify-center items-center">
          {gameSessionStore.currentVoting?.isFinished ? (
            <Button variant="contained">New voting</Button>
          ) : Object.values(gameSessionStore?.currentVoting?.userVotes ?? {}).some(
              (v) => v !== null
            ) ? (
            <Button variant="contained" onClick={() => gameSessionStore.revealCards()}>
              Reveal cards
            </Button>
          ) : (
            <span>Pick your cards!</span>
          )}
        </div>

        <div className=""></div>
      </div>
    </section>
  );
});
