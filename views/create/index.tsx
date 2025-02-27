import Image from "next/image";

import ExploreAgents from "./explore-agents";

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
          Creation of Agent coming soon. For now, go to farcaster and tag{" "}
          <span>
            <a
              href="https://warpcast.com/liquidapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              @liquidapp
            </a>
          </span>
          , with your prompt and an Agent will be created for you.
        </p>
      </div>

      <ExploreAgents />
    </div>
  );
};

export default Create;
