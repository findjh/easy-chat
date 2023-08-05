import Message from '@/views/message'
import Contact from '@/views/contact'
import Discover from '@/views/discover'
import PersonalCenter from '@/views/personalCenter'
import { Navigate } from 'react-router-dom'
export const routes = [
  {
    path: '/',
    element: <Navigate to="/message" replace={true} />
  },
  {
    path: '/message',
    element: <Message />,
    meta: {
      title: '消息'
    }
  },
  {
    path: '/contact',
    element: <Contact />,
    meta: {
      title: '通讯录'
    }
  },
  {
    path: '/discover',
    element: <Discover />,
    meta: {
      title: '发现'
    }
  },
  {
    path: '/personalCenter',
    element: <PersonalCenter />,
    meta: {
      title: '我'
    }
  }
]
