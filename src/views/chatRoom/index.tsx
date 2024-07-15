// import bg from '@/assets/bg.svg'
import {
  Avatar,
  Button,
  Form,
  Input,
  NavBar,
  Space,
  SpinLoading
} from 'antd-mobile'
import useWebSocket from '@/context/useWebSocket'
import { useEffect, useState } from 'react'
import { MessageType } from '@/types'
import useLoginStore from '@/store/loginStore'
import { MoreOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { mockUsers } from '@/mock/users'
import './index.less'
import type { IChatMessage } from '@/context/webSocketContext'
const ChatRoom = () => {
  const navigate = useNavigate()
  const { messages, sendMessage, isConnected } = useWebSocket<IChatMessage>()
  const [msgList, setMsgList] = useState<IChatMessage[]>()
  const user = useLoginStore((state) => state.user)
  const [content, setContent] = useState('')
  console.log('message', messages)

  useEffect(() => {
    if (messages.length > 0) {
      const fromList = messages
        .filter((item) => item.from !== user?.username)
        .slice(-1)[0]
      setMsgList((pre?: IChatMessage[]) => (pre ??= []).concat(fromList))
    }
  }, [messages, user?.username])
  const handleSubmit = () => {
    if (!content) {
      throw new Error('no empty')
    }
    const message: IChatMessage = {
      messageType: MessageType.ChatRequestMessage,
      from: user!.username,
      to: user?.username === 'zhangsan' ? 'lisi' : 'zhangsan',
      content
    }
    sendMessage(message)
    setMsgList((pre?: IChatMessage[]) => (pre ??= []).concat(message))
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
          <div className="chat-room">
            <NavBar right={right} onBack={back}>
              {user.username === 'zhangsan' ? '李四' : '张三'}
            </NavBar>
            <div className="chat-content">
              {msgList?.map((item, index) => {
                if (item.from !== user?.username) {
                  return (
                    <div className="left" key={index}>
                      <Avatar
                        src={
                          mockUsers[
                            user?.username === 'zhangsan' ? 'lisi' : 'zhangsan'
                          ].headurl
                        }
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="chat-bubble-other">{item.content}</div>
                    </div>
                  )
                } else {
                  return (
                    <div className="right" key={index}>
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
            <div className="flex flex-col justify-center">
              <Form.Item
                extra={
                  <Button color="primary" onClick={handleSubmit}>
                    发送
                  </Button>
                }
              >
                <Input
                  placeholder="输入内容"
                  value={content}
                  onChange={(val) => setContent(val)}
                  clearable
                />
              </Form.Item>
            </div>
          </div>
          {/* <Form.Item
            extra={
              <Button color="primary" onClick={handleSubmit}>
                发送
              </Button>
            }
          >
            <Input
              placeholder="输入内容"
              value={content}
              onChange={(val) => setContent(val)}
              clearable
            />
          </Form.Item>
          <List header="消息">
            {messages.map((item, index) => (
              <List.Item key={index}>
                <span>{item.from} : </span>
                {item.content}
              </List.Item>
            ))}
          </List> */}
        </>
      ) : (
        <SpinLoading />
      )}
    </div>
  )
}
export default ChatRoom
