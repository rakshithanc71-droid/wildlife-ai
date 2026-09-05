# Wildlife Guardian

Forest Department Wildlife Monitoring & Protection Command Center.

## Project Overview

Wildlife Guardian is a frontend dashboard built for forest department officials to monitor protected zones, respond to wildlife alerts, track ranger patrols, oversee safari tourism routes, and log field incidents — all from a single command center.

This build runs on **real collected field data** (conflict/incident log, camera-trap wildlife sightings, and safari route coordinates from the Kaziranga area, Assam) — see **Data Sources** below for exactly what's real vs. what's marked "N/A" because it wasn't in the source data.

## Problem Statement

Forest departments manage a constant stream of information: human-wildlife conflict reports, ranger patrol status, safari route safety, and field incidents. Without a unified view, officers lose time piecing together what's happening across zones and can miss time-sensitive alerts like elephant herds approaching a village or suspicious movement in a core protected zone.

## Solution

Wildlife Guardian brings all of this into one operational dashboard: a live alert feed with a real status workflow (Open → Under Review → Resolved), an interactive map built on your actual GPS coordinates, a safari route viewer, and a full incident log — built so new records can be added by editing a single data file each.

## Data Sources

| File | Source | Records |
|---|---|---|
| `src/data/incidents.js` | Your conflict/incident sheet (CI001–CI025) | 25 |
| `src/data/alerts.js` | **Derived** from `incidents.js` — only records not yet "Resolved" | 14 (varies as you resolve alerts) |
| `src/data/wildlifeSightings.js` | Your camera-trap sighting sheet (AS001–AS038) | 38 |
| `src/data/safariRoutes.js` | Your safari route sheets (A1_START + A2_END, route R001 "Bagori") | 1 route, 20 waypoints |
| `src/data/rangers.js` | — | **Empty** — no ranger records were in your uploaded data |

Important honesty notes:
- **Live Alerts is not a separate dataset.** Your files only contained one real conflict log, so "alerts" = the subset of incidents that are still Open or Under Review. Resolve an alert in the UI and it disappears from Live Alerts but stays visible in the full Incidents log.
- **Zone** on each incident is derived from its `location` text (e.g. "Core Zone Gate 3" → "Core Zone") — it's not a separate column in your sheet, so locations that don't match a known zone keyword show "N/A".
- **Rangers page** shows an empty state — add real ranger records to `src/data/rangers.js` (shape is documented in that file) to populate it.
- **Safari route** distance/duration/risk fields show "N/A" — your route sheets had coordinates only, not those stats.
- The safari waypoint data is explicitly marked `"Prototype coordinate"` / `"Prototype verify"` in your source sheet — that label is preserved and shown in the UI rather than hidden.

## Features

- **Dashboard** — stats computed live from your real data (no hardcoded numbers)
- **Live Alerts** — searchable, filterable feed of currently-active (non-Resolved) incidents
- **Alert Details** — full record with a real status workflow (Mark Under Review → Resolve), a timeline, and a map pin at its real coordinates
- **Map View** — an interactive Leaflet map (OpenStreetMap tiles, no API key) plotting your real alert, sighting, village, and safari route coordinates, plus your separately-embedded Google My Maps view
- **Rangers** — ready for data, currently empty (see Data Sources)
- **Tourism** — the real Bagori safari route with its start gate and 20 recorded waypoints
- **Incidents** — the full real incident log, searchable and filterable
- **Dark / light theme**, saved to `localStorage`
- Fully responsive: desktop, tablet, and mobile, with a collapsible sidebar

## Technology Stack

- React 18 + Vite
- React Router v6
- lucide-react (icons)
- **Leaflet + react-leaflet** (interactive map, free OpenStreetMap tiles — no API key needed, but tile loading does require internet access at runtime)
- Recharts (available for future charting needs)
- Plain CSS with a CSS-variable design token system (no CSS framework)
- No backend — all data lives in `src/data/`; alert status changes persist to `localStorage`

## Project Structure

```
wildlife-guardian/
├── public/
│   ├── images/            # favicon and static images
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/        # Sidebar, Topbar, badges, search, filters, empty state
│   │   ├── dashboard/     # StatCard, MapPreview
│   │   ├── alerts/        # AlertCard
│   │   └── map/           # MapCanvas (Leaflet, real data), GoogleMyMap (iframe embed)
│   ├── data/               # incidents.js, alerts.js (derived), wildlifeSightings.js, safariRoutes.js, rangers.js
│   ├── pages/forest/       # ForestDashboard, LiveAlerts, ForestAlertDetails, ForestMapView, Rangers, Tourism, Incidents
│   ├── context/            # ThemeContext, AlertsContext
│   ├── layouts/            # ForestLayout (sidebar + topbar shell)
│   ├── App.jsx             # route definitions
│   ├── main.jsx            # app entry point
│   └── index.css           # design tokens + all component styles
├── index.html
├── package.json
└── vite.config.js
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
npm run build
```

Output is written to `dist/`. Preview the production build with `npm run preview`.

## Editing Later

| To do this... | Edit only this file |
|---|---|
| Add/change an incident (and its matching alert, if unresolved) | `src/data/incidents.js` |
| Add a ranger | `src/data/rangers.js` |
| Add/change a wildlife sighting | `src/data/wildlifeSightings.js` |
| Add/change a safari route | `src/data/safariRoutes.js` |
| Change dashboard layout/content | `src/pages/forest/ForestDashboard.jsx` |
| Change global styling / colors | `src/index.css` (see the `:root` tokens) |
| Change navigation items | `src/components/common/Sidebar.jsx` |
| Set your Google My Maps embed | `src/components/map/GoogleMyMap.jsx` |

Alert status changes made through the UI (Mark Under Review / Resolve) persist in the browser's `localStorage` under the key `wildlife-guardian-alert-overrides`, layered on top of the base data in `incidents.js` — so the source data file never needs to be edited to reflect a status change made in the app.

## GitHub Setup

```bash
git init
git add .
git commit -m "Integrate real Wildlife Guardian field data"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.
