import { useState } from "react";

function useFormattedAmount(initialValue = "") {
  const [amount, setAmount] = useState(initialValue);

  const updateAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const decimals = (numericValue.match(/\./g) || []).length;

    if (decimals > 1) return;

    setAmount(numericValue);
  };

  const amountWithoutThousandSeparator = amount.replace(/,/g, "");

  const valuesBeforeDecimal = amount.split(".")[0];
  const valuesAfterDecimal = amount.split(".")[1];
  const hasDecimal = (amount.match(/\./g) || []).length > 0;

  const formattedValuesBeforeDecimal = amount
    ? Number(valuesBeforeDecimal).toLocaleString()
    : "";

  const formattedValuesAfterDecimal = hasDecimal
    ? `.${valuesAfterDecimal || ""}`
    : "";

  const amountWithThousandSeparator = `${formattedValuesBeforeDecimal}${formattedValuesAfterDecimal}`;

  return {
    amount,
    updateAmount,
    amountWithThousandSeparator,
    amountWithoutThousandSeparator,
  };
}

export default useFormattedAmount;
