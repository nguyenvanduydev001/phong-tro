import { AdminSidebar } from '@/components'
import withBaseTopping from '@/hocs/withBaseTopping'
import { getRoles } from '@/redux/actions'
import path from '@/ultils/path'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Layout = ({ dispatch }) => {
    const { current } = useSelector(s => s.user)
    if (!current || +current.role !== 1010) return <Navigate to={`${path.LOGIN}`} replace={true} />
    useEffect(() => {
        dispatch(getRoles())
    }, [])
    return (
        <div className='grid grid-cols-11 gap-3 overflow-hidden max-h-screen'>
            <div className='col-span-2 bg-white max-h-screen overflow-y-auto'>
                <AdminSidebar />
            </div>
            <div className='col-span-9 bg-white max-h-screen overflow-y-auto'>
                <Outlet />
            </div>
        </div>)
}

export default withBaseTopping(Layout)