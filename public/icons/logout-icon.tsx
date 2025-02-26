const LogoutIcon = ({
  fill = "#64748B",
  height = 15,
  width = 15,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="none"
  >
    <path
      d="M9.4375 4.7249C9.24375 2.4749 8.0875 1.55615 5.55625 1.55615H5.475C2.68125 1.55615 1.5625 2.6749 1.5625 5.46865V9.54365C1.5625 12.3374 2.68125 13.4562 5.475 13.4562H5.55625C8.06875 13.4562 9.225 12.5499 9.43125 10.3374"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.62578 7.5H12.7383"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3438 5.40625L13.4375 7.5L11.3438 9.59375"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LogoutIcon;
