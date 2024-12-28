import Image from "next/image";
import { InfoCircleIcon, MoreIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import useAppActions from "@/store/app/actions";
import usePositionActions from "@/store/position/actions";

const Info = ({ title, value, onClick }: PositionInfo) => (
  <LWClickAnimation
    stopPropagation
    onClick={onClick}
    className="flex flex-col gap-1"
  >
    <div className="flex items-center gap-1">
      <span className="text-[11px] leading-[13.64px] text-primary-100">
        {title}
      </span>
      <InfoCircleIcon />
    </div>
    <span className="text-[13px] leading-[15.6px] text-primary-950">
      ${value.toLocaleString()}
    </span>
  </LWClickAnimation>
);

const TokenIcons = ({ icons }: { icons: string[] }) => (
  <div className="flex items-center justify-center -space-x-1.5">
    {icons.map((icon, index) => (
      <Image
        key={index}
        src={icon}
        alt="Token icon"
        width={16}
        height={16}
        className="rounded-full"
      />
    ))}
  </div>
);

const PositionCard = ({
  estimatedAPY,
  iconPairs,
  rewards,
  title,
  totalBalance,
  yieldEarned,
}: Position) => {
  const { setInfo } = useAppActions();
  const { setActivePosition } = usePositionActions();

  const handleAction = () => {
    setActivePosition({
      title,
      estimatedAPY,
      iconPairs,
      rewards,
      totalBalance,
      yieldEarned,
    });
  };

  const renderInfoSection = (
    title: string,
    value: number,
    infoTitle: string,
    infoDescription: string
  ) => (
    <Info
      title={title}
      value={value}
      onClick={() =>
        setInfo({
          title: infoTitle,
          description: infoDescription,
        })
      }
    />
  );

  return (
    <div
      onClick={handleAction}
      className="py-3 px-4 flex flex-col gap-6 self-stretch rounded-[10px] border border-primary-500 bg-white cursor-pointer"
    >
      <div className="self-stretch flex items-center justify-between">
        <div className="flex flex-col gap-2 justify-center">
          <h1 className="text-[15px] leading-[19.8px] text-primary-400 font-medium">
            {title}
          </h1>
          <div className="flex items-center gap-1">
            <TokenIcons icons={Object.values(iconPairs[0])} />
            <MoreIcon />
            <TokenIcons icons={Object.values(iconPairs[1])} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[12px] leading-[15.84px] text-primary-100">
            Est. APY
          </span>
          <span className="text-[14px] leading-[16.8px] text-primary-350 font-medium">
            {estimatedAPY}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {renderInfoSection(
          "Total Balance",
          totalBalance,
          "What’s your total balance?",
          "Your total balance reflects the amount of money available in a particular position. It includes all deposits."
        )}

        <div className="w-[1px] h-6 bg-primary-150" />

        {renderInfoSection(
          "Yield Earned",
          yieldEarned,
          "What is Yield?",
          "Yield refers to the income earned on an investment over time, typically expressed as a percentage."
        )}

        <div className="w-[1px] h-6 bg-primary-150" />

        {renderInfoSection(
          "Rewards",
          rewards,
          "How are my rewards calculated?",
          "Rewards are calculated based on your contributions and performance metrics within the specified position."
        )}
      </div>
    </div>
  );
};

export default PositionCard;
