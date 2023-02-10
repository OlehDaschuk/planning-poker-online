import { DocumentReference } from 'firebase/firestore';
import { IDeck } from '@/interfaces/game/deck';

type UID = string;

export interface ISession {
  id: UID;
  name: string;
  gameFacilitator: string;
  currentVotingRef: DocumentReference;

  canManageIssues: UID[];
  canRevealCards: UID[];
}

export interface IVoting {
  id: UID;
  deck: IDeck;
  usersInSession: UID[];
  isFinished: boolean;
  userVotes: { [uid: UID]: number | null };
  issueRef?: DocumentReference;
}

export interface IIssue {
  id: UID;
  votingRef: DocumentReference;
  text: string;
}
