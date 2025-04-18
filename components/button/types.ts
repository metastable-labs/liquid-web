type ButtonVariants =
  | "primary"
  | "primaryAlt"
  | "secondary"
  | "tertiary"
  | "danger";

interface ILWButton {
  variant?: ButtonVariants;
  onClick?: () => void;
  title: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
}
