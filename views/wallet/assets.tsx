import { useEffect, useState } from "react";

import { ArrowRightIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import AssetItem from "./asset-item";

const Assets = () => {
  const { walletState } = useSystemFunctions();
  const [assets, setAssets] = useState<Wallet[]>([]);
  const showSeeAll = assets?.length && assets?.length <= 4;

  const handleSeeAll = () => {
    const assets = walletState?.assets || [];
    if (showSeeAll) {
      setAssets([...assets]);
    } else {
      const firstFourAssets = assets.slice(0, 4);
      setAssets([...firstFourAssets]);
    }
  };

  useEffect(() => {
    const assets = walletState.assets;

    if (!assets) return;

    if (assets.length > 4) {
      const firstFourAssets = assets.slice(0, 4);
      setAssets([...firstFourAssets]);
    } else {
      setAssets([...assets]);
    }
  }, [walletState.assets]);

  return (
    <div className="flex flex-col self-stretch items-stretch gpa-[29px]">
      <h1 className="mb-5 text-[24px] leading-[26.88px] tracking-[-0.6px] text-primary-50 font-medium">
        Assets
      </h1>

      <div className="flex flex-col self-stretch items-stretch gap-1">
        {assets && assets.length > 0 ? (
          <>
            {assets.map((asset, index) => (
              <AssetItem key={index} asset={asset} />
            ))}

            {walletState.assets && walletState.assets.length > 4 && (
              <LWClickAnimation
                onClick={handleSeeAll}
                className="flex items-center gap-1 w-fit"
              >
                <span className="text-[13px] leading-[16.12px] text-primary-400">
                  {showSeeAll ? "See all" : "See less"}
                </span>
                <ArrowRightIcon fill="#0C0507" width={14} height={14} />
              </LWClickAnimation>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-10">
            <p className="text-[16px] leading-[19.2px] text-gray-500">
              You don’t have any assets yet.
            </p>
            <p className="mt-2 text-[14px] leading-[16.8px] text-gray-400">
              Add funds to your wallet to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assets;
