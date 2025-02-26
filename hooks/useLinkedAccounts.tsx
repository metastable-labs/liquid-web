import { usePrivy } from "@privy-io/react-auth";

const useLinkedAccounts = () => {
  const { user } = usePrivy();

  const evmWallet: any = user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" &&
      account.chainType === "ethereum" &&
      account.walletClientType === "privy"
  );

  const solanaWallet: any = user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" &&
      account.chainType === "solana" &&
      account.walletClientType === "privy"
  );

  const linkedTwitter = user?.linkedAccounts?.find(
    (account) => account.type === "twitter_oauth"
  );

  const linkedFarcaster = user?.linkedAccounts?.find(
    (account) => account.type === "farcaster"
  );

  return {
    evmWallet,
    solanaWallet,
    linkedTwitter,
    linkedFarcaster,
  };
};

export default useLinkedAccounts;
