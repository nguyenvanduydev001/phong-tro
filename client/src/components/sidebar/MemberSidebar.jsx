import withBaseTopping from '@/hocs/withBaseTopping'
import { logout } from '@/redux/userSlice'
import { memberSidebar } from '@/ultils/constant'
import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import { AiFillCaretRight, AiFillCaretDown, AiOutlineLogout } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


const MemberSidebar = ({ dispatch }) => {
    const [tabs, setTabs] = useState([])
    const { current } = useSelector(state => state.user)
    const handleTabs = (tabId) => {
        if (tabs.some(el => el === tabId)) setTabs(prev => prev.filter(el => el !== tabId))
        else setTabs(prev => [...prev, tabId])
    }
    return (
        <div className='w-full min-h-screen'>
            <div className='py-12 pb-6 flex flex-col gap-1 justify-center items-center w-full'>
                <img src="/logo.png" alt="" className='w-3/5 object-contain' />
                <small className='text-sm font-medium text-blue-500 '>My workspace</small>
                <div className='mt-4 flex flex-col items-center justify-center gap-1'>
                    <img src={current?.avatar || '/user.svg'} alt="avatar" className='w-24 h-24 rounded-full object-cover' />
                    <span className='text-main-red font-bold'>{current?.name}</span>
                    <span>{'ID: #' + current?.id}</span>
                </div>
            </div>
            <div>
                {memberSidebar.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' && <NavLink
                            className={({ isActive }) => clsx('flex hover:bg-blue-100 w-full  p-3 items-center gap-2', isActive && 'text-main-blue font-bold bg-blue-100')}
                            to={el.path}
                        >
                            {el.icon}
                            {el.name}
                        </NavLink>}
                        {el.type === 'PARENT' && <div
                            className='flex flex-col'
                            to={el.path}
                        >
                            <div
                                onClick={() => handleTabs(el.id)}
                                className={clsx('flex justify-between p-3 cursor-pointer items-center', tabs.some(t => t === el.id) && 'text-main-600 font-bold')}
                            >
                                <span className='flex gap-2  items-center'>
                                    {el.icon}
                                    {el.name}
                                </span>
                                {tabs.some(t => t === el.id) ? <AiFillCaretDown /> : <AiFillCaretRight />}
                            </div>
                            {tabs.some(t => t === el.id) && el.subs.map(item => (
                                <NavLink
                                    key={item.path}
                                    className={({ isActive }) => clsx('flex pl-8 hover:bg-blue-100 w-full  p-3 items-center gap-2', isActive && 'text-main-blue font-bold bg-blue-100')}
                                    to={item.path}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>}
                    </Fragment>
                ))}
                <span onClick={() => dispatch(logout())} className={clsx('flex cursor-pointer hover:bg-blue-100 w-full p-3 items-center gap-2')}>
                    <AiOutlineLogout size={20} />
                    <span>Đăng xuất</span>
                </span>
            </div>
        </div>
    )
}

export default withBaseTopping(MemberSidebar)