import React from 'react';
import { observer } from 'mobx-react-lite';

import { Cards } from '../Cards';
import { useStore } from '@/hooks/useStore';

export const CardSection: React.FC = observer(() => {
  const gameSessionStore = useStore<'gameSessionStore'>((s) => s.gameSessionStore);

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <p className="text-center mb-2">Choose your card 👇</p>
      <Cards
        deckValues={gameSessionStore.currentVoting?.deck?.values as string[]}
        setSelectedCard={(id) => gameSessionStore.changeUserPickedValue(id)}
        selectedCard={gameSessionStore.userPickedCard}
      />
    </div>
  );
});
