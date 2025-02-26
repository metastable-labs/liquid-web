import { LWAgentCard } from "@/components";
import { AgentIconActive } from "@/public/icons";
import { dummyAgents } from "./dummy";

const Agents = () => {
  return (
    <div className="lg:p-6 flex flex-col gap-10 lg:gap-[70px] max-w-[940px]">
      <div className="py-3 px-4 rounded-[26px] border border-primary-550 bg-primary-600 flex items-center gap-6 w-full">
        <AgentIconActive width={40} height={40} fill="#F17B2B" />

        <div className="flex flex-col justify-center gap-[5px]">
          <h2 className="text-primary-50 text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px] font-medium">
            My Agents
          </h2>
          <p className="text-primary-100 text-[11px] leading-[13.64px] lg:text-[12px] lg:leading-[15.84px]">
            Here you can see and manage all the agents’s you’ve created on
            Liquid
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-stretch pb-10">
        {dummyAgents.map((agent) => (
          <LWAgentCard
            key={agent.id}
            agent={agent}
            actionIdentifier={agent.active ? "pause" : "start"}
            actions={{ revoke: (id: string) => console.log(id) }}
          />
        ))}
      </div>
    </div>
  );
};

export default Agents;
