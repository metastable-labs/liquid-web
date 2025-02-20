const EmptyWalletIcon = ({
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
      d="M11.275 8.46874C11.0125 8.72499 10.8625 9.09375 10.9 9.4875C10.9563 10.1625 11.575 10.6562 12.25 10.6562H13.4375V11.4C13.4375 12.6937 12.3812 13.75 11.0875 13.75H3.9125C2.61875 13.75 1.5625 12.6937 1.5625 11.4V7.19376C1.5625 5.90001 2.61875 4.84375 3.9125 4.84375H11.0875C12.3812 4.84375 13.4375 5.90001 13.4375 7.19376V8.09376H12.175C11.825 8.09376 11.5063 8.23124 11.275 8.46874Z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5625 7.75607V4.89985C1.5625 4.1561 2.01875 3.49357 2.7125 3.23107L7.675 1.35607C8.45 1.06232 9.28125 1.63734 9.28125 2.46859V4.84358"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1002 8.73122V10.0188C14.1002 10.3625 13.8252 10.6437 13.4752 10.6562H12.2502C11.5752 10.6562 10.9565 10.1625 10.9002 9.48749C10.8627 9.09374 11.0127 8.72498 11.2752 8.46873C11.5065 8.23123 11.8252 8.09375 12.1752 8.09375H13.4752C13.8252 8.10625 14.1002 8.38747 14.1002 8.73122Z"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.375 7.5H8.75"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmptyWalletIcon;
