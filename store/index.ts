"use client";
import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app";
import positionReducer from "./position";

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    position: positionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
