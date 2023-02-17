import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { SxProps } from '@mui/material';

interface IProps {
  sx?: SxProps;
  closeModal?: () => void;
  copyText: string;
  children: string;
}

export const CopyToClipboardButton: React.FC<IProps> = ({ sx, copyText, children, closeModal }) => {
  const [open, setOpen] = useState(false);
  // ?: should i wrap in useCallback
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(copyText);
    closeModal && closeModal();
  };
  return (
    <>
      <Button fullWidth variant="contained" sx={{ ...sx }} onClick={handleClick}>
        {children}
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        message="Copied to clipboard"></Snackbar>
    </>
  );
};
