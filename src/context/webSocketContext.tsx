import { MessageType } from '@/types'
import { Toast } from 'antd-mobile'
import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
// import useLoginStore from '@/store/loginStore'
import { useNavigate } from 'react-router-dom'

export interface IChatMessage {
  messageType: MessageType.ChatRequestMessage | MessageType.ChatResponseMessage
  from: string
  to: string
  content: string
}
export interface ILoginMessage {
  messageType:
    | MessageType.LoginRequestMessage
    | MessageType.LoginResponseMessage
  username: string
  password: string
}
export type IMessage = IChatMessage | ILoginMessage
export interface WebSocketContextProps<T extends IMessage> {
  messages: T[]
  sendMessage: (message: T) => void
  isConnected: boolean
}
interface WebSocketProviderProps {
  url: string
  children: ReactNode
}
export const WebSocketContext =
  createContext<WebSocketContextProps<IMessage> | null>(null)

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  url,
  children
}) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const navigate = useNavigate()
  const ws = useRef<WebSocket | null>(null)
  // const login = useLoginStore((state) => state.login)
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(url)
    }

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server')
      setIsConnected(true)
    }

    ws.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data)
      if (message.success) {
        if (message.messageType === MessageType.LoginResponseMessage) {
          // TODO: 接口还没加上用户信息，先在登录组件写死
          // login({
          //   username: message.username,
          //   token: 'random token'
          // })
          navigate('/message')
        } else if (message.messageType === MessageType.ChatResponseMessage) {
          setMessages((prevMessages) => [...prevMessages, message])
          // Toast.show({
          //   icon: 'success',
          //   content: message.reason
          // })
        }
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
    // eslint-disable-next-line
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
