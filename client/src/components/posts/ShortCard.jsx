import withBaseTopping from '@/hocs/withBaseTopping'
import { customMoney, renderStarFromNumber } from '@/ultils/fn'
import path from '@/ultils/path'
import moment from 'moment'
import React from 'react'

const ShortCard = ({ star = 0, title, price, createdAt, images = [], navigate, id }) => {
    return (
        <div onClick={() => navigate(`/${path.DETAIL_POST}/${id}/${title}`)} className='flex cursor-pointer items-center gap-3 pb-4'>
            <img src={images[0]} alt="avatar" className='w-20 flex-none h-20 object-cover rounded-md' />
            <div className='flex flex-col'>
                <h3 className='text-base font-semibold text-main-blue line-clamp-2'>
                    <span className='text-sm flex items-center'>{renderStarFromNumber(star)?.map((el, idx) => <span key={idx}>{el}</span>)}</span>
                    <span className='leading-3'>{title}</span></h3>
                <div className='flex items-center justify-between text-sm'>
                    <span className='font-semibold text-green-600'>{customMoney(price)}</span>
                    <span>{moment(createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default withBaseTopping(ShortCard)