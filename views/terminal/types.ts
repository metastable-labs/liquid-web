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

type Agent = {
  name: string;
  symbol: string;
  icon: string;
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  creator: User;
  goal: string;
};

type InfoCardProps = {
  title: string;
  children: React.ReactNode;
};
