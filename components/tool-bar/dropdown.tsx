import Image from "next/image";
import { motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";

import useTruncateText from "@/hooks/useTruncateText";
import useCopy from "@/hooks/useCopy";
import { EmptyWalletIcon, LogoutIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";

const isAddress = (value: string): boolean => /^0x[a-fA-F0-9]{40}$/.test(value);

const Dropdown = () => {
  const { user, logout } = usePrivy();
  const { truncate } = useTruncateText();
  const { handleCopy } = useCopy();
  const { navigate } = useSystemFunctions();
  const { linkedFarcaster, linkedTwitter } = useLinkedAccounts();

  const address = user?.wallet?.address || "";

  const username =
    linkedFarcaster?.username ||
    linkedTwitter?.username ||
    truncate(address, 4, 5);

  const avatar = linkedTwitter?.profilePictureUrl || linkedFarcaster?.pfp || "";

  const actions = [
    {
      icon: <EmptyWalletIcon />,
      title: "Wallet",
      action: () => handleCopy(address),
    },
    {
      icon: <LogoutIcon />,
      title: "Log out",
      action: () => {
        logout().then(() => {
          navigate.replace("/");
        });
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full right-0 mt-2 z-20 bg-white shadow-profileDropdown rounded-[10px] p-6 flex flex-col gap-5 min-w-[256px]"
    >
      <div className="flex items-center gap-2 px-3 pb-5 border-b-[0.5px] border-b-primary-2450 w-full">
        <Image
          src={avatar}
          alt={`${avatar} avatar`}
          width={40}
          height={40}
          quality={100}
          className="w-10 h-10 object-cover rounded-full"
        />

        <div className="flex items-center justify-center gap-1">
          <span className="text-[12px] leading-[16px] text-primary-350">
            {`${isAddress(username) ? "" : "@"}${username}`}
          </span>

          {linkedFarcaster && (
            <Image
              src="/images/farcaster.png"
              alt="farcaster logo"
              width={13}
              height={13}
              quality={100}
              className="w-[13px] h-[13px] object-cover rounded-full"
            />
          )}

          {linkedTwitter && (
            <Image
              src="/images/twitter.webp"
              alt="farcaster logo"
              width={13}
              height={13}
              quality={100}
              className="w-[13px] h-[13px] object-cover rounded-full"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {actions.map(({ icon, title, action }, index) => (
          <LWClickAnimation
            key={index}
            className="flex items-center gap-1 cursor-pointer w-fit"
            onClick={action}
          >
            {icon}

            <span className="text-[11px] leading-[13.64px] text-primary-50">
              {title}
            </span>
          </LWClickAnimation>
        ))}
      </div>
    </motion.div>
  );
};

export default Dropdown;
