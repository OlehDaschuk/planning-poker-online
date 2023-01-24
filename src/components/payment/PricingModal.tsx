import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { StyledModal } from '@/components/shared/StyledModal';

interface IModalProps {
  open: boolean;
  hideModal: () => void;
}

export const PricingModal: React.FC<IModalProps> = ({ open, hideModal }) => {
  return (
    <StyledModal
      open={open}
      hideModal={hideModal}
      title="Upgrade Planning Poker Online"
      className="w-full h-full">
      Soon...
    </StyledModal>
    // TODO: add content for prices
  );
};
