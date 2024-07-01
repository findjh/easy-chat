import { useContext } from 'react'
import { WebSocketContext, WebSocketContextProps } from './webSocketContext.tsx'
const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
export default useWebSocket
