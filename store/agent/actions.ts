import useSystemFunctions from "@/hooks/useSystemFunctions";
import { CallbackProps } from "..";
import api from "./api";
import {
  setAgent,
  setDelegating,
  setDelegationDetails,
  setLoadingAgent,
  setLoadingDelegationDetails,
  setAgents,
  setExtraAgents,
  setLoadingAgents,
  setAgentsMeta,
  setExtraMyAgents,
  setMyAgents,
  setMyAgentsMeta,
  setLoadingMyAgents,
  setDelegatedAgents,
  setLoadingDelegatedAgents,
  setChannelFollowers,
} from ".";

const parseValue = (value: string | number): number => {
  if (typeof value === "string") {
    return parseFloat(value.replace("%", ""));
  }
  return value;
};

const formatAgent = (agent: any): Agent => {
  return {
    ...agent,
    last7dPnl: parseValue(agent.last7dPnl),
    totalPnl: parseValue(agent.totalPnl),
  };
};

const useAgentActions = () => {
  const { dispatch } = useSystemFunctions();

  const fetchAgent = async (agentId: string) => {
    try {
      dispatch(setLoadingAgent(true));
      const response = await api.fetchAgent(agentId);

      dispatch(setAgent(response));
    } catch (error: any) {
      dispatch(setAgent(undefined));
    } finally {
      dispatch(setLoadingAgent(false));
    }
  };

  const fetchDelegationDetails = async (agentId: string) => {
    try {
      dispatch(setLoadingDelegationDetails(true));
      const response = await api.fetchDelegationStatus(agentId);

      dispatch(setDelegationDetails(response));
    } catch (error: any) {
      dispatch(setDelegationDetails(undefined));
    } finally {
      dispatch(setLoadingDelegationDetails(false));
    }
  };

  const delegateOrUndelegate = async (
    agentId: string,
    isActive: boolean,
    chain: "BASE" | "SOLANA"
  ) => {
    try {
      dispatch(setDelegating(true));
      await api.delegateOrUndelegate(agentId, isActive, chain);

      fetchDelegationDetails(agentId);
      fetchDelegatedAgents();
    } catch (error: any) {
      //
    } finally {
      dispatch(setDelegating(false));
    }
  };

  const connectUser = async () => {
    await api.connectUser();
  };

  const fetchAgents = async (page: number, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingAgents(true));
      const { data, meta } = await api.fetchAgents(page);

      if (!meta.previousPage && !data) {
        return dispatch(setMyAgents(undefined));
      }

      if (!data) {
        return;
      }

      const formattedRecords = data.map((record: any) => formatAgent(record));

      dispatch(setAgentsMeta({ ...meta }));

      if (page === 1) {
        dispatch(setAgents(formattedRecords));
      } else {
        dispatch(setExtraAgents(formattedRecords));
      }

      callback?.onSuccess?.(formattedRecords);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingAgents(false));
    }
  };

  const fetchMyAgents = async (page: number, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingMyAgents(true));
      const { data, meta } = await api.fetchMyAgents(page);

      if (!meta.previousPage && !data) {
        return dispatch(setMyAgents(undefined));
      }

      if (!data) {
        return;
      }

      const formattedRecords = data.map((record: any) => formatAgent(record));

      dispatch(setMyAgentsMeta({ ...meta }));

      if (page === 1) {
        dispatch(setMyAgents(formattedRecords));
      } else {
        dispatch(setExtraMyAgents(formattedRecords));
      }

      callback?.onSuccess?.(formattedRecords);
    } catch (error: any) {
      callback?.onError?.(error);
      dispatch(setMyAgents(undefined));
    } finally {
      dispatch(setLoadingMyAgents(false));
    }
  };

  const fetchDelegatedAgents = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoadingDelegatedAgents(true));
      const { data, meta } = await api.fetchDelegatedAgents();

      if (!meta.previousPage && !data) {
        return dispatch(setDelegatedAgents(undefined));
      }

      if (!data) {
        return;
      }

      const formattedAgents = data.map((agent) => formatAgent(agent));

      dispatch(setDelegatedAgents(formattedAgents));

      callback?.onSuccess?.(formattedAgents);
    } catch (error: any) {
      dispatch(setDelegatedAgents(undefined));
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingDelegatedAgents(false));
    }
  };

  const fetchChannelFollowers = async (callback?: CallbackProps) => {
    try {
      const response = await api.fetchChannelFollowers();

      dispatch(setChannelFollowers(response));
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  return {
    fetchDelegationDetails,
    delegateOrUndelegate,
    connectUser,
    fetchAgent,
    fetchAgents,
    fetchMyAgents,
    fetchDelegatedAgents,
    fetchChannelFollowers,
  };
};

export default useAgentActions;
