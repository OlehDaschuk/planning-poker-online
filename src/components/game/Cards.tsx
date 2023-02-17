import React from 'react';

import { IDeck } from '@/interfaces/game/deck';

interface IProps {
  deckValues: IDeck['values'];
  selectedCard: number | null;
  setSelectedCard?: (v: IProps['selectedCard']) => void;
}

export const Cards: React.FC<IProps> = ({ setSelectedCard, selectedCard, deckValues }) => (
  <>
    <div className="flex justify-center p-4 w-full overflow-x-scroll text-[#3993ff]">
      {deckValues?.map((option, idx) => {
        return (
          <div
            key={idx}
            className={`min-w-[48px] max-w-[48px] h-20 mx-2 rounded-lg border-[#3993ff] border-2 cursor-pointer flex justify-center items-center select-none ${
              selectedCard === idx ? 'text-white bg-[#3993ff] mt-[-8px]' : 'hover:mt-[-2.5px]'
            }`}
            onClick={() => setSelectedCard && setSelectedCard(idx === selectedCard ? null : idx)}>
            <span>{option}</span>
          </div>
        );
      })}
    </div>
  </>
);
