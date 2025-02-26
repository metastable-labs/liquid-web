import CHARACTER_CUSTOMIZATION from "@/constants/agents/character-customization";
import CONFIGURATION_RULES from "@/constants/agents/configuration-rules";
import PROTOCOLS from "@/constants/protocols";
import { LWClickAnimation, LWInput, LWSelect, LWButton } from "@/components";
import { ILWInput } from "@/components/input/types";
import { ArrowLeftIcon } from "@/public/icons";
import { StepProps } from "../types";
import AgentBadge from "./agent-badge";
import AgentAvatar from "./agentAvatar";
import AgentArticle from "./agent-article";

const Step2 = ({
  agentFunction,
  errors,
  file,
  register,
  setFile,
  setStep,
}: StepProps) => {
  const inputs: Array<ILWInput> = [
    {
      name: "agentName",
      register: register?.("agentName"),
      placeholder:
        "name your agent e.g “YieldMaster,” “AquaBot,” “LP Optimizer”",
      error: errors?.agentName,
      type: "text",
      label: "What’s your Agent’s Name?",
    },
    {
      name: "agentDeveloperID",
      register: register?.("agentDeveloperID"),
      placeholder: "give your agent an account on X",
      error: errors?.agentDeveloperID,
      type: "text",
      label: "Agent's X developer ID",
      instructionLinkText: "How to get your X developer ID?",
      instructionLink: "https://www.x.com",
    },
  ];

  const protocolOptions = PROTOCOLS.map((protocol) => ({
    title: protocol.name,
    value: protocol.id,
    icon: protocol.icon,
  }));

  return (
    <div className="flex flex-col items-stretch gap-10 lg:gap-[100px] pb-10">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-[100px] mb-20 md:mb-0">
        <div className="flex-1 flex flex-col gap-9">
          <div className="flex flex-col gap-6">
            <LWClickAnimation
              onClick={setStep?.bind(this, 0)}
              className="w-fit flex items-center gap-1"
            >
              <ArrowLeftIcon fill="#0C0507" width={20} height={20} />
              <span className="text-[16px] leading-[19.84px] font-medium text-primary-400">
                Back
              </span>
            </LWClickAnimation>

            <h1 className="text-[28px] leading-[31.36px] text-primary-400 font-bold font-QuantaGroteskPro whitespace-nowrap">
              Build your agent
            </h1>

            <AgentBadge agent={agentFunction!} />
          </div>

          <div className="flex flex-col gap-8">
            <AgentAvatar
              agentFunction={agentFunction!}
              file={file!}
              setFile={setFile!}
            />

            {inputs.map((input, index) => (
              <LWInput key={index} {...input} />
            ))}

            <AgentArticle
              title="Character customization"
              data={CHARACTER_CUSTOMIZATION[agentFunction!]}
            />
          </div>
        </div>

        <div className="min-w-full min-h-[1px] lg:min-w-[1px] lg:min-h-full bg-primary-2250" />

        <div className="flex-1 flex flex-col gap-9 lg:pt-[60px]">
          <AgentArticle
            title="Character customization"
            data={CONFIGURATION_RULES[agentFunction!]}
          />

          <LWSelect
            label="Select Network"
            options={protocolOptions}
            defaultValue={protocolOptions[0].value}
            fullWidth
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full fixed bottom-0 left-0 bg-white p-4 md:static">
        <LWButton
          title="Next"
          onClick={() => setStep?.(2)}
          disabled={!agentFunction}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default Step2;
