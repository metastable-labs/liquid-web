const appearAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const svgAnimation = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
};

const truncateDecimal = (amount?: number | string, decimals = 4): number => {
  if (!amount) return 0;

  const factor = Math.pow(10, decimals);
  const truncatedValue = Math.floor(Number(amount) * factor) / factor;
  return truncatedValue;
};

const formatWithThousandSeparator = (value: string) => {
  if (!value) return "";
  const numberValue = parseFloat(value.replace(/,/g, ""));
  if (isNaN(numberValue)) return value;
  return numberValue.toLocaleString(undefined, { maximumFractionDigits: 5 });
};

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Generates a consistent color for a given string.
 * The same string will always generate the same color.
 * @param text - The input string to generate a color for.
 * @returns A hex color string.
 */
const generateConsistentColor = (text: string): string => {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `#${((hash >> 0) & 0xffffff).toString(16).padStart(6, "0")}`;

  return color;
};

const formatNumberWithSuffix = (num: number | string | undefined): string => {
  if (!num) return "0";

  const numValue = typeof num === "string" ? Number(num) : num;

  if (isNaN(numValue)) return "0";

  const formatWithPrecision = (value: number) => {
    return value % 1 === 0
      ? value.toFixed(0)
      : value.toFixed(2).replace(/\.?0+$/, "");
  };

  if (numValue >= 1e12) {
    return formatWithPrecision(numValue / 1e12) + "t";
  }
  if (numValue >= 1e9) {
    return formatWithPrecision(numValue / 1e9) + "b";
  }
  if (numValue >= 1e6) {
    return formatWithPrecision(numValue / 1e6) + "m";
  }
  if (numValue >= 1e3) {
    return formatWithPrecision(numValue / 1e3) + "k";
  }
  return numValue.toFixed(2).toString();
};

export {
  appearAnimation,
  svgAnimation,
  generateRandomColor,
  generateConsistentColor,
  formatNumberWithSuffix,
  truncateDecimal,
  formatWithThousandSeparator,
};
