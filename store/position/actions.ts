import { simulateContract, writeContract } from "@wagmi/core";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setActivePosition as setActivePosition_,
  setIsClaiming as setIsClaiming_,
  setIsWithdrawing as setIsWithdrawing_,
} from ".";
import { wagmiConfig } from "@/providers/PrivyProvider";
import { LiquidABI } from "@/constants/abis";
import { liquidContractAddress } from "@/constants/addresses";

const usePositionActions = () => {
  const { dispatch } = useSystemFunctions();

  const setActivePosition = (position: Position | null) => {
    dispatch(setActivePosition_(position));
  };

  const setIsClaiming = (isClaiming: boolean) => {
    dispatch(setIsClaiming_(isClaiming));
  };

  const setIsWithdrawing = (isWithdrawing: boolean) => {
    dispatch(setIsWithdrawing_(isWithdrawing));
  };

  const investInStrategy = async (amount: number) => {
    try {
      const amountToInvest = BigInt(amount * 10 ** 18);
      const strategyId = "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e";
      const strategyModule = "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e";

      const { request } = await simulateContract(wagmiConfig, {
        abi: LiquidABI.abi,
        address: liquidContractAddress,
        functionName: "join",
        args: [strategyId, strategyModule, [amountToInvest]],
      });
      const hash = await writeContract(wagmiConfig, request);
    } catch (error) {
      console.error(error);
    }
  };

  const withdrawStrategy = async (amount: number) => {
    try {
      const assets = BigInt(0);
      const receiverAddress = "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e";
      const ownerAddress = "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e";

      const { request } = await simulateContract(wagmiConfig, {
        abi: LiquidABI.abi,
        address: liquidContractAddress,
        functionName: "withdraw",
        args: [assets, receiverAddress, ownerAddress],
      });
      const hash = await writeContract(wagmiConfig, request);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setActivePosition,
    setIsClaiming,
    setIsWithdrawing,
  };
};

export default usePositionActions;
