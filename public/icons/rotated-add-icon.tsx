const RotatedAddIcon = ({
  fill = "#475569",
  height = 24,
  width = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5.00195 5.00098L19.001 19"
      stroke={fill}
      strokeWidth="0.827586"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.00094 19L19 5.00098"
      stroke={fill}
      strokeWidth="0.827586"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RotatedAddIcon;
