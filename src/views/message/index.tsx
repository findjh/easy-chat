// import bg from '@/assets/bg.svg'
import { Button, Form, Input, List, SpinLoading } from 'antd-mobile'
import useWebSocket from '@/context/useWebSocket'
import { useState } from 'react'
import { MessageType } from '@/types'
import useLoginStore from '@/store/loginStore'
const Message = () => {
  const { messages, sendMessage, isConnected } = useWebSocket()
  console.log(messages, 'messages')
  const user = useLoginStore((state) => state.user)
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!content) {
      throw new Error('no empty')
    }
    sendMessage({
      messageType: MessageType.ChatRequestMessage,
      from: user?.username,
      to: user?.username === 'zhangsan' ? 'lisi' : 'zhangsan',
      content
    })
    setContent('')
  }

  return (
    <div>
      {isConnected ? (
        <>
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
          <List header="消息">
            {messages.map((item, index) => (
              <List.Item key={index}>
                <span>{item.from} : </span>
                {item.content}
              </List.Item>
            ))}
          </List>
        </>
      ) : (
        <SpinLoading />
      )}
    </div>
  )
}
export default Message
