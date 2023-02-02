import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Cards } from '../Cards';
import { useStore } from '@/hooks/useStore';

export const Deck: React.FC = () => {
  const decksStore = useStore((s) => s.decksStore);
  return (
    <div className="fixed bottom-0 left-0 right-0 ">
      <Cards />
    </div>
  );
};
