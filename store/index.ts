"use client";
import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app";
import agentReducer from "./agent";
import walletReducer from "./wallet";

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    agent: agentReducer,
    wallet: walletReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
