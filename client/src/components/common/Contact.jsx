import React from 'react'
import { Button } from '..'
import { text } from '@/ultils/constant'

const Contact = () => {
    return (
        <div className='bg-white rounded-md shadow-md p-4 flex flex-col justify-center items-center gap-6'>
            <img
                src={text.image}
                alt="thumbnal"
                className='w-full h-48 object-contain'
            />
            <p>{text.content}</p>
            <div className='flex items-center justify-around w-full'>
                {text.contacts.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center justify-center'>
                            <span className='text-orange-500 font-semibold'>{item.text}</span>
                            <span className='text-blue-900 text-[24px] font-semibold'>{item.phone}</span>
                            <span className='text-blue-900 text-[24px] font-semibold'>{item.zalo}</span>
                        </div>
                    )
                })}
            </div>
            <Button>
                Gửi liên hệ
            </Button>
        </div>
    )
}

export default Contact