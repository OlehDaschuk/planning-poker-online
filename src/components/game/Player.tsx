import React from 'react';
import { useStore } from '@/hooks/useStore';
import { auth } from '@/firebase';

export const Player: React.FC = () => {
  const gameSessionStore = useStore<'gameSessionStore'>((s) => s.gameSessionStore);
  const s =
    'linear-gradient(45deg,#3993ff_12%,transparent_0,transparent_88%,#3993ff_0),linear-gradient(135deg,transparent_37%,#1a7bf2_0,#1a7bf2_63%,transparent_0),linear-gradient(45deg,transparent 37%,#3993ff_0,#3993ff_63%,transparent_0),#74b3ff';
  return (
    <div className="flex flex-col justify-between">
      <div className={`w-[40px] h-[70px] rounded-lg`}></div>

      <div className="">{auth.currentUser?.displayName}</div>
    </div>
  );
};
