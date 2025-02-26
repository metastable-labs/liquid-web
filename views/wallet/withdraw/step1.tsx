import Image from "next/image";
import { motion } from "framer-motion";
import { WalletIconInactive } from "@/public/icons";
import { LWButton } from "@/components";

const Step1 = ({ setStep, setAddress, address }: WithdrawStepProps) => {
  const handleNext = () => {
    setStep?.(1);
  };

  return (
    <div className="flex flex-col items-stretch justify-between h-full">
      <div className="self-stretch flex flex-col items-stretch gap-2">
        <div className="self-stretch px-4 py-2.5 flex items-center justify-center gap-2 rounded-[26px] border border-primary-550 shadow-withdrawAddressInput h-[60px]">
          <input
            name="recipient"
            type="text"
            placeholder="Recipient address"
            className="w-full text-[16px] leading-[19.84px] text-primary-2400 bg-transparent outline-none"
            onChange={(e) => setAddress?.(e.target.value)}
            value={address}
          />

          <div className="min-w-fit">
            <WalletIconInactive fill="#94A3B8" width={24} height={24} />
          </div>
        </div>

        <div className="px-3.5 py-2 rounded-3xl border border-primary-2100 bg-primary-1750 h-14 self-stretch flex items-center justify-between gap-5">
          <span className="text-[16px] leading-[19.84px] text-primary-2350">
            This is an EVM wallet
          </span>

          <Image
            src="/images/base.png"
            alt="base icon"
            width={20}
            height={20}
            quality={100}
            className="w-5 h-5 rounded-full border border-primary-2750"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="px-3.5 pt-3.5 pb-4 rounded-xl bg-primary-1400 self-stretch text-[16px] leading-[19.84px] text-primary-2150">
          For now you can only withdraw native assets{" "}
          <span className="font-bold">ETH</span> and{" "}
          <span className="font-bold">SOL</span>
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
