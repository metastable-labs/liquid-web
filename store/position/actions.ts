import { simulateContract, writeContract } from "@wagmi/core";

import { wagmiConfig } from "@/providers/PrivyProvider";
import { EngineAbi } from "@/constants/abis";
import {
  engineContractAddress,
  strategyContractAddress,
  USDCContractAddress,
} from "@/constants/addresses";
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
  setCloseInvestModal,
  setLoadingExit,
} from ".";
import { CallbackProps } from "..";
import api from "./api";
import { erc20Abi } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState } from "react";
import useAppActions from "../app/actions";

const usePositionActions = () => {
  const [joinData, setJoinData] = useState({
    onChainId: "" as `0x${string}`,
    amountToInvest: BigInt(0),
    transactionHash: "" as `0x${string}`,
  });

  const {
    data: receipt,
    isError,
    isLoading,
  } = useWaitForTransactionReceipt({
    hash: joinData.transactionHash,
  });
  const { dispatch } = useSystemFunctions();
  const { address } = useAccount();
  const { showToast } = useAppActions();

  const setActivePosition = (position: Position | null) => {
    dispatch(setActivePosition_(position));
  };

  const setIsClaiming = (isClaiming: boolean) => {
    dispatch(setIsClaiming_(isClaiming));
  };

  const setIsWithdrawing = (isWithdrawing: boolean) => {
    dispatch(setIsWithdrawing_(isWithdrawing));
  };

  const joinStrategy = async (amount: number, onChainId: `0x${string}`) => {
    try {
      dispatch(setLoadingInvesting(true));
      const amountToInvest = BigInt(amount * 10 ** 6);

      const { request } = await simulateContract(wagmiConfig, {
        address: USDCContractAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [engineContractAddress as `0x${string}`, amountToInvest],
      });

      const hash = await writeContract(wagmiConfig, request);

      setJoinData({ onChainId, amountToInvest, transactionHash: hash });
    } catch (error) {
      console.error("error", error);
      dispatch(setLoadingInvesting(false));
      setJoinData({
        onChainId: "" as `0x${string}`,
        amountToInvest: BigInt(0),
        transactionHash: "" as `0x${string}`,
      });
    }
  };

  const exitStrategy = async (
    onChainId: `0x${string}`,
    callback?: CallbackProps
  ) => {
    try {
      dispatch(setLoadingExit(true));

      const { request } = await simulateContract(wagmiConfig, {
        abi: EngineAbi.abi,
        address: engineContractAddress,
        functionName: "exit",
        args: [onChainId, strategyContractAddress],
      });
      const hash = await writeContract(wagmiConfig, request);
      showToast("Successfully exited strategy!", "success");

      callback?.onSuccess?.();

      setTimeout(() => {
        getStrategies(`page=1&limit=10`);
        getPositions(`walletAddress=${address}&page=1&limit=10`);
      }, 2000);

      console.log("exit hash", hash);
    } catch (error) {
      console.error(error);
      showToast("Something went wrong! try again later.", "error");
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingExit(false));
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

  const _joinStrategy = async () => {
    try {
      const { amountToInvest, onChainId } = joinData;

      const { request } = await simulateContract(wagmiConfig, {
        address: engineContractAddress,
        abi: EngineAbi.abi,
        functionName: "join",
        args: [onChainId, strategyContractAddress, [amountToInvest]],
      });

      await writeContract(wagmiConfig, request);

      dispatch(setCloseInvestModal(true));
      showToast("Investment successful!", "success");

      dispatch(setCloseInvestModal(false));

      setTimeout(() => {
        getStrategies(`page=1&limit=10`);
        getPositions(`walletAddress=${address}&page=1&limit=10`);
      }, 2500);
    } catch (error) {
      showToast("Something went wrong!", "error");
      console.error(error);
    } finally {
      dispatch(setLoadingInvesting(false));
    }
  };

  useEffect(() => {
    if (!receipt) return;

    _joinStrategy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt]);

  return {
    setActivePosition,
    setIsClaiming,
    setIsWithdrawing,
    joinStrategy,
    getStrategies,
    getPositions,
    exitStrategy,
  };
};

export default usePositionActions;
