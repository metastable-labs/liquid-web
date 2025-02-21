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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.agentId]);

  return <Terminal />;
}
