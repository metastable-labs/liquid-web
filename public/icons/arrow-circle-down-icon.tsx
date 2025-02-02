const ArrowCircleDownIcon = ({
  fill = "#020617",
  height = 21,
  width = 20,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M10 18.8332C14.6024 18.8332 18.3333 15.1022 18.3333 10.4998C18.3333 5.89746 14.6024 2.1665 10 2.1665C5.39763 2.1665 1.66667 5.89746 1.66667 10.4998C1.66667 15.1022 5.39763 18.8332 10 18.8332Z"
      stroke={fill}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.05833 9.4502L10 12.3835L12.9417 9.4502"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowCircleDownIcon;
