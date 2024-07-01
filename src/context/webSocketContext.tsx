import { Toast } from 'antd-mobile'
import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
interface IMessage {
  messageType: number
  [key: string]: any
}
export interface WebSocketContextProps {
  messages: IMessage[]
  sendMessage: (message: IMessage) => void
  isConnected: boolean
}
interface WebSocketProviderProps {
  url: string
  children: ReactNode
}
export const WebSocketContext = createContext<WebSocketContextProps | null>(
  null
)

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  url,
  children
}) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket(url)

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server')
      setIsConnected(true)
    }

    ws.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data)
      if (message.success) {
        setMessages((prevMessages) => [...prevMessages, message])
        Toast.show({
          icon: 'success',
          content: message.reason
        })
      } else {
        Toast.show({
          icon: 'fail',
          content: message.reason
        })
      }
    }

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server')
      setIsConnected(false)
    }

    ws.current.onerror = (error: Event) => {
      console.error('WebSocket error: ', error)
    }

    return () => {
      //状态码 1 表示连接已经建立
      if (ws.current && ws.current.readyState === 1) {
        ws.current.close()
      }
    }
  }, [url])

  const sendMessage = (message: IMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message))
    }
  }

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  )
}
