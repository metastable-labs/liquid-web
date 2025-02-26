import useSystemFunctions from "@/hooks/useSystemFunctions";
import classNames from "classnames";
import Image from "next/image";

const ETHSOL = () => {
  const { appState } = useSystemFunctions();
  const images = appState.isSolanaSupported
    ? ["/images/base.png", "/images/sol.png"]
    : ["/images/base.png"];

  return (
    <div className="flex items-center -space-x-2">
      {images.map((image, index) => (
        <div
          key={index}
          className="w-[25px] h-[25px] rounded-full border border-primary-2750 relative"
        >
          <Image
            src={image}
            alt="ETH/SOL"
            width={25}
            height={25}
            quality={100}
            className={classNames(
              "w-[25px] h-[25px] object-cover rounded-full relative",
              {
                "z-0": index === 0,
              }
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default ETHSOL;
