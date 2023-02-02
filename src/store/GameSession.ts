import { makeAutoObservable, flowResult } from 'mobx';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import type { DocumentReference, DocumentSnapshot } from 'firebase/firestore';

import { firestore } from '@/firebase';

import type { IDeck } from '@/interfaces/game/deck';
import type { ISession } from '@/interfaces/game/session';

export class GameSessionStore {
  currentSession: ISession | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // TODO: make it with flow
  *onSessionCreation<D extends ISession, T extends DocumentReference<D> | DocumentSnapshot<D>>(
    name: string
  ): Generator<Promise<T>> {
    try {
      const sesionRef = yield addDoc<D>(collection(firestore, 'session'), { name });

      const sesion = yield getDoc<D>(doc(firestore, 'users', sesionRef.id));
      console.log('Document written with ID: ', sesion.data());
      this.currentSession = { id: sesion.id, ...sesion.data() };
      console.log(this.currentSession);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  onSessionConnection(sessionId: string) {}

  onLeavingSesion() {
    this.currentSession = null;
  }
}

export const gameSessionStore = new GameSessionStore();
