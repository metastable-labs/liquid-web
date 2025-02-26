interface WithdrawStepProps {
  address?: string;
  amount?: string;
  step?: number;
  setStep?: (step: number) => void;
  setAmount?: (value: string) => void;
  setAddress?: (address: string) => void;
  onClose?: () => void;
}
