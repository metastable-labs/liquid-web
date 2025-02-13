import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  info: Info | null;
  farcasterContext: UserContext | undefined;
  toast: ToastState;
  openGrantPermission: boolean;
}

const initialState: AppState = {
  info: null,
  farcasterContext: undefined,
  toast: {
    message: "",
    type: "success",
    show: false,
  },
  openGrantPermission: false,
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

    setToast: (state, action: PayloadAction<ToastState>) => {
      state.toast = action.payload;
    },

    setOpenGrantPermission: (state, action: PayloadAction<boolean>) => {
      state.openGrantPermission = action.payload;
    },
  },
});

export const {
  setInfo,
  setFarcasterContext,
  setToast,
  setOpenGrantPermission,
} = appReducer.actions;

export default appReducer.reducer;
