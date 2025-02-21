interface WithdrawStepProps {
  setStep?: (step: number) => void;
  setAmount?: (amount: number) => void;
  setAddress?: (address: string) => void;
  onClose?: () => void;
}
