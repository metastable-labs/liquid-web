"use client";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { LWNavigation } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import usePositionActions from "@/store/position/actions";
import { InfoModal } from "@/components/modal/Info-modal";
import ActionsModal from "@/components/modal/actions-modal";
import { WithdrawModal } from "@/components/modal/withdraw-modal";
import { ClaimModal } from "@/components/modal/claim-modal";
import PrivyWalletProvider from "@/providers/PrivyProvider";
import ConnectWalletButton from "@/components/ui/connect-wallet-button";

const App = ({ children }: { children: React.ReactNode }) => {
  const {
    appState: { info },
    positionState: { activePosition, isClaiming, isWithdrawing },
  } = useSystemFunctions();
  const { setInfo } = useAppActions();
  const { setActivePosition, setIsClaiming, setIsWithdrawing } =
    usePositionActions();

  return (
    <>
      <ConnectWalletButton />

      <div className="flex xl:gap-20 2xl:gap-28 2xl:justify-between relative max-h-[94vh] overflow-y-auto">
        <div className="hidden xl:block sticky top-0">
          <LWNavigation />
        </div>

        <div className="xl:w-[80%] w-full pb-24">{children}</div>
      </div>

      <div className="xl:hidden fixed left-0 bottom-0 w-full">
        <LWNavigation />
      </div>

      <ActionsModal
        isOpen={!!activePosition}
        onClose={() => setActivePosition(null)}
        position={activePosition!}
        onWithdraw={() => console.log("Withdraw clicked")}
        onClaimYield={() => console.log("Claim yield clicked")}
        onClaimRewards={() => console.log("Claim rewards clicked")}
      />

      <WithdrawModal
        isOpen={isWithdrawing}
        onClose={() => setIsWithdrawing(false)}
      />

      <ClaimModal isOpen={isClaiming} onClose={() => setIsClaiming(false)} />

      <InfoModal
        isOpen={!!info}
        onClose={() => setInfo(null)}
        title={info?.title}
        description={info?.description}
      />
    </>
  );
};

const AppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyWalletProvider>
      <ReduxProvider>
        <App>{children}</App>
      </ReduxProvider>
    </PrivyWalletProvider>
  );
};

export default AppWithProviders;
