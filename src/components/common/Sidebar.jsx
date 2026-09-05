import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BellRing, Map, ShieldCheck, Trees, ClipboardList, Leaf } from 'lucide-react'
import { useAlerts } from '../../context/AlertsContext.jsx'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/alerts', label: 'Live Alerts', icon: BellRing },
  { to: '/map', label: 'Map View', icon: Map },
  { to: '/rangers', label: 'Rangers', icon: ShieldCheck },
  { to: '/tourism', label: 'Tourism', icon: Trees },
  { to: '/incidents', label: 'Incidents', icon: ClipboardList },
]

export default function Sidebar({ open, onNavigate }) {
  const { alerts } = useAlerts()
  const openAlertCount = alerts.filter((a) => a.status !== 'Resolved').length

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Primary navigation">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            <Leaf size={18} />
          </div>
          <div className="sidebar-brand-text">
            <h1>Wildlife Guardian</h1>
            <span>FOREST DEPARTMENT</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
              {label === 'Live Alerts' && openAlertCount > 0 && (
                <span className="badge-count">{openAlertCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          Wildlife Guardian v1.0
          <br />
          Command Center — Field Operations
        </div>
      </aside>
      <div className={`sidebar-scrim ${open ? 'open' : ''}`} onClick={onNavigate} />
    </>
  )
}
