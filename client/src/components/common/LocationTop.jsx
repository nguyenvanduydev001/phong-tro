import React from 'react'

const LocationTop = () => {
    return (
        <div className='py-6 flex items-center justify-center gap-4'>
            <div className='w-fit h-fit rounded-md'>
                <img src="/hcm.jpg" alt="hcm" className='w-[220px] h-[110px] rounded-tl-md rounded-tr-md object-cover' />
                <div className='p-2 flex bg-white border cursor-pointer hover:text-orange-500 text-main-blue rounded-bl-md rounded-br-md font-semibold items-center justify-center'>
                    Phòng trọ Hồ Chí Minh
                </div>
            </div>
            <div className='w-fit h-fit rounded-md'>
                <img src="/hn.jpg" alt="hcm" className='w-[220px] h-[110px] rounded-tl-md rounded-tr-md object-cover' />
                <div className='p-2 flex bg-white border cursor-pointer hover:text-orange-500 text-main-blue rounded-bl-md rounded-br-md font-semibold items-center justify-center'>
                    Phòng trọ Hà Nội
                </div>
            </div>
            <div className='w-fit h-fit rounded-md'>
                <img src="/dn.jpg" alt="hcm" className='w-[220px] h-[110px] rounded-tl-md rounded-tr-md object-cover' />
                <div className='p-2 flex bg-white border cursor-pointer hover:text-orange-500 text-main-blue rounded-bl-md rounded-br-md font-semibold items-center justify-center'>
                    Phòng trọ Đà Nẵng
                </div>
            </div>
        </div>
    )
}

export default LocationTop