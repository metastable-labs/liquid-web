interface ILWNavigationItem {
  icons: {
    active: React.ReactNode;
    inactive: React.ReactNode;
  };
  route: string;
  title: string;
}
