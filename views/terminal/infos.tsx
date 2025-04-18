import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import { LWUserPaper } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const InfoCard = ({ title, children }: InfoCardProps) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-primary-2350 text-[clamp(16px,5vw,19.7px)] leading-[clamp(23px,5vw,26px)] font-medium">
      {title}
    </h2>

    <div className="self-stretch border border-primary-150 rounded-2xl p-4 flex-1">
      {children}
    </div>
  </div>
);

const AgentInfos = () => {
  const { agentState } = useSystemFunctions();
  const { user } = usePrivy();

  const creator = agentState.agent?.creator;
  const goal = agentState.agent?.goal || "";

  const infoCards: Array<InfoCardProps> = [
    { children: <LWUserPaper user={creator!} />, title: "Creator" },
    {
      children: (
        <p
          className={classNames(
            "text-[16px] leading-[19.84px] text-primary-100 content-center h-full",
            { "max-w-[358px]": user }
          )}
        >
          {goal}
        </p>
      ),
      title: "Agent’s Goal",
    },
  ];

  return (
    <div className="self-stretch p-6 border border-primary-150 bg-white rounded-3xl flex flex-col items-stretch justify-between gap-6">
      {creator &&
        infoCards.map((infoCard, index) => (
          <InfoCard key={index} title={infoCard.title}>
            {infoCard.children}
          </InfoCard>
        ))}
    </div>
  );
};

export default AgentInfos;
