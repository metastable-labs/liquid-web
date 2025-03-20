import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  info: Info | null;
  farcasterContext: UserContext | undefined;
  toast: ToastState;
  openGrantPermission: boolean;
  openAccessDenied: boolean;
  openSelectNetworkModal: boolean;
  isSolanaSupported: boolean;
  appIsReady: boolean;
  openShareModal: boolean;
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
  openAccessDenied: false,
  openSelectNetworkModal: false,
  isSolanaSupported: false,
  appIsReady: false,
  openShareModal: false,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppIsReady(state, action: PayloadAction<boolean>) {
      state.appIsReady = action.payload;
    },

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

    setOpenAccessDenied: (state, action: PayloadAction<boolean>) => {
      state.openAccessDenied = action.payload;
    },

    setOpenSelectNetworkModal: (state, action: PayloadAction<boolean>) => {
      state.openSelectNetworkModal = action.payload;
    },

    setOpenShareModal: (state, action: PayloadAction<boolean>) => {
      state.openShareModal = action.payload;
    },
  },
});

export const {
  setInfo,
  setFarcasterContext,
  setToast,
  setOpenGrantPermission,
  setOpenSelectNetworkModal,
  setAppIsReady,
  setOpenAccessDenied,
  setOpenShareModal,
} = appReducer.actions;

export default appReducer.reducer;
