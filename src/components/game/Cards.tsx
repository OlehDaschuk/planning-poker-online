import { IDeck } from '@/interfaces/game/deck';
import React, { useState } from 'react';

export const Cards: React.FC<{ deckValues: IDeck['values'] }> = ({ deckValues }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <>
      <div className="flex justify-center p-4 w-full overflow-x-scroll text-[#3993ff]">
        {deckValues?.map((option, idx) => {
          return (
            <div
              key={idx}
              className={`min-w-[48px] max-w-[48px] h-20 mx-2 rounded-lg border-[#3993ff] border-2 cursor-pointer flex justify-center items-center ${
                selectedCard === idx ? 'text-white bg-[#3993ff] mt-[-8px]' : 'hover:mt-[-2.5px]'
              }`}
              onClick={() => setSelectedCard(idx)}>
              <span>{option}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
