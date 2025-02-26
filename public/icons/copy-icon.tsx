const CopyIcon = ({ width = 25, height = 24, fill = "#0C0507" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
  >
    <path
      d="M16.7998 12.9V17.1C16.7998 20.6 15.3998 22 11.8998 22H7.6998C4.1998 22 2.7998 20.6 2.7998 17.1V12.9C2.7998 9.4 4.1998 8 7.6998 8H11.8998C15.3998 8 16.7998 9.4 16.7998 12.9Z"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.7998 6.9V11.1C22.7998 14.6 21.3998 16 17.8998 16H16.7998V12.9C16.7998 9.4 15.3998 8 11.8998 8H8.7998V6.9C8.7998 3.4 10.1998 2 13.6998 2H17.8998C21.3998 2 22.7998 3.4 22.7998 6.9Z"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CopyIcon;
