"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";

import { LWContainer } from "@/components";
import Header from "./header";
import schema from "./schema";
import { AgentBuildForm, AgentFunction } from "./types";
import Step1 from "./step1";
import Step2 from "./step2";

const AgentBuild = () => {
  const [step, setStep] = useState(0);
  const [disableHeader, setDisableHeader] = useState(false);
  const [agentFunction, setAgentFunction] = useState<AgentFunction>();
  const [protocol, setProtocol] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<AgentBuildForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const steps = [
    <Step1
      key={0}
      agentFunction={agentFunction}
      setAgentFunction={setAgentFunction}
      setStep={setStep}
    />,
    <Step2
      key={1}
      agentFunction={agentFunction}
      setStep={setStep}
      protocol={protocol}
      setProtocol={setProtocol}
    />,
    <div key={2}>Step 3</div>,
  ];

  const onSubmit = (data: AgentBuildForm) => {
    console.log(data);
  };

  return (
    <LWContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative pt-4 lg:px-8 flex flex-col items-center justify-center gap-6"
      >
        <div
          className="sticky top-[74px] lg:-top-6 z-20 w-full pt-6 backdrop-blur-[1px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.5) 70%, transparent 100%)",
          }}
        >
          <Header setStep={setStep} step={step} disabled={disableHeader} />
        </div>

        <div className="relative w-full mt-5 xl:mt-[85px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </form>
    </LWContainer>
  );
};

export default AgentBuild;
