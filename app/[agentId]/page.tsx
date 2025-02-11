import { Terminal } from "@/views";

const fetchData = async (agentId: string): Promise<Agent> => {
  const res = await fetch(
    `https://dev.useliquid.xyz/aqua/api/v1/agents/${agentId}`,
    {
      priority: "high",
    }
  );

  if (!res.ok) {
    let errorMessage = "Failed to fetch agent data";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (jsonError) {
      errorMessage = await res.text();
    }

    throw new Error(`Error fetching agent: ${errorMessage}`);
  }

  const response: { data: Agent } = await res.json();

  return response.data;
};

export default async function TerminalPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const agentId = (await params).agentId;

  const agent = await fetchData(agentId);

  return <Terminal agent={agent} />;
}
