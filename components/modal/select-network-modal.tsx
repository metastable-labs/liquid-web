import Image from "next/image";

import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";
import { useDelegatedActions, usePrivy } from "@privy-io/react-auth";
import useAgentActions from "@/store/agent/actions";
import useFunding from "@/hooks/useFunding";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";

const LWSelectNetworkModal = () => {
  const { appState, pathname } = useSystemFunctions();
  const { showSelectNetworkModal } = useAppActions();
  const { user } = usePrivy();
  const { delegateOrUndelegate } = useAgentActions();
  const { delegateWallet } = useDelegatedActions();
  const { agentState } = useSystemFunctions();
  const { fundWallet } = useFunding();
  const { evmWallet, solanaWallet } = useLinkedAccounts();

  const { isSolanaSupported } = appState;

  const isAlreadyDelegatedToThisAgent =
    agentState.delegationDetails?.[0]?.isActive;

  const pathSegments = pathname.split("/").filter(Boolean);

  const isAgentDetailPage =
    pathSegments.length === 1 && /^[a-f0-9-]{36}$/.test(pathSegments[0]);

  const onDelegateSolanaWallet = async () => {
    if (!user) return;

    if (solanaWallet?.delegated && !isAlreadyDelegatedToThisAgent) {
      const agentId = agentState.agent?.id || "";
      delegateOrUndelegate(agentId, true, "SOLANA");
      showSelectNetworkModal(false);
      return;
    }

    const agentId = agentState.agent?.id || "";

    delegateWallet({
      address: solanaWallet?.address,
      chainType: "solana",
    }).then(() => {
      delegateOrUndelegate(agentId, true, "SOLANA");
      showSelectNetworkModal(false);
    });
  };

  const onDelegateEvmWallet = async () => {
    if (!user) return;

    if (evmWallet?.delegated && !isAlreadyDelegatedToThisAgent) {
      const agentId = agentState.agent?.id || "";
      delegateOrUndelegate(agentId, true, "BASE");
      showSelectNetworkModal(false);
      return;
    }

    const agentId = agentState.agent?.id || "";

    delegateWallet({
      address: evmWallet?.address,
      chainType: "ethereum",
    }).then(() => {
      delegateOrUndelegate(agentId, true, "BASE");
      showSelectNetworkModal(false);
    });
  };

  const onFundSolanaWallet = () => {
    if (!solanaWallet) return;

    fundWallet(solanaWallet.address, "solana");
    showSelectNetworkModal(false);
  };

  const onFundEvmWallet = () => {
    if (!evmWallet) return;

    fundWallet(evmWallet.address, "evm");
    showSelectNetworkModal(false);
  };

  const baseAction = () => {
    if (isAgentDetailPage) {
      return onDelegateEvmWallet();
    }

    return onFundEvmWallet();
  };

  const solanaAction = () => {
    if (isAgentDetailPage) {
      return onDelegateSolanaWallet();
    }

    return onFundSolanaWallet();
  };

  const networks = isSolanaSupported
    ? [
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
      ]
    : [
        {
          title: "Base",
          icon: "/images/base.png",
          action: baseAction,
        },
      ];

  return (
    <ModalWrapper
      title="Choose wallet"
      isOpen={appState.openSelectNetworkModal}
      onClose={showSelectNetworkModal.bind(this, false)}
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
