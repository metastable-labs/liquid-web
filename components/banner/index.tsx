"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCookies } from "react-cookie";
import classNames from "classnames";

import useSystemFunctions from "@/hooks/useSystemFunctions";

const BANNER_COOKIE = "lwBannerClosed";
const INTRO_MODAL_COOKIE = "HasShowIntroModal";

const LWBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies([BANNER_COOKIE, INTRO_MODAL_COOKIE]);
  const {
    appState: { appIsReady, isAgentLogOpen },
  } = useSystemFunctions();

  const bannerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "3rem" },
    exit: { opacity: 0, height: 0 },
  };

  const animateBodyMargin = (margin: number) => {
    document.body.style.transition = "margin-top 0.5s ease";
    document.body.style.marginTop = `${margin}px`;
  };

  useEffect(() => {
    if (!appIsReady) return;

    const hasShownIntro = cookies[INTRO_MODAL_COOKIE];
    if (!hasShownIntro) return;

    if (cookies[BANNER_COOKIE]) return;

    const timer = setTimeout(() => {
      setIsOpen(true);

      const marginTop = window.innerWidth < 1024 ? 48 : 64;
      animateBodyMargin(marginTop);
    }, 10000);

    return () => clearTimeout(timer);
  }, [cookies, appIsReady]);

  useEffect(() => {
    if (!appIsReady) return;
    if (!cookies[INTRO_MODAL_COOKIE]) return;

    let closeTimer: NodeJS.Timeout;

    if (isOpen) {
      closeTimer = setTimeout(() => {
        setIsOpen(false);
        const marginTop = window.innerWidth < 1024 ? 0 : 16;
        animateBodyMargin(marginTop);
        setCookie(BANNER_COOKIE, "true", {
          path: "/",
          maxAge: 3 * 24 * 60 * 60,
        });
      }, 3 * 60 * 1000);
    }

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isOpen, setCookie, appIsReady, cookies]);

  if (!appIsReady || !cookies[INTRO_MODAL_COOKIE]) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          className={classNames(
            "px-6 py-3 bg-primary-3100 flex items-center justify-center w-screen fixed top-0 left-0",
            {
              "z-50": !isAgentLogOpen,
              "-z-10": isAgentLogOpen,
            }
          )}
        >
          <p className="text-[14px] leading-[24px] text-white">
            Follow our{" "}
            <a
              href="https://warpcast.com/~/channel/liquidapp"
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              channel
            </a>{" "}
            for beta access updates.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LWBanner;
