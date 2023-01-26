import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { IDeck } from '@/interfaces/game/deck';
import { CreateCustomDeckForm } from '@/components/game/forms/CreateCustomDeckForm';
import { StyledModal } from '@/components/shared/StyledModal';

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

export const deckObjectToString = (deck: IDeck) => `${deck.name} ( ${deck.values.join(', ')} )`;

interface Inputs {
  gameName: string;
  votingSystem: IDeck;
}

export const CreateNewGameForm: React.FC = () => {
  const [selected, setSelected] = useState<IDeck>(deckVariants[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.gameName) data.gameName = 'Planning poker online';
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Game's name" margin="normal" {...register('gameName')} />

        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Voting system</InputLabel>

          <Select
            margin="dense"
            // ?: should i leave this
            // labelId="deck-select-label"
            // id="deck-select"
            value={selected}
            label="Voting system"
            renderValue={deckObjectToString}
            {...register('votingSystem', {
              onChange: (e) => setSelected(e.target.value as IDeck),
            })}>
            {deckVariants.map((deck, idx) => {
              return (
                // TODO: fix type error
                // UDP: seems dumb
                <MenuItem key={idx} value={deck as any}>
                  {deckObjectToString(deck)}
                </MenuItem>
              );
            })}

            <MenuItem
              // ?: ...
              color=""
              value={selected as any}
              onClick={() => setIsModalOpen(true)}>
              Create custom deck...
            </MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" fullWidth type="submit">
          Create game
        </Button>
      </form>

      <StyledModal
        open={isModalOpen}
        hideModal={() => setIsModalOpen(false)}
        className="w-[848px]"
        title="Create custom deck">
        <CreateCustomDeckForm hideModal={() => setIsModalOpen(false)} deckVariants={deckVariants} />
      </StyledModal>
    </>
  );
};
