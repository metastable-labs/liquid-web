"use client";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import { CloseAltIcon, ToastIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";

const LWToastNotification = () => {
  const { appState } = useSystemFunctions();
  const { hideToast } = useAppActions();

  const show = appState.toast.show;
  const type = appState.toast.type;
  const message = appState.toast.message;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: "-100%", scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            scale: 0.5,
            transition: { duration: 0.5 },
          }}
          className="w-screen flex justify-center items-center fixed z-[999999999] top-[8%] left-0 px-4"
        >
          <motion.div
            className={classNames(
              "p-3.5 w-fit max-w-96 rounded-xl shadow-dark flex items-center gap-3 justify-between shadow-lg",
              {
                "bg-primary-1550": type == "error",
                "bg-primary-700": type == "success",
                "bg-primary-1600": type == "info",
                "bg-primary-1650": type == "warning",
              }
            )}
          >
            <div className="w-fit h-fit">
              <ToastIcon variant={type} />
            </div>

            <p className="capitalize text-[14px] leading-[18.48px] text-primary-1450">
              {message}
            </p>

            <LWClickAnimation onClick={hideToast} className="w-fit h-fit">
              <CloseAltIcon />
            </LWClickAnimation>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LWToastNotification;
