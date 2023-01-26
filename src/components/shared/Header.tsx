import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { AppBar, Container, Box, Button, IconButton } from '@mui/material';

import { auth } from '@/firebase';
import { UserProfile } from '@/components/user/UserProfile';
import { PricingModal } from '@/components/payment/PricingModal';
import { SignUpModal } from '@/components/auth/modals/SignUpModal';
import { LoginModal } from '@/components/auth/modals/LoginModal';

export default function Header({ Logo }: { Logo: React.FC }) {
  const [openPricingModal, setOpenPricingModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const [user, loading] = useAuthState(auth);

  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          height: { xs: '5rem', md: '6.25rem' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Box sx={{ p: { md: '0 20px 0 40px' } }}>
          <Link href="/" title="Planning Poker Online" className="max-w-[219px]:ml-6">
            <Logo />
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
              <Button variant="text" onClick={() => setOpenPricingModal(true)}>
                Pricing
              </Button>
            </Box>

            {loading ? null : user ? (
              <UserProfile />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Button variant="text" onClick={() => setOpenSignUpModal(true)}>
                  Sign Up
                </Button>
                <Button variant="text" onClick={() => setOpenLoginModal(true)}>
                  Login
                </Button>
              </Box>
            )}

            <Link className="ml-6" href="/new-game">
              <Button variant="contained" sx={{ height: '3rem', borderRadius: 2, fontWeight: 700 }}>
                Start new game
              </Button>
            </Link>
          </Box>
        </div>
      </AppBar>

      <PricingModal open={openPricingModal} hideModal={() => setOpenPricingModal(false)} />

      <SignUpModal
        open={openSignUpModal}
        hideModal={() => setOpenSignUpModal(false)}
        openLoginModal={() => setOpenLoginModal(true)}
      />

      <LoginModal
        open={openLoginModal}
        hideModal={() => setOpenLoginModal(false)}
        openSignUpmodal={() => setOpenSignUpModal(true)}
      />
    </>
  );
}
