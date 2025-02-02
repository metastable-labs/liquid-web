import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ILWInput {
  variant?: "primary" | "secondary";
  placeholder?: string;
  error?: any;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  register?: UseFormRegisterReturn;
  name: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  instructionLinkText?: string;
  instructionLink?: string;
}

export type { ILWInput };
