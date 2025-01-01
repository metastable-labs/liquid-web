import { useState } from "react";

function useFormattedAmount(initialValue = "") {
  const [amount, setAmount] = useState(initialValue);

  const floatValue = parseFloat(amount.replace(/,/g, "")) || 0;
  const formattedValue = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(floatValue);

  const updateAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    if ((numericValue.match(/\./g) || []).length <= 1) {
      setAmount(numericValue);
    }
  };

  return { amount, formattedValue, floatValue, updateAmount };
}

export default useFormattedAmount;
