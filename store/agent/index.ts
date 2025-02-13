import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AgentState {
  delegating: boolean;
  loadingDelegationDetails: boolean;
  delegationDetails?: AgentDelegationDetails;
}

const initialState: AgentState = {
  delegating: false,
  loadingDelegationDetails: false,
  delegationDetails: undefined,
};

export const agentReducer = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setDelegating(state, action: PayloadAction<boolean>) {
      state.delegating = action.payload;
    },

    setLoadingDelegationDetails(state, action: PayloadAction<boolean>) {
      state.loadingDelegationDetails = action.payload;
    },

    setDelegationDetails(
      state,
      action: PayloadAction<AgentDelegationDetails | undefined>
    ) {
      if (action.payload) {
        state.delegationDetails = { ...action.payload };
      } else {
        state.delegationDetails = undefined;
      }
    },
  },
});

export const {
  setDelegating,
  setDelegationDetails,
  setLoadingDelegationDetails,
} = agentReducer.actions;

export default agentReducer.reducer;
