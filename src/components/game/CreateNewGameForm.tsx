import { Listbox } from '@headlessui/react';
import React from 'react';

export const CreateNewGameForm: React.FC = () => {
  return (
    <></>
    // <form>
    //   <input type="text" placeholder="Game's name" className="w-full h-12" />

    //   <Listbox value={selected} onChange={setSelected}>
    //     <div className="relative mt-1">
    //       <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
    //         <span className="block truncate">{`${selected.name} ( ${selected.values.join(
    //           ', '
    //         )} )`}</span>
    //       </Listbox.Button>

    //       <Listbox.Options className="absolute top-9 bg-white border">
    //         {deckVariants.map((deck) => (
    //           <Listbox.Option
    //             key={deck.name}
    //             className={({ active }) =>
    //               `relative cursor-default select-none py-2 pl-10 pr-4 ${
    //                 active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
    //               }`
    //             }
    //             value={deck}>
    //             {({ selected }) => (
    //               <>
    //                 <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
    //                   {`${deck.name} ( ${deck.values.join(', ')} )`}
    //                 </span>
    //               </>
    //             )}
    //           </Listbox.Option>
    //         ))}

    //         <Listbox.Option
    //           value={selected}
    //           onClick={() => setIsModalOpen(true)}
    //           className="relative cursor-default select-none py-2 pl-10 pr-4 text-[#3993ff]">
    //           Create custom deck...
    //         </Listbox.Option>
    //       </Listbox.Options>
    //     </div>
    //   </Listbox>

    //   <Button variant="contained" color="primary" fullWidth type="submit">
    //     Create game
    //   </Button>
    // </form>
  );
};
