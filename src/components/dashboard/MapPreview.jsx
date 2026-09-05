import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MapCanvas from '../map/MapCanvas.jsx'
import { wildlifeSightings } from '../../data/wildlifeSightings.js'
import { getVillageLocations } from '../../data/incidents.js'
import { safariRoutes } from '../../data/safariRoutes.js'
import { useAlerts } from '../../context/AlertsContext.jsx'

export default function MapPreview() {
  const { alerts } = useAlerts()
  const activeAlerts = alerts.filter((a) => a.status !== 'Resolved')

  return (
    <div className="card">
      <MapCanvas
        alerts={activeAlerts}
        sightings={wildlifeSightings}
        villages={getVillageLocations()}
        routes={safariRoutes}
        height={280}
        interactive={false}
      />
      <div className="map-legend">
        <span><span className="swatch" style={{ background: 'var(--danger-600)' }} /> Alert</span>
        <span><span className="swatch" style={{ background: 'var(--bark-600)' }} /> Wildlife</span>
        <span><span className="swatch" style={{ background: 'var(--info-600)' }} /> Village</span>
        <span><span className="swatch" style={{ background: 'var(--warning-600)' }} /> Safari route</span>
        <Link to="/map" className="section-link" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Full map <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  )
}
