import { Link } from 'react-router-dom'
import { MapPin, Clock, PawPrint } from 'lucide-react'
import SeverityBadge from '../common/SeverityBadge.jsx'
import StatusBadge from '../common/StatusBadge.jsx'

export default function AlertCard({ alert }) {
  const sevClass = `sev-${alert.severity.toLowerCase()}`

  return (
    <div className={`alert-card ${sevClass}`}>
      <div className="alert-card-main">
        <div className="alert-card-id">{alert.id}</div>
        <div className="alert-card-title">{alert.type}</div>
        <div className="alert-card-meta">
          <span><PawPrint size={13} /> {alert.species}</span>
          <span><MapPin size={13} /> {alert.location}</span>
          <span><Clock size={13} /> {alert.time}</span>
        </div>
      </div>
      <div className="alert-card-side">
        <div style={{ display: 'flex', gap: 6 }}>
          <SeverityBadge severity={alert.severity} />
          <StatusBadge value={alert.status} kind="status" />
        </div>
        <Link className="btn btn-outline btn-sm" to={`/alerts/${alert.id}`}>
          View Details
        </Link>
      </div>
    </div>
  )
}
