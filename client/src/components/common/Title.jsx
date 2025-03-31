import clsx from 'clsx'
import React from 'react'

const Title = ({ children, className, title }) => {
    return (
        <>
            <div className='h-[81px] w-full'></div>
            <div className='fixed top-0 z-50 left-0 right-0 grid grid-cols-11 gap-3'>
                <div className='col-span-2 h-full'></div>
                <div className={clsx('px-4 bg-white py-6 flex items-center justify-between border-b col-span-9', className)}>
                    <span className='text-2xl font-bold'>{title}</span>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Title