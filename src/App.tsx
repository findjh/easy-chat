// import { useState } from 'react'
import './App.css'
import LayoutTabBar from './layouts/TabBar'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers/index'
function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
        <LayoutTabBar />
      </BrowserRouter>
    </>
  )
}
export default App
