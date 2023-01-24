import Link from 'next/link';
import Head from 'next/head';
import React, { Fragment, useState } from 'react';
import { Listbox, Dialog, Transition } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';

interface IDeck {
  name: string;
  values: string[];
}

const deckVariants: IDeck[] = [
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

export default function NewGame() {
  const [selected, setSelected] = useState<IDeck>(deckVariants[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Planning poker online | Create game</title>
      </Head>

      <header className='h-20 min-[920px]"h-[100px] fixed top-0 left-0 right-0 flex'>
        <div className="flex items-center">
          <Link href="/">
            <img className="w-10" src="/logo.svg" alt="logo icon" />
          </Link>
          <h1 className="text-[22.5px] font-bold">Create game</h1>
        </div>
        <div></div>
      </header>

      <section className="h-screen grid place-content-center">
        <div className="w-96 mx-4">
          <p className="mb-8">Choose a name and a voting system for your game.</p>

          <form>
            <input type="text" placeholder="Game's name" className="w-full h-12" />

            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{`${selected.name} ( ${selected.values.join(
                    ', '
                  )} )`}</span>
                </Listbox.Button>

                <Listbox.Options className="absolute top-9 z-10 bg-white border">
                  {deckVariants.map((deck) => (
                    <Listbox.Option
                      key={deck.name}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={deck}>
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}>
                            {`${deck.name} ( ${deck.values.join(', ')} )`}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}

                  <Listbox.Option
                    value={selected}
                    onClick={() => setIsModalOpen(true)}
                    className="relative cursor-default select-none py-2 pl-10 pr-4 text-[#3993ff]">
                    Create custom deck...
                  </Listbox.Option>
                </Listbox.Options>
              </div>
            </Listbox>

            <Button variant="contained" color="primary" fullWidth type="submit">
              Create game
            </Button>
          </form>
        </div>
      </section>

      <CreateCustomDeckForm isOpen={isModalOpen} hideModal={() => setIsModalOpen(false)} />
    </>
  );
}

interface ICreateCustomDeckFormProps {
  isOpen: boolean;
  openModal?: () => void;
  hideModal: () => void;
}

interface Inputs {
  deckName: string;
  deckValues: string;
}

const CreateCustomDeckForm: React.FC<ICreateCustomDeckFormProps> = ({ isOpen, hideModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    hideModal();
    deckVariants.push({
      name: data.deckName,
      values: data.deckValues.split(',').map((s) => s.trim()),
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={hideModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h4" className="text-lg font-medium leading-6 text-gray-900">
                    Create custom deck
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className="w-full"
                      defaultValue="My custom deck"
                      type="text"
                      {...register('deckName', {
                        required: true,
                        validate: (value) =>
                          deckVariants.findIndex((deck) => deck.name === value) === -1 || 'Error', // TODO: think of error message
                      })}
                    />
                    <p>{errors.deckName?.message}</p>
                    <input
                      className="w-full"
                      defaultValue="1,2,3,5,8,13"
                      type="text"
                      {...register('deckValues', { required: true })}
                    />

                    <div className="flex gap-4">
                      <button className="w-full bg-slate-600 rounded-lg" onClick={hideModal}>
                        Cancel
                      </button>
                      <button className="w-full bg-slate-600 rounded-lg" type="submit">
                        Save deck
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
