import { makeAutoObservable, flowResult } from 'mobx';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import type { DocumentReference, DocumentSnapshot } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { DecksStore } from './Decks';

import type { IDeck } from '@/interfaces/game/deck';
import type { ISession } from '@/interfaces/game/session';

export class GameSessionStore {
  currentSession: ISession | null = null;

  decksStoreInCurrentSession = new DecksStore();

  constructor() {
    makeAutoObservable(this);
  }

  *onSessionCreation<D = Partial<ISession>, T = DocumentReference<D>>(
    name: string,
    deck: IDeck
  ): Generator<Promise<T>, string> {
    try {
      const sesionRef = yield addDoc<D>(collection(firestore, 'session'), { name, deck });

      return sesionRef!.id;
    } catch (e) {
      console.error('Error adding/getting document: ', e);
    }
  }

  *onSessionConnection(sessionId: string) {
    try {
      const sesion = yield getDoc(doc(firestore, 'users', sessionId));
      this.currentSession = { id: sesion.id, ...sesion.data() };
    } catch (e) {
      console.error('Error getting document: ', e);
    }
  }

  onLeavingSesion() {
    this.currentSession = null;
  }
}

export const gameSessionStore = new GameSessionStore();
