const ChartIcon = ({ fill = "white", height = 18, width = 19 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 18"
    fill="none"
  >
    <path
      d="M7.25098 16.4999H11.751C15.501 16.4999 17.001 14.9999 17.001 11.2499V6.74988C17.001 2.99988 15.501 1.49988 11.751 1.49988H7.25098C3.50098 1.49988 2.00098 2.99988 2.00098 6.74988V11.2499C2.00098 14.9999 3.50098 16.4999 7.25098 16.4999Z"
      stroke={fill}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.126 13.8749C12.951 13.8749 13.626 13.1999 13.626 12.3749V5.62488C13.626 4.79988 12.951 4.12488 12.126 4.12488C11.301 4.12488 10.626 4.79988 10.626 5.62488V12.3749C10.626 13.1999 11.2935 13.8749 12.126 13.8749Z"
      stroke={fill}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.87598 13.8749C7.70098 13.8749 8.37598 13.1999 8.37598 12.3749V9.74988C8.37598 8.92488 7.70098 8.24988 6.87598 8.24988C6.05098 8.24988 5.37598 8.92488 5.37598 9.74988V12.3749C5.37598 13.1999 6.04348 13.8749 6.87598 13.8749Z"
      stroke={fill}
      strokeWidth="1.125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChartIcon;
