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
  // 群聊
  const [groupName, setGroupName] = useState('')
  const [groupType, setGroupType] = useState('')
  // 群聊弹框
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
        setGroupType('create')
        setShowJoinGroup(true)
        break
      case 'joinGroup':
        setGroupType('join')
        setShowJoinGroup(true)
        break
      default:
        Toast.show({
          content: '功能开发中'
        })
        break
    }
  }

  const confirmGroup = (node: Action) => {
    if (node.key === 'confirm') {
      const groupMsg: IGroupMessage = {
        messageType: MessageType.GroupJoinRequestMessage,
        groupName: groupName,
        members: ''
      }
      if (groupType === 'create') {
        groupMsg.messageType = MessageType.GroupCreateRequestMessage
        groupMsg.members = ['zhangsan', 'lisi', 'wangwu']
      } else if (groupType === 'join') {
        groupMsg.messageType = MessageType.GroupCreateRequestMessage
        groupMsg.members = user!.username
      }
      sendMessage(groupMsg)
      navigate('/chatRoom', {
        state: { type: 'group', groupName: groupName }
      })
    } else {
      setShowJoinGroup(false)
      setGroupName('')
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
        title={groupType === 'create' ? '创建群聊' : '加入群聊'}
        closeOnMaskClick={true}
        content={
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
        }
        onClose={() => {
          setShowJoinGroup(false)
        }}
        actions={[
          [
            {
              key: 'cancel',
              text: '取消'
            },
            {
              key: 'confirm',
              text: '确认'
            }
          ]
        ]}
        onAction={(node) => {
          confirmGroup(node)
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
