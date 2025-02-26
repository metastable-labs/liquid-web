import Image from "next/image";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Area,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { formatPrice } from "@/utils/helpers";

const formatXAxis = (timestamp: number, period: Period) => {
  const date = moment.unix(timestamp);
  switch (period) {
    case "1h":
      return date.format("HH:mm");
    case "24h":
      return date.format("HH:mm");
    case "1w":
      return date.format("ddd");
    case "1m":
      return date.format("MMM DD");
    default:
      return date.format("MMM DD");
  }
};
const formatYAxisTick = (tickValue: number) => {
  const { value } = formatPrice(tickValue);
  return value;
};

const AreaChartComponent = ({ data, period = "1w", loading }: ILWAreaChart) => {
  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
    active,
    payload,
    label,
  }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const value = Number(payload[0].value || 0);
    const { whole, decimal } = formatPrice(value);

    const parsedDate = moment(label);
    const day = parsedDate.format("M/D/YY");
    const time = parsedDate.format("h:mma");

    return (
      <div className="flex flex-col items-start gap-0.5 bg-primary-2850 border border-primary-3550 p-5 rounded-xl shadow-tooltip">
        <div className="w-full flex items-center justify-between gap-10 text-xs text-primary-2750 font-Aeonik font-medium uppercase">
          <span>{day}</span>
          <span>{time}</span>
        </div>

        <p className="font-Clash-Display text-2xl tracking-[-0.72px] font-medium">
          $<span>{whole}</span>.
          <span className="text-primary-750">{decimal}</span>
        </p>
      </div>
    );
  };

  const items = [
    <ResponsiveContainer key="chart" width="100%" height="100%">
      <AreaChart key={period} data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(1, 133, 88, 0.13)" />
            <stop offset="100%" stopColor="rgba(56, 199, 147, 0)" />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ fill: "rgba(111, 118, 126, 0.75)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => formatXAxis(tick, period)}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "rgba(111, 118, 126, 0.75)" }}
          axisLine={false}
          tickLine={false}
          orientation="right"
          tickFormatter={formatYAxisTick}
        />
        <CartesianGrid stroke="#F6F8FA" vertical={false} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#EFEFEF", strokeWidth: 3 }}
          labelFormatter={(label) => label}
        />
        <Area
          key={period}
          type="monotone"
          dataKey="value"
          stroke="#018558"
          fill="url(#colorValue)"
          strokeWidth={2}
          clipPath="none"
          activeDot={{ r: 6.5, stroke: "#fff", strokeWidth: 3 }}
        />
      </AreaChart>
    </ResponsiveContainer>,

    <Image
      key="loader"
      src="/images/chart-loader.png"
      quality={100}
      width={200}
      height={200}
      alt="Loading chart"
      className="animate-pulse w-full h-full"
    />,
  ];

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={loading ? "loader" : "chart"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        {items[+loading]}
      </motion.div>
    </AnimatePresence>
  );
};

export default AreaChartComponent;
