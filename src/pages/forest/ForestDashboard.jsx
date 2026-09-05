import { BellRing, ShieldCheck, Trees, Users, PawPrint, ClipboardList } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard.jsx'
import MapPreview from '../../components/dashboard/MapPreview.jsx'
import AlertCard from '../../components/alerts/AlertCard.jsx'
import SectionHeader from '../../components/common/SectionHeader.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import { useAlerts } from '../../context/AlertsContext.jsx'
import { rangers, hasSampleRangerData } from '../../data/rangers.js'
import { safariRoutes } from '../../data/safariRoutes.js'
import { incidents, deriveZone } from '../../data/incidents.js'
import { wildlifeSightings } from '../../data/wildlifeSightings.js'

export default function ForestDashboard() {
  const { alerts } = useAlerts()

  const activeAlerts = alerts.filter((a) => a.status !== 'Resolved')
  const openIncidents = incidents.filter((i) => i.status !== 'Resolved').length
  const latestAlerts = [...alerts].slice(0, 3)
  const recentIncidents = [...incidents].slice(-5).reverse()

  // Every number below is computed live from src/data — nothing here is
  // hardcoded. "Protected Zones" is the count of distinct zone labels found
  // across your incident and sighting records (Buffer Zone, Core Zone,
  // Village Edge, Farmland Edge, Safari Route Edge).
  const zoneSet = new Set([
    ...wildlifeSightings.map((s) => s.zone),
    ...incidents.map((i) => deriveZone(i.location)),
  ])
  zoneSet.delete('N/A')

  const sightingDates = [...new Set(wildlifeSightings.map((s) => s.date))].sort()
  const dateRangeLabel =
    sightingDates.length > 1
      ? `${sightingDates[0]} to ${sightingDates[sightingDates.length - 1]}`
      : sightingDates[0] || 'No dated sightings'

  return (
    <div className="fade-in-up">
      <div className="page-hero">
        <h1>Wildlife Guardian</h1>
        <p>Forest Department Monitoring & Protection Command Center</p>
        <div className="hero-meta">
          <div>
            <strong>{activeAlerts.length}</strong>
            active alerts right now
          </div>
          <div>
            <strong>{wildlifeSightings.length}</strong>
            wildlife sightings logged
          </div>
          <div>
            <strong>{zoneSet.size}</strong>
            zones represented in data
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={BellRing}
          iconColor="#b6402a"
          iconBg="var(--danger-100)"
          value={activeAlerts.length}
          label="Active Alerts"
          trend="up"
          trendLabel={`${activeAlerts.filter((a) => a.severity === 'Critical' || a.severity === 'High').length} high/critical severity`}
        />
        <StatCard
          icon={Trees}
          iconColor="#3f7d52"
          iconBg="var(--safe-100)"
          value={zoneSet.size}
          label="Protected Zones"
          trend="flat"
          trendLabel="Derived from your data"
        />
        <StatCard
          icon={Users}
          iconColor="#33627d"
          iconBg="var(--info-100)"
          value={`${rangers.filter((r) => r.status === 'On Duty' || r.status === 'Patrolling').length}/${rangers.length}`}
          label="Rangers on Duty"
          trend="flat"
          trendLabel={hasSampleRangerData ? 'Sample data — no real roster yet' : 'From your data'}
        />
        <StatCard
          icon={ShieldCheck}
          iconColor="#c17a2e"
          iconBg="var(--warning-100)"
          value={safariRoutes.length}
          label="Safari Routes"
          trend="flat"
          trendLabel="Prototype route data"
        />
        <StatCard
          icon={PawPrint}
          iconColor="#6b5744"
          iconBg="var(--sand-100)"
          value={wildlifeSightings.length}
          label="Wildlife Sightings"
          trend="flat"
          trendLabel={dateRangeLabel}
        />
        <StatCard
          icon={ClipboardList}
          iconColor="#b6402a"
          iconBg="var(--danger-100)"
          value={openIncidents}
          label="Open Incidents"
          trend="flat"
          trendLabel={`${incidents.length} logged total`}
        />
      </div>

      <div className="two-col">
        <div>
          <SectionHeader
            title="Live Alert Summary"
            subtitle="Most recent active alerts"
            linkTo="/alerts"
            linkLabel="View all alerts"
          />
          {latestAlerts.length === 0 ? (
            <div className="card pad" style={{ color: 'var(--text-tertiary)', fontSize: 13.5 }}>
              No active alerts right now — every incident in your dataset is currently Resolved.
            </div>
          ) : (
            <div className="alert-list">
              {latestAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Reserve Map" subtitle="Live positions from your uploaded data" />
          <MapPreview />
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <SectionHeader
          title="Recent Incidents"
          subtitle="Latest field-logged incidents"
          linkTo="/incidents"
          linkLabel="View all incidents"
        />
        <div className="card table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Reported By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map((inc) => (
                <tr key={inc.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{inc.id}</td>
                  <td>{inc.type}</td>
                  <td>{inc.location}</td>
                  <td>{inc.reportedBy}</td>
                  <td><StatusBadge value={inc.status} kind="incident" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
