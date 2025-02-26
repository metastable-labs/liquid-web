import { useState, useEffect } from "react";
import { isAddress } from "viem";
import { PublicKey } from "@solana/web3.js";
import useSystemFunctions from "./useSystemFunctions";

function useAddressValidator(address: string, delay: number = 1000) {
  const { appState } = useSystemFunctions();
  const [isEthValid, setIsEthValid] = useState(false);
  const [isSolValid, setIsSolValid] = useState(false);

  const check = () => {
    if (!address) {
      setIsEthValid(false);
      setIsSolValid(false);
      return;
    }

    // Check Ethereum address validity
    setIsEthValid(isAddress(address));

    // Check Solana address validity
    try {
      if (appState.isSolanaSupported) {
        new PublicKey(address);
        setIsSolValid(true);
      }
    } catch (error) {
      setIsSolValid(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      check();
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, appState.isSolanaSupported]);

  return { isEthValid, isSolValid };
}

export default useAddressValidator;
