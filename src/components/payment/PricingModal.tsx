import { observer } from 'mobx-react-lite';
import { StyledModal } from '@/components/shared/StyledModal';
import { useStore } from '@/hooks/useStore';

export const PricingModal: React.FC = observer(() => {
  const modalsHandlerStore = useStore((s) => s.modalsHandlerStore);

  return (
    <StyledModal
      open={modalsHandlerStore.openPricingModal}
      hideModal={() => modalsHandlerStore.setOpenPricingModal(false)}
      title="Upgrade Planning Poker Online"
      className="w-full h-full">
      Soon...
    </StyledModal>
    // TODO: add content for prices
  );
});
