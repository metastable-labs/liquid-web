type TableAction = {
  revoke?: (id: string) => void;
  grant?: (id: string) => void;
  pause?: (id: string) => void;
  start?: (id: string) => void;
};

type TableActionIdentifier = "revoke" | "grant" | "pause" | "start";

interface AgentCardProps {
  agent: Agent;
  actions?: TableAction;
  actionIdentifier?: TableActionIdentifier;
  variant?: "primary" | "secondary";
}

interface AgentStat {
  title: string;
  value: string | number | React.ReactElement;
}
