import { useState } from "react";
import moment from "moment";
import classNames from "classnames";

import ModalWrapper from "@/components/modal/modal-wrapper";
import { ChevronDownIcon } from "@/public/icons";
import { agentLog } from "./dummy";

const Log = ({ date, message, type, initiator, loading }: Log) => {
  const formattedDate = moment(date).format("h:mm a");

  return (
    <div className="self-stretch flex items-center justify-between gap-10 text-[15px] leading-[19.8px]">
      <div className="flex items-center gap-1">
        <span className="text-primary-600">{">>>"}</span>

        {loading ? (
          <span className="text-primary-600">. . .</span>
        ) : (
          <p>
            <span
              className={classNames("capitalize", {
                "text-primary-2800": type === "info",
                "text-primary-2000": type === "warning",
                "text-primary-2500": type === "error",
                "text-primary-1000": type === "success",
              })}
            >
              {initiator && `[${initiator}] ~`}
            </span>{" "}
            <span
              className={classNames("capitalize", {
                "text-primary-600": type === "info",
                "text-primary-2000": type === "warning",
                "text-primary-2500": type === "error",
                "text-primary-1000": type === "success",
              })}
            >
              {message}
            </span>
          </p>
        )}
      </div>

      <span className="text-primary-100">{formattedDate}</span>
    </div>
  );
};

const AgentLog = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-8 bottom-8 flex items-center justify-center gap-4 p-6 border border-primary-150 bg-white rounded-3xl shadow-agentLog"
      >
        <span className="text-[16px] leading-[19.2px] font-medium text-primary-2600">
          Agent&apos;s Log
        </span>
        <div className="min-w-fit">
          <ChevronDownIcon fill="#64748B" width={20} height={20} />
        </div>
      </button>

      <ModalWrapper
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="flush-right"
      >
        <div className="flex flex-col items-stretch gap-6 pb-10">
          <h1
            className="text-[20px] leading-[23.2px] text-primary-2850 font-QuantaGroteskPro sticky -top-9 pt-5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.5) 80%, transparent 100%)",
            }}
          >
            WELCOME TO LIQUID
          </h1>

          {agentLog.map((log, index) => (
            <Log key={index} {...log} />
          ))}
        </div>
      </ModalWrapper>
    </>
  );
};

export default AgentLog;
