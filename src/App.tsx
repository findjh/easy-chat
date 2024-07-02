import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers/index'
import { WebSocketProvider } from './context/webSocketContext'
function App() {
  return (
    <>
      <BrowserRouter>
        <WebSocketProvider url="ws://124.71.105.207:10000">
          <Router />
        </WebSocketProvider>
      </BrowserRouter>
    </>
  )
}
export default App
