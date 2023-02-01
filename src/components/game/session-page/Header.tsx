import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { AppBar, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import { Bars3Icon } from '@heroicons/react/24/solid';

export const Header: React.FC = () => {
  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          boxShadow: 'none',
          height: { xs: '5rem', md: '6.25rem' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
        }}>
        <div className="flex justify-center items-center">
          <IconButton sx={{ px: '1rem', height: '56px' }}>
            <Bars3Icon width="24" />
          </IconButton>
        </div>

        <div className="grow flex justify-center items-center"></div>

        <Box sx={{ pl: '20px', pr: { xs: '20px', md: '40px' } }}>
          <Button variant="outlined" className="w-14 h-14 bg-white border-2">
            <Image src="/session-page/list-icon.svg" alt="" width={23} height={24} />
          </Button>
        </Box>
      </AppBar>
    </>
  );
};
