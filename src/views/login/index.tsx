import { Button, Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import './index.css'
import { MessageType } from '@/types'
import useWebSocket from '@/context/useWebSocket'
import useLoginStore from '@/store/loginStore'
import { mockUsers } from '@/mock/users'
const Login = () => {
  const [visible, setVisible] = useState(false)
  const { sendMessage } = useWebSocket()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLoginStore((state) => state.login)
  const handleLogin = () => {
    if (!username || !password) return
    sendMessage({
      messageType: MessageType.LoginRequestMessage,
      username,
      password
    })
    const user = mockUsers[username]
    user &&
      login({
        username: user.username,
        token: Math.random() * 10000 + '',
        headurl: user.headurl
      })
  }
  return (
    <div className="login-page px-6 flex justify-center flex-col ">
      <Form className="w-full">
        <Form.Item name="username" className="mb-4 ">
          <Input
            value={username}
            onChange={(val) => {
              setUsername(val)
            }}
            placeholder="enter username"
            clearable
            className="rounded-4"
          />
        </Form.Item>
        <Form.Item
          name="password"
          extra={
            <div>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          }
        >
          <Input
            value={password}
            onChange={(val) => {
              setPassword(val)
            }}
            clearable
            placeholder="enter password"
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <Button
        block
        color="primary"
        size="large"
        className="mt-20 rounded-[10px]"
        onClick={() => handleLogin()}
      >
        Sign in
      </Button>
    </div>
  )
}
export default Login
