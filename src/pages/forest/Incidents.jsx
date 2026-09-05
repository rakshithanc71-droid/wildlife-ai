import { useState } from 'react'
import { ClipboardX } from 'lucide-react'
import SearchBar from '../../components/common/SearchBar.jsx'
import FilterDropdown from '../../components/common/FilterDropdown.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import SeverityBadge from '../../components/common/SeverityBadge.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import SectionHeader from '../../components/common/SectionHeader.jsx'
import { incidents, incidentStatusOptions, incidentTypeOptions, severityOptions } from '../../data/incidents.js'

export default function Incidents() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [type, setType] = useState('All')
  const [severity, setSeverity] = useState('All')

  const filtered = incidents.filter((i) => {
    const matchesQuery =
      query.trim() === '' ||
      [i.id, i.type, i.location, i.species, i.reportedBy].join(' ').toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'All' || i.status === status
    const matchesType = type === 'All' || i.type === type
    const matchesSeverity = severity === 'All' || i.severity === severity
    return matchesQuery && matchesStatus && matchesType && matchesSeverity
  })

  return (
    <div className="fade-in-up">
      <SectionHeader title="Incidents" subtitle={`${filtered.length} of ${incidents.length} incidents shown`} />

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by ID, type, location, species, or reporter" />
        <FilterDropdown value={type} onChange={setType} options={incidentTypeOptions} allLabel="All Types" />
        <FilterDropdown value={severity} onChange={setSeverity} options={severityOptions} allLabel="All Severities" />
        <FilterDropdown value={status} onChange={setStatus} options={incidentStatusOptions} allLabel="All Statuses" />
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={ClipboardX} title="No incidents match your filters" message="Try a different search term or clear a filter." />
        </div>
      ) : (
        <div className="card table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Species</th>
                <th>Date</th>
                <th>Severity</th>
                <th>Outcome</th>
                <th>Reported By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc) => (
                <tr key={inc.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{inc.id}</td>
                  <td>{inc.type}</td>
                  <td>{inc.location}</td>
                  <td>{inc.species}</td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: 12.5 }}>{inc.date}</td>
                  <td><SeverityBadge severity={inc.severity} /></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inc.outcome}</td>
                  <td>{inc.reportedBy}</td>
                  <td><StatusBadge value={inc.status} kind="incident" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
