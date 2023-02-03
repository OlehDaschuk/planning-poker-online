import { useContext } from 'react';

import { RootStoreContext, RootState } from '@/store';
import { DecksStore } from '@/store/Decks';
import { GameSessionStore } from '@/store/GameSession';
import { ModalsHandlerStore } from '@/store/ModalsHandlerStore';

export const useStore = <T extends GameSessionStore | DecksStore | ModalsHandlerStore>(
  query: (store: RootState) => T
) => {
  const store = useContext(RootStoreContext);
  return query(store);
};
