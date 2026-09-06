/**
 * Shared Agent State Colors
 *
 * Maps AgentState to a color + short label for the floor-view status badge.
 * Mirrors AgentStatus.tsx's getBackendStateColor() palette so the side panel
 * and the floor view agree on what each color means.
 */

import type { AgentState } from "@/types";

export interface StateBadgeStyle {
  color: number;
  label: string;
}

export const STATE_BADGE: Record<AgentState, StateBadgeStyle> = {
  working: { color: 0xf59e0b, label: "WORKING" },
  waiting_permission: { color: 0xf97316, label: "WAITING" },
  reporting: { color: 0x3b82f6, label: "REPORTING" },
  reporting_done: { color: 0x3b82f6, label: "REPORTING" },
  walking_to_desk: { color: 0x6366f1, label: "MOVING" },
  leaving: { color: 0x6366f1, label: "LEAVING" },
  waiting: { color: 0x22d3ee, label: "WAITING" },
  completed: { color: 0x10b981, label: "DONE" },
  thinking: { color: 0xa855f7, label: "THINKING" },
  arriving: { color: 0x64748b, label: "ARRIVING" },
  in_elevator: { color: 0x64748b, label: "ARRIVING" },
  idle: { color: 0x10b981, label: "IDLE" },
};
