import React from 'react'
import ReactDOM from 'react-dom/client'
import 'core-js/features/array/flat-map'
import 'core-js/features/map'
import 'core-js/features/promise'
import 'core-js/features/set'
import 'raf/polyfill'
import 'whatwg-fetch'
import './index.css'
import App from './App'

console.log("rendering")
const root = ReactDOM.createRoot(document.getElementById('app-root')!)

root.render(<App />)