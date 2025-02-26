const UserIcon = ({ fill = "#64748B", height = 20, width = 20 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M9.99967 10.0003C12.3009 10.0003 14.1663 8.13485 14.1663 5.83366C14.1663 3.53247 12.3009 1.66699 9.99967 1.66699C7.69849 1.66699 5.83301 3.53247 5.83301 5.83366C5.83301 8.13485 7.69849 10.0003 9.99967 10.0003Z"
      stroke={fill}
      strokeWidth="1.5625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.1585 18.3333C17.1585 15.1083 13.9501 12.5 10.0001 12.5C6.05013 12.5 2.8418 15.1083 2.8418 18.3333"
      stroke={fill}
      strokeWidth="1.5625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UserIcon;
