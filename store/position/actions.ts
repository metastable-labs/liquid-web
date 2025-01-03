import { simulateContract, writeContract } from "@wagmi/core";

import { wagmiConfig } from "@/providers/PrivyProvider";
import { LiquidABI } from "@/constants/abis";
import { liquidContractAddress } from "@/constants/addresses";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setActivePosition as setActivePosition_,
  setIsClaiming as setIsClaiming_,
  setIsWithdrawing as setIsWithdrawing_,
  setExtraPosition,
  setExtraStrategies,
  setLoadingPosition,
  setLoadingStrategies,
  setPositions,
  setStrategies,
  setPositionsMeta,
  setStrategiesMeta,
  setLoadingInvesting,
} from ".";
import { CallbackProps } from "..";
import api from "./api";

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

  const investInStrategy = async (
    amount: number,
    strategyId: `0x${string}`
  ) => {
    try {
      setLoadingInvesting(true);
      const amountToInvest = BigInt(amount * 10 ** 6);
      const strategyModule = "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e";

      const { request } = await simulateContract(wagmiConfig, {
        abi: LiquidABI.abi,
        address: liquidContractAddress,
        functionName: "join",
        args: [strategyId, strategyModule, [amountToInvest]],
      });
      const hash = await writeContract(wagmiConfig, request);

      console.log("Investment hash", hash);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingInvesting(false);
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

  const getStrategies = async (query: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingStrategies(true));
      const { meta, strategies } = await api.fetchStrategies(query);

      dispatch(setStrategiesMeta(meta));
      if (meta.prev === null) {
        dispatch(setStrategies(strategies));
      } else {
        dispatch(setExtraStrategies(strategies));
      }
      return callback?.onSuccess?.(strategies);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingStrategies(false));
    }
  };

  const getPositions = async (query: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingPosition(true));
      const { meta, positions } = await api.fetchPositions(query);

      dispatch(setPositionsMeta(meta));
      if (meta.prev === null) {
        dispatch(setPositions(positions));
      } else {
        dispatch(setExtraPosition(positions));
      }
      return callback?.onSuccess?.(positions);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingPosition(false));
    }
  };

  return {
    setActivePosition,
    setIsClaiming,
    setIsWithdrawing,
    investInStrategy,
    withdrawStrategy,
    getStrategies,
    getPositions,
  };
};

export default usePositionActions;
