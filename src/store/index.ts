import { createContext } from 'react';

import { gameSessionStore } from './GameSession';
import { modalsHanderStore } from './ModalsHandlerStore';
import { decksStore } from './Decks';

export const rootStore = {
  gameSessionStore,
  decksStore,
  modalsHanderStore,
};

export type RootState = typeof rootStore;

export const RootStoreContext = createContext<RootState>(rootStore);
export const RootStoreProvider = RootStoreContext.Provider;
