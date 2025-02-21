import { LWUserPaper } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import InfoCard from "./info-card";

const AgentInfos = () => {
  const { agentState } = useSystemFunctions();
  const creator = agentState.agent?.creator;
  const goal = agentState.agent?.goal || "";
  const username = creator?.username || "";

  const mockCreator = {
    avatar: creator?.pfp || "",
    createdAt: "2024-07-01T00:00:00.000Z",
    followers: creator?.followers || 0,
    following: creator?.following || 0,
    id: creator?.fid?.toString() || "",
    name: username,
    twitterURL: `https://twitter.com/${username}`,
    updatedAt: "2024-07-01T00:00:00.000Z",
    username: username,
    warpcastURL: `https://warpcast.com/${username}`,
  };

  const infoCards: Array<InfoCardProps> = [
    { children: <LWUserPaper user={mockCreator} />, title: "Creator" },
    {
      children: (
        <p className="text-[16px] leading-[19.84px] text-primary-100 content-center h-full">
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
