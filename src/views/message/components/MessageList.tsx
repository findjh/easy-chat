import { Action } from 'antd-mobile/es/components/swipe-action'
import { useNavigate } from 'react-router-dom'
import useLoginStore from '@/store/loginStore'
import { Avatar, Badge, Image, SwipeAction } from 'antd-mobile'

const MessageList = () => {
  const user = useLoginStore((state) => state.user)

  const navigate = useNavigate()
  const leftActions: Action[] = [
    {
      key: 'pin',
      text: '置顶',
      color: 'primary'
    }
  ]
  const rightActions: Action[] = [
    {
      key: 'unsubscribe',
      text: '取消关注',
      color: 'light'
    },
    {
      key: 'mute',
      text: '免打扰',
      color: 'warning'
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger'
    }
  ]
  return (
    <div>
      <SwipeAction leftActions={leftActions} rightActions={rightActions}>
        <div
          className="h-full"
          onClick={() => {
            navigate('/chatRoom', { state: { type: 'chat' } })
          }}
          // prefix={
          //   <Avatar
          //     src={user!.headurl}
          //     style={{ '--size': '48px', '--border-radius': '50%' }}
          //   />
          // }
        >
          <div className="flex items-center p-2">
            <div className="pr-1">
              <Avatar
                src={user!.headurl}
                style={{ '--size': '52px', '--border-radius': '50%' }}
              />
              {/* TODO 群聊消息头像 */}
              {/* <div className="flex items-center justify-center content-center w-14 h-14 flex-wrap rounded-full border border-black border-solid">
                <Image src={user!.headurl} width={22} height={22} className='m-px rounded-full'/>
                <Image src={user!.headurl} width={22} height={22} className='m-px rounded-full'/>
                <Image src={user!.headurl} width={22} height={22} className='m-px rounded-full'/>
                <Image src={user!.headurl} width={22} height={22} className='m-px rounded-full'/>
              </div> */}
            </div>
            <div className="mx-2 w-full">
              <div className="flex justify-between">
                <span className="text-base">
                  {user?.username === 'zhangsan' ? '李四' : '张三'}
                </span>
                <span className="items-center">
                  <Badge color="#87d068" content="99+" />
                </span>
              </div>
              <div className="text-gray-400 mt-2 text-xs flex justify-between">
                <span>消息消息消息</span>
                <span>12:00</span>
              </div>
            </div>
          </div>
        </div>
      </SwipeAction>
    </div>
  )
}
export default MessageList
