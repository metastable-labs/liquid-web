"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import { generateAreaChartData } from "@/utils/helpers";
import periods from "@/constants/period";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { LWClickAnimation } from "@/components";
import { ArrowLeftIcon } from "@/public/icons";
import DesktopView from "./desktop";
import MobileView from "./mobile";

const Trade = () => {
  const { user } = usePrivy();
  const { navigate } = useSystemFunctions();
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
    <div className={classNames("overflow-scroll", { "lg:px-5 pb-10": !user })}>
      <button
        onClick={() => navigate.back()}
        className="hidden w-fit lg:flex items-center gap-1 mb-[60px]"
      >
        <ArrowLeftIcon fill="#0C0507" width={20} height={20} />
        <span className="text-[20px] leading-[23.2px] font-medium text-primary-2350">
          Back to terminal
        </span>
      </button>

      <div className="hidden xl:block w-full">
        <DesktopView {...props} />
      </div>
      <div className="block xl:hidden w-full">
        <MobileView {...props} />
      </div>
    </div>
  );
};

export default Trade;
