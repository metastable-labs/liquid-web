import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WalletState {
  loadingAssets: boolean;
  assets?: Wallet[];
}

const initialState: WalletState = {
  loadingAssets: true,
  assets: undefined,
};

export const appReducer = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAssets(state, action: PayloadAction<Wallet[] | undefined>) {
      if (action.payload) {
        state.assets = [...action.payload];
      } else {
        state.assets = undefined;
      }
    },

    setLoadingAssets(state, action: PayloadAction<boolean>) {
      state.loadingAssets = action.payload;
    },
  },
});

export const { setAssets, setLoadingAssets } = appReducer.actions;

export default appReducer.reducer;
