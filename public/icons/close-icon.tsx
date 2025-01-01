const CloseIcon = ({
  fill = "#0C0507",
  height = 24,
  width = 24,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.7128 16.773L7.22748 8.28777C6.93757 7.99785 6.93757 7.51702 7.22748 7.22711C7.5174 6.93719 7.99823 6.93719 8.28814 7.22711L16.7734 15.7124C17.0633 16.0023 17.0633 16.4831 16.7734 16.773C16.4835 17.063 16.0027 17.063 15.7128 16.773Z"
      fill={fill}
    />
    <path
      d="M7.22658 16.773C6.93666 16.4831 6.93666 16.0023 7.22658 15.7124L15.7119 7.22711C16.0018 6.93719 16.4826 6.93719 16.7725 7.22711C17.0624 7.51702 17.0624 7.99785 16.7725 8.28777L8.28724 16.773C7.99732 17.063 7.51649 17.063 7.22658 16.773Z"
      fill={fill}
    />
  </svg>
);

export default CloseIcon;
