import classNames from "classnames";

import { CoinIcon, ArrowUpAltIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import { formatBalance } from "@/utils/helpers";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import Spinner from "@/components/ui/spinner";
import Assets from "./assets";

const Main = ({
  setWalletInteraction,
}: {
  setWalletInteraction: (interaction: WalletInteration) => void;
}) => {
  const { walletState } = useSystemFunctions();

  const totalUsdBalance =
    walletState.assets?.reduce((acc, asset) => acc + asset.balanceUSD, 0) ||
    "0.00";
  const balance = formatBalance(totalUsdBalance, 2);

  const actions = [
    {
      title: "Add money",
      icon: <CoinIcon />,
      action: () => setWalletInteraction("add"),
    },
    {
      title: "Withdraw",
      icon: <ArrowUpAltIcon />,
      action: () => setWalletInteraction("withdraw"),
    },
  ];

  return (
    <div className="flex flex-col gap-[29px]">
      <div className="flex flex-col gap-2.5">
        <h5 className="text-[13px] leading-[16.12px] text-primary-100">
          Total Holdings
        </h5>

        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-[36px] leading-[40.32px] text-primary-950 font-QuantaGroteskPro font-bold">
            ${balance}
          </span>

          {walletState.loadingAssets && (
            <div className="mb-2">
              <Spinner size={5} />
            </div>
          )}
        </div>
      </div>

      <div className="self-stretch flex flex-col gap-8">
        <div className="self-stretch flex items-center gap-4">
          {actions.map(({ action, icon, title }, index) => (
            <LWClickAnimation
              onClick={action}
              key={index}
              className={classNames(
                "flex-1 px-[21.6px] py-[6.75px] flex items-center justify-center gap-[6.75px] rounded-[21.6px] h-[54px]",
                {
                  "bg-primary-350": index === 0,
                  "border border-primary-550 bg-primary-600": index === 1,
                }
              )}
            >
              <span
                className={classNames(
                  "text-[16.2px] leading-[21.6px] font-medium text-center",
                  {
                    "text-white": index === 0,
                    "text-primary-1700": index === 1,
                  }
                )}
              >
                {title}
              </span>
              {icon}
            </LWClickAnimation>
          ))}
        </div>

        <Assets />
      </div>
    </div>
  );
};

export default Main;
