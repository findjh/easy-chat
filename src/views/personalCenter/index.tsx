import useLoginStore from '@/store/loginStore'
import { Avatar, Button } from 'antd-mobile'

const PersonalCenter = () => {
  const user = useLoginStore((state) => state.user)
  const logout = useLoginStore((state) => state.logout)
  if (user) {
    return (
      <div>
        <div>=================test workflow=================</div>
        <div className="flex items-center">
          <Avatar
            src={user.headurl}
            style={{ '--size': '64px', '--border-radius': '50%' }}
          />
          <div className="ml-1">{user.username}</div>
        </div>
        <Button color="primary" onClick={logout}>
          退出
        </Button>
      </div>
    )
  }
  return '去登录'
}
export default PersonalCenter
