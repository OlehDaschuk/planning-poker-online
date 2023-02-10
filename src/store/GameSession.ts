import { makeAutoObservable } from 'mobx';

import { addDoc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { arrayUnion, serverTimestamp, onSnapshot } from 'firebase/firestore';

import type { DocumentReference, DocumentSnapshot, DocumentData } from 'firebase/firestore';

import { firestore, auth } from '@/firebase';

import type { IDeck } from '@/interfaces/game/deck';
import type { ISession, IVoting, IIssue } from '@/interfaces/game/session';

export type GameStatus = 'users-choosing' | 'user-picked-card' | 'pending' | 'game-ended';

// TODO: switch from object to map
// ?: is it a good solution
export class GameSessionStore {
  currentSession: Partial<ISession> | null = null;
  currentVoting: Partial<IVoting> | null = null;
  currentIssue: Partial<IIssue> | null = null;

  sessionRef: DocumentReference | null = null;

  userPickedCard: number | null = null;

  gameStatus: GameStatus | null = null;

  // TESTING: is map in mobx good for pofomance
  // can: Map<string, string> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  *changeUserPickedValue(id: number | null): Generator<Promise<void>, void, void> {
    try {
      yield updateDoc(doc(firestore, this.currentSession!.currentVotingRef!.path), {
        [`userVotes.${auth.currentUser!.uid}`]: id,
      });
      this.userPickedCard = id;
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }

  *onSessionCreation(
    name: string,
    deck: IDeck
  ): Generator<Promise<DocumentReference | void>, string | void, DocumentReference> {
    try {
      const sesionRef = yield addDoc(collection(firestore, 'sessions'), {
        name,
        gameFacilitator: auth.currentUser?.uid || null,
        canManageIssues: [],
        canRevealCards: [],
      });
      const votingRef = yield addDoc(collection(firestore, 'sessions', sesionRef.id, 'votings'), {
        deck,
        isFinished: false,
        usersInSession: [],
        userVotes: {},
      });

      yield updateDoc(sesionRef, {
        currentVotingRef: votingRef,
      });

      return sesionRef.id;
    } catch (e) {
      console.error('Error getting document: ', e);
    }
  }

  *onSessionConnection(
    sessionId: string
  ): Generator<
    Promise<DocumentReference<DocumentData> | DocumentSnapshot<DocumentData> | void>,
    string | void,
    DocumentSnapshot<DocumentData>
  > {
    try {
      const sesionSnap = yield getDoc(doc(firestore, 'sessions', sessionId));
      this.currentSession = { id: sesionSnap.id, ...sesionSnap.data() };
      this.sessionRef = sesionSnap.ref;

      const votingSnap = yield getDoc(this.currentSession.currentVotingRef!);
      this.currentVoting = { id: votingSnap.id, ...votingSnap.data() };
      yield updateDoc(this.currentSession.currentVotingRef!, {
        usersInSession: arrayUnion(auth.currentUser!.uid),
        [`userVotes.${auth.currentUser!.uid}`]: null,
      });
      this.currentVoting = { id: votingSnap.id, ...votingSnap.data() };

      onSnapshot(
        this.currentSession.currentVotingRef as DocumentReference<DocumentData>,
        (votingSnap) => {
          this.currentVoting = { id: votingSnap.id, ...votingSnap.data() };
        }
      );
    } catch (e) {
      console.error('Error getting document: ', e);
    }
  }

  onLeavingSesion() {
    this.currentSession = null;
    this.currentVoting = null;
    this.currentIssue = null;

    this.sessionRef = null;

    this.userPickedCard = null;
  }

  *revealCards(): Generator<
    Promise<DocumentReference<DocumentData> | DocumentSnapshot<DocumentData> | void>,
    string | void,
    DocumentSnapshot<DocumentData>
  > {
    try {
      console.log(this.currentSession);
      yield updateDoc(this.currentSession!.currentVotingRef as DocumentReference<DocumentData>, {
        isFinished: true,
      });
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }

  *onNewVoting(): Generator<
    Promise<DocumentReference<DocumentData> | DocumentSnapshot<DocumentData> | void>,
    string | void,
    DocumentSnapshot<DocumentData>
  > {}

  *setDeck(newDeck: IDeck): Generator<Promise<void>, void, void> {
    try {
      yield updateDoc(this.currentSession!.currentVotingRef!, { deck: newDeck });
      this.currentVoting!.deck = newDeck;
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }
}

export const gameSessionStore = new GameSessionStore();
