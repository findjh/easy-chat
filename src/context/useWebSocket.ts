import { useContext } from 'react'
import {
  type IMessage,
  WebSocketContext,
  WebSocketContextProps
} from './webSocketContext.tsx'
const useWebSocket = <T extends IMessage>(): WebSocketContextProps<T> => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  // eslint-disable-next-line
  // @ts-ignore
  return context
}
export default useWebSocket
