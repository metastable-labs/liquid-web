interface WithdrawStepProps {
  address?: string;
  amount?: string;
  setStep?: (step: number) => void;
  setAmount?: (value: string) => void;
  setAddress?: (address: string) => void;
  onClose?: () => void;
}
