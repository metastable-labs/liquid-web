"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";

import useAgentActions from "@/store/agent/actions";
import { Terminal } from "@/views";

export default function TerminalPage() {
  const { fetchAgent } = useAgentActions();
  const params = useParams() as { agentId: string };

  useEffect(() => {
    if (params.agentId) {
      fetchAgent(params.agentId);
    }
  }, [params.agentId, fetchAgent]);

  return <Terminal />;
}
