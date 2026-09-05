const CLASS_MAP = {
  Critical: 'severity-critical',
  High: 'severity-high',
  Medium: 'severity-medium',
  Low: 'severity-low',
}

export default function SeverityBadge({ severity }) {
  const cls = CLASS_MAP[severity] || 'severity-low'
  return (
    <span className={`badge ${cls}`}>
      <span className="badge-dot" style={{ background: 'currentColor' }} />
      {severity}
    </span>
  )
}
