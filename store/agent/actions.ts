import useSystemFunctions from "@/hooks/useSystemFunctions";
import api from "./api";

import {
  setAgent,
  setDelegating,
  setDelegationDetails,
  setLoadingAgent,
  setLoadingDelegationDetails,
} from ".";

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

  return {
    fetchDelegationDetails,
    delegateOrUndelegate,
    connectUser,
    fetchAgent,
  };
};

export default useAgentActions;
