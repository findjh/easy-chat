// import { useState } from 'react'
import './App.css'
import LayoutTabBar from './layouts/TabBar'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers/index'
function App() {
  return (
    <>
      {/* todo: 需要改成.env配置环境变量 */}
      <BrowserRouter
        basename={process.env.NODE_ENV === 'production' ? '/easy-chat' : '/'}
      >
        <Router />
        <LayoutTabBar />
      </BrowserRouter>
    </>
  )
}
export default App
