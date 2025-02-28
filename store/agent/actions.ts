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
} from ".";

const formatAgent = (agent: any): Agent => {
  const parseValue = (value: string | number): number => {
    if (typeof value === "string") {
      return parseFloat(value.replace("%", ""));
    }
    return value;
  };

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

  const delegateOrUndelegate = async (agentId: string, isActive: boolean) => {
    try {
      dispatch(setDelegating(true));
      await api.delegateOrUndelegate(agentId, isActive);

      fetchDelegationDetails(agentId);
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
      const { nextPage, previousPage, records, size, totalItems } =
        await api.fetchAgents(page);

      const formattedRecords = records.map((record: any) =>
        formatAgent(record)
      );

      dispatch(setAgentsMeta({ nextPage, previousPage, size, totalItems }));

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
      const { nextPage, previousPage, records, size, totalItems } =
        await api.fetchMyAgents(page);

      const formattedRecords = records.map((record: any) =>
        formatAgent(record)
      );

      dispatch(setMyAgentsMeta({ nextPage, previousPage, size, totalItems }));

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

  return {
    fetchDelegationDetails,
    delegateOrUndelegate,
    connectUser,
    fetchAgent,
    fetchAgents,
    fetchMyAgents,
  };
};

export default useAgentActions;
