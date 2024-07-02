import { Button, Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import './index.css'
const Login = () => {
  const [visible, setVisible] = useState(false)
  //   const handleLogin = (username: UserName) => {
  //     sendMessage({
  //       messageType: MessageType.LoginRequestMessage,
  //       username,
  //       password: 123
  //     })
  //     if (username === 'zhangsan') {
  //       setIsZhangsanLogin(true)
  //     }
  //     if (username === 'lisi') {
  //       setIsLisiLogin(true)
  //     }
  //   }
  return (
    <div className="login-page px-6 flex justify-center flex-col ">
      <Form className="w-full">
        <Form.Item name="username" className="mb-4 ">
          <Input placeholder="enter username" clearable className="rounded-4" />
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
      >
        Sign in
      </Button>
    </div>
  )
}
export default Login
