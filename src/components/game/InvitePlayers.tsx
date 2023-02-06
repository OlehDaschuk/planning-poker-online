import { TextField } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

import { CopyToClipboardButton } from '../shared/CopyToClipboardButton';

export const InvitePlayers: React.FC = () => {
  const router = useRouter();
  const sessionLink = `http://localhost:3000${router.asPath}`;
  return (
    <>
      <TextField fullWidth disabled defaultValue={sessionLink} />

      <CopyToClipboardButton copyText={sessionLink}>Copy invitation link</CopyToClipboardButton>
    </>
  );
};
