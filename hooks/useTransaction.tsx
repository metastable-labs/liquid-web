import { useSolanaFundingPlugin } from "@privy-io/react-auth/solana";
import { useSendTransaction as useSolanaSendTransaction } from "@privy-io/react-auth/solana";
import {
  SendTransactionModalUIOptions,
  UnsignedTransactionRequest,
  useSendTransaction as useEVMSendTransaction,
} from "@privy-io/react-auth";
import { base } from "viem/chains";
import { parseUnits, toHex } from "viem";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import useLinkedAccounts from "./useLinkedAccounts";
import useAppActions from "@/store/app/actions";

const useTransaction = (onClose?: () => void) => {
  const { showToast } = useAppActions();
  const { sendTransaction: sendTransactionEVMWallet } = useEVMSendTransaction({
    onSuccess: () => {
      onClose?.();
      showToast("Successfully withdrew to your ETH wallet!", "success");
    },
  });
  const { sendTransaction: sendTransactionSolanaWallet } =
    useSolanaSendTransaction({
      onSuccess: () => {
        onClose?.();
        showToast("Successfully withdrew to your Solana wallet!", "success");
      },
    });
  const { solanaWallet } = useLinkedAccounts();

  const sendTransactionOnSolana = async (toAddress: string) => {
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const fromAddress = new PublicKey(solanaWallet?.address);
    const recipient = new PublicKey(toAddress);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromAddress,
        toPubkey: recipient,
        lamports: 100,
      })
    );
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromAddress;

    const uiOptions: SendTransactionModalUIOptions = {
      description: "Complete your SOL withdrawal",
      buttonText: "Withdraw",
    };

    const txReceipt = await sendTransactionSolanaWallet({
      transaction,
      connection,
      uiOptions,
    });
  };

  const sendTransactionOnEvm = async (toAddress: string, amount: number) => {
    const weiBigInt = parseUnits(amount.toString(), 18);
    const valueInHex = toHex(weiBigInt);

    const unsignedTx: UnsignedTransactionRequest = {
      to: toAddress,
      chainId: base.id,
      value: valueInHex,
    };

    const uiOptions: SendTransactionModalUIOptions = {
      description: "Complete your ETH withdrawal",
      buttonText: "Withdraw",
    };

    const { hash } = await sendTransactionEVMWallet(unsignedTx, { uiOptions });
  };

  const sendTransaction = async (
    toAddress: string,
    amount: number,
    network: "evm" | "solana"
  ) => {
    if (network === "solana") {
      return sendTransactionOnSolana(toAddress);
    }

    return sendTransactionOnEvm(toAddress, amount);
  };

  return {
    sendTransaction,
  };
};

export default useTransaction;
