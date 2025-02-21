const Step3 = ({ setStep, setAmount, setAddress }: WithdrawStepProps) => {
  const handleNext = () => {
    setStep?.(3);
  };

  return (
    <div>
      <h1>Step 3</h1>
      {/* Additional content will be added here */}
    </div>
  );
};

export default Step3;
