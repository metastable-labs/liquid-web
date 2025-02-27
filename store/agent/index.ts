import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AgentState {
  delegating: boolean;
  loadingDelegationDetails: boolean;
  delegationDetails?: AgentDelegationDetails;
  agent?: Agent;
  agents?: Agent[];
  loadingAgent: boolean;
}

const initialState: AgentState = {
  delegating: false,
  loadingDelegationDetails: true,
  delegationDetails: undefined,
  agent: undefined,
  loadingAgent: true,
};

export const agentReducer = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setDelegating(state, action: PayloadAction<boolean>) {
      state.delegating = action.payload;
    },

    setLoadingAgent(state, action: PayloadAction<boolean>) {
      state.loadingAgent = action.payload;
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

    setAgent(state, action: PayloadAction<Agent | undefined>) {
      if (action.payload) {
        state.agent = { ...action.payload };
      } else {
        state.agent = undefined;
      }
    },
  },
});

export const {
  setDelegating,
  setDelegationDetails,
  setLoadingDelegationDetails,
  setAgent,
  setLoadingAgent,
} = agentReducer.actions;

export default agentReducer.reducer;
