import {
  AgentIconActive,
  AgentIconInactive,
  CreateIconActive,
  CreateIconInactive,
  PermissionsIconActive,
  PermissionsIconInactive,
  WalletIconActive,
  WalletIconInactive,
} from "@/public/icons";

const navigationItems: Array<ILWNavigationItem> = [
  {
    icons: {
      active: <CreateIconActive />,
      inactive: <CreateIconInactive />,
    },
    route: "/",
    title: "Create",
  },
  {
    icons: {
      active: <WalletIconActive />,
      inactive: <WalletIconInactive />,
    },
    route: "/wallet",
    title: "Wallet",
  },
  {
    icons: {
      active: <PermissionsIconActive />,
      inactive: <PermissionsIconInactive />,
    },
    route: "/permissions",
    title: "Permissions",
  },
  {
    icons: {
      active: <AgentIconActive />,
      inactive: <AgentIconInactive />,
    },
    route: "/agents",
    title: "My agents",
  },
  {
    icons: {
      active: <AgentIconActive />,
      inactive: <AgentIconInactive />,
    },
    route: "/explore",
    title: "Explore",
  },
];

export { navigationItems };
