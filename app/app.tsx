"use client";
import { LWToastNotification, LWToolBar } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import usePositionActions from "@/store/position/actions";
import { InfoModal } from "@/components/modal/Info-modal";
import ActionsModal from "@/components/modal/actions-modal";
import { WithdrawModal } from "@/components/modal/withdraw-modal";
import { ClaimModal } from "@/components/modal/claim-modal";

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
      <div className="relative flex flex-col h-[100dvh] xl:h-[96vh] overflow-y-auto no-scrollbar pt-0 xl:pt-5">
        <LWToolBar />
        {/* <div className="w-full min-h-20" /> */}
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </div>

      <ActionsModal
        isOpen={!!activePosition}
        onClose={() => setActivePosition(null)}
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

      <LWToastNotification />
    </>
  );
};

export default App;
