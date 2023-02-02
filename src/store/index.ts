import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { gameSessionStore } from './GameSession';
import { decksStore } from './Decks';

export const rootStore = {
  gameSessionStore,
  decksStore,
};

export type RootState = typeof rootStore;

export const RootStoreContext = createContext<RootState>(rootStore);
export const RootStoreProvider = RootStoreContext.Provider;
