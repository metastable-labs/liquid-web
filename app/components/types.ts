export interface KeypadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  className?: string;
}

export interface HoldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onHoldComplete?: () => void;
  holdDuration?: number;
  className?: string;
}

export interface PercentageButtonProps {
  value: number;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  tokenSymbol?: string;
}

export interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw?: () => void;
  onClaimYield?: () => void;
  onClaimRewards?: () => void;
  position: {
    name: string;
    apy: number;
    totalBalance: number;
    yieldEarned: number;
    rewards: number;
    icons: string[];
  };
}

export interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  tokenSymbol?: string;
}

export interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  tokenSymbol?: string;
}

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export interface ModalWrapperProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
