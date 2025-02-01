import classNames from "classnames";

const LWButton = ({
  title,
  className,
  disabled,
  fullWidth = false,
  loading,
  onClick,
  type,
  variant = "primary",
}: ILWButton) => {
  return (
    <button
      className={classNames(`${className}`, {
        "px-[80px] py-3.5 flex justify-center items-center rounded-[30px] bg-primary-350 transition-all duration-500":
          variant === "primary",
        "w-full": fullWidth,
        "opacity-60 pointer-events-none": disabled || loading,
      })}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      <span
        className={classNames("", {
          "text-[16px] leading-[16px] font-semibold text-white":
            variant === "primary",
        })}
      >
        {title}
      </span>
    </button>
  );
};

export default LWButton;
