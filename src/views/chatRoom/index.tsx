import { Avatar, Button, Input, NavBar, Space, SpinLoading } from 'antd-mobile'
import useWebSocket from '@/context/useWebSocket'
import { useEffect, useState } from 'react'
import { MessageType } from '@/types'
import useLoginStore from '@/store/loginStore'
import { MoreOutline } from 'antd-mobile-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { mockUsers } from '@/mock/users'
import './index.less'
import type {
  IChatMessage,
  IGroupChatMessage,
  IGroupMembersMessage,
  IMessage
} from '@/context/webSocketContext'

const ChatRoom = () => {
  const navigate = useNavigate()
  const { state: routerState } = useLocation()
  const { messages, sendMessage, isConnected } = useWebSocket<IMessage>()
  console.log('message', messages)
  /* TODO 获取群成员 */
  // useEffect(() => {
  //   const msg: IGroupMembersMessage = {
  //     messageType: MessageType.GroupMembersRequestMessage,
  //     groupName: routerState.groupName
  //   }
  //   sendMessage(msg)
  // }, [])
  const user = useLoginStore((state) => state.user)
  const [content, setContent] = useState('')
  const handleSubmit = () => {
    let message: IChatMessage | IGroupChatMessage
    if (!content) {
      throw new Error('no empty')
    }
    if (routerState.type === 'chat') {
      message = {
        messageType: MessageType.ChatRequestMessage,
        from: user!.username,
        to: user?.username === 'zhangsan' ? 'lisi' : 'zhangsan',
        content
      }
    } else {
      message = {
        messageType: MessageType.GroupChatRequestMessage,
        from: user!.username,
        content,
        groupName: routerState.groupName
      }
    }
    sendMessage(message)
    setContent('')
  }
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <MoreOutline />
      </Space>
    </div>
  )
  const back = () => navigate('/message')

  return (
    <div>
      {isConnected && user ? (
        <>
          <div className="h-screen w-screen flex flex-col">
            <NavBar right={right} onBack={back}>
              {routerState.type === 'chat'
                ? user.username === 'zhangsan'
                  ? '李四'
                  : '张三'
                : routerState.groupName}
            </NavBar>
            <div className="flex flex-1 overflow-scroll flex-col p-4 bg-slate-50">
              {messages?.map((item, index) => {
                if (item.from !== user?.username) {
                  return (
                    <div className="flex items-start justify-start" key={index}>
                      <Avatar
                        src={mockUsers[item.from].headurl}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="chat-bubble-other">{item.content}</div>
                    </div>
                  )
                } else {
                  return (
                    <div className="flex items-start justify-end" key={index}>
                      <div className="chat-bubble-self">{item.content}</div>
                      <Avatar
                        className="w-14 h-14 rounded-full"
                        src={user.username && mockUsers[user.username].headurl}
                      />
                    </div>
                  )
                }
              })}
            </div>
            <div className="flex justify-center px-2 py-1">
              <Input
                placeholder="输入内容"
                value={content}
                onChange={(val) => setContent(val)}
                clearable
                onEnterPress={handleSubmit}
              />
              <Button
                color="primary"
                className="whitespace-nowrap"
                onClick={handleSubmit}
              >
                发送
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen w-screen">
          <SpinLoading />
        </div>
      )}
    </div>
  )
}
export default ChatRoom
