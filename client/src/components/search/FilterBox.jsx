import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { MdOutlineNavigateNext } from 'react-icons/md'
import withBaseTopping from '@/hocs/withBaseTopping'
import { createSearchParams, useSearchParams } from 'react-router-dom'

const FilterBox = ({ title, data = [], className, id, navigate, location, type = 'ID' }) => {
    const [searchParams] = useSearchParams()
    const handleSearch = (val) => {
        const price = searchParams.getAll('price')
        const area = searchParams.getAll('area')
        const params = Object.fromEntries([...searchParams])
        delete params.price
        delete params.area
        if (price.length > 0) params.price = price
        if (area.length > 0) params.area = area
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ ...params, [id]: val }).toString()
        })
    }
    return (
        <div className='w-full p-4 border rounded-md bg-white drop-shadow-sm'>
            <h2 className='font-semibold text-xl'>{title}</h2>
            <div className={twMerge(clsx('mt-2', className))}>
                {data.map(el => (
                    <span onClick={() => type === 'ID' ? handleSearch(el.id) : handleSearch([el.min, el.max])} className='border-b col-span-1 flex items-center gap-1 hover:text-main-red cursor-pointer py-2' key={el.id}>
                        <MdOutlineNavigateNext />
                        <span>{el.name}</span>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default withBaseTopping(FilterBox)