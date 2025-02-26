"use client";
import Link from "next/link";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { navigationItems } from "@/constants/navigation";
import { appearAnimation } from "@/utils/helpers";
import { ExternalDriveIcon } from "@/public/icons";

const LWNavigation = () => {
  const { pathname } = useSystemFunctions();

  const pathSegments = pathname.split("/").filter(Boolean);

  const isAgentDetailPage =
    pathSegments.length === 1 && /^[a-f0-9-]{36}$/.test(pathSegments[0]);

  const isAgentTradePage =
    pathSegments.length === 2 &&
    /^[a-f0-9-]{36}$/.test(pathSegments[0]) &&
    pathSegments[1] === "trade";

  return (
    <nav className="sticky h-fit top-[118px] xl:block min-w-[113.5px] hidden">
      <div className="px-6 pt-6 pb-9 xl:flex flex-col gap-9 border border-primary-150 rounded-[32px] bg-white">
        {navigationItems.map(({ route, title, icons }) => {
          const isActive = pathname === route;

          return (
            <Link
              key={route}
              href={route}
              className="flex flex-col items-center gap-1 transition-all duration-300"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isActive ? icons.active : icons.inactive}
              </div>
              <span
                className={classNames(
                  "text-[11px] leading-[13.64px] transition-all duration-500",
                  isActive
                    ? "font-bold text-[#020617]"
                    : "font-normal text-[#64748B]"
                )}
              >
                {title}
              </span>
            </Link>
          );
        })}
      </div>

      <AnimatePresence>
        {(isAgentDetailPage || isAgentTradePage) && (
          <motion.div
            {...appearAnimation}
            className="p-6 flex flex-col gap-1 items-center justify-center border border-primary-150 rounded-[32px] bg-white transition-all duration-300 mt-10"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <ExternalDriveIcon />
            </div>

            <span className="text-[11px] leading-[13.64px] transition-all duration-500 font-bold text-[#020617]">
              Terminal
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LWNavigation;
