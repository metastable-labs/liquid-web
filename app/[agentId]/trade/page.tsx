"use client";
import { useEffect } from "react";

import { Trade } from "@/views";

const TradePage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#EEF4FF";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return <Trade />;
};

export default TradePage;
