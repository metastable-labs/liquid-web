import Image from "next/image";

import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";

const LWSelectNetworkModal = () => {
  const { appState } = useSystemFunctions();
  const { shwoSelectNetworkModal } = useAppActions();

  const baseAction = () => {
    console.log("Base Clicked");
  };

  const solanaAction = () => {
    console.log("Solana Clicked");
  };

  const networks = [
    {
      title: "Base",
      icon: "/images/base.png",
      action: baseAction,
    },
    {
      title: "Solana",
      icon: "/images/sol.png",
      action: solanaAction,
    },
  ];

  return (
    <ModalWrapper
      title="Choose wallet"
      isOpen={appState.openSelectNetworkModal}
      onClose={shwoSelectNetworkModal.bind(this, false)}
    >
      <div className="self-stretch flex flex-col py-3 items-stretch gap-9 px-6">
        {networks.map(({ action, icon, title }, index) => (
          <div
            key={index}
            className="self-stretch py-6 px-4 rounded-[10px] border border-primary-500 bg-white flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Image
                src={icon}
                alt={title}
                width={20}
                height={20}
                quality={100}
                className="rounded-full w-5 h-5 border-primary-150 object-cover"
              />
              <span className="text-[24px] leading-[26.88px] text-primary-950 tracking-[-0.6px] font-medium">
                {title}
              </span>
            </div>

            <LWClickAnimation
              onClick={action}
              className="px-4 py-2 rounded-[10px] bg-primary-350 flex items-center justify-center w-fit"
            >
              <span className="text-[14px] leading-[18.48px] text-white font-medium text-center">
                Select
              </span>
            </LWClickAnimation>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default LWSelectNetworkModal;
