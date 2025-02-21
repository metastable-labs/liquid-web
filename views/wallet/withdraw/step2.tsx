const Step2 = ({ setStep, setAmount, setAddress }: WithdrawStepProps) => {
  const handleNext = () => {
    setStep?.(2);
  };

  return (
    <div>
      <h1>Step 2</h1>
      {/* Additional content will be added here */}
    </div>
  );
};

export default Step2;
