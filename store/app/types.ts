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

type Toast = "success" | "error" | "info" | "warning";

type ToastState = {
  message: string;
  type: Toast;
  show: boolean;
};
