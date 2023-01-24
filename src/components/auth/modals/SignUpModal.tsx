import Link from 'next/link';
import { useSignInWithGoogle, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@mui/material';

import { auth } from '@/firebase';
import { StyledModal, IModalProps } from '@/components/shared/StyledModal';

interface ISignUpModalProps extends IModalProps {
  openLoginModal: () => void;
}

interface Inputs {}

export const SignUpModal: React.FC<ISignUpModalProps> = ({ open, hideModal, openLoginModal }) => {
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <StyledModal open={open} hideModal={hideModal} title="Sign up" className="w-[440px]">
      <button
        onClick={() => {
          hideModal();
          signInWithGoogle();
        }}
        className="w-full bg-[#4285f4] border-[#4285f4] border-2 rounded-lg flex items-stretch mb-6">
        <div className="bg-white">
          <img src="/google-login-icon.svg" alt="google-icon" />
        </div>
        <div className="">Sign up with Google</div>
      </button>

      <div className="flex justify-between items-center">
        <div className="bg-[#a8aeb2] w-full h-px"></div>
        <div className="w-fit px-5">or</div>
        <div className="bg-[#a8aeb2] w-full h-px"></div>
      </div>

      {/* TODO: make auth via email */}
      <form>
        <input type="email" placeholder="Email" className="w-full" />

        <div className="">
          <input type="checkbox" />
          <label htmlFor="">Send me use ful news about the tool</label>
        </div>
        <div className="">
          <input type="checkbox" />
          <label htmlFor="">
            I agree to the
            <Link href="/legal-notice" className="">
              Legal notice
            </Link>
            . For more info about privacy:
            <Link href="/privacy-policy" className="">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        <button className="mb-6">Sign Up</button>
      </form>

      <p>
        Already have an account?
        <button
          className="text-blue-900"
          onClick={() => {
            hideModal();
            openLoginModal();
          }}>
          Login
        </button>
      </p>
    </StyledModal>
  );
};
