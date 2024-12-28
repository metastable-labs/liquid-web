const SwapHorizontalIcon = ({
  fill = "white",
  height = 18,
  width = 18,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M15.3762 11.2423L11.6187 15.0073"
      stroke={fill}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.62598 11.2423H15.376"
      stroke={fill}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.62598 6.75731L6.38348 2.99231"
      stroke={fill}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.376 6.75732H2.62598"
      stroke={fill}
      strokeWidth="1.125"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SwapHorizontalIcon;
