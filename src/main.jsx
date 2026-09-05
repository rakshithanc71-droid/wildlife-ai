import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AlertsProvider } from './context/AlertsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AlertsProvider>
          <App />
        </AlertsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
