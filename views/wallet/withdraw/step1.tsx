import { WalletIconInactive } from "@/public/icons";

const Step1 = ({ setStep, setAmount, setAddress }: WithdrawStepProps) => {
  const handleNext = () => {
    setStep?.(1);
  };

  return (
    <div>
      <div className="self-stretch px-4 py-2.5 flex items-center justify-center gap-2 rounded-[26px] border border-primary-550 shadow-withdrawAddressInput h-[60px]">
        <input
          name="recipient"
          type="text"
          placeholder="Recipient address"
          className="w-full text-[16px] leading-[19.84px] text-primary-2400 bg-transparent outline-none"
          onChange={(e) => setAddress?.(e.target.value)}
        />

        <div className="min-w-fit">
          <WalletIconInactive fill="#94A3B8" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default Step1;
