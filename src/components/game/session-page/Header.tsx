import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import { UserPlusIcon } from '@heroicons/react/24/solid';

import { UserProfileBtn } from '@/components/user/UserProfileBtn';
import { GameProfileBtn } from '../GameProfileBtn';
import { StyledModal } from '@/components/shared/StyledModal';
import { InvitePlayers } from '../InvitePlayers';

export const Header: React.FC = () => {
  const [openInvitePlayers, setOpenInvitePlayers] = useState(false);

  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          boxShadow: 'none',
          height: { xs: '5rem', md: '6.25rem' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <div className="flex justify-center items-center">
          <Link className="mx-8" href="/">
            <img width="40" src="/logo.svg" alt="" />
          </Link>

          <GameProfileBtn />
        </div>

        <Box sx={{ pl: '20px', pr: { xs: '20px', md: '40px' } }}>
          {/* <UserProfileBtn /> */}

          <Button
            onClick={() => setOpenInvitePlayers(true)}
            startIcon={<UserPlusIcon width="24" />}
            variant="outlined">
            Invite players
          </Button>

          <Button variant="outlined" className="w-14 h-14 bg-white border-2">
            <Image src="/session-page/list-icon.svg" alt="" width={23} height={24} />
          </Button>
        </Box>
      </AppBar>

      <StyledModal
        title="Invite players"
        className="w-[630px]"
        open={openInvitePlayers}
        hideModal={() => setOpenInvitePlayers(false)}>
        <InvitePlayers />
      </StyledModal>
    </>
  );
};
