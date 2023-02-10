import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Bars3Icon } from '@heroicons/react/24/solid';
import { AppBar, Box, Button, IconButton } from '@mui/material';

import { auth } from '@/firebase';
import { useStore } from '@/hooks/useStore';

import { UserProfileBtn } from '@/components/user/UserProfileBtn';

export const Header = () => {
  const [user, loading] = useAuthState(auth);
  const modalsHandlerStore = useStore<'modalsHandlerStore'>((s) => s.modalsHandlerStore);

  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          zIndex: 5,
          height: { xs: '5rem', md: '6.25rem' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Box sx={{ p: { md: '0 20px 0 40px' } }}>
          <Link href="/" title="Planning Poker Online" className="max-w-[219px]:ml-6">
            <Image width="189" height="40" src="/full-logo.svg" alt="logo" />
          </Link>
        </Box>

        <div>
          <Box sx={{ display: { md: 'none' } }}>
            {/* TODO: ... */}
            <IconButton onClick={() => {}}>
              <Bars3Icon width="32" />
            </IconButton>
          </Box>

          <Box sx={{ fontWeight: 700, p: '0 40px 0 20px', display: { xs: 'none', md: 'flex' } }}>
            <Box
              sx={{
                pr: '24px',
                mr: '24px',
                borderRight: '2px solid #e8e9ea',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Button variant="text" onClick={() => (modalsHandlerStore.openPricingModal = true)}>
                Pricing
              </Button>
            </Box>

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

            {Boolean(user) && (
              <Link className="ml-6" href="/new-game">
                <Button
                  variant="contained"
                  sx={{ height: '3rem', borderRadius: 2, fontWeight: 700 }}>
                  Start new game
                </Button>
              </Link>
            )}
          </Box>
        </div>
      </AppBar>
    </>
  );
};
