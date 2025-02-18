"use client";
import Link from "next/link";
import classNames from "classnames";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { navigationItems } from "@/constants/navigation";

const LWNavigation = () => {
  const { pathname } = useSystemFunctions();

  return (
    <nav className="px-6 pt-6 pb-9 lg:flex flex-col gap-9 border border-primary-150 rounded-[32px] bg-white sticky h-fit top-[118px] min-w-[113.5px] hidden">
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
    </nav>
  );
};

export default LWNavigation;
