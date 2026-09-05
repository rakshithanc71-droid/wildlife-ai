import { Routes, Route } from 'react-router-dom'
import ForestLayout from './layouts/ForestLayout.jsx'
import ForestDashboard from './pages/forest/ForestDashboard.jsx'
import LiveAlerts from './pages/forest/LiveAlerts.jsx'
import ForestAlertDetails from './pages/forest/ForestAlertDetails.jsx'
import ForestMapView from './pages/forest/ForestMapView.jsx'
import Rangers from './pages/forest/Rangers.jsx'
import Tourism from './pages/forest/Tourism.jsx'
import Incidents from './pages/forest/Incidents.jsx'
import NotFound from './pages/forest/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<ForestLayout />}>
        <Route path="/" element={<ForestDashboard />} />
        <Route path="/alerts" element={<LiveAlerts />} />
        <Route path="/alerts/:alertId" element={<ForestAlertDetails />} />
        <Route path="/map" element={<ForestMapView />} />
        <Route path="/rangers" element={<Rangers />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
