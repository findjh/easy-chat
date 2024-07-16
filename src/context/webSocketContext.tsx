import { MessageType } from '@/types'
import { Toast } from 'antd-mobile'
import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
// import useLoginStore from '@/store/loginStore'
import { useNavigate } from 'react-router-dom'

// 单聊请求消息
export interface IChatMessage {
  messageType: MessageType.ChatRequestMessage | MessageType.ChatResponseMessage
  from: string
  to: string
  content: string
}
// 登录请求消息
export interface ILoginMessage {
  messageType:
    | MessageType.LoginRequestMessage
    | MessageType.LoginResponseMessage
  username: string
  password: string
}

// 创建、加入群聊请求消息
export interface IGroupMessage {
  // 群名称
  groupName: string
  // 群成员
  members: string[] | string
  // 消息类型
  messageType:
    | MessageType.GroupCreateRequestMessage
    | MessageType.GroupJoinRequestMessage
}

// 群聊请求消息
export interface IGroupChatMessage {
  // 群名称
  groupName: string
  // 群成员
  from: string
  // 消息类型
  messageType: MessageType.GroupChatRequestMessage
  // 群消息
  content: string
}

// 获取群聊成员请求信息
export interface IGroupMembersMessage {
  // 群名称
  groupName: string
  // 消息类型
  messageType: MessageType.GroupMembersRequestMessage
}
// 请求消息
export type IMessage =
  | IChatMessage
  | ILoginMessage
  | IGroupMessage
  | IGroupChatMessage
  | IGroupMembersMessage
// 响应消息
export type IResMessage = IChatMessage | IGroupChatMessage
export interface WebSocketContextProps<T extends IMessage> {
  messages: IResMessage[]
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
  const [messages, setMessages] = useState<IResMessage[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const navigate = useNavigate()
  const ws = useRef<WebSocket | null>(null)
  // 心跳包
  const heartBeat = {
    messageType: MessageType.PingMessage
  }
  // const login = useLoginStore((state) => state.login)
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(url)
    }
    /* TODO: 心跳检测机制未完善 */
    // if(ws.current){
    //   setInterval(() => {
    //     ws.current?.send(JSON.stringify(heartBeat))
    //   }, 3000)
    // }

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
        } else if (
          message.messageType ===
          (MessageType.ChatResponseMessage ||
            MessageType.GroupChatResponseMessage)
        ) {
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
      if (message.messageType === MessageType.ChatRequestMessage) {
        setMessages((prevMessages) => [...prevMessages, message])
      }
    }
  }

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  )
}
