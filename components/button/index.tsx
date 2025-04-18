import classNames from "classnames";
import { motion } from "framer-motion";
import Spinner from "../ui/spinner";

const LWButton = ({
  title,
  className,
  disabled,
  fullWidth = false,
  loading,
  onClick,
  type,
  variant = "primary",
}: ILWButton) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      className={classNames(
        `flex justify-center items-center rounded-[21.6px] ${className}`,
        {
          "px-20 py-3.5": variant === "primary",
          "px-14 h-[52px]":
            variant === "primaryAlt" ||
            variant === "secondary" ||
            variant === "danger",
          "bg-primary-350": variant === "primary" || variant === "primaryAlt",
          "bg-primary-1350": variant === "danger",
          "border border-primary-550 bg-primary-600": variant === "secondary",
          "w-full": fullWidth,
          "opacity-60 pointer-events-none": disabled || loading,
        }
      )}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading && <Spinner size={6} />}

      {!loading && (
        <span
          className={classNames("lg:whitespace-nowrap font-QuantaGroteskPro", {
            "text-[16px] leading-[16px] font-semibold": variant === "primary",
            "text-white":
              variant === "primary" ||
              variant === "primaryAlt" ||
              variant === "danger",
            "text-[18px] leading-[18px] font-semibold":
              variant === "secondary" ||
              variant === "primaryAlt" ||
              variant === "danger",
            "text-primary-1800": variant === "secondary",
          })}
        >
          {title}
        </span>
      )}
    </motion.button>
  );
};

export default LWButton;
