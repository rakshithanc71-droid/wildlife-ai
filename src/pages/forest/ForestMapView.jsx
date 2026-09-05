import { useState } from 'react'
import { PawPrint, TriangleAlert, Home, ShieldCheck, Route, Map as MapIcon, LayoutGrid } from 'lucide-react'
import MapCanvas from '../../components/map/MapCanvas.jsx'
import GoogleMyMap from '../../components/map/GoogleMyMap.jsx'
import SectionHeader from '../../components/common/SectionHeader.jsx'
import { useAlerts } from '../../context/AlertsContext.jsx'
import { wildlifeSightings } from '../../data/wildlifeSightings.js'
import { getVillageLocations } from '../../data/incidents.js'
import { safariRoutes } from '../../data/safariRoutes.js'

const LAYER_ITEMS = [
  { key: 'wildlife', label: 'Wildlife', icon: PawPrint },
  { key: 'alerts', label: 'Alerts', icon: TriangleAlert },
  { key: 'villages', label: 'Villages', icon: Home },
  { key: 'rangers', label: 'Rangers', icon: ShieldCheck },
  { key: 'routes', label: 'Safari Routes', icon: Route },
]

export default function ForestMapView() {
  const { alerts } = useAlerts()
  const [layers, setLayers] = useState({
    wildlife: true,
    alerts: true,
    villages: true,
    rangers: true,
    routes: true,
  })
  // Which map is shown: the real interactive map (built from your uploaded
  // conflict/sighting/route data) or your Google My Maps embed. Layer
  // toggles only affect the interactive map — your My Maps layers are
  // controlled from within Google My Maps itself.
  const [view, setView] = useState('live')

  function toggleLayer(key) {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const activeAlerts = alerts.filter((a) => a.status !== 'Resolved')
  const villages = getVillageLocations()

  return (
    <div className="fade-in-up">
      <SectionHeader title="Map Layers" subtitle="Toggle layers on or off to focus the view" />

      <div className="layer-toggles">
        <button
          className={`layer-toggle ${view === 'live' ? 'active' : ''}`}
          onClick={() => setView('live')}
          aria-pressed={view === 'live'}
        >
          <LayoutGrid size={14} /> Live Map
        </button>
        <button
          className={`layer-toggle ${view === 'mymap' ? 'active' : ''}`}
          onClick={() => setView('mymap')}
          aria-pressed={view === 'mymap'}
        >
          <MapIcon size={14} /> My Map
        </button>
      </div>

      {view === 'live' && (
        <div className="layer-toggles">
          {LAYER_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`layer-toggle ${layers[key] ? 'active' : ''}`}
              onClick={() => toggleLayer(key)}
              aria-pressed={layers[key]}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      )}

      <div className="card">
        {view === 'live' ? (
          <>
            <MapCanvas
              alerts={activeAlerts}
              sightings={wildlifeSightings}
              villages={villages}
              routes={safariRoutes}
              layers={layers}
              height={520}
              interactive
            />
            <div className="map-legend">
              <span><span className="swatch" style={{ background: '#b6402a' }} /> Alert marker</span>
              <span><span className="swatch" style={{ background: '#6b5744' }} /> Wildlife sighting</span>
              <span><span className="swatch" style={{ background: '#33627d' }} /> Village</span>
              <span><span className="swatch" style={{ background: '#2f6844' }} /> Safari route start</span>
              <span><span className="swatch" style={{ background: '#c17a2e' }} /> Safari route point</span>
              {layers.rangers && (
                <span style={{ color: 'var(--text-tertiary)' }}>Ranger locations: not available in current dataset</span>
              )}
            </div>
          </>
        ) : (
          <GoogleMyMap height={520} />
        )}
      </div>
    </div>
  )
}
