"use client";
import FrameSDK from "@farcaster/frame-sdk";

import { Create } from "@/views";
import { useEffect, useState } from "react";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setFarcasterContext } from "@/store/app";

const CreatePage = () => {
  const { dispatch } = useSystemFunctions();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(
    function initFrameSDK() {
      const load = async () => {
        const user = await FrameSDK.context;

        if (user?.user) {
          dispatch(setFarcasterContext(user.user));
        }
        FrameSDK.actions.ready();
      };

      if (FrameSDK && !isSDKLoaded) {
        setIsSDKLoaded(true);
        load();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSDKLoaded]
  );

  return <Create />;
};

export default CreatePage;
