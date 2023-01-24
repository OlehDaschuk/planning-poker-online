import { auth } from '@/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import { StyledModal, IModalProps } from '@/components/shared/StyledModal';

export const LoginModal: React.FC<IModalProps> = ({ open, hideModal }) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <StyledModal open={open} hideModal={hideModal} title="Login" className="w-[440px]">
      <button
        onClick={() => {
          hideModal();
          signInWithGoogle();
        }}
        className="w-full bg-[#4285f4] border-[#4285f4] border-2 rounded-lg flex items-stretch mb-6">
        <div className="bg-white">
          <img src="/google-login-icon.svg" alt="google-icon" />
        </div>
        <div className="">Login with Google</div>
      </button>

      <div className="flex justify-between items-center">
        <div className="bg-[#a8aeb2] w-full h-px"></div>
        <div className="w-fit px-5">or</div>
        <div className="bg-[#a8aeb2] w-full h-px"></div>
      </div>
      {/* TODO: make auth via email */}
      <input type="email" placeholder="Email" className="w-full" />
      <button className="mb-6">Login</button>
    </StyledModal>
  );
};
