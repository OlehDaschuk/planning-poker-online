import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Alert, Box } from '@mui/material';

import { IDeck } from '@/interfaces/game/deck';
import { Cards } from '@/components/game/Cards';
import { useStore } from '@/hooks/useStore';

interface Inputs {
  deckName: string;
  deckValues: string[];
}

interface IProps {
  hideModal: () => void;
}

export const CreateCustomDeckForm: React.FC<IProps> = ({ hideModal }) => {
  const decksStore = useStore((s) => s.decksStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    hideModal();
    decksStore.addDeck({
      name: data.deckName,
      values: data.deckValues,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          margin="dense"
          defaultValue="My custom deck"
          label="Deck name"
          error={!!errors.deckName?.message}
          helperText={errors.deckName?.message}
          {...register('deckName', {
            required: true,
            validate: (value) =>
              decksStore.deckVariants.findIndex((deck) => deck.name === value) === -1 || 'Error', // TODO: think of error message
          })}
        />

        <TextField
          fullWidth
          margin="dense"
          defaultValue="1,2,3,5,8,13"
          label="Deck values"
          error={!!errors.deckValues?.message}
          helperText={errors.deckValues?.message}
          {...register('deckValues', {
            required: true,
            setValueAs: (v: string): IDeck['values'] => {
              return v
                .trim()
                .split(',')
                .filter(Boolean)
                .map((s) => s.trim());
            },
          })}
        />
        <Alert severity="info" variant="outlined">
          Enter up to 3 characters per value, separated by commas.
        </Alert>

        <div className="my-6">
          <p className="font-bold">Preview</p>
          <p>This is a preview of how your deck will look like.</p>
        </div>

        <Cards />

        <div className="flex gap-4 mt-8 h-12">
          <Button fullWidth variant="contained" className="bg-white" onClick={hideModal}>
            Cancel
          </Button>
          <Button fullWidth variant="contained" type="submit">
            Save deck
          </Button>
        </div>
      </form>
    </>
  );
};
