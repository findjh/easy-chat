// import { useState } from 'react'
import './App.css'
import LayoutTabBar from './layouts/TabBar'
import { HashRouter } from 'react-router-dom'
import Router from './routers/index'
function App() {
  return (
    <>
      <HashRouter>
        <Router />
        <LayoutTabBar />
      </HashRouter>
    </>
  )
}
export default App
