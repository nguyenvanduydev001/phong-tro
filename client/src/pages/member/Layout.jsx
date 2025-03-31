import { MemberSidebar } from '@/components'
import withBaseTopping from '@/hocs/withBaseTopping'
import path from '@/ultils/path'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Layout = () => {
    const { current, token } = useSelector(state => state.user)
    if (!current || !token) return <Navigate to={path.LOGIN} />
    return (
        <div className='grid grid-cols-11 gap-3 overflow-hidden max-h-screen'>
            <div className='col-span-2 bg-white max-h-full overflow-y-auto'>
                <MemberSidebar />
            </div>
            <div className='col-span-9 bg-white max-h-screen overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default withBaseTopping(Layout)