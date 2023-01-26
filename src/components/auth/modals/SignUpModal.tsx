import Link from 'next/link';
import { useSignInWithGoogle, useSendSignInLinkToEmail } from 'react-firebase-hooks/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { auth } from '@/firebase';
import { StyledModal, IModalProps } from '@/components/shared/StyledModal';

interface ISignUpModalProps extends IModalProps {
  openLoginModal: () => void;
}

interface Inputs {
  email: string;
  shouldSentMails: boolean;
  agreement: boolean;
}

// ?: ...
const actionCodeSettings = {
  // The URL to redirect to for sign-in completion. This is also the deep
  // link for mobile redirects. The domain (www.example.com) for this URL
  // must be whitelisted in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  // This must be true.
  handleCodeInApp: true,
};

export const SignUpModal: React.FC<ISignUpModalProps> = ({ open, hideModal, openLoginModal }) => {
  const [sendSignInLinkToEmail, sendingLinkToEmail] = useSendSignInLinkToEmail(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    sendSignInLinkToEmail(data.email, actionCodeSettings);
  };

  return (
    <StyledModal open={open} hideModal={hideModal} title="Sign up" className="w-[440px]">
      <Button
        startIcon={<img src="/google-login-icon.svg" alt="google-icon" />}
        fullWidth
        size="large"
        variant="contained"
        sx={{ display: 'flex' }}
        onClick={() => {
          hideModal();
          signInWithGoogle();
        }}>
        <span className="grow">Sign up with Google</span>
      </Button>

      <div className="flex justify-between items-center">
        <div className="bg-[#a8aeb2] w-full h-px"></div>
        <div className="w-fit px-5">or</div>
        <div className="bg-[#a8aeb2] w-full h-px"></div>
      </div>

      {/* TODO: make auth via email */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          label="Email"
          fullWidth
          variant="outlined"
          {...register('email', { required: true })}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...register('shouldSentMails')} />}
            label={'Send me useful news about the tool'}
          />
          <FormControlLabel
            control={<Checkbox {...register('agreement', { required: true })} />}
            label={
              <>
                I agree to the&nbsp;
                <Link href="/legal-notice" className="underline">
                  Legal notice
                </Link>
                . For more info about privacy:&nbsp;
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
                .
              </>
            }
          />
        </FormGroup>

        <Button type="submit" fullWidth size="large" variant="contained" className="mb-6">
          Sign Up
        </Button>
      </form>

      <p>
        Already have an account?&nbsp;
        <button
          className="text-[#3993ff] font-bold"
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
