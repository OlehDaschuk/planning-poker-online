import { IDeck } from '@/interfaces/game/deck';

type UID = string;

export interface ISession {
  id: string;
  name: string;
  deck: IDeck;
  connectedUsers: UID[];
  [key: string]: any;
}
