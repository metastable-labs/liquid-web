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

const formatNumberWithSuffix = (
  num: number | string | undefined,
  decimals = 2
): string => {
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
  return numValue.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
  });
};

const truncateWalletAddress = (
  text: `0x${string}` | string,
  startChars = 5,
  endChars = 5
) => {
  if (text.length <= startChars + endChars) {
    return text;
  }
  return `${text.substring(0, startChars)}...${text.substring(
    text.length - endChars
  )}`;
};

const formatBalance = (balance: string | number, decimals = 2): string => {
  const balanceString = balance.toString();
  const valuesBeforeDecimal = balanceString.split(".")[0];
  const valuesAfterDecimal = balanceString.split(".")[1];
  const truncatedDecimals = valuesAfterDecimal
    ? valuesAfterDecimal?.slice(0, decimals)
    : "";

  return `${valuesBeforeDecimal}.${truncatedDecimals}`;
};

function convertToScript(
  number: number,
  type: "super" | "sub" = "super"
): string {
  const scriptMap: {
    [key: string]: {
      super: string;
      sub: string;
    };
  } = {
    "0": { super: "⁰", sub: "₀" },
    "1": { super: "¹", sub: "₁" },
    "2": { super: "²", sub: "₂" },
    "3": { super: "³", sub: "₃" },
    "4": { super: "⁴", sub: "₄" },
    "5": { super: "⁵", sub: "₅" },
    "6": { super: "⁶", sub: "₆" },
    "7": { super: "⁷", sub: "₇" },
    "8": { super: "⁸", sub: "₈" },
    "9": { super: "⁹", sub: "₉" },
  };

  return String(number)
    .split("")
    .map((digit) => scriptMap[digit][type])
    .join("");
}

function formatPrice(number: number) {
  let numberString = number.toFixed(20);
  numberString = numberString.replace(/0+$/, "");

  const significantIndex = numberString
    .split("")
    .findIndex((char) => char !== "0" && char !== ".");
  const leadingZerosCount = significantIndex - numberString.indexOf(".") - 1;

  if (number < 1) {
    if (leadingZerosCount >= 5) {
      const subscript = convertToScript(leadingZerosCount);
      const [wholePart, decimalPart] = numberString.split(".");
      let significantDecimal = decimalPart.slice(leadingZerosCount);

      if (significantDecimal.length > 3) {
        significantDecimal = Math.round(
          parseFloat(`0.${significantDecimal}`) * 1000
        ).toString();
      }

      const formattedDecimal = `0${subscript}${significantDecimal}`;

      return {
        whole: wholePart,
        decimal: formattedDecimal,
        value: `${wholePart}.${formattedDecimal}`,
      };
    }

    if (leadingZerosCount < 5 && leadingZerosCount > 0) {
      const [wholePart, decimalPart] = numberString.split(".");
      const leadingZeros = decimalPart.slice(0, leadingZerosCount);
      let significantDecimal = decimalPart.slice(leadingZerosCount);

      if (significantDecimal.length > 3) {
        significantDecimal = Math.round(
          parseFloat(`0.${significantDecimal}`) * 1000
        ).toString();
      }

      const formattedDecimal = `${leadingZeros}${significantDecimal}`;

      return {
        whole: wholePart,
        decimal: formattedDecimal,
        value: `${wholePart}.${formattedDecimal}`,
      };
    }

    if (leadingZerosCount <= 0) {
      const [wholePart, decimalPart] = numberString.split(".");
      const significantDecimal = decimalPart.slice(0, 7).replace(/0+$/, "");

      return {
        whole: wholePart,
        decimal: significantDecimal,
        value: `${wholePart}.${significantDecimal}`,
      };
    }
  } else {
    const [wholePart, decimalPart] = numberString.split(".");
    const significantDecimal = (decimalPart || "0").slice(0, 2).padEnd(2, "0");

    return {
      whole: wholePart,
      decimal: significantDecimal,
      value: `${wholePart}.${significantDecimal}`,
    };
  }

  return {
    whole: "0",
    decimal: "00",
    value: `0.00`,
  };
}

const generateAreaChartData = (period: Period, isSecondary?: boolean) => {
  const data = [];
  const today = new Date();
  let value = 500;
  let startTime;

  switch (period) {
    case "1h":
      startTime = new Date(today.getTime() - 60 * 60 * 1000);
      for (let i = 0; i <= 60; i += 5) {
        const date = new Date(startTime.getTime() + i * 60 * 1000);
        value += Math.random() * 20 - 10;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    case "24h":
      startTime = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 24; i += 2) {
        const date = new Date(startTime.getTime() + i * 60 * 60 * 1000);
        value += Math.random() * 50 - 25;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    case "1w":
      startTime = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 7; i++) {
        const date = new Date(startTime.getTime() + i * 24 * 60 * 60 * 1000);
        value += Math.random() * 100 - 50;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    case "1m":
      startTime = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 4; i++) {
        const date = new Date(
          startTime.getTime() + i * 7 * 24 * 60 * 60 * 1000
        );
        value += Math.random() * 200 - 100;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    default:
      throw new Error("Invalid period. Choose from '1h', '24h', '1w', or '1m'");
  }

  const smoothingFactor = 0.3;
  for (let i = 1; i < data.length - 1; i++) {
    data[i].value = Math.round(
      data[i].value * smoothingFactor +
        ((data[i - 1].value + data[i + 1].value) / 2) * (1 - smoothingFactor)
    );
  }

  return data;
};

const formatAmount = (amount?: number | string, decimals = 4): number => {
  if (!amount) return 0;

  const factor = Math.pow(10, decimals);
  const truncatedValue = Math.floor(Number(amount) * factor) / factor;
  return truncatedValue;
};

const formatCurrency = (amount?: number | string, decimals = 4) => {
  if (!amount) return { whole: "0", decimal: "00" };

  const [whole, decimal] = formatAmount(amount, decimals).toString().split(".");
  return { whole, decimal };
};

export {
  appearAnimation,
  svgAnimation,
  generateRandomColor,
  generateConsistentColor,
  formatNumberWithSuffix,
  truncateDecimal,
  formatWithThousandSeparator,
  truncateWalletAddress,
  formatBalance,
  formatPrice,
  convertToScript,
  generateAreaChartData,
  formatAmount,
  formatCurrency,
};
