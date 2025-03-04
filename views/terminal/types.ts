type User = {
  id: string;
  avatar: string;
  name: string;
  username: string;
  following: number;
  followers: number;
  warpcastURL: string;
  twitterURL: string;
  createdAt: string;
  updatedAt: string;
};

type InfoCardProps = {
  title: string;
  children: React.ReactNode;
};

type Transaction = {
  type: "buy" | "sell";
  date: string;
  amount: number;
  token: string;
};

type Log = {
  timestamp: string;
  message: string;
  type: "INFO" | "ERROR" | "WARNING";
  terminate: boolean;
};
