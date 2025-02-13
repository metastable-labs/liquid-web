import { LWUserPaper } from "@/components";
import InfoCard from "./info-card";

const AgentInfos = ({ creator, goal }: { creator: Creator; goal: string }) => {
  const mockCreator = {
    avatar: creator.pfp,
    createdAt: "2024-07-01T00:00:00.000Z",
    followers: creator.followers,
    following: creator.following,
    id: creator.fid.toString(),
    name: creator.username,
    twitterURL: `https://twitter.com/${creator.username}`,
    updatedAt: "2024-07-01T00:00:00.000Z",
    username: creator.username,
    warpcastURL: `https://warpcast.com/${creator.username}`,
  };

  const infoCards: Array<InfoCardProps> = [
    { children: <LWUserPaper user={mockCreator} />, title: "Creator" },
    {
      children: (
        <p className="text-[16px] leading-[19.84px] text-primary-100 flex items-center justify-center h-full">
          {goal}
        </p>
      ),
      title: "Agent’s Goal",
    },
  ];

  return (
    <div className="self-stretch p-6 border border-primary-150 bg-white rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-6">
      {infoCards.map((infoCard, index) => (
        <InfoCard key={index} title={infoCard.title}>
          {infoCard.children}
        </InfoCard>
      ))}
    </div>
  );
};

export default AgentInfos;
