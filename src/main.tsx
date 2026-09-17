import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/chakra-petch/400.css'
import '@fontsource/chakra-petch/500.css'
import '@fontsource/chakra-petch/600.css'
import '@fontsource/chakra-petch/700.css'
import App from './App'
import './styles.css'
import './cinema-fixes.css'
import './touch-zone.css'
import './video-first-minimal.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
