const ToastIcon = ({
  variant,
}: {
  variant: "success" | "error" | "info" | "warning";
}) => {
  switch (variant) {
    case "success":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25225 13L14.5548 7.69675L13.4943 6.63625L9.25225 10.879L7.1305 8.75725L6.07 9.81775L9.25225 13Z"
            fill="#38C793"
          />
        </svg>
      );
    case "error":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25 12.25V13.75H10.75V12.25H9.25ZM9.25 6.25V10.75H10.75V6.25H9.25Z"
            fill="#DF1C41"
          />
        </svg>
      );
    case "info":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25 6.25V10.75H10.75V6.25H9.25ZM9.25 12.25V13.75H10.75V12.25H9.25Z"
            fill="#4691FE"
          />
        </svg>
      );
    case "warning":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25 6.25V12.25H10.75V6.25H9.25ZM9.25 13.75V15.25H10.75V13.75H9.25Z"
            fill="#FFA800"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default ToastIcon;
