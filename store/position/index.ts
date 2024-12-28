import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PositionState {
  activePosition: Position | null;
  isWithdrawing: boolean;
  isClaiming: boolean;
}

const initialState: PositionState = {
  activePosition: null,
  isWithdrawing: false,
  isClaiming: false,
};

export const positionReducer = createSlice({
  name: "position",
  initialState,
  reducers: {
    setActivePosition(state, action: PayloadAction<Position | null>) {
      state.activePosition = action.payload;
    },

    setIsWithdrawing(state, action: PayloadAction<boolean>) {
      state.isWithdrawing = action.payload;
    },

    setIsClaiming(state, action: PayloadAction<boolean>) {
      state.isClaiming = action.payload;
    },
  },
});

export const { setActivePosition, setIsClaiming, setIsWithdrawing } =
  positionReducer.actions;

export default positionReducer.reducer;
