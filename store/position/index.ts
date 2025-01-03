import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PositionState {
  activePosition: Position | null;
  isWithdrawing: boolean;
  isClaiming: boolean;
  strategies?: Array<Strategy>;
  strategiesMeta?: Meta;
  loadingStrategies?: boolean;
  positions?: Array<Position>;
  positionsMeta?: Meta;
  loadingPositions?: boolean;
  loadingInvesting: boolean;
}

const initialState: PositionState = {
  activePosition: null,
  isWithdrawing: false,
  isClaiming: false,
  strategies: undefined,
  loadingStrategies: true,
  positions: undefined,
  loadingPositions: true,
  loadingInvesting: false,
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

    setLoadingStrategies(state, action: PayloadAction<boolean>) {
      state.loadingStrategies = action.payload;
    },

    setLoadingInvesting(state, action: PayloadAction<boolean>) {
      state.loadingInvesting = action.payload;
    },

    setExtraStrategies: (
      state,
      action: PayloadAction<Array<Strategy> | undefined>
    ) => {
      if (action.payload) {
        state.strategies = [...state.strategies!, ...action.payload];
      } else {
        state.strategies = undefined;
      }
    },

    setStrategies: (
      state,
      action: PayloadAction<Array<Strategy> | undefined>
    ) => {
      if (action.payload) {
        state.strategies = [...action.payload];
      } else {
        state.strategies = undefined;
      }
    },

    setStrategiesMeta: (state, action: PayloadAction<Meta | undefined>) => {
      if (action.payload) {
        state.strategiesMeta = { ...action.payload };
      } else {
        state.strategiesMeta = undefined;
      }
    },

    setLoadingPosition(state, action: PayloadAction<boolean>) {
      state.loadingPositions = action.payload;
    },

    setExtraPosition: (
      state,
      action: PayloadAction<Array<Position> | undefined>
    ) => {
      if (action.payload) {
        state.positions = { ...state.positions!, ...action.payload };
      } else {
        state.positions = undefined;
      }
    },

    setPositions: (
      state,
      action: PayloadAction<Array<Position> | undefined>
    ) => {
      state.positions = action.payload;
    },

    setPositionsMeta: (state, action: PayloadAction<Meta | undefined>) => {
      if (action.payload) {
        state.positionsMeta = { ...action.payload };
      } else {
        state.positionsMeta = undefined;
      }
    },
  },
});

export const {
  setActivePosition,
  setExtraPosition,
  setExtraStrategies,
  setIsClaiming,
  setIsWithdrawing,
  setLoadingPosition,
  setLoadingStrategies,
  setPositions,
  setStrategies,
  setStrategiesMeta,
  setPositionsMeta,
  setLoadingInvesting,
} = positionReducer.actions;

export default positionReducer.reducer;
