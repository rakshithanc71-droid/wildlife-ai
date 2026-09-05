import { Menu, Bell, Moon, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useAlerts } from '../../context/AlertsContext.jsx'

const TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Live operational overview' },
  '/alerts': { title: 'Live Alerts', subtitle: 'All active and past alerts' },
  '/map': { title: 'Map View', subtitle: 'Zones, wildlife and patrol positions' },
  '/rangers': { title: 'Rangers', subtitle: 'Team status and assignments' },
  '/tourism': { title: 'Tourism', subtitle: 'Safari route safety status' },
  '/incidents': { title: 'Incidents', subtitle: 'Logged field incidents' },
}

function currentDateLabel() {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Topbar({ onMenuClick }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { alerts } = useAlerts()
  const openAlertCount = alerts.filter((a) => a.status !== 'Resolved').length

  const meta =
    TITLES[location.pathname] ||
    (location.pathname.startsWith('/alerts/')
      ? { title: 'Alert Details', subtitle: 'Full alert record and response actions' }
      : { title: 'Wildlife Guardian', subtitle: '' })

  return (
    <header className="topbar">
      <button className="topbar-menu-btn" onClick={onMenuClick} aria-label="Open navigation menu">
        <Menu size={20} />
      </button>

      <div className="topbar-titles">
        <h2>{meta.title}</h2>
        <p>{currentDateLabel()}</p>
      </div>

      <div className="topbar-spacer" />

      <div className="topbar-actions">
        <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle theme">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button className="icon-btn" aria-label="Notifications" title="Notifications">
          <Bell size={17} />
          {openAlertCount > 0 && <span className="dot" />}
        </button>

        <div className="topbar-profile">
          <div className="topbar-profile-avatar">FD</div>
          <div className="topbar-profile-text">
            <strong>Control Room</strong>
            <span>Forest Department</span>
          </div>
        </div>
      </div>
    </header>
  )
}
