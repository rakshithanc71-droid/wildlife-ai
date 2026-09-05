import { useState } from 'react'
import { Users, Info } from 'lucide-react'
import SearchBar from '../../components/common/SearchBar.jsx'
import FilterDropdown from '../../components/common/FilterDropdown.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import SectionHeader from '../../components/common/SectionHeader.jsx'
import { rangers, rangerStatusOptions, hasSampleRangerData } from '../../data/rangers.js'

export default function Rangers() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = rangers.filter((r) => {
    const matchesQuery =
      query.trim() === '' ||
      [r.name, r.id, r.team, r.zone].join(' ').toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'All' || r.status === status
    return matchesQuery && matchesStatus
  })

  return (
    <div className="fade-in-up">
      <SectionHeader title="Rangers" subtitle={`${filtered.length} of ${rangers.length} rangers shown`} />

      {hasSampleRangerData && (
        <div className="data-banner">
          <Info size={15} />
          These are sample/placeholder ranger records — your uploaded data didn't include a ranger roster.
          Replace them in <code>src/data/rangers.js</code> with your real team once available.
        </div>
      )}

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name, ID, team, or zone" />
        <FilterDropdown value={status} onChange={setStatus} options={rangerStatusOptions} allLabel="All Statuses" />
      </div>

      {rangers.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Users}
            title="No ranger data available"
            message="Add records to src/data/rangers.js to populate this page."
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState icon={Users} title="No rangers match your filters" message="Try a different search term or clear the status filter." />
        </div>
      ) : (
        <div className="card table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ranger</th>
                <th>ID</th>
                <th>Team</th>
                <th>Zone</th>
                <th>Status</th>
                <th>Current Assignment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className="row-in" style={{ animationDelay: `${i * 40}ms` }}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.id}</td>
                  <td>{r.team}</td>
                  <td>{r.zone}</td>
                  <td><StatusBadge value={r.status} kind="status" /></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.assignment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
