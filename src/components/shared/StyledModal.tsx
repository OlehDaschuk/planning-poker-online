import React, { HTMLAttributes } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { Button, IconButton } from '@mui/material';

export interface IModalProps {
  open: boolean;
  hideModal: () => void;
}
interface IStyledModalProps extends IModalProps {
  title: string;
  showCloseIcon?: boolean;
  className?: HTMLAttributes<'div'>['className'];
  children?: React.ReactElement | React.ReactElement[] | string;
}

export const StyledModal: React.FC<IStyledModalProps> = ({
  open,
  hideModal,
  title,
  className,
  children,
}) => {
  return (
    <Dialog open={open} onClose={hideModal} className="z-20">
      <div className="fixed inset-0 bg-[rgba(26,41,53,.8)] z-10" aria-hidden="true" />

      <Dialog.Panel
        className={
          'bg-white px-11 pb-11 rounded-2xl overflow-scroll z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100%-24px)] max-w-[calc(100%-24px)] w-full ' +
          className
        }>
        <div className="absolute top-0 w-full">
          <IconButton onClick={hideModal} className="absolute top-4 right-8 -translate-x-full">
            <XMarkIcon className="w-6" />
          </IconButton>
        </div>

        <div className="h-16"></div>

        <div className="">
          <Dialog.Title as="h4" className="text-2xl font-bold">
            {title}
          </Dialog.Title>

          <div className="">{children}</div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
