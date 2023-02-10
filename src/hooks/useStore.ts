import { useContext } from 'react';

import { RootStoreContext, RootState } from '@/store';

export const useStore = <TStore extends keyof RootState>(
  query: (store: RootState) => RootState[TStore]
) => {
  const store = useContext(RootStoreContext);
  return query(store);
};
