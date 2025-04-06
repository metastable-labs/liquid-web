import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { LogoutIcon, MenuIcon, RotatedAddIcon } from "@/public/icons";
import { navigationItems } from "@/constants/navigation";
import useTruncateText from "@/hooks/useTruncateText";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import LWClickAnimation from "../click-animation";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

const Menu = () => {
  const { pathname, navigate } = useSystemFunctions();
  const { user, logout } = usePrivy();
  const { truncate } = useTruncateText();
  const { linkedFarcaster, linkedTwitter } = useLinkedAccounts();

  const [isOpen, setIsOpen] = useState(false);

  const address = user?.wallet?.address || "";
  const userName =
    linkedFarcaster?.username ||
    linkedTwitter?.username ||
    truncate(address, 4, 5);

  const avatar = linkedTwitter?.profilePictureUrl || linkedFarcaster?.pfp || "";

  const onClose = () => setIsOpen(false);

  const onLogout = () =>
    logout().then(() => {
      navigate.replace("/");
    });

  useEffect(() => onClose(), [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <LWClickAnimation
        onClick={() => setIsOpen(true)}
        className="w-fit h-fit xl:hidden"
      >
        <MenuIcon />
      </LWClickAnimation>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 justify-end flex xl:hidden">
            <motion.div
              className="fixed inset-0 bg-black/50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "tween" }}
              className="bg-white px-2 py-11 z-10 flex flex-col gap-7 items-stretch relative"
            >
              <div className="flex items-center justify-end">
                <LWClickAnimation className="w-fit h-fit" onClick={onClose}>
                  <RotatedAddIcon />
                </LWClickAnimation>
              </div>

              <div className="flex flex-col items-stretch gap-5">
                <div className="pb-[19px] px-5 flex items-center gap-2.5 border-b-[0.5px] border-b-primary-550">
                  <Image
                    src={avatar}
                    alt={`${userName} avatar`}
                    width={44}
                    height={44}
                    quality={100}
                    className="w-11 h-11 object-cover rounded-full"
                  />

                  <div className="flex items-center justify-center gap-1">
                    <span className="text-[13px] leading-[16.2px] text-primary-350">
                      @{userName}
                    </span>
                    {linkedFarcaster && (
                      <Image
                        src="/images/farcaster.png"
                        alt="farcaster logo"
                        width={16}
                        height={16}
                        quality={100}
                        className="w-4 h-4 object-cover rounded-full"
                      />
                    )}

                    {linkedTwitter && (
                      <Image
                        src="/images/twitter.png"
                        alt="farcaster logo"
                        width={16}
                        height={16}
                        quality={100}
                        className="w-4 h-4 object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col px-5 gap-6">
                  {navigationItems.map(({ route, title, icons }) => {
                    const isActive = pathname === route;

                    return (
                      <Link
                        key={route}
                        href={route}
                        className="flex items-center gap-5 transition-all duration-300"
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
                          {isActive ? icons.active : icons.inactive}
                        </div>
                        <span
                          className={classNames(
                            "text-[11px] leading-[13.64px] transition-all duration-500",
                            isActive
                              ? "font-bold text-[#020617]"
                              : "font-normal text-[#64748B]"
                          )}
                        >
                          {title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <LWClickAnimation
                className="flex items-center gap-1 cursor-pointer w-fit absolute bottom-9 left-7"
                onClick={onLogout}
              >
                <LogoutIcon width={24} height={24} />

                <span className="text-[11px] leading-[13.64px] text-primary-50">
                  Logout
                </span>
              </LWClickAnimation>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
