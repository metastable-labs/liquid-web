import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import LWClickAnimation from "../click-animation";
import { ArrowLeftIcon } from "@/public/icons";
import { appearAnimation } from "@/utils/helpers";
import StepTexts from "./step-texts";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stepTexts: Array<IStepTexts> = [
  {
    title: "Text-to-Agent Creation",
    description:
      "Create your custom crypto agent with simple text commands - just describe what you want it to do, like “Buy tokens launched in the last hour with low market cap.”",
  },
  {
    title: "Share your Agents with your community",
    description:
      "Anyone can delegate their wallet to AI agents that can automatically execute actions based on the creation parameters while you earn a share of the profits.",
  },
  {
    title: "Crypto Made Simple",
    description:
      "Join a marketplace of specialized crypto agents that handle everything from safe stablecoin investments to memecoin trading - making crypto accessible whether you're an expert or complete beginner.",
  },
];

const LWIntro = () => {
  const {
    appState: { appIsReady },
  } = useSystemFunctions();

  const [step, setStep] = useState(0);
  const [cookies, setCookie] = useCookies(["HasShowIntroModal"]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const steps = [<Step1 key={0} />, <Step2 key={1} />, <Step3 key={2} />];

  const controls = [
    {
      action: () => {
        if (step > 0) {
          setStep(step - 1);
        }
      },
      active: step > 0,
    },
    {
      action: () => {
        if (step < stepTexts.length - 1) {
          setStep(step + 1);
        }
      },
      active: step < stepTexts.length - 1,
    },
  ];

  const handleGetStarted = () => {
    setCookie("HasShowIntroModal", true, {
      path: "/",
      maxAge: 6 * 30 * 24 * 60 * 60,
    });
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (cookies.HasShowIntroModal) {
      setIsModalVisible(false);
    }
  }, [cookies.HasShowIntroModal]);

  useEffect(() => {
    if (step < stepTexts.length - 1) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!appIsReady) return null;

  return (
    <AnimatePresence>
      {isModalVisible && (
        <div className="fixed inset-0 z-50 justify-center items-center flex">
          <motion.div
            className="fixed inset-0 bg-black/50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          <motion.div
            className="rounded-3xl bg-white flex flex-col lg:flex-row items-center relative min-w-fit lg:h-[400px] overflow-hidden"
            {...appearAnimation}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="py-8 px-10 lg:px-7 bg-primary-1750 h-full w-full max-w-[400px] lg:max-w-none lg:w-[400px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  {...appearAnimation}
                  key={step}
                  className="h-full pointer-events-none"
                >
                  {steps[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-7 flex flex-col justify-between gap-32 lg:gap-0 items-center h-full max-w-[400px]">
              <AnimatePresence mode="popLayout">
                <motion.div {...appearAnimation} key={step}>
                  <StepTexts {...stepTexts[step]} />
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between gap-16">
                <div className="flex items-center gap-6">
                  {controls.map(({ action, active }, index) => (
                    <div
                      key={index}
                      onClick={action}
                      className={classNames(
                        "flex items-center justify-center p-3 rounded-full transition-colors duration-500 cursor-pointer",
                        {
                          "rotate-180": index === 1,
                          "border border-primary-150 bg-primary-500": active,
                          "border border-primary-600 bg-primary-600 pointer-events-none":
                            !active,
                        }
                      )}
                    >
                      <ArrowLeftIcon
                        width={24}
                        height={24}
                        fill={active ? "#1E293B" : "#CBD5E1"}
                      />
                    </div>
                  ))}
                </div>

                <LWClickAnimation
                  onClick={handleGetStarted}
                  className="rounded-[30px] bg-primary-350 flex items-center justify-center w-[160px] h-12"
                >
                  <span className="text-[16px] leading-[16px] text-white font-semibold font-QuantaGroteskPro">
                    Get started
                  </span>
                </LWClickAnimation>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LWIntro;
