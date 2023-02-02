import { makeAutoObservable } from 'mobx';

import type { IDeck } from '@/interfaces/game/deck';

export class DecksStore {
  deckVariants: IDeck[] = [
    {
      name: 'Fibonacci',
      values: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'],
    },
    {
      name: 'Modified Fibonacci',
      values: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
    },
    {
      name: 'T-shirts',
      values: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', '?', '☕'],
    },
    {
      name: 'Powers of 2',
      values: ['0', '1', '2', '4', '8', '16', '32', '64', '?', '☕'],
    },
  ];

  currentDeck: IDeck = this.deckVariants[0];

  deckObjectToString(deck: IDeck) {
    return `${deck.name} ( ${deck.values.join(', ')} )`;
  }

  constructor() {
    makeAutoObservable(this, { deckObjectToString: false }, { deep: false });
  }

  setCurrnetDeck(selected: IDeck) {
    this.currentDeck = selected;
  }

  addDeck(newDeck: IDeck) {
    this.deckVariants.push(newDeck);
  }
}

export const decksStore = new DecksStore();
