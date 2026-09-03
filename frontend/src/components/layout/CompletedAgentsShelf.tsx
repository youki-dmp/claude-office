/**
 * Completed Agents Shelf
 *
 * A "trophy shelf" floating in unused screen space (bottom-right, outside
 * the office canvas) that holds a name+icon entry for every subagent whose
 * departure animation has finished. Previously those agents simply vanished
 * from the map the moment they boarded the elevator; now a small receipt of
 * their work sticks around until the user clicks it away (acknowledged).
 *
 * Store-backed: reads `completedAgents` from the game store (populated by
 * agentMachineService.handleAgentRemoved) and dismisses via
 * `dismissCompletedAgent`.
 */
"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { useTranslation } from "@/hooks/useTranslation";

export function CompletedAgentsShelf(): ReactNode {
  const { t } = useTranslation();
  const completedAgents = useGameStore((s) => s.completedAgents);
  const dismissCompletedAgent = useGameStore((s) => s.dismissCompletedAgent);

  if (completedAgents.length === 0) return null;

  return (
    <div className="hidden sm:flex fixed bottom-20 right-4 z-40 flex-col items-end gap-0 pointer-events-none w-48">
      {/* Header tab */}
      <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-t-lg bg-slate-900/95 border border-b-0 border-slate-700 text-[10px] font-bold uppercase tracking-wider text-amber-400">
        <span aria-hidden>{"🏆"}</span>
        <span>{t("completedShelf.title")}</span>
        <span className="text-slate-500 normal-case font-mono">
          ({completedAgents.length})
        </span>
      </div>

      {/* Entry list */}
      <div className="pointer-events-auto w-full max-h-64 overflow-y-auto rounded-lg rounded-tr-none border border-slate-700 bg-slate-900/95 backdrop-blur-sm shadow-2xl divide-y divide-slate-800">
        {completedAgents.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => dismissCompletedAgent(agent.id)}
            title={t("completedShelf.dismissHint")}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-left hover:bg-slate-800/80 transition-colors group cursor-pointer"
          >
            <span
              className="relative flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-white shrink-0 border border-white/20"
              style={{ backgroundColor: agent.color }}
            >
              {(agent.name ?? "?").slice(0, 1).toUpperCase()}
              <CheckCircle2
                size={12}
                strokeWidth={2.5}
                className="absolute -bottom-1 -right-1 text-emerald-400 bg-slate-900 rounded-full"
              />
            </span>
            <span className="flex-1 min-w-0 text-xs text-slate-200 truncate group-hover:text-white">
              {agent.name ?? `#${agent.number}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
