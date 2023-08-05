import { useRoutes } from 'react-router-dom'
import { routes } from './modules/index'
const Router = () => {
  return useRoutes(routes)
}

export default Router
