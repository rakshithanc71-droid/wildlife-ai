import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, PawPrint, Trees, CheckCircle2, Compass, FileWarning } from 'lucide-react'
import SeverityBadge from '../../components/common/SeverityBadge.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import MapCanvas from '../../components/map/MapCanvas.jsx'
import { useAlerts } from '../../context/AlertsContext.jsx'

export default function ForestAlertDetails() {
  const { alertId } = useParams()
  const { getAlert, advanceStatus, nextStatusFor, statusFlow } = useAlerts()
  const [justUpdated, setJustUpdated] = useState(null)

  const alert = getAlert(alertId)

  if (!alert) {
    return (
      <div className="card">
        <EmptyState
          icon={FileWarning}
          title="Alert Not Found"
          message={`We couldn't find an alert with ID "${alertId}". It may have been removed or the link may be incorrect.`}
          action={
            <Link className="btn btn-primary btn-sm" to="/alerts" style={{ marginTop: 14 }}>
              Back to Alerts
            </Link>
          }
        />
      </div>
    )
  }

  const timeline = [
    { time: alert.time, label: 'Alert detected' },
    { time: alert.time, label: 'Forest control room notified' },
    ...(alert.timeline || []),
  ]

  const next = nextStatusFor(alert.status)

  const actions = [
    { label: 'Mark Under Review', target: 'Under Review' },
    { label: 'Resolve Alert', target: 'Resolved' },
  ]

  function handleAction(target) {
    advanceStatus(alert.id, target)
    setJustUpdated(target)
    window.setTimeout(() => setJustUpdated(null), 3500)
  }

  return (
    <div className="fade-in-up">
      <Link to="/alerts" className="back-link">
        <ArrowLeft size={15} /> Back to Alerts
      </Link>

      <div className="detail-header">
        <div>
          <div className="alert-card-id">{alert.id}</div>
          <h1 style={{ fontSize: 24, marginTop: 4 }}>{alert.type}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <SeverityBadge severity={alert.severity} />
          <StatusBadge value={alert.status} kind="status" />
        </div>
      </div>

      <div className="two-col">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <div className="detail-grid">
              <div className="detail-field">
                <div className="label">Species / Activity</div>
                <div className="value"><PawPrint size={14} style={{ marginRight: 5, verticalAlign: -2 }} />{alert.species}</div>
              </div>
              <div className="detail-field">
                <div className="label">Location</div>
                <div className="value"><MapPin size={14} style={{ marginRight: 5, verticalAlign: -2 }} />{alert.location}</div>
              </div>
              <div className="detail-field">
                <div className="label">Zone</div>
                <div className="value"><Trees size={14} style={{ marginRight: 5, verticalAlign: -2 }} />{alert.zone}</div>
              </div>
              <div className="detail-field">
                <div className="label">Detected</div>
                <div className="value"><Clock size={14} style={{ marginRight: 5, verticalAlign: -2 }} />{alert.time}, {alert.date}</div>
              </div>
              <div className="detail-field">
                <div className="label">Coordinates</div>
                <div className="value" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 500 }}>
                  <Compass size={14} style={{ marginRight: 5, verticalAlign: -2 }} />
                  {alert.coordinates.lat.toFixed(4)}, {alert.coordinates.lng.toFixed(4)}
                </div>
              </div>
              <div className="detail-field">
                <div className="label">Current Status</div>
                <div className="value"><StatusBadge value={alert.status} kind="status" /></div>
              </div>
              <div className="detail-field">
                <div className="label">Reported By</div>
                <div className="value">{alert.reportedBy || 'N/A'}</div>
              </div>
              <div className="detail-field">
                <div className="label">Camera ID</div>
                <div className="value" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 500 }}>{alert.cameraId || 'N/A'}</div>
              </div>
            </div>

            <div style={{ padding: '0 18px 18px' }}>
              <div className="label" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginBottom: 6 }}>
                Outcome / Notes
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{alert.description || 'N/A'}</p>
            </div>

            <div style={{ padding: '0 18px 18px' }}>
              <div className="label" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginBottom: 6 }}>
                Recommended Action
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{alert.recommendedAction || 'N/A'}</p>
            </div>

            {justUpdated && (
              <div className="action-feedback">
                <CheckCircle2 size={16} /> Status updated to "{justUpdated}"
              </div>
            )}

            <div className="action-row">
              {actions.map((action) => {
                const currentIdx = statusFlow.indexOf(alert.status)
                const targetIdx = statusFlow.indexOf(action.target)
                const isCompleted = targetIdx <= currentIdx
                const isNext = next === action.target
                return (
                  <button
                    key={action.target}
                    className={`btn ${isNext ? 'btn-primary' : 'btn-outline'}`}
                    disabled={!isNext}
                    onClick={() => handleAction(action.target)}
                  >
                    {isCompleted && <CheckCircle2 size={15} />}
                    {action.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="card">
            <div className="pad-sm" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: 14 }}>Alert Timeline</strong>
            </div>
            <div className="pad">
              <div className="timeline">
                {timeline.map((item, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-marker">
                      <div className="timeline-dot" />
                      <div className="timeline-line" />
                    </div>
                    <div className="timeline-content">
                      <strong>{item.label}</strong>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <MapCanvas alerts={[alert]} height={260} interactive zoom={13} />
          </div>
        </div>
      </div>
    </div>
  )
}
