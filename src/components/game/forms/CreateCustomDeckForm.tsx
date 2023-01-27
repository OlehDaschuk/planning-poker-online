import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Alert, Box } from '@mui/material';
import { Card, CardActionArea } from '@mui/material';

import { IDeck } from '@/interfaces/game/deck';

interface Inputs {
  deckName: string;
  deckValues: string[];
}

interface IProps {
  deckVariants: IDeck[];
  hideModal: () => void;
}

export const CreateCustomDeckForm: React.FC<IProps> = ({ deckVariants, hideModal }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    hideModal();
    deckVariants.push({
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
              deckVariants.findIndex((deck) => deck.name === value) === -1 || 'Error', // TODO: think of error message
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

        <div className="flex justify-center p-4 w-fu overflow-x-scroll text-[#3993ff]">
          {watch('deckValues')?.map((option, idx) => {
            return (
              <div
                key={idx}
                className={`min-w-[48px] max-w-[48px] h-20 mx-2 rounded-lg border-[#3993ff] border-2 cursor-pointer flex justify-center items-center ${
                  selectedCard === idx ? 'text-white bg-[#3993ff] mt-[-8px]' : 'hover:mt-[-2.5px]'
                }`}
                onClick={() => setSelectedCard(idx)}>
                <span>{option}</span>
              </div>
              // <Box
              //   key={idx}
              //   sx={{
              //     minWidth: '48px',
              //     maxWidth: '48px',
              //     height: '80px',
              //     mx: '8px',
              //     color: '#fff',
              //     border: '2px solid #3993ff',
              //     borderRadius: '8px',
              //     display: 'flex',
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //     cursor: 'pointer',
              //     ':hover': { mt: '-2.5px' },
              //   }}>
              //   <span>{option}</span>
              // </Box>
            );
          })}
        </div>

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
