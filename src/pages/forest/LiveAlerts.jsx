import { useMemo, useState } from 'react'
import { BellOff } from 'lucide-react'
import AlertCard from '../../components/alerts/AlertCard.jsx'
import SearchBar from '../../components/common/SearchBar.jsx'
import FilterDropdown from '../../components/common/FilterDropdown.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import SectionHeader from '../../components/common/SectionHeader.jsx'
import { useAlerts } from '../../context/AlertsContext.jsx'
import { severityOptions, statusOptions } from '../../data/alerts.js'

export default function LiveAlerts() {
  const { alerts } = useAlerts()
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('All')
  const [status, setStatus] = useState('All')
  const [type, setType] = useState('All')

  const typeOptions = useMemo(() => [...new Set(alerts.map((a) => a.type))], [alerts])

  const filtered = alerts.filter((a) => {
    const matchesQuery =
      query.trim() === '' ||
      [a.id, a.type, a.species, a.location].join(' ').toLowerCase().includes(query.toLowerCase())
    const matchesSeverity = severity === 'All' || a.severity === severity
    const matchesStatus = status === 'All' || a.status === status
    const matchesType = type === 'All' || a.type === type
    return matchesQuery && matchesSeverity && matchesStatus && matchesType
  })

  return (
    <div className="fade-in-up">
      <SectionHeader title="Live Alerts" subtitle={`${filtered.length} of ${alerts.length} alerts shown`} />

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by ID, type, species, or location" />
        <FilterDropdown value={severity} onChange={setSeverity} options={severityOptions} allLabel="All Severities" />
        <FilterDropdown value={status} onChange={setStatus} options={statusOptions} allLabel="All Statuses" />
        <FilterDropdown value={type} onChange={setType} options={typeOptions} allLabel="All Types" />
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={BellOff}
            title="No alerts match your filters"
            message="Try adjusting your search or clearing a filter to see more results."
          />
        </div>
      ) : (
        <div className="alert-list">
          {filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  )
}
