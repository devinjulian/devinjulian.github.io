// Single source of truth for the public Polymarket Signals results log.
// COMPLIANCE: real, owner-provided data only — never fabricate (PRD §8 / CLAUDE.md).
// Results are outcomes / R-multiples with risk shown, never $ or % profit.
// The log is EMPTY until the public results log ships (the page says so); the
// calendar renders the current month with no entries, which is the honest state.
// Sessions reuse the AiAgentSession shape so the shared SignalCalendar works for
// both signal streams — revisit the shape if Polymarket entries need event fields.

import type { AiAgentSession } from './aiAgentLog'

export const polymarketLog: AiAgentSession[] = []
