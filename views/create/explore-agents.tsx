import Link from "next/link";
import { LWAgentCard } from "@/components";
import { dummyAgents } from "./dummy";

const ExploreAgents = () => {
  return (
    <div className="flex flex-col items-stretch gap-6 lg:self-center self-stretch">
      <h1 className="text-[15px] leading-[19.8px] font-medium text-primary-1700">
        Explore Agents from the community
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3 max-w-[1077px]">
        {dummyAgents.map((agent, index) => (
          <Link href={`/${agent?.id}`} key={index}>
            <LWAgentCard agent={agent} variant="secondary" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreAgents;
