import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { IDeck } from '@/interfaces/game/deck';
import { useStore } from '@/hooks/useStore';

import { CreateCustomDeckForm } from '@/components/game/forms/CreateCustomDeckForm';
import { StyledModal } from '@/components/shared/StyledModal';

interface Inputs {
  gameName: string;
  votingSystem: IDeck;
}

export const CreateNewGameForm: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const decksStore = useStore<'decksStore'>((s) => s.decksStore);
  const gameSessionStore = useStore<'gameSessionStore'>((s) => s.gameSessionStore);

  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.gameName.trim()) data.gameName = 'Planning poker online';
    console.log(data);

    const sessionId = await gameSessionStore.onSessionCreation(
      data.gameName.trim(),
      decksStore.currentDeck
    );

    router.push('/sessionId', `/${sessionId}`);
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
            renderValue={decksStore.deckObjectToString}
            {...register('votingSystem', {
              onChange: (e) => decksStore.setCurrnetDeck(e.target.value as IDeck),
            })}>
            {decksStore.deckVariants.map((deck, idx) => {
              return (
                <MenuItem key={idx} value={deck as any}>
                  {decksStore.deckObjectToString(deck)}
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
