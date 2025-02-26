import Image from "next/image";
import classNames from "classnames";

const networkIcons = {
  sol: "/images/sol.png",
  base: "/images/base.png",
};

const AssetPaper = ({ asset }: { asset: Asset }) => (
  <div className="py-0.5 self-stretch flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <Image
          src={asset.icon}
          alt={`${asset.symbol} icon`}
          width={24}
          height={24}
          quality={100}
          className="w-6 h-6 rounded-full border border-primary-150"
        />

        <Image
          src={networkIcons[asset.network]}
          alt={`${asset.network} icon`}
          width={11}
          height={11}
          quality={100}
          className="w-[11px] h-[11px] rounded-full border border-primary-2750 absolute bottom-0 left-0"
        />
      </div>

      <div className="flex flex-col gap-1 justify-center">
        <h2 className="text-[14px] leading-[18.48px] text-primary-400 font-medium">
          {asset.title}
        </h2>

        <span className="text-[11px] leading-[13.64px] text-primary-100">
          {asset.balance.toLocaleString()} {asset.symbol}
        </span>
      </div>
    </div>
    <span className="text-[13px] leading-[16.12px] text-primary-1800 font-medium">
      ${asset.balanceUSDValue.toLocaleString()}
    </span>
  </div>
);

export default AssetPaper;
