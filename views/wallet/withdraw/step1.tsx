const Step1 = ({ setStep, setAmount, setAddress }: WithdrawStepProps) => {
  const handleNext = () => {
    setStep?.(1);
  };

  return (
    <div>
      <h1>Step 1</h1>
      {/* Additional content will be added here */}
    </div>
  );
};

export default Step1;
