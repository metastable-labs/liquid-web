type Info = {
  title: string;
  description: string;
};

type UserContext = {
  displayName?: string;
  fid: number;
  location?: {
    description: string;
    placeId: string;
  };
  pfpUrl?: string;
  username?: string;
};
