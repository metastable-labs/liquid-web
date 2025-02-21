import { LWClickAnimation } from "@/components";
import useTruncateText from "@/hooks/useTruncateText";
import classNames from "classnames";
import { title } from "process";

const Step3 = ({ address, amount, onClose }: WithdrawStepProps) => {
  const { truncatedText } = useTruncateText(address, 8, 8);

  const info = [
    {
      title: "To",
      value: truncatedText,
    },
    {
      title: "Network",
      value: "Base",
    },
    {
      title: "Network Fee",
      value: `$${0.0134}`,
    },
  ];

  const handleNext = () => {
    console.log("Withdrawing to address:", address, "and amount:", amount);
    onClose?.();
  };

  return (
    <div className="self-stretch h-full flex flex-col items-center justify-between gap-20 relative">
      <div className="self-stretch flex flex-col gap-6">
        {info.map(({ title, value }) => (
          <div key={title} className="flex items-center justify-between w-full">
            <span className="text-[16px] leading-[19.84px] text-primary-100">
              {title}
            </span>

            <p
              className={classNames("text-[16px] font-medium", {
                "leading-[19.84px] text-primary-950": title === "To",
                "leading-[19.2px] text-primary-1800": title !== "To",
              })}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <LWClickAnimation
        onClick={handleNext}
        loading={false}
        className="min-w-[234px] min-h-[45px] rounded-[18px] flex items-center justify-center transition-all duration-500 bg-primary-350 lg:absolute lg:-bottom-12"
      >
        <span className="text-[16.2px] leading-[21.6px] text-white font-medium text-center">
          Send
        </span>
      </LWClickAnimation>
    </div>
  );
};

export default Step3;
