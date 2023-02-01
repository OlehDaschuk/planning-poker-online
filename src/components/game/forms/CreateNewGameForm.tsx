import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { IDeck } from '@/interfaces/game/deck';
import { useStore } from '@/hooks/useStore';

import { CreateCustomDeckForm } from '@/components/game/forms/CreateCustomDeckForm';
import { StyledModal } from '@/components/shared/StyledModal';

export const deckObjectToString = (deck: IDeck) => `${deck.name} ( ${deck.values.join(', ')} )`;

interface Inputs {
  gameName: string;
  votingSystem: IDeck;
}

export const CreateNewGameForm: React.FC = observer(() => {
  const decksStore = useStore((s) => s.decksStore);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.gameName) data.gameName = 'Planning poker online';
    console.log(data);

    // TODO: ....
    // gameSessionStore.onSessionCreation(data.gameName, data.votingSystem);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Game's name" margin="normal" {...register('gameName')} />

        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Voting system</InputLabel>

          <Select
            margin="dense"
            value={decksStore.currentDeck}
            label="Voting system"
            renderValue={deckObjectToString}
            {...register('votingSystem', {
              onChange: (e) => decksStore.setCurrnetDeck(e.target.value as IDeck),
            })}>
            {decksStore.deckVariants.map((deck, idx) => {
              return (
                <MenuItem key={idx} value={deck as any}>
                  {deckObjectToString(deck)}
                </MenuItem>
              );
            })}

            <MenuItem value={decksStore.currentDeck as any} onClick={() => setIsModalOpen(true)}>
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
        <CreateCustomDeckForm hideModal={() => setIsModalOpen(false)} />
      </StyledModal>
    </>
  );
});
