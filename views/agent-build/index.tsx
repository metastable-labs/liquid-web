"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LWContainer } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./header";
import schema from "./schema";
import { AgentBuildForm, AgentFunction } from "./types";
import Step1 from "./step1";

const AgentBuild = () => {
  const [step, setStep] = useState(0);
  const [disableHeader, setDisableHeader] = useState(false);
  const [agentFunction, setAgentFunction] = useState<AgentFunction>();

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
    <div key={1}>Step 2</div>,
    <div key={2}>Step 3</div>,
  ];

  const onSubmit = (data: AgentBuildForm) => {
    console.log(data);
  };

  return (
    <LWContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-4 lg:px-8 flex flex-col self-stretch items-center justify-center gap-6 relative"
      >
        <Header setStep={setStep} step={step} disabled={disableHeader} />
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
      </form>
    </LWContainer>
  );
};

export default AgentBuild;
