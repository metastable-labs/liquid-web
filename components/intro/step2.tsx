import { motion } from "framer-motion";
import LWAgentCard from "../agent-card";

const dummyAgents: Array<Agent> = [
  {
    creator: {
      username: "creator",
      fid: 1,
      followers: 1_000_000,
      following: 20,
      pfp: "/images/avatar3.png",
      profile: { bio: [] },
    },
    goal: "To make money",
    id: "1",
    last7dPnl: 86.7,
    name: "Jeeterz",
    token: {
      agentId: "1",
      name: "Meister",
      symbol: "A1",
      locked: "100",
      marketCap: "100",
      status: "active",
    },
    totalPnl: 1000,
    type: "agent",
    users: 100_000,
    winRate: 100,
    active: true,
  },
  {
    creator: {
      username: "creator",
      fid: 1,
      followers: 1_000_000,
      following: 20,
      pfp: "/images/avatar6.png",
      profile: { bio: [] },
    },
    goal: "To make money",
    id: "2",
    last7dPnl: -20.43,
    name: "Aurora",
    token: {
      agentId: "2",
      name: "Agent 2",
      symbol: "A2",
      locked: "100",
      marketCap: "100",
      status: "active",
    },
    totalPnl: 1000,
    type: "agent",
    users: 5400,
    winRate: 100,
    active: false,
  },
  {
    creator: {
      username: "creator",
      fid: 1,
      followers: 1_000_000,
      following: 20,
      pfp: "/images/avatar5.png",
      profile: { bio: [] },
    },
    goal: "To make money",
    id: "3",
    last7dPnl: 90.5,
    name: "Njoku",
    token: {
      agentId: "3",
      name: "Agent 3",
      symbol: "A3",
      locked: "100",
      marketCap: "100",
      status: "active",
    },
    totalPnl: 1000,
    type: "agent",
    users: 12_789,
    winRate: 100,
    active: false,
  },
];

// Parent stagger effect
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2, // Delay each child animation by 0.2s
    },
  },
};

// Child animation (slide in from left)
const childVariants = {
  hidden: {
    opacity: 0,
    x: "-100%", // Start completely off-screen to the left
  },
  show: {
    opacity: 1,
    x: "0%", // Settle into place
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Step2 = () => {
  return (
    <motion.div
      className="flex flex-col gap-[11px] lg:items-stretch justify-center pb-10 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {dummyAgents.map((agent) => (
        <motion.div key={agent.id} variants={childVariants} className="">
          <LWAgentCard
            agent={agent}
            actionIdentifier={agent.active ? "pause" : "start"}
            actions={{ revoke: (id: string) => console.log(id) }}
            isIntro
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Step2;
