import { motion } from "framer-motion";
import { dummyAgents } from "@/views/create/dummy";
import LWAgentCard from "../agent-card";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotate: 0,
    y: 0,
  },
  show: (index: number) => ({
    opacity: 1,
    scale: 1 - index * 0.05,
    rotate: -3 - 6 * index,
    y: -45 * index,
    x: 35 + 7.5 * index,
    transition: {
      duration: 0.5,
    },
  }),
};

const spiralVariants = {
  initial: { rotate: 0 },
  spiral: {
    rotate: [0, -10, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const colors = [
  "#EEEBFF",
  "#FEF7EC",
  "#EFFAF6",
  "#FEF3EB",
  "#EEEBFF",
  "#FEF7EC",
];

const Step3 = () => {
  return (
    <motion.div
      className="relative w-full h-[350px] lg:h-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {dummyAgents.slice(0, 6).map((agent, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={childVariants}
          style={{
            position: "absolute",
            bottom: 8,
            transform: "translateX(-50%)",
            transformOrigin: "bottom center",
            zIndex: dummyAgents.length - index,
          }}
        >
          <motion.div
            variants={spiralVariants}
            initial="initial"
            animate="spiral"
          >
            <LWAgentCard
              agent={agent}
              variant="secondary"
              isIntro
              backgroundColor={colors[index]}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Step3;
