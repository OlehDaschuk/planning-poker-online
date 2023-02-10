import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Button, Box } from '@mui/material';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useAuthState } from 'react-firebase-hooks/auth';

import { UserProfileBtn } from '@/components/user/UserProfileBtn';
import { GameProfileBtn } from '../GameProfileBtn';
import { StyledModal } from '@/components/shared/StyledModal';
import { InvitePlayers } from '../InvitePlayers';
import { auth } from '@/firebase';
import { useStore } from '@/hooks/useStore';

export const Header: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const modalsHandlerStore = useStore<'modalsHandlerStore'>((s) => s.modalsHandlerStore);

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
          zIndex: 5,
        }}>
        <div className="flex justify-center items-center">
          <Link className="mx-8" href="/">
            <img width="40" src="/logo.svg" alt="" />
          </Link>

          <GameProfileBtn />
        </div>

        <Box sx={{ pl: '20px', pr: { xs: '20px', md: '40px' } }}>
          {loading ? null : user ? (
            <UserProfileBtn />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Button variant="text" onClick={() => (modalsHandlerStore.openSignUpModal = true)}>
                Sign Up
              </Button>
              <Button variant="text" onClick={() => (modalsHandlerStore.openLoginModal = true)}>
                Login
              </Button>
            </Box>
          )}

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
