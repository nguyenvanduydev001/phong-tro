import withBaseTopping from '@/hocs/withBaseTopping'
import { modal } from '@/redux/appSlice'
import React from 'react'
import { useSelector } from 'react-redux'

const Modal = ({ dispatch, children }) => {
    return (
        <div
            onClick={e => dispatch(modal({ isShowModal: false, modalChildren: null }))}
            className='absolute z-[100] top-0 overflow-hidden h-screen w-screen flex items-center justify-center bg-overlay-70'>
            {children}
        </div>
    )
}

export default withBaseTopping(Modal)