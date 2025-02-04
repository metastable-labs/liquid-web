import { motion } from "framer-motion";

import { svgAnimation } from "@/utils/helpers";

const CheckIcon = ({ fill = "white", height = 16, width = 16 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
  >
    <motion.path
      {...svgAnimation}
      d="M13.1817 5.2726L6.8187 11.6365L3 7.8178L4.2726 6.5452L6.8187 9.0913L11.9091 4L13.1817 5.2726Z"
      fill={fill}
    />
  </svg>
);

export default CheckIcon;
