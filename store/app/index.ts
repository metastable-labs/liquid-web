import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  info: Info | null;
}

const initialState: AppState = {
  info: null,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<Info | null>) {
      state.info = action.payload;
    },
  },
});

export const { setInfo } = appReducer.actions;

export default appReducer.reducer;
