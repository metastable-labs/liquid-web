import Image from "next/image";

import { LWAgentCard } from "@/components";
import { dummyAgents } from "./dummy";

const Create = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center -space-y-3">
        <Image
          src="/images/coming-soon.png"
          alt="Coming soon"
          width={500}
          height={500}
          className="w-full h-[297px]"
        />

        <p className="text-[18px] leading-[22.32px] text-primary-1700 text-center max-w-xl">
          Creation of Agent coming soon. For now, go to farcaster and tag
          @getliquid, with your prompt and an Agent will be created for you.
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-6 self-center">
        <h1 className="text-[15px] leading-[19.8px] font-medium text-primary-1700">
          Explore Agents from the community
        </h1>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3 max-w-[1077px]">
          {dummyAgents.map((agent, index) => (
            <LWAgentCard key={index} agent={agent} variant="secondary" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create;
