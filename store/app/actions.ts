import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setInfo as setInfo_ } from ".";

const useAppActions = () => {
  const { dispatch } = useSystemFunctions();

  const setInfo = (info: Info | null) => {
    dispatch(setInfo_(info));
  };

  return {
    setInfo,
  };
};

export default useAppActions;
