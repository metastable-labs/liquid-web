import classNames from "classnames";
import { motion } from "framer-motion";

const LWClickAnimation = ({
  children,
  onClick,
  className,
  stopPropagation,
  disabled,
}: ILWClickAnimation) => {
  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick?.();
  };
  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={classNames(`cursor-pointer ${className}`, {
        "pointer-events-none opacity-70": disabled,
      })}
    >
      {children}
    </motion.div>
  );
};

export default LWClickAnimation;
