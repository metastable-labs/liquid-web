"use client";
import { useEffect, useState } from "react";

import { generateAreaChartData } from "@/utils/helpers";
import periods from "@/constants/period";
import DesktopView from "./desktop";
import MobileView from "./mobile";

const Trade = () => {
  const [period, setPeriod] = useState<Period>("1w");
  const [data, setData] = useState(generateAreaChartData(period));

  const _periods = periods.map(({ title, value }) => ({
    title,
    value,
    loading: false,
  }));

  const props: IView = {
    data,
    period,
    setPeriod,
    periods: _periods,
  };

  const handleData = async () => setData(generateAreaChartData(period));

  useEffect(() => {
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <>
      <div className="hidden xl:block w-full px-6 pt-14">
        <DesktopView {...props} />
      </div>
      <div className="block xl:hidden w-full px-5 pt-10">
        <MobileView {...props} />
      </div>
    </>
  );
};

export default Trade;
