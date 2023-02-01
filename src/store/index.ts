import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { gameSessionStore } from './GameSession';
import { decksStore } from './Decks';

class RootStore {
  gameSessionStore = gameSessionStore;
  decksStore = decksStore;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }
}

export const rootStore = new RootStore();
export type RootState = typeof rootStore;

export const RootStoreContext = createContext<RootStore>(rootStore);
export const RootStoreProvider = RootStoreContext.Provider;
