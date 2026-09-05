import { SearchX } from 'lucide-react'

export default function EmptyState({ icon: Icon = SearchX, title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  )
}
