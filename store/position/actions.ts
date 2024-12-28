import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  setActivePosition as setActivePosition_,
  setIsClaiming as setIsClaiming_,
  setIsWithdrawing as setIsWithdrawing_,
} from ".";

const usePositionActions = () => {
  const { dispatch } = useSystemFunctions();

  const setActivePosition = (position: Position | null) => {
    dispatch(setActivePosition_(position));
  };

  const setIsClaiming = (isClaiming: boolean) => {
    dispatch(setIsClaiming_(isClaiming));
  };

  const setIsWithdrawing = (isWithdrawing: boolean) => {
    dispatch(setIsWithdrawing_(isWithdrawing));
  };

  return {
    setActivePosition,
    setIsClaiming,
    setIsWithdrawing,
  };
};

export default usePositionActions;
