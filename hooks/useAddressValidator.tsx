import { useState, useEffect } from "react";
import { isAddress } from "viem";
import { PublicKey } from "@solana/web3.js";

function useAddressValidator(address: string) {
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
      new PublicKey(address);
      setIsSolValid(true);
    } catch (error) {
      setIsSolValid(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      check();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { isEthValid, isSolValid };
}

export default useAddressValidator;
