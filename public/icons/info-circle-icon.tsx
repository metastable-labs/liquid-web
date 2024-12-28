const InfoCircleIcon = ({
  fill = "#64748B",
  height = 10,
  width = 10,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M5.00016 9.16677C7.29183 9.16677 9.16683 7.29177 9.16683 5.0001C9.16683 2.70844 7.29183 0.833435 5.00016 0.833435C2.7085 0.833435 0.833496 2.70844 0.833496 5.0001C0.833496 7.29177 2.7085 9.16677 5.00016 9.16677Z"
      stroke={fill}
      strokeWidth="0.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 3.33344V5.41677"
      stroke={fill}
      strokeWidth="0.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.99756 6.66681H5.0013"
      stroke={fill}
      strokeWidth="0.833333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default InfoCircleIcon;
