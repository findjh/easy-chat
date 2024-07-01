// import bg from '@/assets/bg.svg'
import {
  Button,
  Form,
  Input,
  InputRef,
  List,
  SpinLoading,
  Tabs
} from 'antd-mobile'
import useWebSocket from '@/context/useWebSocket'
import { useRef, useState } from 'react'
type UserName = 'zhangsan' | 'lisi'
const Message = () => {
  const { messages, sendMessage, isConnected } = useWebSocket()
  console.log(messages, 'messages')
  const zhangsanInputRef = useRef<InputRef>(null)
  const lisiInputRef = useRef<InputRef>(null)
  const handleSubmit = (from: UserName, to: UserName, content?: string) => {
    console.log(zhangsanInputRef.current)
    if (!content) {
      throw new Error('no empty')
    }
    sendMessage({ messageType: 2, from, to, content })
    if (from === 'zhangsan') {
      zhangsanInputRef.current?.clear()
    }
    if (from === 'lisi') {
      lisiInputRef.current?.clear()
    }
  }
  const [isZhangsanLogin, setIsZhangsanLogin] = useState(() => {
    return localStorage.getItem('isZhangsanLogin') === 'true'
  })
  const [isLisiLogin, setIsLisiLogin] = useState(() => {
    return localStorage.getItem('isLisiLogin') === 'true'
  })
  const handleLogin = (username: UserName) => {
    sendMessage({ messageType: 0, username, password: 123 })
    if (username === 'zhangsan') {
      localStorage.setItem('isZhangsanLogin', 'true')
      setIsZhangsanLogin(true)
    }
    if (username === 'lisi') {
      localStorage.setItem('isLisiLogin', 'true')
      setIsLisiLogin(true)
    }
  }
  return (
    <div>
      {isConnected ? (
        <Tabs>
          <Tabs.Tab title="张三" key="1">
            {isZhangsanLogin ? (
              <>
                <Form.Item
                  extra={
                    <Button
                      color="primary"
                      onClick={() =>
                        handleSubmit(
                          'zhangsan',
                          'lisi',
                          zhangsanInputRef.current?.nativeElement?.value
                        )
                      }
                    >
                      发送
                    </Button>
                  }
                >
                  <Input
                    ref={zhangsanInputRef}
                    placeholder="输入发送给李四的内容"
                    clearable
                  />
                </Form.Item>
                <List header="消息">
                  {messages
                    .filter((item) => item.messageType === 3)
                    .filter((item) => item.from !== 'zhangsan')
                    .map((item, index) => (
                      <List.Item key={index}>{item.content}</List.Item>
                    ))}
                </List>
              </>
            ) : (
              <Button onClick={() => handleLogin('zhangsan')}> 登录</Button>
            )}
          </Tabs.Tab>
          <Tabs.Tab title="李四" key="2">
            {isLisiLogin ? (
              <>
                <Form.Item
                  extra={
                    <Button
                      color="primary"
                      onClick={() =>
                        handleSubmit(
                          'lisi',
                          'zhangsan',
                          lisiInputRef.current?.nativeElement?.value
                        )
                      }
                    >
                      发送
                    </Button>
                  }
                >
                  <Input
                    ref={lisiInputRef}
                    placeholder="输入发送给张三的内容"
                    clearable
                  />
                </Form.Item>
                <List header="消息">
                  {messages
                    .filter((item) => item.messageType === 3)
                    .filter((item) => item.from !== 'lisi')

                    .map((item, index) => (
                      <List.Item key={index}>{item.content}</List.Item>
                    ))}
                </List>
              </>
            ) : (
              <Button onClick={() => handleLogin('lisi')}> 登录</Button>
            )}
          </Tabs.Tab>
        </Tabs>
      ) : (
        <SpinLoading />
      )}
    </div>
  )
}
export default Message
