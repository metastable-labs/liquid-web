import classNames from "classnames";
import { motion } from "framer-motion";

import { ArrowUpIcon } from "@/public/icons";

interface ChangeIndicatorProps {
  change: number;
}

const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ change }) => {
  const price_increased = true;
  const price_change = 1;

  const isPositive = price_change > 0;
  const realCastChange = price_increased
    ? Math.abs(price_change)
    : -Math.abs(price_change);

  const loading = false;

  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-1 text-[14px] leading-[24px] tracking-[-0.14px] font-medium",
        {
          "text-primary-2550": isPositive && !loading,
          "text-primary-2500": !isPositive && !loading,
          "text-primary-2250 animate-pulse": loading,
        }
      )}
    >
      <motion.div animate={{ rotate: isPositive ? 0 : 180 }}>
        <ArrowUpIcon
          fill={loading ? "#e2e4e9" : isPositive ? "#32AE60" : "#DF1C41"}
        />
      </motion.div>
      {loading ? "--" : realCastChange}%
    </div>
  );
};

export default ChangeIndicator;
