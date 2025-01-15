const TreeIcon = ({ fill = "#0C0507", height = 40, width = 41 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 41 40"
    fill="none"
  >
    <path
      d="M27.4515 16.7666H13.5515C11.5848 16.7666 10.9015 15.45 12.0515 13.85L19.0015 4.11664C19.8182 2.94997 21.1849 2.94997 21.9849 4.11664L28.9348 13.85C30.1015 15.45 29.4182 16.7666 27.4515 16.7666Z"
      stroke={fill}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.8179 29.9999H11.2012C8.56789 29.9999 7.66789 28.2499 9.21789 26.1166L15.8679 16.7666H25.1512L31.8012 26.1166C33.3512 28.2499 32.4512 29.9999 29.8179 29.9999Z"
      stroke={fill}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 36.6667V30"
      stroke={fill}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TreeIcon;
