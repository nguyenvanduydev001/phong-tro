import React from 'react'
import { ShortCard } from '..'

const RelatedPost = ({ data = [], title = '' }) => {
    return (
        <div className='w-full p-4 border rounded-md bg-white'>
            <h3 className='font-semibold text-lg mb-4'>{title}</h3>
            <div className='flex flex-col'>
                {data?.map(el => (
                    <div key={el.id}
                        className='border-b'
                    >
                        <ShortCard {...el} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedPost