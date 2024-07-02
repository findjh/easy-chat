// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import useLoginStore from '@/store/loginStore'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useLoginStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
