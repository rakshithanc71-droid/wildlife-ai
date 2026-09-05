// ============================================================================
// INCIDENTS DATA — REAL DATA
// Source: wildlife_gurdian_conflict_-_Google_Sheets_2-1.pdf (uploaded by user)
// This is the full log of every human-wildlife conflict / patrol incident
// record collected in the field. To add a new incident, add another object
// to this array — nothing else needs to change.
//
// "Live Alerts" (src/data/alerts.js) is a DERIVED VIEW of this same file:
// it shows only the records below whose status is not yet "Resolved".
// That is intentional — an alert *is* an incident that hasn't been closed
// out yet, so there is one source of truth, not two separate datasets.
// ============================================================================

// Actual values found in the source data (do not add values not present):
export const incidentTypeOptions = [
  'Crop Raid',
  'Animal Near Village',
  'Animal Crossing Road',
  'Poaching-like Activity',
  'Unauthorized Vehicle',
]
export const severityOptions = ['Critical', 'High', 'Medium']
export const incidentStatusOptions = ['Open', 'Under Review', 'Resolved']

// Zone is not a column in the source sheet — it's derived here from the
// `location` text itself (e.g. "Core Zone Gate 3" -> "Core Zone"), using the
// same zone vocabulary as the wildlife sightings dataset. Locations that
// don't match a known zone keyword show "N/A" rather than a guess.
export function deriveZone(location) {
  if (/core zone/i.test(location)) return 'Core Zone'
  if (/buffer zone/i.test(location)) return 'Buffer Zone'
  if (/village/i.test(location)) return 'Village Edge'
  if (/farm/i.test(location)) return 'Farmland Edge'
  if (/safari route/i.test(location)) return 'Safari Route Edge'
  return 'N/A'
}

export const incidents = [
  { id: 'CI001', date: '2026-08-20', time: '6:30 AM', type: 'Crop Raid', location: 'North Farm', species: 'Asian Elephant', severity: 'High', outcome: 'Crops damaged', reportedBy: 'Farmer', status: 'Resolved', cameraId: 'CAM005', coordinates: { lat: 26.5624, lng: 93.1905 } },
  { id: 'CI002', date: '2026-08-20', time: '9:15 PM', type: 'Animal Near Village', location: 'East Village', species: 'Asian Elephant', severity: 'High', outcome: 'Villagers alerted', reportedBy: 'Camera AI', status: 'Resolved', cameraId: 'CAM009', coordinates: { lat: 26.5538, lng: 93.2012 } },
  { id: 'CI003', date: '2026-08-21', time: '2:20 PM', type: 'Animal Crossing Road', location: 'Forest Road 2', species: 'Indian Rhinoceros', severity: 'Medium', outcome: 'Traffic stopped', reportedBy: 'Ranger', status: 'Resolved', cameraId: 'CAM004', coordinates: { lat: 26.5902, lng: 93.1554 } },
  { id: 'CI004', date: '2026-08-21', time: '11:40 PM', type: 'Poaching-like Activity', location: 'Core Zone Gate 3', species: 'Unknown', severity: 'High', outcome: 'Patrol dispatched', reportedBy: 'Camera AI', status: 'Under Review', cameraId: 'CAM012', coordinates: { lat: 26.5459, lng: 93.1845 } },
  { id: 'CI005', date: '2026-08-22', time: '8:10 AM', type: 'Crop Raid', location: 'South Farm', species: 'Wild Boar', severity: 'Medium', outcome: 'Fencing requested', reportedBy: 'Villager', status: 'Open', cameraId: 'CAM003', coordinates: { lat: 26.5698, lng: 93.1821 } },
  { id: 'CI006', date: '2026-08-22', time: '7:35 PM', type: 'Animal Near Village', location: 'West Village', species: 'Leopard', severity: 'High', outcome: 'Residents warned', reportedBy: 'Ranger', status: 'Resolved', cameraId: 'CAM012', coordinates: { lat: 26.5459, lng: 93.1845 } },
  { id: 'CI007', date: '2026-08-23', time: '1:20 AM', type: 'Poaching-like Activity', location: 'Core Zone 2', species: 'Unknown', severity: 'Critical', outcome: 'Forest team alerted', reportedBy: 'Camera AI', status: 'Under Review', cameraId: 'CAM015', coordinates: { lat: 26.6032, lng: 93.1685 } },
  { id: 'CI008', date: '2026-08-23', time: '4:45 PM', type: 'Animal Crossing Road', location: 'Safari Route B', species: 'Asian Elephant', severity: 'High', outcome: 'Safari route changed', reportedBy: 'Driver', status: 'Resolved', cameraId: 'CAM014', coordinates: { lat: 26.5587, lng: 93.2076 } },
  { id: 'CI009', date: '2026-08-24', time: '7:55 AM', type: 'Crop Raid', location: 'North Farm', species: 'Indian Rhinoceros', severity: 'High', outcome: 'Compensation process started', reportedBy: 'Villager', status: 'Open', cameraId: 'CAM004', coordinates: { lat: 26.5902, lng: 93.1554 } },
  { id: 'CI010', date: '2026-08-25', time: '10:10 PM', type: 'Unauthorized Vehicle', location: 'Buffer Zone Road', species: 'Unknown', severity: 'High', outcome: 'Vehicle reported', reportedBy: 'Ranger', status: 'Open', cameraId: 'CAM010', coordinates: { lat: 26.5944, lng: 93.1498 } },
  { id: 'CI011', date: '2026-08-26', time: '6:30 AM', type: 'Crop Raid', location: 'North Farm', species: 'Asian Elephant', severity: 'High', outcome: 'Crops damaged', reportedBy: 'Farmer', status: 'Open', cameraId: 'CAM019', coordinates: { lat: 26.581, lng: 93.176 } },
  { id: 'CI012', date: '2026-08-26', time: '7:15 AM', type: 'Animal Near Village', location: 'East Village', species: 'Asian Elephant', severity: 'High', outcome: 'Villagers alerted', reportedBy: 'Camera AI', status: 'Resolved', cameraId: 'CAM024', coordinates: { lat: 26.555, lng: 93.201 } },
  { id: 'CI013', date: '2026-08-26', time: '8:40 AM', type: 'Animal Crossing Road', location: 'Forest Road 2', species: 'Indian Rhinoceros', severity: 'Medium', outcome: 'Traffic stopped', reportedBy: 'Ranger', status: 'Resolved', cameraId: 'CAM021', coordinates: { lat: 26.592, lng: 93.158 } },
  { id: 'CI014', date: '2026-08-26', time: '9:20 AM', type: 'Poaching-like Activity', location: 'Core Zone Gate 3', species: 'Unknown', severity: 'Critical', outcome: 'Patrol dispatched', reportedBy: 'Camera AI', status: 'Under Review', cameraId: 'CAM028', coordinates: { lat: 26.548, lng: 93.185 } },
  { id: 'CI015', date: '2026-08-26', time: '10:05 AM', type: 'Crop Raid', location: 'South Farm', species: 'Wild Boar', severity: 'Medium', outcome: 'Minor crop damage', reportedBy: 'Farmer', status: 'Open', cameraId: 'CAM023', coordinates: { lat: 26.571, lng: 93.181 } },
  { id: 'CI016', date: '2026-08-26', time: '11:45 AM', type: 'Animal Near Village', location: 'West Village', species: 'Asian Elephant', severity: 'High', outcome: 'Residents warned', reportedBy: 'Ranger', status: 'Resolved', cameraId: 'CAM032', coordinates: { lat: 26.552, lng: 93.214 } },
  { id: 'CI017', date: '2026-08-26', time: '1:10 PM', type: 'Poaching-like Activity', location: 'Core Zone 2', species: 'Unknown', severity: 'Critical', outcome: 'Investigation started', reportedBy: 'Camera AI', status: 'Under Review', cameraId: 'CAM034', coordinates: { lat: 26.557, lng: 93.204 } },
  { id: 'CI018', date: '2026-08-26', time: '2:30 PM', type: 'Animal Crossing Road', location: 'Safari Route B', species: 'Asian Elephant', severity: 'High', outcome: 'Safari route changed', reportedBy: 'Safari Driver', status: 'Resolved', cameraId: 'CAM027', coordinates: { lat: 26.56, lng: 93.207 } },
  { id: 'CI019', date: '2026-08-26', time: '4:00 PM', type: 'Crop Raid', location: 'North Farm', species: 'Wild Boar', severity: 'Medium', outcome: 'Fencing requested', reportedBy: 'Villager', status: 'Open', cameraId: 'CAM031', coordinates: { lat: 26.568, lng: 93.199 } },
  { id: 'CI020', date: '2026-08-26', time: '6:45 PM', type: 'Unauthorized Vehicle', location: 'Buffer Zone Road', species: 'Unknown', severity: 'High', outcome: 'Vehicle reported', reportedBy: 'Ranger', status: 'Open', cameraId: 'CAM030', coordinates: { lat: 26.595, lng: 93.15 } },
  { id: 'CI021', date: '2026-08-27', time: '6:50 AM', type: 'Animal Near Village', location: 'South Village', species: 'Leopard', severity: 'Critical', outcome: 'Residents evacuated', reportedBy: 'Ranger', status: 'Under Review', cameraId: 'CAM034', coordinates: { lat: 26.557, lng: 93.204 } },
  { id: 'CI022', date: '2026-08-27', time: '8:25 AM', type: 'Crop Raid', location: 'East Farm', species: 'Asian Elephant', severity: 'High', outcome: 'Crops damaged', reportedBy: 'Farmer', status: 'Open', cameraId: 'CAM024', coordinates: { lat: 26.555, lng: 93.201 } },
  { id: 'CI023', date: '2026-08-27', time: '10:10 AM', type: 'Animal Crossing Road', location: 'Forest Road 1', species: 'Wild Boar', severity: 'Medium', outcome: 'Road monitored', reportedBy: 'Camera AI', status: 'Resolved', cameraId: 'CAM037', coordinates: { lat: 26.57, lng: 93.188 } },
  { id: 'CI024', date: '2026-08-27', time: '12:35 PM', type: 'Poaching-like Activity', location: 'Western Gate', species: 'Unknown', severity: 'Critical', outcome: 'Security team alerted', reportedBy: 'Camera AI', status: 'Under Review', cameraId: 'CAM028', coordinates: { lat: 26.548, lng: 93.185 } },
  { id: 'CI025', date: '2026-08-27', time: '3:20 PM', type: 'Unauthorized Vehicle', location: 'Core Zone Road', species: 'Unknown', severity: 'High', outcome: 'Vehicle stopped', reportedBy: 'Ranger', status: 'Resolved', cameraId: 'CAM030', coordinates: { lat: 26.595, lng: 93.15 } },
]

export function getIncidentById(id) {
  return incidents.find((i) => i.id === id)
}

// Unique village-like locations (used by the Map View "Villages" layer),
// derived from incident records whose location text refers to a village —
// one marker per distinct location name, using that record's own coordinates.
export function getVillageLocations() {
  const seen = new Map()
  incidents.forEach((inc) => {
    if (/village/i.test(inc.location) && !seen.has(inc.location)) {
      seen.set(inc.location, { name: inc.location, lat: inc.coordinates.lat, lng: inc.coordinates.lng })
    }
  })
  return [...seen.values()]
}
