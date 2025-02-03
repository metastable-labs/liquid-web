import classNames from "classnames";
import { motion } from "framer-motion";

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
        `flex justify-center items-center rounded-[30px] ${className}`,
        {
          "px-20 py-3.5": variant === "primary",
          "px-14 h-[52px]": variant === "primaryAlt" || variant === "secondary",
          "bg-primary-350": variant === "primary" || variant === "primaryAlt",
          "border border-primary-550 bg-primary-600": variant === "secondary",
          "w-full": fullWidth,
          "opacity-60 pointer-events-none": disabled || loading,
        }
      )}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      <span
        className={classNames("lg:whitespace-nowrap", {
          "text-[16px] leading-[16px] font-semibold": variant === "primary",
          "text-white": variant === "primary" || variant === "primaryAlt",
          "text-[18px] leading-[18px] font-semibold font-QuantaGroteskPro":
            variant === "secondary" || variant === "primaryAlt",
          "text-primary-1800": variant === "secondary",
        })}
      >
        {title}
      </span>
    </motion.button>
  );
};

export default LWButton;
