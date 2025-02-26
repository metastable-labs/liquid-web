const WalletIconInactive = ({
  fill = "#64748B",
  width = 25,
  height = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
  >
    <path
      d="M13.5 11.1499H7.5"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 11.1498V6.52985C2.5 4.48985 4.15 2.83984 6.19 2.83984H11.81C13.85 2.83984 15.5 4.10984 15.5 6.14984"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.98 12.1999C17.48 12.6799 17.24 13.4199 17.44 14.1799C17.69 15.1099 18.61 15.6999 19.57 15.6999H20.5V17.1499C20.5 19.3599 18.71 21.1499 16.5 21.1499H6.5C4.29 21.1499 2.5 19.3599 2.5 17.1499V10.1499C2.5 7.9399 4.29 6.1499 6.5 6.1499H16.5C18.7 6.1499 20.5 7.9499 20.5 10.1499V11.5999H19.42C18.86 11.5999 18.35 11.8199 17.98 12.1999Z"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.5002 12.6201V14.6801C22.5002 15.2401 22.0402 15.7001 21.4702 15.7001H19.5402C18.4602 15.7001 17.4702 14.9101 17.3802 13.8301C17.3202 13.2001 17.5602 12.6101 17.9802 12.2001C18.3502 11.8201 18.8602 11.6001 19.4202 11.6001H21.4702C22.0402 11.6001 22.5002 12.0601 22.5002 12.6201Z"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WalletIconInactive;
