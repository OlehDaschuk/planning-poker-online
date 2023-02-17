import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Switch, FormGroup, FormControlLabel } from '@mui/material';

import { StyledModal, IModalProps } from '@/components/shared/StyledModal';
import { auth } from '@/firebase';

interface Inputs {
  userName: string;
  isSpectator: boolean;
}

export const LoginAnonimuoslyInSession: React.FC<IModalProps> = ({ open, hideModal }) => {
  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <StyledModal title="Choose your display name" open={open} hideModal={hideModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Your display name" fullWidth />

        <FormGroup>
          <FormControlLabel control={<Switch />} label="Join as spectator" />
        </FormGroup>

        <Button type="submit">Continue to game</Button>
      </form>
    </StyledModal>
  );
};
