import { makeAutoObservable } from 'mobx';
import { collection, addDoc } from 'firebase/firestore';

import { firestore } from '@/firebase';

import type { IDeck } from '@/interfaces/game/deck';
import type { ISession } from '@/interfaces/game/session';

class GameSessionStore {
  currentSession: ISession | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async onSessionCreation(sessionName: string, deck: IDeck) {
    try {
      const sesionRef = await addDoc(collection(firestore, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', sesionRef.converter);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  onSessionConnection(sessionId: string, name: string, initDeck: IDeck) {}

  onLeavingSesion() {
    this.currentSession = null;
  }
}

export const gameSessionStore = new GameSessionStore();
export type GameSessionState = GameSessionStore;
