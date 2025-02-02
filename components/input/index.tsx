import classNames from "classnames";

import { ILWInput } from "./types";

const LWInput = ({
  name,
  className,
  disabled,
  error,
  instructionLink,
  instructionLinkText,
  label,
  placeholder,
  register,
  type = "text",
  variant = "primary",
}: ILWInput) => (
  <div
    className={classNames({
      "flex flex-col gap-1.5": variant === "primary",
    })}
  >
    <label
      htmlFor={name}
      className="text-[13px] leading-[16.12px] text-primary-400 font-medium"
    >
      {label}

      {instructionLink && (
        <>
          &emsp;
          <a
            href={instructionLink}
            target="_blank"
            className="font-normal text-primary-2400"
          >
            (<span className="underline">{instructionLinkText}</span>)
          </a>
        </>
      )}
    </label>

    <input
      name={name}
      disabled={disabled}
      {...register}
      className={classNames(
        `self-stretch w-full border font-normal outline-none ${className}`,
        {
          "p-3.5 bg-white border-primary-150 rounded-2xl text-[14px] leading-[18.48px] placeholder-primary-2400":
            variant === "primary",
        }
      )}
      placeholder={placeholder}
      type={type}
    />
  </div>
);

export default LWInput;
