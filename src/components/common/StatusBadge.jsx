function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-')
}

// kind: 'status' (alerts/rangers) | 'risk' | 'incident'
export default function StatusBadge({ value, kind = 'status' }) {
  const cls = `${kind}-${slugify(value)}`
  return <span className={`badge ${cls}`}>{value}</span>
}
