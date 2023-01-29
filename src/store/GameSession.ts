import { makeAutoObservable } from 'mobx';

class GameSession {
  id?: string;

  constructor() {
    makeAutoObservable(this);
  }

  asdf() {
    this.id = 'asfas';
  }
}

export const gameSession = new GameSession();
