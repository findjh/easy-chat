import useLoginStore from '@/store/loginStore'
import { Avatar, Button } from 'antd-mobile'

const PersonalCenter = () => {
  const user = useLoginStore((state) => state.user)
  const logout = useLoginStore((state) => state.logout)
  if (user) {
    return (
      <div>
        <div>{user.username}</div>
        <Button color="primary" onClick={logout}>
          退出
        </Button>
        <Avatar src={user.headurl} />
      </div>
    )
  }
  return '去登录'
}
export default PersonalCenter
