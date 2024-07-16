import {
  Dialog,
  Input,
  Popover,
  SearchBar,
  SpinLoading,
  Toast
} from 'antd-mobile'
import {
  AddCircleOutline,
  AddOutline,
  HandPayCircleOutline,
  ScanningOutline,
  TeamOutline,
  TransportQRcodeOutline
} from 'antd-mobile-icons'
import useWebSocket from '@/context/useWebSocket'
import MessageList from './components/MessageList'
import { useState } from 'react'
import { Action } from 'antd-mobile/es/components/popover'
import type { IGroupMessage } from '@/context/webSocketContext'
import { MessageType } from '@/types'
import { useNavigate } from 'react-router-dom'
import useLoginStore from '@/store/loginStore'

const Message = () => {
  const navigate = useNavigate()
  const user = useLoginStore((state) => state.user)
  const { isConnected, sendMessage } = useWebSocket()
  const [searchQuery, setSearchQuery] = useState('')
  const [groupName, setGroupName] = useState('')

  const [showJoinGroup, setShowJoinGroup] = useState(false)

  // 气泡功能菜单
  const actions: Action[] = [
    { key: 'createGroup', icon: <TeamOutline />, text: '创建群聊' },
    { key: 'joinGroup', icon: <AddOutline />, text: '加入群聊' },
    { key: 'scan', icon: <ScanningOutline />, text: '扫一扫' },
    { key: 'payment', icon: <HandPayCircleOutline />, text: '付钱/收钱' },
    { key: 'bus', icon: <TransportQRcodeOutline />, text: '乘车码' }
  ]

  const handlePopoverAction = (node: Action) => {
    switch (node.key) {
      case 'createGroup':
        const groupMsg: IGroupMessage = {
          messageType: MessageType.GroupCreateRequestMessage,
          groupName: '测试群聊',
          members: ['zhangsan', 'lisi', 'wangwu']
        }
        sendMessage(groupMsg)
        navigate('/chatRoom', {
          state: { type: 'group', groupName: groupMsg.groupName }
        })
        break
      case 'joinGroup':
        setShowJoinGroup(true)
        break
      default:
        Toast.show({
          content: '功能开发中'
        })
        break
    }
  }
  return (
    <div className="h-screen w-screen">
      <div className="w-screen flex items-center justify-center py-2 relative">
        <span className="text-xl">Easy Chat</span>
        <div className="absolute right-4">
          <Popover.Menu
            actions={actions}
            placement="bottom-start"
            onAction={(node) => handlePopoverAction(node)}
            trigger="click"
          >
            <>
              <AddCircleOutline fontSize={20} />
            </>
          </Popover.Menu>
        </div>
      </div>
      <div className="p-2">
        <SearchBar
          placeholder="请输入内容"
          showCancelButton
          style={{
            '--height': '2.5rem',
            '--padding-left': '35%'
          }}
          onSearch={(val) => {
            setSearchQuery(val)
          }}
        />
      </div>
      <Dialog
        visible={showJoinGroup}
        title={'输入群聊名称'}
        closeOnMaskClick={true}
        content={
          <>
            <div className="p-2 bg-slate-100">
              <Input
                placeholder="请输入群聊名称"
                value={groupName}
                onChange={(val) => {
                  setGroupName(val)
                }}
                clearable
              />
            </div>
          </>
        }
        onClose={() => {
          setShowJoinGroup(false)
        }}
        actions={[
          [
            {
              key: 'confirm',
              text: '确认'
            },
            {
              key: 'cancel',
              text: '取消'
            }
          ]
        ]}
        onAction={(node) => {
          if (node.key === 'confirm') {
            const groupMsg: IGroupMessage = {
              messageType: MessageType.GroupJoinRequestMessage,
              groupName: groupName,
              members: user!.username
            }
            sendMessage(groupMsg)
            navigate('/chatRoom', {
              state: { type: 'group', groupName: groupName }
            })
          } else {
            setShowJoinGroup(false)
            setGroupName('')
          }
        }}
      />
      {isConnected ? (
        <MessageList />
      ) : (
        <div className="h-screen w-screen">
          <SpinLoading />
        </div>
      )}
    </div>
  )
}
export default Message
