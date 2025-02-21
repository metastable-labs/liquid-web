"use client";
import { useEffect } from "react";

import useAgentActions from "@/store/agent/actions";
import { Terminal } from "@/views";

export default function TerminalPage({
  params,
}: {
  params: { agentId: any }
}) {
  const { fetchAgent } = useAgentActions();

  useEffect(() => {
    fetchAgent(params?.agentId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Terminal />;
}
