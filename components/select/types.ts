type SelectOption = {
  title: string;
  value: string;
};

interface ILWSelect {
  title?: string;
  onClick?: (value: string) => void;
  options?: Array<SelectOption>;
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  fullWidth?: boolean;
}
