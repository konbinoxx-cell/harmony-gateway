import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { registerServiceWorker } from './utils/sw'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// 注册Service Worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    registerServiceWorker()
  })
}