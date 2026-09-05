import { Fragment } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Real map, real coordinates — this replaced an earlier CSS-only mock map
// once your uploaded data supplied actual latitude/longitude values (the
// reserve here is the Kaziranga area in Assam, India, based on your data).
// Tiles load from OpenStreetMap (no API key, free to use).

const FALLBACK_CENTER = { lat: 26.575, lng: 93.185 }

function computeCenter(points) {
  if (!points.length) return FALLBACK_CENTER
  const sum = points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }), { lat: 0, lng: 0 })
  return { lat: sum.lat / points.length, lng: sum.lng / points.length }
}

function dotIcon(color, size = 16) {
  return L.divIcon({
    className: 'wg-map-marker',
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

const ICONS = {
  alert: dotIcon('#b6402a', 18),
  sighting: dotIcon('#6b5744', 14),
  sightingAlert: dotIcon('#b6402a', 14),
  village: dotIcon('#33627d', 16),
  routeStart: dotIcon('#2f6844', 20),
  routePoint: dotIcon('#c17a2e', 10),
}

export default function MapCanvas({
  alerts = [],
  sightings = [],
  villages = [],
  routes = [],
  layers,
  height = 400,
  interactive = true,
  zoom,
  center,
}) {
  const showAlerts = layers?.alerts !== false
  const showWildlife = layers?.wildlife !== false
  const showVillages = layers?.villages !== false
  const showRoutes = layers?.routes !== false

  const allPoints = [
    ...alerts.map((a) => a.coordinates),
    ...sightings.map((s) => s.coordinates),
    ...villages.map((v) => ({ lat: v.lat, lng: v.lng })),
  ].filter(Boolean)

  const mapCenter = center || computeCenter(allPoints)
  const mapZoom = zoom || 12

  return (
    <div style={{ height, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        dragging={interactive}
        scrollWheelZoom={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        touchZoom={interactive}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showAlerts &&
          alerts.map((alert) => (
            <Marker key={alert.id} position={[alert.coordinates.lat, alert.coordinates.lng]} icon={ICONS.alert}>
              <Popup>
                <strong>{alert.id}</strong> — {alert.type}
                <br />
                {alert.species} · {alert.location}
                <br />
                Severity: {alert.severity} · Status: {alert.status}
                <br />
                {alert.date} {alert.time}
              </Popup>
            </Marker>
          ))}

        {showWildlife &&
          sightings.map((s) => (
            <Marker
              key={s.id}
              position={[s.coordinates.lat, s.coordinates.lng]}
              icon={s.status === 'Alert' ? ICONS.sightingAlert : ICONS.sighting}
            >
              <Popup>
                <strong>{s.id}</strong> — {s.species}
                <br />
                Zone: {s.zone} · Status: {s.status}
                <br />
                {s.date} {s.time}
                <br />
                Confidence: {Math.round(s.confidenceScore * 100)}%
              </Popup>
            </Marker>
          ))}

        {showVillages &&
          villages.map((v) => (
            <Marker key={v.name} position={[v.lat, v.lng]} icon={ICONS.village}>
              <Popup>{v.name}</Popup>
            </Marker>
          ))}

        {showRoutes &&
          routes.map((route) => (
            <Fragment key={route.id}>
              <Marker position={[route.startPoint.lat, route.startPoint.lng]} icon={ICONS.routeStart}>
                <Popup>
                  <strong>{route.startPoint.name}</strong>
                  <br />
                  Start point — {route.name}
                  <br />
                  Zone: {route.startPoint.zone} ({route.startPoint.zoneType})
                </Popup>
              </Marker>
              {route.waypoints.map((wp) => (
                <Marker key={wp.bookingId} position={[wp.lat, wp.lng]} icon={ICONS.routePoint}>
                  <Popup>
                    <strong>{wp.bookingId}</strong> — {wp.name}
                    <br />
                    Zone: {wp.zone} ({wp.zoneType})
                    <br />
                    {wp.dataStatus}
                  </Popup>
                </Marker>
              ))}
              {route.waypoints.map((wp) => (
                <Polyline
                  key={`line-${wp.bookingId}`}
                  positions={[
                    [route.startPoint.lat, route.startPoint.lng],
                    [wp.lat, wp.lng],
                  ]}
                  pathOptions={{ color: '#c17a2e', weight: 1.5, dashArray: '4 6', opacity: 0.6 }}
                />
              ))}
            </Fragment>
          ))}
      </MapContainer>
    </div>
  )
}
