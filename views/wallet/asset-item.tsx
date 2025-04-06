import { formatBalance, formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import { useState } from "react";

const networkIcons = {
  solana: "/images/sol.png",
  base: "/images/base.png",
};

const defaultIconUrl =
  "https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png";

const AssetItem = ({ asset }: { asset: Wallet }) => {
  const [logo, setLogo] = useState(asset.logo);

  const { whole, decimal } = formatCurrency(asset.uiAmount);
  const balance = `${whole}.${decimal}`;

  const formatedBalance =
    Number(balance) < 1 ? balance : Number(balance).toLocaleString();

  const usdBalance = formatBalance(asset.balanceUSD || 0, 2);
  const formatedUsdBalance =
    Number(usdBalance) < 1 ? usdBalance : Number(usdBalance).toLocaleString();

  return (
    <a
      href={`https://dexscreener.com/base/${asset.address}`}
      target="_blank"
      className="self-stretch flex items-center justify-between hover:bg-primary-150 transition-all duration-500 px-2 py-3 -ml-2 rounded"
    >
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <Image
            src={logo}
            alt={`${asset.symbol} icon`}
            width={24}
            height={24}
            quality={100}
            className="w-6 h-6 rounded-full border border-primary-150"
            onError={() => {
              setLogo(defaultIconUrl);
            }}
          />

          <Image
            src={networkIcons[asset.chainId]}
            alt={`${asset.chainId} icon`}
            width={11}
            height={11}
            quality={100}
            className="w-[11px] h-[11px] rounded-full border border-primary-2750 absolute bottom-0 left-0"
          />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <h2 className="text-[14px] leading-[18.48px] text-primary-400 font-medium">
            {asset.name}
          </h2>

          <span className="text-[11px] leading-[13.64px] text-primary-100">
            {formatedBalance} {asset.symbol}
          </span>
        </div>
      </div>
      <span className="text-[13px] leading-[16.12px] text-primary-1800 font-medium">
        {asset.balanceUSD ? `$${formatedUsdBalance}` : "-"}
      </span>
    </a>
  );
};

export default AssetItem;
