import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';

import { auth } from '@/firebase';
import { UserProfile } from '@/components/user/UserProfile';
import { PricingModal } from '@/components/payment/PricingModal';
import { SignUpModal } from '@/components/auth/modals/SignUpModal';
import { LoginModal } from '@/components/auth/modals/LoginModal';
import Loader from './Loader/Loader';

export default function Header({ Logo }: { Logo: React.FC }) {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [user, loading] = useAuthState(auth);

  return (
    <>
      <header className="bg-white fixed top-0 left-0 right-0 flex items-center justify-between h-20 md:h-[100px]">
        <div className="ml-6 min-[920p]:ml-16 min-[920p]:mr-8">
          <Link href="/" title="Planning Poker Online">
            <Logo />
          </Link>
        </div>

        <div>
          <div className="min-[920px]:hidden flex">
            {/* TODO: make modal */}
            <button>
              <Bars3Icon className="" />
            </button>
          </div>

          <div className="max-[919px]:hidden  ml-16 mr-8 text-[#3993ff] flex">
            <div className="pr-6 border-r-2 mr-6 inline-flex items-center ">
              <button onClick={() => setIsPricingModalOpen(true)}>Pricing</button>
            </div>

            {loading ? (
              <Loader />
            ) : user ? (
              <UserProfile />
            ) : (
              <div className="flex items-center justify-between gap-8">
                <button onClick={() => setIsSignUpModalOpen(true)}>Sign Up</button>
                <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
              </div>
            )}

            <Link className="ml-6" href="/new-game">
              <Button
                variant="contained"
                sx={{ bgcolor: '#3993ff', ':hover': { bgcolor: '#74b3ff' } }}>
                Start new game
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <PricingModal open={isPricingModalOpen} hideModal={() => setIsPricingModalOpen(false)} />

      <SignUpModal
        open={isSignUpModalOpen}
        hideModal={() => setIsSignUpModalOpen(false)}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />

      <LoginModal open={isLoginModalOpen} hideModal={() => setIsLoginModalOpen(false)} />
    </>
  );
}
