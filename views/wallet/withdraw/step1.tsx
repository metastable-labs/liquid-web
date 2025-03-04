import { motion } from "framer-motion";
import { WalletIconInactive } from "@/public/icons";
import { LWButton } from "@/components";

const Step1 = ({ step, setStep, setAddress, address }: WithdrawStepProps) => {
  const handleNext = () => {
    setStep?.(1);
  };

  return (
    <div className="flex flex-col items-stretch justify-between h-80 lg:h-full gap-">
      <div className="self-stretch flex flex-col items-stretch gap-2">
        <div className="self-stretch px-4 py-2.5 flex items-center justify-center gap-2 rounded-[26px] border border-primary-550 shadow-withdrawAddressInput h-[60px]">
          <input
            name="recipient"
            type="text"
            placeholder="Recipient address"
            className="w-full text-[16px] leading-[19.84px] text-primary-50 placeholder:text-primary-2400 bg-transparent outline-none focus:outline-primary-350 transition-all duration-500"
            onChange={(e) => setAddress?.(e.target.value)}
            value={address}
            disabled={step! > 0}
          />

          <div className="min-w-fit">
            <WalletIconInactive fill="#94A3B8" width={24} height={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="px-3.5 pt-3.5 pb-4 rounded-xl bg-primary-1400 self-stretch text-[16px] leading-[19.84px] text-primary-2150">
          For now you can only withdraw native assets{" "}
          <span className="font-bold">ETH</span>
          {/* and{" "}
          <span className="font-bold">SOL</span> */}
        </p>

        <motion.div
          animate={{
            height: address ? "auto" : "0px",
            marginTop: address ? "32px" : "0px",
            opacity: address ? 1 : 0,
          }}
        >
          <LWButton onClick={handleNext} title="Next" />
        </motion.div>
      </div>
    </div>
  );
};

export default Step1;
