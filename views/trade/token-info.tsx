import classNames from "classnames";

import {
  MoneyTickIcon,
  SwapHorizontalIcon,
  ChartIcon,
  CoinsIcon,
  UserIcon,
} from "@/public/icons";
import { formatNumberWithSuffix } from "@/utils/helpers";

const TokenInfo = () => {
  const total_buy_count = 320;
  const total_sell_count = 280;
  const total_count = total_buy_count + total_sell_count;

  const marketCap = 1_300_000;
  const volume = 607_000;
  const totalSupply = 2_000_000_000;
  const holders = 1_005;

  const info = [
    {
      title: "Market cap",
      icon: <MoneyTickIcon fill="#64748B" height={20} width={20} />,
      value: `$${formatNumberWithSuffix(marketCap)}`,
      loading: false,
    },
    {
      title: "Volume (24hrs)",
      icon: <ChartIcon fill="#64748B" height={20} width={20} />,
      value: `$${formatNumberWithSuffix(volume)}`,
      loading: false,
    },
    {
      title: "Total supply",
      icon: <CoinsIcon fill="#64748B" height={20} width={20} />,
      value: `${totalSupply?.toLocaleString()} ${"MST"}`,
      loading: false,
    },
    {
      title: "Transactions (24hrs)",
      icon: <SwapHorizontalIcon fill="#64748B" height={20} width={20} />,
      value: `${total_count.toLocaleString()}`,
      loading: false,
    },

    {
      title: "Holders",
      icon: <UserIcon />,
      value: holders?.toLocaleString(),
      loading: false,
    },
  ];

  return (
    <div className="self-stretch w-full p-6 flex flex-col gap-8 border border-primary-150 rounded-3xl bg-white">
      {info.map(({ title, icon, value, loading }, index) => (
        <div
          key={index}
          className={classNames("flex items-center justify-between gap-4")}
        >
          <div className="flex items-center gap-1.5">
            {icon}
            <span className="text-[15px] leading-[19.8px] text-primary-100">
              {title}
            </span>
          </div>

          {loading ? (
            <div className="w-20 h-5 bg-primary-150 animate-pulse rounded-[3px]" />
          ) : (
            <span className="text-[16px] leading-[19.2px] font-medium text-primary-2600 uppercase">
              {value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TokenInfo;
