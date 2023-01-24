import Image from 'next/image';
import { Menu } from '@headlessui/react';
import {
  useAuthState,
  useSignInWithGoogle,
  useSendSignInLinkToEmail,
  useCreateUserWithEmailAndPassword,
  useSignOut,
} from 'react-firebase-hooks/auth';
import { ChevronDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

import { auth } from '@/firebase';

export const UserProfile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut, loading, error] = useSignOut(auth);
  console.log(user?.photoURL);

  return (
    <Menu as="div" className="">
      <Menu.Button className="flex items-center gap-2 rounded-lg hover:bg-[#e8e9ea]">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
          {user?.photoURL ? (
            <Image src={user.photoURL} width="32" height="32" alt="user photo" />
          ) : (
            <span>user?.displayName!.charAt(0)</span>
          )}
        </div>
        {user!.displayName}
        <ChevronDownIcon className="w-4" />
      </Menu.Button>

      <Menu.Items className="w-80 absolute shadow-[0_4px_8px_hsl(204deg_6%_68%_/_40%)] rounded-lg">
        <Menu.Item as="button" className="cursor-pointer flex" onClick={signOut}>
          <span>
            <ArrowLeftOnRectangleIcon />
          </span>
          <span>Sign Out</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
