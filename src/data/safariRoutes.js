// ============================================================================
// SAFARI / TOURISM ROUTE DATA — REAL DATA
// Source: A1_START_-_Sheet1.pdf and A2_END_-_Sheet1.pdf (uploaded by user)
//
// Your dataset describes one real route (R001, the Bagori route): a shared
// start gate used by 20 bookings (SB001–SB020), each with its own recorded
// end/waypoint coordinate. The source data explicitly labels the end-point
// coordinates as "Prototype coordinate" and the start record's status as
// "Prototype verify" — this is preserved below as `dataStatus` rather than
// hidden, since it's a real field from your sheet, not an assumption.
//
// Your data has no distance, duration, or risk-level columns, so those are
// intentionally not shown for this route (the UI displays "N/A" for any
// stat that isn't in your dataset instead of inventing a number).
// ============================================================================

export const safariRoutes = [
  {
    id: 'R001',
    name: 'Bagori Safari Route',
    startPoint: {
      name: 'Bagori Safari Gate',
      lat: 26.5816,
      lng: 93.1706,
      zone: 'Western Bagori',
      zoneType: 'Buffer',
    },
    dataStatus: 'Prototype verify',
    waypoints: [
      { bookingId: 'SB001', name: 'Bagori Route Point 1', lat: 26.57159, lng: 93.21761, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB002', name: 'Bagori Route Point 2', lat: 26.57767, lng: 93.21888, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB003', name: 'Bagori Route Point 3', lat: 26.57582, lng: 93.20039, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB004', name: 'Bagori Route Point 4', lat: 26.56799, lng: 93.20597, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB005', name: 'Bagori Route Point 5', lat: 26.57456, lng: 93.19604, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB006', name: 'Bagori Route Point 6', lat: 26.5728, lng: 93.18702, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB007', name: 'Bagori Route Point 7', lat: 26.56464, lng: 93.20261, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB008', name: 'Bagori Route Point 8', lat: 26.55282, lng: 93.20803, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB009', name: 'Bagori Route Point 9', lat: 26.56698, lng: 93.17656, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB010', name: 'Bagori Route Point 10', lat: 26.56107, lng: 93.17342, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB011', name: 'Bagori Route Point 11', lat: 26.55782, lng: 93.16354, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB012', name: 'Bagori Route Point 12', lat: 26.56802, lng: 93.15177, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB013', name: 'Bagori Route Point 13', lat: 26.56971, lng: 93.13975, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB014', name: 'Bagori Route Point 14', lat: 26.55112, lng: 93.15839, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB015', name: 'Bagori Route Point 15', lat: 26.56262, lng: 93.1483, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB016', name: 'Bagori Route Point 16', lat: 26.56337, lng: 93.22176, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB017', name: 'Bagori Route Point 17', lat: 26.5534, lng: 93.22502, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB018', name: 'Bagori Route Point 18', lat: 26.54624, lng: 93.222, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB019', name: 'Bagori Route Point 19', lat: 26.53979, lng: 93.22269, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
      { bookingId: 'SB020', name: 'Bagori Route Point 20', lat: 26.5357, lng: 93.21219, zone: 'Western/Bagori', zoneType: 'Core', dataStatus: 'Prototype coordinate' },
    ],
  },
]

export function getRouteById(id) {
  return safariRoutes.find((r) => r.id === id)
}
