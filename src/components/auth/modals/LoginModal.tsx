import { useSignInWithGoogle, useSendSignInLinkToEmail } from 'react-firebase-hooks/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { StyledModal, IModalProps } from '@/components/shared/StyledModal';
import { auth } from '@/firebase';
import { useStore } from '@/hooks/useStore';

interface Inputs {
  email: string;
}

const actionCodeSettings = {
  // The URL to redirect to for sign-in completion. This is also the deep
  // link for mobile redirects. The domain (www.example.com) for this URL
  // must be whitelisted in the Firebase Console.
  url: 'https://planningpokeronline-215c1.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  // // This must be true.
  handleCodeInApp: true,
};

export const LoginModal: React.FC = observer(() => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [sendSignInLinkToEmail, sending] = useSendSignInLinkToEmail(auth);

  const modalsHandlerStore = useStore((s) => s.modalsHandlerStore);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    // sendSignInLinkToEmail(data.email, actionCodeSettings);
  };

  return (
    <StyledModal
      open={modalsHandlerStore.openLoginModal}
      hideModal={() => modalsHandlerStore.setOpenLoginModal(false)}
      title="Login"
      className="w-[440px]">
      <Button
        startIcon={<img src="/google-login-icon.svg" alt="google-icon" />}
        fullWidth
        size="large"
        variant="contained"
        sx={{ display: 'flex' }}
        onClick={() => {
          modalsHandlerStore.setOpenLoginModal(false);
          signInWithGoogle();
        }}>
        <span className="grow">Login with Google</span>
      </Button>

      <div className="flex justify-between items-center">
        <div className="bg-[#a8aeb2] w-full h-px"></div>
        <div className="w-fit px-5">or</div>
        <div className="bg-[#a8aeb2] w-full h-px"></div>
      </div>

      {/* TODO: make auth via email */}
      <form>
        <TextField
          type="email"
          label="Email"
          fullWidth
          variant="outlined"
          {...register('email', { required: true })}
        />
        <Button type="submit" fullWidth size="large" variant="contained">
          Login
        </Button>
      </form>

      <div className="flex justify-between">
        <Button
          onClick={() => {
            modalsHandlerStore.setOpenLoginModal(false);
            modalsHandlerStore.setOpenSignUpModal(true);
          }}>
          Create account
        </Button>
        <Button>Use password</Button>
      </div>
    </StyledModal>
  );
});
