import { useEffect, useState } from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { useLoginToFrame } from "@privy-io/react-auth/farcaster";
import { usePrivy } from "@privy-io/react-auth";

import useSystemFunctions from "./useSystemFunctions";
import { setFarcasterContext } from "@/store/app";

const useConnectToFarcaster = () => {
  const { ready, authenticated } = usePrivy();
  const { initLoginToFrame, loginToFrame } = useLoginToFrame();
  const { dispatch } = useSystemFunctions();

  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const loginToFarcasterFrame = async () => {
    try {
      if (!ready || authenticated) return;

      const { nonce } = await initLoginToFrame();

      const result = await FrameSDK.actions.signIn({ nonce: nonce });

      await loginToFrame({
        message: result.message,
        signature: result.signature,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    function initFrameSDK() {
      const load = async () => {
        const user = await FrameSDK.context;

        if (user?.user) {
          dispatch(setFarcasterContext(user.user));
        }
        FrameSDK.actions.ready();

        setTimeout(() => {
          FrameSDK.actions.addFrame();
        }, 4000);
      };

      if (FrameSDK && !isSDKLoaded) {
        setIsSDKLoaded(true);
        load();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSDKLoaded]
  );

  return { loginToFarcasterFrame, isSDKLoaded };
};

export default useConnectToFarcaster;
