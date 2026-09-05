// ============================================================================
// RANGERS DATA
// Your uploaded files (conflict log, sighting log, safari route sheets)
// did not include any ranger names, IDs, or assignments — only a
// "reported_by" role like "Ranger" or "Farmer" on some incidents, which
// isn't a specific ranger record.
//
// You asked for this page to be filled in, so the records below are
// clearly-marked SAMPLE / PLACEHOLDER data (isSample: true) — not part of
// your real dataset. The Rangers page shows a visible banner whenever any
// sample records are present, so they're never mistaken for real data.
//
// To replace with your real roster: edit or remove these objects and add
// your own in the same shape. Once every record has isSample removed (or
// set to false), the placeholder banner disappears automatically.
//
// Shape: { id, name, team, zone, status, assignment, lastUpdate, isSample }
// Allowed status values: 'On Duty' | 'Patrolling' | 'Available' | 'Off Duty'
// ============================================================================

export const rangers = [
  { id: 'RGR-001', name: 'Arjun Mehta', team: 'Alpha Patrol', zone: 'Core Zone', status: 'Patrolling', assignment: 'Responding to poaching-like activity near Core Zone Gate 3', lastUpdate: 'Sample data', isSample: true },
  { id: 'RGR-002', name: 'Priya Nair', team: 'Bravo Patrol', zone: 'Village Edge', status: 'On Duty', assignment: 'Monitoring elephant activity near village boundary', lastUpdate: 'Sample data', isSample: true },
  { id: 'RGR-003', name: 'Karan Thakur', team: 'Buffer Zone Unit', zone: 'Buffer Zone', status: 'Patrolling', assignment: 'Routine buffer zone patrol', lastUpdate: 'Sample data', isSample: true },
  { id: 'RGR-004', name: 'Meera Iyer', team: 'Farmland Response', zone: 'Farmland Edge', status: 'On Duty', assignment: 'Crop-raid follow-up near farmland edge', lastUpdate: 'Sample data', isSample: true },
  { id: 'RGR-005', name: 'Vikram Singh', team: 'Safari Escort Unit', zone: 'Safari Route Edge', status: 'Available', assignment: 'Standing by for safari route escort duty', lastUpdate: 'Sample data', isSample: true },
  { id: 'RGR-006', name: 'Ananya Rao', team: 'Control Room', zone: 'Base Station', status: 'Off Duty', assignment: 'Rest period', lastUpdate: 'Sample data', isSample: true },
]

export const rangerStatusOptions = ['On Duty', 'Patrolling', 'Available', 'Off Duty']

export const hasSampleRangerData = rangers.some((r) => r.isSample)
