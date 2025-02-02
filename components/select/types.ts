type SelectOption = {
  title: string;
  value: string;
  icon?: string;
};

interface ILWSelect {
  title?: string;
  onClick?: (value: string) => void;
  options?: Array<SelectOption>;
  disabled?: boolean;
  defaultValue?: string;
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
  fullWidth?: boolean;
}
