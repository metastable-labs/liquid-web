import { PropsWithChildren } from "react";
import { Provider as ReduxProviderBase } from "react-redux";

import { store } from "@/store";

export function ReduxProvider({ children }: PropsWithChildren) {
  return <ReduxProviderBase store={store}>{children}</ReduxProviderBase>;
}
