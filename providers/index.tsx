"use client";
import PrivyWalletProvider from "./PrivyProvider";
import { ReduxProvider } from "./ReduxProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyWalletProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </PrivyWalletProvider>
  );
};

export default Providers;
