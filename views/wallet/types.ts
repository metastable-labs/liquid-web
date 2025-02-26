type Asset = {
  title: string;
  icon: string;
  network: "sol" | "base";
  symbol: string;
  balance: number;
  balanceUSDValue: number;
};

type WalletInteration = "main" | "add" | "withdraw";

interface InteractionProps {
  onClose: () => void;
}
