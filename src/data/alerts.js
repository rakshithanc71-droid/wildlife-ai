// ============================================================================
// LIVE ALERTS DATA — DERIVED FROM REAL DATA
// This file does NOT hold its own separate dataset. Your uploaded data only
// contained one real conflict/incident log, so "Live Alerts" is defined as
// the subset of src/data/incidents.js that is not yet Resolved (i.e. still
// "Open" or "Under Review") — the currently-active situations an officer
// needs to act on. The full historical log (including Resolved records)
// lives in the Incidents page.
//
// To add a new alert, add a new record to src/data/incidents.js — if its
// status isn't "Resolved", it will automatically appear here too.
// ============================================================================

import { incidents, deriveZone } from './incidents.js'

export const alerts = incidents
  .filter((inc) => inc.status !== 'Resolved')
  .map((inc) => ({
    id: inc.id,
    type: inc.type,
    species: inc.species,
    location: inc.location,
    zone: deriveZone(inc.location),
    date: inc.date,
    time: inc.time,
    severity: inc.severity,
    status: inc.status,
    // "description" holds the real `outcome` field from the source data —
    // it is shown in the UI as "Outcome / Notes", not invented text.
    description: inc.outcome,
    // Not present in the source data — shown as N/A rather than invented.
    recommendedAction: 'N/A',
    coordinates: inc.coordinates,
    reportedBy: inc.reportedBy,
    cameraId: inc.cameraId,
  }))

export function getAlertById(id) {
  return alerts.find((a) => a.id === id)
}

// Only the statuses that actually occur in the source data.
export const severityOptions = ['Critical', 'High', 'Medium']
export const statusOptions = ['Open', 'Under Review', 'Resolved']

// The order status progresses through as an officer works an alert.
export const statusFlow = ['Open', 'Under Review', 'Resolved']
