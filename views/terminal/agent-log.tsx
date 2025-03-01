import { useEffect, useRef, useState } from "react";
import moment from "moment";
import classNames from "classnames";
import { motion } from "framer-motion";

import ModalWrapper from "@/components/modal/modal-wrapper";
import { ChevronDownIcon } from "@/public/icons";

const dotVariants = {
  blink: (custom: number) => ({
    opacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
      duration: 1.4,
      delay: custom * 0.2,
      ease: "easeInOut",
    },
  }),
};

const Log = ({ timestamp, message, type }: Log) => {
  const formattedDate = moment(timestamp).format("h:mm a");

  return (
    <div className="self-stretch flex items-center justify-between gap-8 text-[15px] leading-[19.8px]">
      <div className="flex items-center gap-1">
        <span className="text-primary-600">{">>>"}</span>

        <p>
          <span
            className={classNames("capitalize", {
              "text-primary-2800": type === "INFO",
              "text-primary-2000": type === "WARNING",
              "text-primary-2500": type === "ERROR",
            })}
          >
            Agent ~
          </span>{" "}
          <span
            className={classNames("capitalize", {
              "text-primary-600": type === "INFO",
              "text-primary-2000": type === "WARNING",
              "text-primary-2500": type === "ERROR",
            })}
          >
            {message}
          </span>
        </p>
      </div>

      <span className="text-primary-100 whitespace-nowrap">
        {formattedDate}
      </span>
    </div>
  );
};

const AgentLog = ({ agentId }: { agentId: string }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const ws = new WebSocket("wss://dev.useliquid.xyz/aqua");

  const apiCall = {
    event: "LOGS",
    data: { agentId },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);

    try {
      if ((json.event = "LOGS")) {
        setLogs((prevLogs) => [...prevLogs, { ...json.data }]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

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
            className="h-20 text-[20px] leading-[23.2px] text-primary-2850 font-QuantaGroteskPro sticky -top-9 pt-5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.5) 80%, transparent 100%)",
            }}
          >
            WELCOME TO LIQUID
          </h1>

          {logs.map((log, index) => (
            <Log key={index} {...log} />
          ))}

          <div style={{ display: "flex", alignItems: "center" }}>
            {[0, 1, 2].map((dot, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={dotVariants}
                animate="blink"
                className="text-5xl text-white mr-1 -mt-5"
              >
                .
              </motion.span>
            ))}
          </div>

          <div className="pt-1" ref={bottomRef} />
        </div>
      </ModalWrapper>
    </>
  );
};

export default AgentLog;
