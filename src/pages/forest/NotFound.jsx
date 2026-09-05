import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import EmptyState from '../../components/common/EmptyState.jsx'

export default function NotFound() {
  return (
    <div className="card">
      <EmptyState
        icon={Compass}
        title="Page Not Found"
        message="The page you're looking for doesn't exist in Wildlife Guardian."
        action={
          <Link className="btn btn-primary btn-sm" to="/" style={{ marginTop: 14 }}>
            Back to Dashboard
          </Link>
        }
      />
    </div>
  )
}
