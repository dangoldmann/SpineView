import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './GlobalComponents/NavBar'
import PrimeraSeccion from './Components/PrimeraSeccion'
import SegundaSeccion from './Components/SegundaSeccion'
import TerceraSeccion from './Components/TerceraSeccion'
import "./Styles/HomePageStyle.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <PrimeraSeccion />
    <SegundaSeccion />
    <TerceraSeccion />
  </React.StrictMode>
)
