import Message from '@/views/message'
import Contact from '@/views/contact'
import Discover from '@/views/discover'
import PersonalCenter from '@/views/personalCenter'
import { Navigate } from 'react-router-dom'
import LandingPage from '@/views/landingPage'
import ChatRoom from '@/views/chatRoom'
import LayoutWithTabBar from './layoutWithTabBar'
import Login from '@/views/login'
import ProtectedRoute from '@/components/ProtectedRoute'
export const routes = [
  {
    path: '/',
    element: <Navigate to="/login" replace={true} />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LayoutWithTabBar />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'message',
        element: <Message />,
        meta: {
          title: '消息'
        }
      },
      {
        path: 'contact',
        element: <Contact />,
        meta: {
          title: '通讯录'
        }
      },
      {
        path: 'discover',
        element: <Discover />,
        meta: {
          title: '发现'
        }
      },
      {
        path: 'personalCenter',
        element: <PersonalCenter />,
        meta: {
          title: '我'
        }
      }
    ]
  },

  {
    path: '/landingPage',
    element: <LandingPage />,
    meta: {
      title: 'landingPage'
    }
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: 'login'
    }
  },
  {
    path: '/chatRoom',
    element: <ChatRoom />,
    meta: {
      title: 'chatRoom'
    }
  }
]
