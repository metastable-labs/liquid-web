import LWButton from "@/components/button";
import { AgentFunction, StepProps } from "../types";
import FunctionCard from "./functionCard";

const Step1 = ({ agentFunction, setAgentFunction, setStep }: StepProps) => {
  const functions: Array<AgentFunction> = [
    "trade-memecoins",
    "provide-liquidity",
    "invest-defi",
    "liquid-protocol",
  ];
  return (
    <div className="mt-5 xl:mt-[85px] flex flex-col gap-10 lg:gap-[100px] w-full">
      <div className="flex flex-col gap-5 md:gap-7 lg:gap-9">
        <h1 className="text-primary-400 font-QuantaGroteskPro text-[clamp(25px,5vw,28px)] leading-[clamp(28px,5vw,31.36px)] font-bold">
          Select Agent Function
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 md:mb-0">
          {functions.map((type) => (
            <FunctionCard
              key={type}
              agentFunction={type}
              setAgentFunction={setAgentFunction!}
              active={agentFunction === type}
            />
          ))}
        </div>
      </div>

      {/* Next */}
      <div className="flex items-center justify-end w-full fixed bottom-0 left-0 bg-white p-4 md:static">
        <LWButton
          title="Next"
          onClick={() => setStep?.(1)}
          disabled={!agentFunction}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default Step1;
