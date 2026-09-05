import { useState } from 'react'
import { MapPin, Flag, Route as RouteIcon } from 'lucide-react'
import SectionHeader from '../../components/common/SectionHeader.jsx'
import { safariRoutes } from '../../data/safariRoutes.js'

export default function Tourism() {
  const [openRoute, setOpenRoute] = useState(null)

  return (
    <div className="fade-in-up">
      <SectionHeader
        title="Tourism & Safari Routes"
        subtitle="Route and waypoint data from your uploaded safari route sheets"
      />

      <div className="card-grid">
        {safariRoutes.map((route) => (
          <div key={route.id} className="card route-card">
            <div className="route-card-top">
              <div>
                <div className="alert-card-id">{route.id}</div>
                <h3 style={{ fontSize: 17, marginTop: 3 }}>{route.name}</h3>
              </div>
              <span className="badge" style={{ background: 'var(--warning-100)', color: 'var(--warning-600)' }}>
                {route.dataStatus}
              </span>
            </div>

            <div className="route-meta-grid">
              <div>
                <strong><Flag size={13} style={{ marginRight: 4, verticalAlign: -2 }} />{route.startPoint.name}</strong>
                Start Point
              </div>
              <div>
                <strong>{route.startPoint.zone} ({route.startPoint.zoneType})</strong>
                Start Zone
              </div>
              <div>
                <strong><RouteIcon size={13} style={{ marginRight: 4, verticalAlign: -2 }} />{route.waypoints.length}</strong>
                Recorded Waypoints
              </div>
              <div>
                <strong>N/A</strong>
                Distance / Duration
              </div>
            </div>

            <div className="risk-note">
              Distance, duration, and risk-level fields were not present in your uploaded route data, so they are
              not shown here rather than invented. Waypoint coordinates are marked "{route.dataStatus === 'Prototype verify' ? 'prototype' : route.dataStatus}"
              in the source sheet.
            </div>

            <button className="btn btn-outline btn-block" onClick={() => setOpenRoute(route)}>
              View Route
            </button>
          </div>
        ))}
      </div>

      {openRoute && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${openRoute.name} waypoints`}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,18,14,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 20,
          }}
          onClick={() => setOpenRoute(null)}
        >
          <div
            className="card"
            style={{ maxWidth: 520, width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pad-sm" style={{ borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 15 }}>{openRoute.name} — Waypoints</strong>
              <button className="btn btn-outline btn-sm" onClick={() => setOpenRoute(null)}>Close</button>
            </div>
            <div className="table-wrap" style={{ overflowY: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Point</th>
                    <th>Coordinates</th>
                    <th>Zone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>Start</td>
                    <td><MapPin size={12} style={{ marginRight: 4, verticalAlign: -2 }} />{openRoute.startPoint.name}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{openRoute.startPoint.lat}, {openRoute.startPoint.lng}</td>
                    <td>{openRoute.startPoint.zone}</td>
                  </tr>
                  {openRoute.waypoints.map((wp) => (
                    <tr key={wp.bookingId}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{wp.bookingId}</td>
                      <td>{wp.name}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{wp.lat}, {wp.lng}</td>
                      <td>{wp.zone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
