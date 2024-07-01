// import { useState } from 'react'
import './App.css'
import LayoutTabBar from './layouts/TabBar'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers/index'
import { WebSocketProvider } from './context/webSocketContext'
function App() {
  return (
    <>
      <BrowserRouter>
        {/*测试OK  ws://124.222.224.186:8800 */}
        <WebSocketProvider url="ws://124.71.105.207:10000">
          <Router />
          <LayoutTabBar />
        </WebSocketProvider>
      </BrowserRouter>
    </>
  )
}
export default App
