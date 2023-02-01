import React from 'react';
import { observer } from 'mobx-react-lite';

import { Cards } from '../Cards';

export const Deck: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 ">
      <Cards
        deckValues={[
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
          '123',
        ]}
      />
    </div>
  );
};
