/**
 * Completed-agents slice.
 *
 * "Trophy shelf" of subagents whose departure animation has fully finished
 * (i.e. they would previously have vanished from state entirely). Each entry
 * is a small, frozen snapshot of the agent taken right before `removeAgent`
 * deletes it from the live `agents` map (see agentMachineService.handleAgentRemoved).
 *
 * Entries persist here — outside the office grid — until the user dismisses
 * them (click), so a completed subagent's work doesn't just disappear
 * unacknowledged.
 */
import type { StateCreator } from "zustand";
import type { GameStore } from "../gameStore";

export interface CompletedAgentEntry {
  id: string;
  name: string | null;
  color: string;
  number: number;
  characterType: string | null;
  completedAt: number; // Date.now() at time of departure completion
}

export type CompletedAgentsSlice = {
  completedAgents: CompletedAgentEntry[];
  addCompletedAgent: (entry: CompletedAgentEntry) => void;
  dismissCompletedAgent: (agentId: string) => void;
  clearCompletedAgents: () => void;
};

export const initialCompletedAgentsState = {
  completedAgents: [] as CompletedAgentEntry[],
};

export const createCompletedAgentsSlice: StateCreator<
  GameStore,
  [],
  [],
  CompletedAgentsSlice
> = (set) => ({
  ...initialCompletedAgentsState,

  addCompletedAgent: (entry) =>
    set((state) => ({
      completedAgents: [...state.completedAgents, entry],
    })),

  dismissCompletedAgent: (agentId) =>
    set((state) => ({
      completedAgents: state.completedAgents.filter((e) => e.id !== agentId),
    })),

  clearCompletedAgents: () => set({ completedAgents: [] }),
});
