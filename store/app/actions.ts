import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setInfo as setInfo_,
  setOpenGrantPermission,
  setToast,
  setOpenSelectNetworkModal,
  setOpenAccessDenied,
  setIsAgentLogOpen,
} from ".";
import api from "./api";

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const setInfo = (info: Info | null) => {
    dispatch(setInfo_(info));
  };

  const showToast = (message: string, type: Toast) => {
    dispatch(setToast({ message, type, show: true }));

    setTimeout(
      () => dispatch(setToast({ message: "", type: "success", show: false })),
      5000
    );
  };

  const hideToast = () => {
    dispatch(setToast({ message: "", type: "success", show: false }));
  };

  const registerUser = async (walletAddress: string) => {
    try {
      await api.onboard(walletAddress);
    } catch (error) {
      console.error("error", error);
    }
  };

  const showGrantPermission = (show: boolean) => {
    dispatch(setOpenGrantPermission(show));
  };

  const showAccessDeniedModal = (show: boolean) => {
    dispatch(setOpenAccessDenied(show));
  };

  const showSelectNetworkModal = (show: boolean) =>
    dispatch(setOpenSelectNetworkModal(show));

  const showAgentLog = (show: boolean) => dispatch(setIsAgentLogOpen(show));

  return {
    setInfo,
    showToast,
    hideToast,
    registerUser,
    showGrantPermission,
    showSelectNetworkModal,
    showAccessDeniedModal,
    showAgentLog,
  };
};

export default useAppActions;
