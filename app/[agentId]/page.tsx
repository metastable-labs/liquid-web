"use client";
import { useEffect } from "react";

import useAgentActions from "@/store/agent/actions";
import { Terminal } from "@/views";

export default function TerminalPage({
  params,
}: {
  params: { agentId: string };
}) {
  const { fetchAgent } = useAgentActions();

  useEffect(() => {
    fetchAgent(params.agentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Terminal />;
}
