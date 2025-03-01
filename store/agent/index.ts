import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AgentState {
  delegating: boolean;
  loadingDelegationDetails: boolean;
  delegationDetails?: AgentDelegationDetails[];
  agent?: Agent;
  agents?: Array<Agent>;
  myAgents?: Array<Agent>;
  agentsMeta?: AgentsMeta;
  myAgentsMeta?: AgentsMeta;
  loadingAgent: boolean;
  loadingAgents: boolean;
  loadingMyAgents: boolean;
}

const initialState: AgentState = {
  delegating: false,
  loadingDelegationDetails: true,
  delegationDetails: undefined,
  agent: undefined,
  agents: undefined,
  myAgents: undefined,
  agentsMeta: undefined,
  myAgentsMeta: undefined,
  loadingAgent: true,
  loadingAgents: true,
  loadingMyAgents: true,
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
      action: PayloadAction<AgentDelegationDetails[] | undefined>
    ) {
      if (action.payload) {
        state.delegationDetails = [...action.payload];
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

    setLoadingAgents(state, action: PayloadAction<boolean>) {
      state.loadingAgents = action.payload;
    },

    setAgents(state, action: PayloadAction<Array<Agent> | undefined>) {
      if (action.payload) {
        state.agents = [...action.payload];
      } else {
        state.agents = undefined;
      }
    },

    setExtraAgents: (
      state,
      action: PayloadAction<Array<Agent> | undefined>
    ) => {
      if (action.payload) {
        state.agents = [...state.agents!, ...action.payload];
      } else {
        state.agents = undefined;
      }
    },

    setAgentsMeta(state, action: PayloadAction<AgentsMeta | undefined>) {
      if (action.payload) {
        state.agentsMeta = { ...action.payload };
      } else {
        state.agentsMeta = undefined;
      }
    },

    setLoadingMyAgents(state, action: PayloadAction<boolean>) {
      state.loadingMyAgents = action.payload;
    },

    setMyAgents(state, action: PayloadAction<Array<Agent> | undefined>) {
      if (action.payload) {
        state.myAgents = [...action.payload];
      } else {
        state.myAgents = undefined;
      }
    },

    setExtraMyAgents: (
      state,
      action: PayloadAction<Array<Agent> | undefined>
    ) => {
      if (action.payload) {
        state.myAgents = [...state.myAgents!, ...action.payload];
      } else {
        state.myAgents = undefined;
      }
    },

    setMyAgentsMeta(state, action: PayloadAction<AgentsMeta | undefined>) {
      if (action.payload) {
        state.myAgentsMeta = { ...action.payload };
      } else {
        state.myAgentsMeta = undefined;
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
  setAgents,
  setExtraAgents,
  setLoadingAgents,
  setAgentsMeta,
  setExtraMyAgents,
  setMyAgents,
  setMyAgentsMeta,
  setLoadingMyAgents,
} = agentReducer.actions;

export default agentReducer.reducer;
