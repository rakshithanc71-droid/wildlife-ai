import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { alerts as baseAlerts, statusFlow } from '../data/alerts.js'

// Overrides (status changes made by an officer in the UI) persist here,
// keyed by alert id, so a refresh doesn't lose progress. The base alert
// content still lives entirely in src/data/alerts.js.
const STORAGE_KEY = 'wildlife-guardian-alert-overrides'

function loadOverrides() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function buildTimelineEntry(status) {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const labels = {
    'Under Review': 'Alert marked under review by control room',
    Resolved: 'Alert marked as resolved',
  }
  return { time, label: labels[status] || status }
}

const AlertsContext = createContext(null)

export function AlertsProvider({ children }) {
  const [overrides, setOverrides] = useState(loadOverrides)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  }, [overrides])

  const alerts = useMemo(() => {
    return baseAlerts.map((alert) => {
      const override = overrides[alert.id]
      if (!override) return alert
      return {
        ...alert,
        status: override.status || alert.status,
        timeline: override.timeline,
      }
    })
  }, [overrides])

  function getAlert(id) {
    return alerts.find((a) => a.id === id)
  }

  function advanceStatus(id, nextStatus) {
    setOverrides((prev) => {
      const current = alerts.find((a) => a.id === id)
      const existingTimeline = prev[id]?.timeline || []
      return {
        ...prev,
        [id]: {
          status: nextStatus,
          timeline: [...existingTimeline, buildTimelineEntry(nextStatus)],
        },
      }
    })
  }

  function nextStatusFor(currentStatus) {
    const idx = statusFlow.indexOf(currentStatus)
    if (idx === -1 || idx === statusFlow.length - 1) return null
    return statusFlow[idx + 1]
  }

  const value = { alerts, getAlert, advanceStatus, nextStatusFor, statusFlow }

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
}

export function useAlerts() {
  const ctx = useContext(AlertsContext)
  if (!ctx) throw new Error('useAlerts must be used within an AlertsProvider')
  return ctx
}
