import React from 'react'
import { Outlet } from 'react-router-dom'
import LayoutTabBar from '@/layouts/TabBar'

const LayoutWithTabBar: React.FC = () => {
  return (
    <>
      <Outlet />
      <LayoutTabBar />
    </>
  )
}

export default LayoutWithTabBar
