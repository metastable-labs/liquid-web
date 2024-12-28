"use client";
import React, { useEffect, useState, cloneElement } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { CubeIcons } from "@/public/icons";

const navigationItems: Array<ILWNavigationItem> = [
  {
    icon: <CubeIcons />,
    route: "/",
    title: "Strategies",
  },
];

const getUpdatedNavItems = (
  items: Array<ILWNavigationItem>,
  pathname: string
) => {
  return items.map((item, index) => {
    const isActive = item.route === pathname;

    const updatedIcon =
      index === 0 && React.isValidElement(item.icon)
        ? cloneElement(item.icon as React.ReactElement<{ fill: string }>, {
            fill: isActive ? "#0C0507" : "#64748B",
          })
        : item.icon;

    return {
      ...item,
      active: isActive,
      icon: updatedIcon,
    };
  });
};

const LWNavigation = () => {
  const { pathname } = useSystemFunctions();
  const [userImage, setUserImage] = useState(
    "https://res.cloudinary.com/djzeufu4j/image/upload/v1735331176/Avatar_udfxuk.png"
  );

  const extendedNavigationItems: Array<ILWNavigationItem> = [
    ...navigationItems,
    {
      icon: (
        <Image
          src={userImage}
          alt="User"
          width={24}
          height={24}
          className="rounded-full object-cover"
          quality={100}
        />
      ),
      route: "/positions",
      title: "Positions",
    },
  ];

  const updatedNavItems = getUpdatedNavItems(extendedNavigationItems, pathname);

  useEffect(
    () =>
      setUserImage(
        "https://res.cloudinary.com/djzeufu4j/image/upload/v1735331176/Avatar_udfxuk.png"
      ),
    []
  );

  return (
    <nav className="border-t border-t-primary-150 rounded-t-[22px] xl:rounded-t-none xl:border-t-0 shadow-nav xl:shadow-none bg-white px-10 pb-5 pt-5 flex items-center justify-center xl:items-start xl:justify-start gap-32 xl:flex-col xl:gap-9 w-full xl:w-fit">
      {updatedNavItems.map(({ active, icon, route, title }) => (
        <Link
          href={route}
          key={route}
          className={classNames(
            "flex flex-col gap-1 items-center justify-center",
            { "pointer-events-none": active }
          )}
        >
          <div className="min-w-fit min-h-fit">{icon}</div>

          <span
            className={classNames(
              "text-[11px] leading-[13.64px] transition-all duration-500",
              {
                "text-primary-50 font-bold": active,
                "text-primary-100 font-normal": !active,
              }
            )}
          >
            {title}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default LWNavigation;
