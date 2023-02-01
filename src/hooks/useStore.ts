import { DecksState } from './../store/Decks';
import { useContext } from 'react';
import { RootStoreContext, RootState } from '@/store';
import { GameSessionState } from '@/store/GameSession';

export const useStore = <T extends GameSessionState | DecksState>(
  query: (store: RootState) => T
) => {
  const store = useContext(RootStoreContext);
  return query(store);
};
