import { useState } from "react";
import moment from "moment";

import ModalWrapper from "@/components/modal/modal-wrapper";
import { ChevronDownIcon } from "@/public/icons";
import { agentLog } from "./dummy";

const Log = ({ date, transactions }: AgentLog) => {
  const formattedDate = moment(date).format("DD/MM/YY");
  return (
    <div className="flex flex-col items-stretch gap-4 text-[15px] leading-[19.8px]">
      <span className="text-primary-400 font-medium">{formattedDate}</span>

      <div className="self-stretch flex flex-col items-stretch gap-6">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between gap-5">
            <p className="text-primary-1700">
              {`Agent ${transaction.type === "buy" ? "bought" : "sold"} $${
                transaction.amount
              } worth of ${transaction.token}`}
            </p>
            <span className="text-primary-100">
              {moment(transaction.date).format("h:mm a")}
            </span>
          </div>
        ))}
      </div>
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
            className="text-[28px] leading-[31.36px] text-primary-2350 font-bold font-QuantaGroteskPro sticky -top-9 pt-5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.5) 70%, transparent 100%)",
            }}
          >
            Agent&apos;s Log
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
