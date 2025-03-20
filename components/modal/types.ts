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
  enlargeTitle?: boolean;
  fluid?: boolean;
}

export interface ExitPostionModalProps extends ModalProps {
  onParentClose: () => void;
}
