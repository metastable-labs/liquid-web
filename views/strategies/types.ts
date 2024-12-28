type Strategy = {
  id: string;
  owner: string;
  ownerAvatar: string;
  title: string;
  description: string;
  estimatedAPY: number;
  createdAt: string;
  assets: Array<{
    icon: string;
    name: string;
  }>;
  protocols: Array<{
    icon: string;
    name: string;
  }>;
  info: {
    locked: number;
    risk: string;
    deposits: number;
    curatorFee: number;
  };
};

interface IStrategyPaper {
  strategy: Strategy;
  onClick?: () => void;
  active?: boolean;
  variant?: "primary" | "secondary";
  close?: () => void;
}

interface IStrategyDetails {
  strategy: Strategy;
}
