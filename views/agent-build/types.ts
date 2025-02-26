import { SetStateAction, Dispatch } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

type AgentFunction =
  | "trade-memecoins"
  | "provide-liquidity"
  | "invest-defi"
  | "liquid-protocol";

type AgentBuildForm = {
  agentName: string;
  agentDeveloperID: string;
};

interface AgentAvatarProps {
  agentFunction: AgentFunction;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

interface StepProps {
  setStep?: Dispatch<SetStateAction<number>>;
  agentFunction?: AgentFunction;
  setAgentFunction?: Dispatch<SetStateAction<AgentFunction | undefined>>;
  register?: UseFormRegister<AgentBuildForm>;
  watch?: UseFormWatch<AgentBuildForm>;
  errors?: FieldErrors<AgentBuildForm>;
  setFile?: Dispatch<SetStateAction<File | null>>;
  file?: File | null;
  tokenSymbol?: string;
  createTokenPage?: boolean;
  setCreateTokenPage?: Dispatch<SetStateAction<boolean>>;
  setValue?: UseFormSetValue<AgentBuildForm>;
  setDisableHeader?: Dispatch<SetStateAction<boolean>>;
  setProtocol?: Dispatch<SetStateAction<string | undefined>>;
  protocol?: string;
}

interface FunctionCardProps {
  setAgentFunction: Dispatch<SetStateAction<AgentFunction | undefined>>;
  agentFunction?: AgentFunction;
  active?: boolean;
}

export type {
  AgentBuildForm,
  StepProps,
  AgentFunction,
  FunctionCardProps,
  AgentAvatarProps,
};
