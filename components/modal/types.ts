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
  loading?: boolean;
}

export interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChainId: `0x${string}`;
  assets: Asset[];
}

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export interface ModalWrapperProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "default" | "flush-right";
}
