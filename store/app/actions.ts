import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setInfo as setInfo_, setToast } from ".";

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

  return {
    setInfo,
    showToast,
    hideToast,
  };
};

export default useAppActions;
