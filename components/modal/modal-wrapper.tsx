import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalWrapperProps } from "./types";
import { useIsMobile } from "../../hooks/useIsMobile";
import classNames from "classnames";
import LWClickAnimation from "../click-animation";
import { CloseIcon } from "@/public/icons";

function ModalWrapper({
  title = "",
  isOpen,
  onClose,
  children,
  variant = "default",
}: ModalWrapperProps) {
  const isMobile = useIsMobile();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    desktop: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    mobile: {
      hidden: { y: "100%" },
      visible: { y: 0 },
    },
  };

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
    <AnimatePresence>
      {isOpen && (
        <div
          className={classNames("fixed inset-0 z-50", {
            "justify-center items-center flex": variant === "default",
            "justify-end pt-4 md:p-10 flex": variant === "flush-right",
          })}
        >
          <motion.div
            className="fixed inset-0 bg-black/50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {variant === "default" && (
            <motion.div
              className={`bg-white rounded-3xl overflow-hidden z-50 ${
                isMobile
                  ? "fixed bottom-0 left-0 right-0 rounded-b-none"
                  : "w-[400px] fixed"
              }`}
              variants={isMobile ? modalVariants.mobile : modalVariants.desktop}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "tween" }}
            >
              <div className="flex flex-col justify-center items-center mt-4 border-[#EAEEF4] border-b-[1px] pb-5">
                {isMobile && (
                  <div className="h-[4px] w-[40px] bg-[#E2E8F0] rounded-full" />
                )}
                <h2 className="text-sm font-medium text-center mt-2">
                  {title}
                </h2>
              </div>

              {children}
            </motion.div>
          )}

          {variant === "flush-right" && (
            <motion.div
              variants={isMobile ? modalVariants.mobile : modalVariants.desktop}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "tween" }}
              className="flex gap-3 relative w-full md:w-auto"
            >
              <LWClickAnimation
                onClick={onClose}
                className="p-2.5 bg-white rounded-full md:sticky h-fit absolute z-20 right-0 md:left-0 md:block"
              >
                <CloseIcon />
              </LWClickAnimation>

              <div
                className="flex py-[66px] sticky h-full overflow-auto no-scrollbar bg-white px-6 w-full md:rounded-[32px]"
                style={{
                  borderTopLeftRadius: "32px",
                  borderTopRightRadius: "32px",
                }}
              >
                <div className="md:max-w-[375px]">{children}</div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

export default ModalWrapper;
