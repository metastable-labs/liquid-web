"use client";
import { useEffect, useState } from "react";
import FrameSDK from "@farcaster/frame-sdk";

import { Strategies } from "@/views";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setFarcasterContext } from "@/store/app";

const StrategiesPage = () => {
  const { dispatch } = useSystemFunctions();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const user = await FrameSDK.context;

      if (user?.user) {
        dispatch(setFarcasterContext(user.user));
        console.log(user.user);
      }
      FrameSDK.actions.ready();
    };

    if (FrameSDK && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSDKLoaded]);

  return <Strategies />;
};

export default StrategiesPage;
