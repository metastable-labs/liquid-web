import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  info: Info | null;
  farcasterContext: UserContext | undefined;
}

const initialState: AppState = {
  info: null,
  farcasterContext: undefined,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<Info | null>) {
      state.info = action.payload;
    },

    setFarcasterContext(state, action: PayloadAction<UserContext>) {
      state.farcasterContext = { ...action.payload };
    },
  },
});

export const { setInfo, setFarcasterContext } = appReducer.actions;

export default appReducer.reducer;
