import { Badge, TabBar } from 'antd-mobile'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.less'
import {
  UserContactOutline,
  MessageOutline,
  MessageFill,
  TravelOutline,
  UserOutline
} from 'antd-mobile-icons'
const tabs = [
  {
    key: '/message',
    title: '消息',
    icon: (active: boolean) => (active ? <MessageFill /> : <MessageOutline />),
    badge: '99+'
  },
  {
    key: '/contact',
    title: '通讯录',
    icon: <UserContactOutline />,
    badge: Badge.dot
  },
  {
    key: '/discover',
    title: '发现',
    icon: <TravelOutline />,
    badge: '5'
  },

  {
    key: '/personalCenter',
    title: '我',
    icon: <UserOutline />
  }
]
const LayoutTabBar = () => {
  const [activeKey, setActiveKey] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onClickTab = (key: string) => {
    setActiveKey(key)
    navigate(key)
  }
  useEffect(() => {
    const tab = tabs.find((item) => pathname.startsWith(item.key))
    if (tab) {
      setActiveKey(tab.key)
    }
  }, [pathname])
  return (
    <div className="tabbar">
      <TabBar safeArea activeKey={activeKey} onChange={onClickTab}>
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </div>
  )
}
export default LayoutTabBar
