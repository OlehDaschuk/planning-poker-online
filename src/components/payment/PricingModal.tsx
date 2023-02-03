import { observer } from 'mobx-react-lite';
import { StyledModal } from '@/components/shared/StyledModal';
import { useStore } from '@/hooks/useStore';

export const PricingModal: React.FC = observer(() => {
  const modalsHanderStore = useStore((s) => s.modalsHanderStore);

  return (
    <StyledModal
      open={modalsHanderStore.openPricingModal}
      hideModal={() => modalsHanderStore.setOpenPricingModal(false)}
      title="Upgrade Planning Poker Online"
      className="w-full h-full">
      Soon...
    </StyledModal>
    // TODO: add content for prices
  );
});
